"use client";
import { socket } from "@/app/socket";
import { useState, useEffect } from "react";
import { PaginatedCardList } from "./components/PaginatedCardList";
import useSocket from "@/app/hooks/useSocket";

const Tweets: React.FC = () => {
  const { tweets, fetchPage } = useSocket();
  const [currentPageIndex, setCurrentPageIndex] = useState(1);
  const { newTweets, totalPages, currentPage } = tweets;
  // const handlePageChange = (page: number) => {
  //   setCurrentPageIndex(page);
  //   fetchPage(page);
  // };

  const handlePageChange = () => {
    socket.emit("getTweets", { page: currentPageIndex, limit: 9 });
  };

  console.log("got pages", handlePageChange());

  if (!tweets || tweets.newTweets.length === 0) {
    return (
      <div className='min-h-screen bg-black text-white flex items-center justify-center'>
        <p>Loading tweets...</p>
      </div>
    );
  }

  return (
    <div className='bg-black text-gray-400'>
      <div className='p-4'>
        <h1 className='text-2xl font-bold mb-4'>Tweets</h1>
        <PaginatedCardList
          tweets={{
            newTweets: newTweets,
            totalPages: totalPages,
            currentPage: currentPage,
          }}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
};

export default Tweets;
