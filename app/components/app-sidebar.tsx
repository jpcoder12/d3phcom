"use client";

import type * as React from "react";
import { Home, Settings, User, HelpCircle, BookCopy } from "lucide-react";
import Link from "next/link";
import { useWebSocket } from "../context/WebSocketContext";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";

const navItems = [
  { icon: Home, label: "Dashboard", href: "/" },
  { icon: BookCopy, label: "Tweets", href: "/tweet-page" },
  { icon: User, label: "Profile", href: "/" },
  { icon: Settings, label: "Settings", href: "/settings" },
  { icon: HelpCircle, label: "Help", href: "/help" },
];

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { method } = useWebSocket();
  return (
    <Sidebar className=' text-white border-card' {...props}>
      <SidebarContent
        className=' border-card'
        style={{
          background:
            "linear-gradient(90deg, rgba(8, 8, 8, 0.89) 35%, rgba(0, 0, 0, 0.2) 100%, rgba(6, 6, 6, 1) 1%, rgba(13, 13, 13, 0.06) 0%)",
        }}>
        <SidebarHeader className=' bg-transparent flex mr-auto ml-auto mt-6'>D3PH</SidebarHeader>
        <SidebarGroup className='bg-transparent '>
          <SidebarGroupLabel className='text-gray-400 text-sm '>
            <img src='line.svg' alt='Line' />
          </SidebarGroupLabel>
          <SidebarGroupContent className='bg-transparent hover:bg-transparent'>
            <SidebarMenu>
              {navItems.map((item) => (
                <SidebarMenuItem key={item.label}>
                  <SidebarMenuButton asChild className='hover:bg-transparent '>
                    <Link
                      href={item.href}
                      passHref
                      className='flex items-center gap-3 text-gray-400 hover:bg-transparent hover:text-white bg-transparent'>
                      <item.icon className='h-4 w-4' />
                      <span>{item.label}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
