"use client";

import React from "react";

import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";

// Sample data - replace this with your actual data
const tweetData = [
  { id: 1, text: "First tweet", likes: 45, comments: 12, date: "2023-06-01" },
  { id: 2, text: "Second tweet", likes: 80, comments: 25, date: "2023-06-02" },
  { id: 3, text: "Third tweet", likes: 32, comments: 8, date: "2023-06-03" },
  { id: 4, text: "Fourth tweet", likes: 60, comments: 15, date: "2023-06-04" },
  { id: 5, text: "Fifth tweet", likes: 100, comments: 30, date: "2023-06-05" },
];

const COLORS = ["#0088FE", "#00C49F"];

export function TweetDashboard() {
  const totalLikes = tweetData.reduce((sum, tweet) => sum + tweet.likes, 0);
  const totalComments = tweetData.reduce((sum, tweet) => sum + tweet.comments, 0);
  const pieData = [
    { name: "Likes", value: totalLikes },
    { name: "Comments", value: totalComments },
  ];

  return (
    <div className='p-4 space-y-4'>
      <h1 className='text-2xl font-bold'>Tweet Analytics Dashboard</h1>

      <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
        <Card>
          <CardHeader>
            <CardTitle>Likes and Comments Over Time</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width='100%' height={300}>
              <LineChart data={tweetData}>
                <CartesianGrid strokeDasharray='3 3' />
                <XAxis dataKey='date' />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type='monotone' dataKey='likes' stroke='#8884d8' />
                <Line type='monotone' dataKey='comments' stroke='#82ca9d' />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Likes and Comments by Tweet</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width='100%' height={300}>
              <BarChart data={tweetData}>
                <CartesianGrid strokeDasharray='3 3' />
                <XAxis dataKey='id' />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey='likes' fill='#8884d8' />
                <Bar dataKey='comments' fill='#82ca9d' />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Engagement Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width='100%' height={300}>
              <PieChart>
                <Pie
                  data={pieData}
                  cx='50%'
                  cy='50%'
                  labelLine={false}
                  outerRadius={80}
                  fill='#8884d8'
                  dataKey='value'
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}>
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Tweet Data</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Text</TableHead>
                  <TableHead>Likes</TableHead>
                  <TableHead>Comments</TableHead>
                  <TableHead>Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {tweetData.map((tweet) => (
                  <TableRow key={tweet.id}>
                    <TableCell>{tweet.id}</TableCell>
                    <TableCell>{tweet.text}</TableCell>
                    <TableCell>{tweet.likes}</TableCell>
                    <TableCell>{tweet.comments}</TableCell>
                    <TableCell>{tweet.date}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
