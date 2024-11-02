"use client";

import React, { useState } from "react";
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
import { Navbar } from "./navbar";
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

export function Dashboard({ mode, hvals, keywords = [], isLoading }: DataProps) {
  console.log(`dashboard, ${hvals}`);

  return (
    <div className='min-h-screen bg-background'>
      <Navbar />
      <div className='p-4 space-y-4'>
        <h1 className='text-2xl font-bold'>SE Asia Conflict Analysis Dashboard</h1>
        <h1>TEST SOCKET: {mode}</h1>

        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
          <Card>
            <CardHeader>
              <CardTitle>Overall Danger Level</CardTitle>
            </CardHeader>
            <CardContent className='flex justify-center items-center'>
              <DangerGauge value={hvals} size='lg' />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Keywords</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width='100%' height={300}>
                <BarChart data={tweetData}>
                  <CartesianGrid strokeDasharray='3 3' />
                  <XAxis dataKey='Keyword' />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey='Tweets' fill='#8884d8' />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Danger Level Trend</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width='100%' height={300}>
                <LineChart data={tweetData}>
                  <CartesianGrid strokeDasharray='3 3' />
                  <XAxis dataKey='date' />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type='monotone' dataKey='dangerLevel' stroke='#82ca9d' />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Regional Data</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Keywords</TableHead>
                    <TableHead>Tweet Frequency</TableHead>
                    <TableHead>Danger Level</TableHead>
                    <TableHead>Date</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {keywords &&
                    keywords.map((data) => (
                      <TableRow key={data._id || data.kw_string}>
                        <TableCell>{data.kw_string || "N/A"}</TableCell>
                        <TableCell>{data._id || "N/A"}</TableCell>
                        <TableCell>{hvals}</TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
