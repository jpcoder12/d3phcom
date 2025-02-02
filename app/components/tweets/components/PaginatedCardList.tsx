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
    <div className='space-y-6'>
      {isLoading ? (
        <div className='grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3  gap-4'>
          {[...Array(9)].map((_, index) => (
            <SkeletonCard key={index} />
          ))}
        </div>
      ) : (
        <div className='grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3 gap-4'>
          {newTweets.map((tweet) => (
            <TweetCard key={tweet.tweet_id} tweet={tweet} />
          ))}
        </div>
      )}

      {/* Pagination controls */}
      <div className='flex justify-between items-center mt-8'>
        <Button
          className='bg-card border border-card-border rounded-lg'
          onClick={() => onPageChange(currentPage - 1)}
          disabled={isLoading || currentPage === 1}
          variant='outline'>
          Previous
        </Button>
        <span className='text-gray-400 sm:text-xs'>
          Page {currentPage} of {totalPages}
        </span>
        <Button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={isLoading || currentPage === totalPages}
          variant='outline'
          className='bg-card border border-card-border rounded-lg'>
          Next
        </Button>
      </div>
    </div>
  );
}
