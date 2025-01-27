// src/app/page.tsx
"use client";

import { Dashboard } from "./components/dashboard-main/dashboard";

import useSocket from "./hooks/useSocket";

export default function Home() {
  const { method, gauge, keywords, isLoading, hvals, tweets } = useSocket();

  return (
    <>
      <Dashboard
        mode={method}
        gauge={gauge}
        keywords={keywords}
        isLoading={isLoading}
        hvals={hvals}
        tweets={tweets}
      />
    </>
  );
}
