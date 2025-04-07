"use client";

import React from "react";
import { Inter } from "next/font/google";
import "./globals.css";
import { SidebarProvider, SidebarTrigger, SidebarInset } from "@/components/ui/sidebar";
import { AppSidebar } from "./components/app-sidebar";
import { WebSocketProvider } from "./context/WebSocketContext";
import { SessionProvider } from "next-auth/react";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
  session,
}: {
  children: React.ReactNode;
  session: any;
}) {
  return (
    <html lang='en'>
      <body className={`${inter.className} bg-black text-white`}>
        <SessionProvider session={session}>
          <WebSocketProvider>
            <SidebarProvider defaultOpen={false}>
              <AppSidebar />
              <SidebarInset className='flex flex-col flex-1 border-card-border'>
                <header className='flex h-14 lg:h-[60px] items-center gap-4 border-gray-800  px-6 fixed w-full'>
                  <SidebarTrigger className='text-white' />
                  <div className='flex-1'>{/* Add  header content here */}</div>
                </header>
                <main className='flex-1 overflow-auto bg-black'>{children}</main>
              </SidebarInset>
            </SidebarProvider>
          </WebSocketProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
