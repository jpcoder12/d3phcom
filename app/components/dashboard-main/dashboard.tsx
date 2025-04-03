"use client";

import React, { useState } from "react";
import AuthButton from "../auth-component/AuthButton";
import { signIn, signOut, useSession } from "next-auth/react";

// UI
import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/dashboard-main/ui/card";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  AreaChart,
  Area,
} from "recharts";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/app/components/dashboard-main/ui/table";
// components
import { DangerGauge } from "./danger-gauge";
// types
import { DataProps } from "@/app/types";

// Sample data - replace this with your actual data
const tweetData = [
  { id: 1, Keyword: "South China Sea", Tweets: 45, dangerLevel: 30, date: "2023-06-01" },
  { id: 2, Keyword: "Taiwan Strait", Tweets: 80, dangerLevel: 60, date: "2023-06-02" },
  { id: 3, Keyword: "Korean Peninsula", Tweets: 32, dangerLevel: 20, date: "2023-06-03" },
  { id: 4, Keyword: "East China Sea", Tweets: 60, dangerLevel: 45, date: "2023-06-04" },
  { id: 5, Keyword: "Mekong River", Tweets: 25, dangerLevel: 15, date: "2023-06-05" },
];

export function Dashboard({ gauge, keywords = [], hvals, tweets }: DataProps) {
  const { newTweets } = tweets;
  const { data: session, status } = useSession();
  const sortedQueryKw = Array.from(
    new Map(newTweets.map((tweet) => [tweet.query_kw, tweet])).values()
  );
  console.log("gauge", gauge);
  console.log(hvals);
  return (
    <div className=' bg-black'>
      <AuthButton />
      <div className='px-4 pb-4'>
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-4'>
          <Card className='bg-card border border-card-border rounded-lg p-4'>
            <CardHeader>
              <CardTitle className='text-text-offWhite4 pb-12'>Overall Danger Level</CardTitle>
            </CardHeader>
            <CardContent className='flex justify-center items-center'>
              <DangerGauge value={gauge} size='lg' />
            </CardContent>
          </Card>
          {session ? (
            <Card className='bg-card border border-card-border  rounded-lg p-4'>
              <CardHeader>
                <CardTitle className='text-gray-400'>Keywords</CardTitle>
              </CardHeader>
              <CardContent className='text-gray-400'>
                <ResponsiveContainer width='100%' height={300}>
                  <BarChart data={tweetData}>
                    <CartesianGrid strokeDasharray='3 3' />
                    <XAxis dataKey='Keyword' />
                    <YAxis />
                    <Tooltip
                      contentStyle={{ backgroundColor: "black", color: "#e5e7eb" }}
                      cursor={{ fill: "transparent" }}
                    />

                    <Bar
                      dataKey='Tweets'
                      fill='#34586e7d'
                      activeBar={{ stroke: "white", strokeWidth: 1 }}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          ) : null}
        </div>
        <div className=' pt-8 pb-4'>
          <Card className='bg-card border border-card-border rounded-lg p-4'>
            <CardHeader>
              <CardTitle className='text-gray-400'>Danger Level Trend</CardTitle>
            </CardHeader>
            <CardContent>
              {/* <div className='flex flex-row gap-4'>
                <button>7 days</button>
                <button>1 month</button>
                <button>3 months</button>
                <button>All time</button>
              </div> */}
              <ResponsiveContainer width='100%' height={300}>
                <AreaChart data={hvals.slice(0, 10)}>
                  <CartesianGrid strokeDasharray='3 3' />
                  <XAxis dataKey='post_date' />
                  <YAxis domain={[0, 10]} tickCount={10} allowDecimals={false} />

                  <Tooltip
                    contentStyle={{ backgroundColor: "rgba(0, 0, 0, 0.8)", color: "#e5e7eb" }}
                  />

                  <Area
                    type='monotone'
                    dataKey='final_gauge'
                    stroke='#ffffffd3'
                    fillOpacity={0.1}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
