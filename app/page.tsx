"use client";

import { Dashboard } from "./components/dashboard-main/dashboard";
import { TweetDashboard } from "./components/tweet-dashboard/tweet-dashboard";
import { useEffect, useState } from "react";
import { socket } from "./socket.js";

interface ModeProps {
  mode: string;
  hvals: number;
}

export default function Home(ModeProps: ModeProps) {
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [transport, setTransport] = useState(socket.io.engine.transport.name);
  const [method, setMethod] = useState("");
  const [gauge, setGauge] = useState<number>(0);
  const [keywords, setKeywords] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    socket.on("connect", () => {
      setIsConnected(true);
      console.log("Successfully Connected");
    });

    socket.on("mode", (data: string) => {
      setMethod(data);
    });

    socket.on("hvals", (hvals: number) => {
      setGauge(hvals * 10);
    });

    return () => {
      socket.off("connect");
      socket.off("mode");
      socket.off("kws");
      socket.off("hvals");
    };
  }, []);

  return (
    <>
      <Dashboard mode={method} hvals={gauge} keywords={keywords} isLoading={isLoading} />
      <TweetDashboard />
    </>
  );
}
