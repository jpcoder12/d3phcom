export interface DataProps {
  gauge: number;
  mode: string;
  keywords: {
    _id?: string;
    kw_string: string;
  }[];
  isLoading: boolean;
  hvals: {
    _id?: string;
    final_gauge: number;
    post_date: string;
  }[];
  tweets: {
    newTweets: Tweet[];
    totalPages: number;
    currentPage: number;
  };
}

export interface Tweet {
  _id: {
    $oid: string;
  };
  post_date: {
    $date: {
      $numberLong: string;
    };
  };
  created_at: string;
  text: string;
  query_kw: string;
  tweet_id: string;
  convo_id: string;
  author_id: string;
  __v: {
    $numberInt: string;
  };
}

export interface PaginatedCardListProps {
  tweets: Tweet[];
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}
