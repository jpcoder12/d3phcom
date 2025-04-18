"use client";

import React, { createContext, useContext, useEffect, useRef, useState } from "react";
import { socket } from "../socket";

interface Hval {
  _id?: string;
  final_gauge_score: number;
  post_date: string;
}

interface WebSocketContextData {
  isConnected: boolean;
  transport: string;
  method: string;
  gauge: number;
  keywords: { _id?: string; kw_string: string }[];
  isLoading: boolean;
  hvals: Hval[];
}

const WebSocketContext = createContext<WebSocketContextData | undefined>(undefined);

export const WebSocketProvider = ({ children }: { children: React.ReactNode }) => {
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [transport, setTransport] = useState(socket.io.engine.transport.name);
  const [method, setMethod] = useState("");
  const [gauge, setGauge] = useState(0);
  const [keywords, setKeywords] = useState<{ _id?: string; kw_string: string }[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [hvals, setHvals] = useState<Hval[]>([]);

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return "Invalid Date";
    return `${date.getHours().toString().padStart(2, "0")}:${date
      .getMinutes()
      .toString()
      .padStart(2, "0")}`;
  };

  useEffect(() => {
    socket.on("connect", () => setIsConnected(true));
    socket.on("disconnect", () => setIsConnected(false));
    socket.on("mode", setMethod);
    socket.on("kws", (keyWords: { _id?: string; kw_string: string }[]) => {
      setKeywords(keyWords);
      setIsLoading(false);
    });
    socket.on("hvals", (receivedHvals: Hval[]) => {
      const formattedHvals = receivedHvals.map((hval) => ({
        ...hval,
        post_date: formatDate(hval.post_date),
      }));
      if (formattedHvals.length > 0) {
        setGauge(formattedHvals[0].final_gauge_score);
      }

      setHvals(formattedHvals);
    });

    return () => {
      socket.off("connect");
      socket.off("disconnect");
      socket.off("mode");
      socket.off("kws");
      socket.off("hvals");
    };
  }, []);

  return (
    <WebSocketContext.Provider
      value={{
        isConnected,
        transport,
        method,
        gauge,
        keywords,
        isLoading,
        hvals,
      }}>
      {children}
    </WebSocketContext.Provider>
  );
};

export const useWebSocket = () => {
  const context = useContext(WebSocketContext);
  if (!context) {
    throw new Error("useWebSocket must be used within a WebSocketProvider");
  }
  return context;
};
