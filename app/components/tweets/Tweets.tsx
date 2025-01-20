"use client";

import { useState, useEffect } from "react";
import { PaginatedCardList } from "./components/PaginatedCardList";
import { Tweet } from "@/app/types";

export interface PaginatedCardListProps {
  tweets: {
    newTweets: Tweet[];
    totalPages: number;
    currentPage: number;
  };
}

export interface TweetDataProps {
  tweets: {
    newTweets: Tweet[];
    totalPages: number;
    currentPage: number;
  };
}

const Tweets: React.FC<TweetDataProps> = ({ tweets }) => {
  // const [currentPage, setCurrentPage] = useState(1);
  const [tweetsData, setTweetsData] = useState([]);
  // const [totalPages, setTotalPages] = useState(1);
  const pageSize = 9;
  console.log(" data passed to tweets layout", tweets);
  return (
    <div className='min-h-screen bg-black text-white'>
      <div className='container mx-auto p-4'>
        <h1 className='text-2xl font-bold mb-4'>Tweets</h1>
        <PaginatedCardList tweets={tweets} />
      </div>
    </div>
  );
};

export default Tweets;
