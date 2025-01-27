"use client";
import { socket } from "@/app/socket";
import { useState, useEffect } from "react";
import { PaginatedCardList } from "./components/PaginatedCardList";
import { SkeletonCard } from "../ui/skeleton";

const Tweets: React.FC = () => {
  const [tweets, setTweets] = useState({
    newTweets: [],
    totalPages: 1,
    currentPage: 1,
  });
  const [currentPageIndex, setCurrentPageIndex] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  // Fetch tweets for the current page
  const fetchTweets = (page: number) => {
    setIsLoading(true);
    socket.emit("getTweets", { page, limit: 9 });
  };

  // Listen for tweets from the server
  useEffect(() => {
    socket.on("tweets", (data) => {
      setTweets(data);
      setCurrentPageIndex(data.currentPage);
      setIsLoading(false);
    });

    // Fetch initial tweets
    fetchTweets(currentPageIndex);

    // Cleanup listener on unmount
    return () => {
      socket.off("tweets");
    };
  }, []);

  const handlePageChange = (page: number) => {
    setCurrentPageIndex(page);
    fetchTweets(page);
  };

  if (isLoading) {
    return (
      <div className='min-h-screen bg-black text-white flex items-center justify-center'>
        <SkeletonCard />
      </div>
    );
  }

  return (
    <div className='bg-black h-full flex align-middle text-gray-400 overflow-hidden'>
      <div className='p-4 flex items-center'>
        <PaginatedCardList tweets={tweets} onPageChange={handlePageChange} isLoading={isLoading} />
      </div>
    </div>
  );
};

export default Tweets;
