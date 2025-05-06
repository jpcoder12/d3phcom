"use client";

import { Button } from "../../ui/button";
import { SkeletonCard } from "../../ui/skeleton"; // Import the SkeletonCard
import { TweetCard } from "./TweetCard"; // Import the TweetCard component
import { Tweet } from "@/app/types";

export interface PaginatedCardListProps {
  tweets: {
    newTweets: Tweet[];
    totalPages: number;
    currentPage: number;
  };
  isLoading: boolean;
  onPageChange: (page: number) => void;
}

export function PaginatedCardList({ tweets, onPageChange, isLoading }: PaginatedCardListProps) {
  const { newTweets = [], currentPage = 1, totalPages = 1 } = tweets || {};

  return (
    <div className=''>
      {isLoading ? (
        <div className='grid grid-cols-1  '>
          {[...Array(9)].map((_, index) => (
            <SkeletonCard key={index} />
          ))}
        </div>
      ) : (
        <div className='grid grid-cols-1'>
          {newTweets.map((tweet) => (
            <TweetCard key={tweet.tweet_id} tweet={tweet} />
          ))}
        </div>
      )}

      <div className='flex justify-between items-center mt-8 fixed  bottom-[40px] xs:right-[28%] lg:right-[30%] xl:right-[40%] bg-black/80 gap-4 py-2 rounded-2xl'>
        <Button
          className='bg-black/80 border-none text-white rounded-lg'
          onClick={() => onPageChange(currentPage - 1)}
          disabled={isLoading || currentPage === 1}
          variant='outline'>
          Previous
        </Button>
        <span className='text-white '>
          Page {currentPage} of {totalPages}
        </span>
        <Button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={isLoading || currentPage === totalPages}
          variant='outline'
          className='bg-black/80 border border-none text-white rounded-lg'>
          Next
        </Button>
      </div>
    </div>
  );
}
