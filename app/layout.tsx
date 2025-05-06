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
      <body className={`${inter.className} text-white`}>
        <SessionProvider session={session}>
          <WebSocketProvider>
            <SidebarProvider defaultOpen={true}>
              <AppSidebar />
              <SidebarInset className='flex flex-col flex-1 border-card-border'>
                <main className='flex-1 overflow-auto '>{children}</main>
              </SidebarInset>
            </SidebarProvider>
          </WebSocketProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
