"use client";

import { socket } from "@/app/socket";
import { useState, useEffect } from "react";
import { PaginatedCardList } from "./components/PaginatedCardList";
import { useWebSocket } from "@/app/context/WebSocketContext";

const Tweets: React.FC = () => {
  const [tweets, setTweets] = useState({
    newTweets: [],
    totalPages: 1,
    currentPage: 1,
  });
  const [currentPageIndex, setCurrentPageIndex] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const { gauge } = useWebSocket();

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

    fetchTweets(currentPageIndex);

    return () => {
      socket.off("tweets");
    };
  }, [currentPageIndex]);

  const handlePageChange = (page: number) => {
    setCurrentPageIndex(page);
    fetchTweets(page);
  };

  return (
    <div className='  text-white m:mt-8 xxs:pt-10 xl:pt-20 bg-black/10 rounded-2xl mx-6'>
      <div className='px-8 bg-black/70 rounded-2xl '>
        <div className='flex justify-between py-6 px-8 border border-x-cardBorder border-y-0'>
          <div className=''>
            <div className='flex flex-row gap-4 '>
              <img src='logo.png' alt='twitter_logo' />
              <h3 className=' content-center'>X Posts</h3>
              <div className='content-center text-gray-400 text-xs'>
                <span>latest posts</span>
                <span className='dot'>5 mins ago</span>
              </div>
            </div>
            <p className='pt-4 text-gray-400 text-sm'>
              X posts picked up by our system that feature relevent keywords
            </p>
          </div>
          <div className='flex flex-col text-center gap-0'>
            <span>Current</span>
            <span>{gauge}</span>
            <span>Danger level</span>
          </div>
        </div>
        <PaginatedCardList tweets={tweets} onPageChange={handlePageChange} isLoading={isLoading} />
      </div>
    </div>
  );
};

export default Tweets;
