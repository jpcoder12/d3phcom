"use client";

import { useState, useEffect } from "react";
import { socket } from "../socket";
import type { Tweet } from "../types";

// Define the structure of an hval item
interface Hval {
  _id?: string;
  final_gauge: number;
  post_date: string;
}

// Define the structure of the socket data
interface SocketData {
  isConnected: boolean;
  transport: string;
  method: string;
  gauge: number;
  keywords: { _id?: string; kw_string: string }[];
  isLoading: boolean;
  hvals: Hval[];
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
  const [keywords, setKeywords] = useState<{ _id?: string; kw_string: string }[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [hvals, setHvals] = useState<Hval[]>([]);
  const [tweets, setTweets] = useState<{
    newTweets: Tweet[];
    totalPages: number;
    currentPage: number;
  }>({
    newTweets: [],
    totalPages: 1,
    currentPage: 1,
  });

  // Function to request tweets for a specific page
  const fetchPage = (page: number) => {
    socket.emit("getTweets", { page });
  };

  // Function to format date
  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
      console.error("Invalid date:", dateString);
      return "Invalid Date";
    }
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    return `${hours}:${minutes}`;
  };

  useEffect(() => {
    // Socket event listeners
    socket.on("connect", () => {
      setIsConnected(true);
    });

    socket.on("mode", (data: string) => {
      setMethod(data);
    });

    socket.on("kws", (keyWords: { _id?: string; kw_string: string }[]) => {
      setKeywords(keyWords);
      setIsLoading(false);
    });

    socket.on("hvals", (receivedHvals: Hval[]) => {
      const formattedHvals = receivedHvals.map((hval) => ({
        ...hval,
        post_date: formatDate(hval.post_date),
      }));

      setHvals(formattedHvals);
      console.log("Formatted hvals:", formattedHvals);

      // Update gauge if needed
      if (formattedHvals.length > 0) {
        setGauge(formattedHvals[0].final_gauge * 10);
      }
    });

    socket.on("tweets", (obj: { newTweets: Tweet[]; totalPages: number; currentPage: number }) => {
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
    fetchPage,
  };
};

export default useSocket;
