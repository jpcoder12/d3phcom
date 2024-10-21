"use client";
import { Dashboard } from "./components/dashboard-main/dashboard";
import { TweetDashboard } from "./components/tweet-dashboard/tweet-dashboard";
import { useEffect, useState } from "react";
import { socket } from "./socket.js";


export default function Home() {
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [transport, setTransport] = useState(socket.io.engine.transport.name);
  useEffect(() => {
    socket.on("connect", () => {
      setIsConnected(true);
      console.log("Connected");
    })
  })
  return (
    <>
      <Dashboard /> <TweetDashboard />
    </>
  );
}
