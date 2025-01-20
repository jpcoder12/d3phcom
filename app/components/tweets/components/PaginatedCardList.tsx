import { Button } from "../../ui/button";
import { TweetCard } from "./TweetCard";
import { Tweet } from "@/app/types";

export interface PaginatedCardListProps {
  tweets: {
    newTweets: Tweet[];
    totalPages: number;
    currentPage: number;
  };
}

export function PaginatedCardList({ tweets }: PaginatedCardListProps) {
  const { newTweets = [], currentPage = 1, totalPages = 1 } = tweets || {};
  return (
    <div className='space-y-6'>
      <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
        {newTweets.slice(0, 9).map((tweet) => (
          <TweetCard key={tweet._id.$oid} tweet={tweet} />
        ))}
      </div>
      <div className='flex justify-between items-center mt-4'>
        <Button
          // onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          variant='outline'>
          Previous
        </Button>
        <span className='text-gray-400'>
          Page {currentPage} of {totalPages}
        </span>
        <Button
          // onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          variant='outline'>
          Next
        </Button>
      </div>
    </div>
  );
}
