"use client";

import React, { useState } from "react";
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
import { Navbar } from "./navbar";
import { DangerGauge } from "./danger-gauge";

// Sample data - replace this with your actual data
const tweetData = [
  { id: 1, region: "South China Sea", tweetFrequency: 45, dangerLevel: 30, date: "2023-06-01" },
  { id: 2, region: "Taiwan Strait", tweetFrequency: 80, dangerLevel: 60, date: "2023-06-02" },
  { id: 3, region: "Korean Peninsula", tweetFrequency: 32, dangerLevel: 20, date: "2023-06-03" },
  { id: 4, region: "East China Sea", tweetFrequency: 60, dangerLevel: 45, date: "2023-06-04" },
  { id: 5, region: "Mekong River", tweetFrequency: 25, dangerLevel: 15, date: "2023-06-05" },
];

export function Dashboard() {
  const [overallDangerLevel, setOverallDangerLevel] = useState(35); // This would be calculated based on your algorithm

  return (
    <div className='min-h-screen bg-background'>
      <Navbar />
      <div className='p-4 space-y-4'>
        <h1 className='text-2xl font-bold'>SE Asia Conflict Analysis Dashboard</h1>

        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
          <Card>
            <CardHeader>
              <CardTitle>Overall Danger Level</CardTitle>
            </CardHeader>
            <CardContent className='flex justify-center items-center'>
              <DangerGauge value={overallDangerLevel} size='lg' />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Tweet Frequency by Region</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width='100%' height={300}>
                <BarChart data={tweetData}>
                  <CartesianGrid strokeDasharray='3 3' />
                  <XAxis dataKey='region' />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey='tweetFrequency' fill='#8884d8' />
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
                    <TableHead>Region</TableHead>
                    <TableHead>Tweet Frequency</TableHead>
                    <TableHead>Danger Level</TableHead>
                    <TableHead>Date</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {tweetData.map((data) => (
                    <TableRow key={data.id}>
                      <TableCell>{data.region}</TableCell>
                      <TableCell>{data.tweetFrequency}</TableCell>
                      <TableCell>{data.dangerLevel}</TableCell>
                      <TableCell>{data.date}</TableCell>
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
