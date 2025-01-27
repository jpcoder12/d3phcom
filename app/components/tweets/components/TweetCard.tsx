"use client";

import { Card, CardContent, CardFooter } from "../../ui/card";
import { Tweet } from "@/app/types";
import Link from "next/link";

interface TweetCardProps {
  tweet: Tweet;
}

export function TweetCard({ tweet }: TweetCardProps) {
  const truncateText = (text: string, maxLength: number) => {
    return text.length > maxLength ? `${text.slice(0, maxLength)}...` : text;
  };
  return (
    <Link href={`https://x.com/MacRumors/status/${tweet.tweet_id}`} passHref target='_blank'>
      <Card className=' xs:w-[400px] xs:h-[200px]  sm:w-[500px] md:w-[500px] lg:w-[300px] xl:w-[400px] xl:h-[280px] 4xl:h-[290px] 4xl:w-[780px] flex flex-col bg-card border border-card-border hover:bg-black rounded-lg'>
        <CardContent className='flex-grow pt-4 text-gray-400'>
          <p className='text-base'>{truncateText(tweet.text, 100)}</p>
        </CardContent>
        <CardFooter className='text-sm text-gray-400'>
          <p>Query: {tweet.query_kw}</p>
          <p className='ml-auto'>Tweet ID: {tweet.tweet_id}</p>
        </CardFooter>
      </Card>
    </Link>
  );
}
