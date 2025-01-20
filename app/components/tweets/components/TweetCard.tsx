import { Card, CardContent, CardFooter } from "../../ui/card";
import { Tweet } from "@/app/types";

interface TweetCardProps {
  tweet: Tweet;
}

export function TweetCard({ tweet }: TweetCardProps) {
  // const date = new Date(parseInt(tweet.post_date.$date.$numberLong));

  return (
    <Card className='w-full h-full flex flex-col'>
      <CardContent className='flex-grow pt-4'>
        {/* <p className='text-sm text-gray-500 mb-2'>{date.toLocaleString()}</p> */}
        <p className='text-base'>{tweet.text}</p>
      </CardContent>
      <CardFooter className='text-sm text-gray-400'>
        <p>Query: {tweet.query_kw}</p>
        <p className='ml-auto'>Tweet ID: {tweet.tweet_id}</p>
      </CardFooter>
    </Card>
  );
}
