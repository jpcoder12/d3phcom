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
}
