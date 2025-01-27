"use client";

import { Card, CardContent, CardFooter } from "../../ui/card";
import { Tweet } from "@/app/types";
import Link from "next/link";

interface TweetCardProps {
  tweet: Tweet;
}

export function TweetCard({ tweet }: TweetCardProps) {
  return (
    <Link href={`https://x.com/MacRumors/status/${tweet.tweet_id}`} passHref target='_blank'>
      <Card className='w-full h-full flex flex-col bg-card border border-card-border  rounded-lg'>
        <CardContent className='flex-grow pt-4 text-gray-400'>
          <p className='text-base'>{tweet.text}</p>
        </CardContent>
        <CardFooter className='text-sm text-gray-400'>
          <p>Query: {tweet.query_kw}</p>
          <p className='ml-auto'>Tweet ID: {tweet.tweet_id}</p>
        </CardFooter>
      </Card>
    </Link>
  );
}
