"use client";

import { useState } from "react";
import { Card, CardContent, CardFooter } from "../../ui/card";
import { Tweet } from "@/app/types";
import { Dialog, DialogTrigger, DialogContent } from "@/components/ui/dialog";
import Link from "next/link";

interface TweetCardProps {
  tweet: Tweet;
}

export function TweetCard({ tweet }: TweetCardProps) {
  const [open, setOpen] = useState(false);

  const truncateText = (text: string, maxLength: number) => {
    return text.length > maxLength ? `${text.slice(0, maxLength)}...` : text;
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Card
          onClick={() => setOpen(true)}
          className='xs:w-[400px] xs:h-[200px] sm:w-[500px] md:w-[500px] lg:w-[300px] xl:w-[400px] xl:h-[280px] 4xl:h-[290px] 4xl:w-[780px] flex flex-col bg-card border border-card-border hover:bg-[#34586e7d] rounded-lg cursor-pointer'>
          <CardContent className='flex-grow pt-4 text-gray-400'>
            <p className='text-base'>{truncateText(tweet.text, 100)}</p>
          </CardContent>
          <CardFooter className='text-sm text-gray-400'>
            <p>Query: {tweet.query_kw}</p>
            <p className='ml-auto'>Tweet ID: {tweet.tweet_id}</p>
          </CardFooter>
        </Card>
      </DialogTrigger>

      <DialogContent className='p-6'>
        <h2 className='text-lg font-semibold'>Tweet Details</h2>
        <p className='text-gray-300 mt-2'>{tweet.text}</p>
        <Link
          href={`https://x.com/MacRumors/status/${tweet.tweet_id}`}
          target='_blank'
          className='text-blue-500 hover:underline mt-4 block'>
          View on X (Twitter)
        </Link>
      </DialogContent>
    </Dialog>
  );
}
