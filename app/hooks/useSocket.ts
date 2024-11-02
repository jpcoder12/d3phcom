"use client";

import { useState, useEffect } from "react";
import { socket } from "../socket";

interface SocketData {
  isConnected: boolean;
  transport: string;
  method: string;
  gauge: number;
  keywords: { _id?: string; kw_string: string }[];
  isLoading: boolean;
}

const useSocket = (): SocketData => {
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [transport, setTransport] = useState(socket.io.engine.transport.name);
  const [method, setMethod] = useState("");
  const [gauge, setGauge] = useState<number>(0);
  const [keywords, setKeywords] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

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

    socket.on("hvals", (hvals: number) => {
      setGauge(hvals * 10);
    });

    // Clean up socket listeners on component unmount
    return () => {
      socket.off("connect");
      socket.off("mode");
      socket.off("kws");
      socket.off("hvals");
    };
  }, []);

  return { isConnected, transport, method, gauge, keywords, isLoading };
};

export default useSocket;
