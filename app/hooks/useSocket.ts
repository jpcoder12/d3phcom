"use client";

import { useState, useEffect } from "react";
import { socket } from "../socket";
import type { Tweet } from "../types";

// Define the structure of the socket data
interface SocketData {
  isConnected: boolean;
  transport: string;
  method: string;
  gauge: number;
  keywords: { _id?: string; kw_string: string }[];
  isLoading: boolean;
  hvals: { _id?: string; final_gauge: number; post_date: string }[];
  tweets: {
    newTweets: Tweet[];
    totalPages: number;
    currentPage: number;
  };
  fetchPage: (page: number) => void; // Function to request a specific page
}

const useSocket = (): SocketData => {
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [transport, setTransport] = useState(socket.io.engine.transport.name);
  const [method, setMethod] = useState("");
  const [gauge, setGauge] = useState(0);
  const [keywords, setKeywords] = useState([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [hvals, setHvals] = useState([]);
  const [tweets, setTweets] = useState<any>({
    newTweets: [],
    totalPages: 1,
    currentPage: 1,
  });

  // Function to request tweets for a specific page
  const fetchPage = (page: number) => {
    console.log(`Requesting tweets for page ${page}`);
    socket.emit("getTweets", { page });
  };

  useEffect(() => {
    // Socket event listeners
    socket.on("connect", () => {
      setIsConnected(true);
      console.log("Successfully Connected");
    });

    socket.on("mode", (data: string) => {
      setMethod(data);
    });

    socket.on("kws", (keyWords: any) => {
      setKeywords(keyWords);
      setIsLoading(false);
    });

    socket.on("hvals", (hvals: { final_gauge: number }[]) => {
      setGauge(hvals[0].final_gauge * 10);
    });

    socket.on("hvals", (hvals) => {
      hvals.map((hval: any) => {
        const date = new Date(hval.post_date);
        const hours = date.getHours();
        const minutes = date.getMinutes().toString().padStart(2, "0");
        const time = `${hours}:${minutes}`;
        hval.post_date = time;
        return hval;
      });

      setHvals(hvals);
    });

    socket.on("tweets", (obj) => {
      console.log("Received tweets data:", obj);
      setTweets(obj);
    });

    return () => {
      socket.off("connect");
      socket.off("mode");
      socket.off("kws");
      socket.off("hvals");
      socket.off("tweets");
    };
  }, []);

  return {
    isConnected,
    transport,
    method,
    gauge,
    keywords,
    isLoading,
    hvals,
    tweets,
    fetchPage, // Expose the fetchPage function
  };
};

export default useSocket;
