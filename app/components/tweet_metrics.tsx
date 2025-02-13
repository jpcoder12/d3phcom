"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/dashboard-main/ui/card";
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
} from "recharts";

interface TweetMetricProps {
  tweetMetrics: any;
}

export const TweetMetrics = ({ tweetMetrics }: TweetMetricProps) => {
  const { impressions } = tweetMetrics;

  console.log(tweetMetrics);
  return (
    <Card className='bg-card border border-card-border rounded-lg p-4'>
      <CardHeader>
        <CardTitle className='text-gray-400'>Tweet Metrics</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width='100%' height={300}>
          <AreaChart data={tweetMetrics}>
            <CartesianGrid strokeDasharray='3 3' />
            <XAxis dataKey='num_impressions' />
            <YAxis domain={[0, 10]} tickCount={10} allowDecimals={false} />

            <Tooltip contentStyle={{ backgroundColor: "rgba(0, 0, 0, 0.8)", color: "#e5e7eb" }} />

            <Area type='monotone' dataKey='post_date' stroke='#ffffffd3' fillOpacity={0.1} />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};
