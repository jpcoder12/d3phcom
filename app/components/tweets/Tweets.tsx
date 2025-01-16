"use client";

import { useState, useEffect } from "react";
import { PaginatedCardList } from "./components/PaginatedCardList";
import { Tweet } from "@/app/types";

export interface PaginatedCardListProps {
  tweets: Tweet[];
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

// This is a emock function to simulat fetching data from an API
const fetchTweets = async (
  page: number,
  pageSize: number
): Promise<{ tweets: Tweet[]; totalPages: number }> => {
  // In a real application, you would fetch data from your API here
  const mockTweets: Tweet[] = [
    {
      _id: { $oid: "677e6b1995a26b081dbf5ce6" },
      post_date: { $date: { $numberLong: "1736338200303" } },
      created_at: "Wed Jan 08 2025 12:08:04 GMT+0000",
      text: "@DrJain21 @spectatorindex Taiwan is not heavily economically dependent on China the way Canada is dependent on the US. False equivalence.",
      query_kw: "taiwan",
      tweet_id: "1876964085385826490",
      convo_id: "1876796494839152956",
      author_id: "1348963338525560832",
      __v: { $numberInt: "0" },
    },

    // Add 8 more mock tweets here to have a total of 9
    // ... (repeat the above object 8 more times with different values)
  ];

  return {
    tweets: mockTweets.slice((page - 1) * pageSize, page * pageSize),
    totalPages: Math.ceil(mockTweets.length / pageSize),
  };
};

const Tweets: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [tweets, setTweets] = useState<Tweet[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const pageSize = 9;

  const loadTweets = async (page: number) => {
    const { tweets, totalPages } = await fetchTweets(page, pageSize);
    setTweets(tweets);
    setTotalPages(totalPages);
    setCurrentPage(page);
  };

  useEffect(() => {
    loadTweets(1);
  }, []);

  const handlePageChange = (page: number) => {
    loadTweets(page);
  };

  useEffect(() => {
    // Add dark mode class to body
    document.body.classList.add("dark");
    return () => {
      document.body.classList.remove("dark");
    };
  }, []);

  return (
    <div className='min-h-screen bg-black text-white'>
      <div className='container mx-auto p-4'>
        <h1 className='text-2xl font-bold mb-4'>Tweets</h1>
        <PaginatedCardList
          tweets={tweets}
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
};

export default Tweets;
