"use client";
import { Dashboard } from "./components/dashboard-main/dashboard";
import { TweetDashboard } from "./components/tweet-dashboard/tweet-dashboard";
import { useEffect, useState } from "react";
import { socket } from "./socket.js";

interface ModeProps {
  mode: string
}
export default function Home(ModeProps: ModeProps) {
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [transport, setTransport] = useState(socket.io.engine.transport.name);
  const [method, setMethod] = useState("")
  useEffect(() => {
    socket.on("connect", () => {
      setIsConnected(true);
      console.log("Successfully Connected");
    })
    socket.on("mode", (data: string) => {
      setMethod(data)
    })

    return () => {
      socket.off("connect")
      socket.off("mode")
    }
  }, [])
  return (
    <>
      <Dashboard  mode={method}/> <TweetDashboard />
    </>
  );
}
