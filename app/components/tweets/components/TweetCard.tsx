"use client";

import { useState, useEffect } from "react";
import { socket } from "@/app/socket";
import { Card, CardContent, CardFooter } from "../../ui/card";
import { Button } from "@/components/ui/button";
import { Tweet, TweetMetricProps } from "@/app/types";
import { Dialog, DialogTrigger, DialogContent } from "@/components/ui/dialog";
import { TweetMetrics } from "../../tweet_metrics";
// types
import Link from "next/link";

interface TweetCardProps {
  tweet: Tweet;
}

export function TweetCard({ tweet }: TweetCardProps) {
  const [open, setOpen] = useState(false);
  const [tweetMetrics, setTweetMetrics] = useState<TweetMetricProps | null>(null);
  const [selectedTab, setSelectedTab] = useState<
    "impressions" | "likes" | "retweets" | "replies" | "tweetText"
  >("tweetText");

  const impressions = tweetMetrics?.impressions || [];
  const likes = tweetMetrics?.likes || [];
  const retweets = tweetMetrics?.retweets || [];
  const replies = tweetMetrics?.replies || [];

  const truncateText = (text: string, maxLength: number) => {
    return text.length > maxLength ? `${text.slice(0, maxLength)}...` : text;
  };

  function handleTweetMetrics(tweet_id: string) {
    setOpen(true);
    socket.emit("tweet_metrics", tweet_id);
    return;
  }

  useEffect(() => {
    socket.on("tweet_metrics", (data) => {
      setTweetMetrics(data);
    });
  }, []);

  const renderGraph = () => {
    switch (selectedTab) {
      case "impressions":
        return impressions.some((i) => i.num_impressions > 0) ? (
          <TweetMetrics
            metrics={impressions.map((i) => ({ post_date: i.post_date, count: i.num_impressions }))}
            label='Impressions'
          />
        ) : null;
      case "likes":
        return likes.some((l) => l.num_likes > 0) ? (
          <TweetMetrics
            metrics={likes.map((l) => ({ post_date: l.post_date, count: l.num_likes }))}
            label='Likes'
          />
        ) : null;
      case "retweets":
        return retweets.some((r) => r.num_retweets > 0) ? (
          <TweetMetrics
            metrics={retweets.map((r) => ({ post_date: r.post_date, count: r.num_retweets }))}
            label='Retweets'
          />
        ) : null;
      case "replies":
        return replies.some((rep) => rep.num_replies > 0) ? (
          <TweetMetrics
            metrics={replies.map((rep) => ({ post_date: rep.post_date, count: rep.num_replies }))}
            label='Replies'
          />
        ) : null;
      case "tweetText":
        return (
          <div className='flex justify-center mt-6 mb-12'>
            <div className=' text-sm mt-2 px-4 pb-2'>
              <p>{tweet.text}</p>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  const hasImpressionsData = impressions.some((i) => i.num_impressions > 0);
  const hasLikesData = likes.some((l) => l.num_likes > 0);
  const hasRetweetsData = retweets.some((r) => r.num_retweets > 0);
  const hasRepliesData = replies.some((rep) => rep.num_replies > 0);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Card
          onClick={() => handleTweetMetrics(tweet.tweet_id)}
          className='xs:w-[400px] xs:h-[200px] sm:w-[500px] md:w-[500px] lslate-800px] xl:w-[400px] xl:h-[280px] 4xl:h-[290px] 4xl:w-[780px] flex flex-col bg-card border border-card-border hover:bg-[#34586e7d] rounded-lg cursor-pointer'>
          <CardContent className='flex-grow pt-4 text-gray-400 text-sm'>
            <p className='text-base'>{truncateText(tweet.text, 100)}</p>
          </CardContent>
          <CardFooter className='text-sm text-gray-400 '>
            <p>Query: {tweet.query_kw}</p>
            <p className='ml-auto'>Tweet ID: {tweet.tweet_id}</p>
          </CardFooter>
        </Card>
      </DialogTrigger>

      <DialogContent className='p-6'>
        <div className='flex justify-center flex-col'>
          <header className='mx-auto mb-6 mt-4'>Tweet Metrics</header>
          {/* <Link
              href={`https://x.com/MacRumors/status/${tweet.tweet_id}`}
              target='_blank'
              className='hover:text-white text-gray-400 text-sm pl-4 block py-4'>
              <svg
                role='img'
                viewBox='0 0 1000 4'
                xmlns='http://www.w3.org/2000/svg'
                style={{ fill: "#34586e7d" }} // Set the fill color to white
              >
                <title>View on X</title>
                <path d='M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z' />
              </svg>
            </Link> */}

          <div className='flex justify-center mb-6 gap-2'>
            <Button
              className={`text-sm ${
                selectedTab === "tweetText" ? "text-white" : "text-gray-400 text-sm"
              }`}
              onClick={() => setSelectedTab("tweetText")}>
              Tweet
            </Button>

            {hasImpressionsData ? (
              <Button
                className={`text-sm ${
                  selectedTab === "impressions" ? "text-white" : "text-gray-400 text-sm"
                }`}
                onClick={() => setSelectedTab("impressions")}>
                Impressions
              </Button>
            ) : (
              <Button className='text-slate-800 text-sm' disabled={true}>
                Impressions
              </Button>
            )}

            {hasLikesData ? (
              <Button
                className={`text-sm ${
                  selectedTab === "likes" ? "text-white" : "text-gray-400 text-sm"
                }`}
                onClick={() => setSelectedTab("likes")}>
                Likes
              </Button>
            ) : (
              <Button className='text-slate-800 text-sm' disabled={true}>
                Likes
              </Button>
            )}

            {hasRetweetsData ? (
              <Button
                className={`text-sm ${
                  selectedTab === "retweets" ? "text-white" : "text-gray-400 text-sm"
                }`}
                onClick={() => setSelectedTab("retweets")}>
                Retweets
              </Button>
            ) : (
              <Button className='text-slate-800 text-sm' disabled={true}>
                Retweets
              </Button>
            )}
            {hasRepliesData ? (
              <Button
                className={`text-sm ${
                  selectedTab === "replies" ? "text-white" : "text-gray-400 text-sm"
                }`}
                onClick={() => setSelectedTab("replies")}>
                Replies
              </Button>
            ) : (
              <Button className='text-slate-800 text-sm' disabled={true}>
                Replies
              </Button>
            )}
          </div>
          {renderGraph()}
        </div>
      </DialogContent>
    </Dialog>
  );
}
