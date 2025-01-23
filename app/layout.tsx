"use client";

import { useState } from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "./components/app-sidebar";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en'>
      <body>
        <SidebarProvider>
          <div className='flex h-screen'>
            <AppSidebar />
            <main className='flex-1 overflow-y-auto'>
              {children}
              <SidebarTrigger />
            </main>
          </div>
        </SidebarProvider>
      </body>
    </html>
  );
}
