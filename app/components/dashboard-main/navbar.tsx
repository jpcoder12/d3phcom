"use client";

import React from "react";
import Link from "next/link";
import { Input } from "@/app/components/dashboard-main/ui/input";
import { Button } from "@/app/components/dashboard-main/ui/button";
import { Search, Bell, User } from "lucide-react";

export function Navbar() {
  return (
    <nav className='bg-background border-b'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex items-center justify-between h-16'>
          <div className='flex items-center'>
            <Link href='/' className='flex-shrink-0'>
              <span className='text-2xl font-bold text-primary'>d3phcom</span>
            </Link>
            <div className='hidden md:block'>
              <div className='ml-10 flex items-baseline space-x-4'>
                <Link
                  href='/'
                  className='text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium'>
                  Dashboard
                </Link>
                <Link
                  href='/analysis'
                  className='text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium'>
                  Analysis
                </Link>
                <Link
                  href='/reports'
                  className='text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium'>
                  Reports
                </Link>
              </div>
            </div>
          </div>
          <div className='flex items-center'>
            <div className='flex-shrink-0'>
              <div className='relative'>
                <Input type='text' placeholder='Enter keyword or region' className='w-64 pr-10' />
                <Button size='sm' className='absolute inset-y-0 right-0 flex items-center px-2'>
                  <Search className='h-4 w-4' />
                </Button>
              </div>
            </div>
            <div className='ml-4 flex items-center md:ml-6'>
              <Button variant='ghost' size='icon'>
                <Bell className='h-5 w-5' />
              </Button>
              <Button variant='ghost' size='icon'>
                <Link href='/auth'>
                  <User className='h-5 w-5' />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
