// src/app/page.tsx
"use client";

import { Dashboard } from "./components/dashboard-main/dashboard";
import { TweetDashboard } from "./components/tweet-dashboard/tweet-dashboard";
import Tweets from "./components/tweets/Tweets";
import { Button } from "@/components/ui/button";
import { SidebarInset, useSidebar } from "@/components/ui/sidebar";

import useSocket from "./hooks/useSocket";

export default function Home() {
  const { toggleSidebar } = useSidebar();
  const { method, gauge, keywords, isLoading, hvals, tweets } = useSocket();

  return (
    <>
      <SidebarInset>
        <Button onClick={toggleSidebar} className='bg-white'>
          Toggle Sidebar
        </Button>
        <Dashboard
          mode={method}
          gauge={gauge}
          keywords={keywords}
          isLoading={isLoading}
          hvals={hvals}
          tweets={tweets}
        />
        {/* <TweetDashboard /> */}
        <Tweets />
      </SidebarInset>
    </>
  );
}
