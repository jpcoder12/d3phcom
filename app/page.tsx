"use client";

import { Dashboard } from "./components/dashboard-main/dashboard";
import { useWebSocket } from "./context/WebSocketContext";

export default function Home() {
  const { method, gauge, keywords, isLoading, hvals } = useWebSocket();

  return (
    <div className='pt-20'>
      <Dashboard
        mode={method}
        gauge={gauge}
        keywords={keywords}
        isLoading={isLoading}
        hvals={hvals}
      />
    </div>
  );
}
