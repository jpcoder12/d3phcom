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

  useEffect(() => {
    socket.on("connect", () => {
      setIsConnected(true);
      console.log("Successfully Connected");
    });
    socket.on("mode", (data: string) => {
      setMethod(data);
    });

    socket.on("kws", (keyWords: any) => {
      setKeywords(keyWords);
    });

    socket.on("hvals", (hvals: number) => {
      setGauge(hvals * 10);
    });

    return () => {};
  }, []);

  return (
    <>
      <Dashboard mode={method} hvals={gauge} keywords={keywords} /> <TweetDashboard />
    </>
  );
}
