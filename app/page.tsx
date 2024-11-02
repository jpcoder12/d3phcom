// src/app/page.tsx
"use client";

import { Dashboard } from "./components/dashboard-main/dashboard";
import { TweetDashboard } from "./components/tweet-dashboard/tweet-dashboard";
import useSocket from "./hooks/useSocket";

export default function Home() {
  const { method, gauge, keywords, isLoading } = useSocket();

  return (
    <>
      <Dashboard mode={method} hvals={gauge} keywords={keywords} isLoading={isLoading} />
      <TweetDashboard />
    </>
  );
}
