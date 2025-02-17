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

interface Metric {
  post_date: string;
  count: number;
}

interface TweetMetricProps {
  metrics: Metric[];
  label: string;
}

export const TweetMetrics = ({ metrics, label }: TweetMetricProps) => {
  return (
    <Card className='bg-black border border-card-border rounded-lg p-4'>
      <CardHeader>
        <CardTitle className='text-gray-400'>{label}</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width='100%' height={300}>
          <AreaChart data={metrics}>
            <CartesianGrid strokeDasharray='3 3' />
            <XAxis
              dataKey='post_date'
              tickFormatter={(tick) => new Date(tick).toLocaleTimeString()}
            />
            <YAxis domain={[0, "dataMax"]} tickCount={10} allowDecimals={false} />
            <Tooltip contentStyle={{ backgroundColor: "rgba(0, 0, 0, 0.8)", color: "#e5e7eb" }} />
            <Area type='monotone' dataKey='count' stroke='#ffffffd3' fillOpacity={0.1} />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};
