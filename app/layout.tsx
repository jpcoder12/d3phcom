"use client";

import { Inter } from "next/font/google";
import "./globals.css";
import { SidebarProvider, SidebarTrigger, SidebarInset } from "@/components/ui/sidebar";
import { AppSidebar } from "./components/app-sidebar";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en'>
      <body className={`${inter.className} bg-black text-white`}>
        <SidebarProvider defaultOpen={false}>
          <AppSidebar />
          <SidebarInset className='flex flex-col flex-1 border-card-border '>
            <header className='flex h-14 lg:h-[60px] items-center gap-4  border-gray-800 bg-black px-6'>
              <SidebarTrigger className='text-white' />
              <div className='flex-1'>{/* Add your header content here */}</div>
            </header>
            <main className='flex-1 overflow-auto bg-black'>{children}</main>
          </SidebarInset>
        </SidebarProvider>
      </body>
    </html>
  );
}
