"use client";

import type * as React from "react";
import { Home, Settings, User, HelpCircle } from "lucide-react";

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
  { icon: Settings, label: "Tweets", href: "/tweets" },
  { icon: User, label: "Profile", href: "/profile" },
  { icon: Settings, label: "Settings", href: "/settings" },
  { icon: HelpCircle, label: "Help", href: "/help" },
];

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar className='bg-black text-white border-card' {...props}>
      <SidebarHeader className='border-b border-black bg-black'></SidebarHeader>
      <SidebarContent className='bg-black border-card'>
        <SidebarGroup className='bg-black '>
          <SidebarGroupLabel className='text-gray-400'>D3phcom</SidebarGroupLabel>
          <SidebarGroupContent className='bg-black'>
            <SidebarMenu>
              {navItems.map((item) => (
                <SidebarMenuItem key={item.label}>
                  <SidebarMenuButton asChild>
                    <a
                      href={item.href}
                      className='flex items-center gap-3 text-gray-400 hover:bg-black hover:text-white bg-black'>
                      <item.icon className='h-4 w-4' />
                      <span>{item.label}</span>
                    </a>
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
