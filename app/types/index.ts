export interface DataProps {
  hvals: number;
  mode: string;
  keywords: {
    _id?: string;
    kw_string: string;
  }[];
  isLoading: boolean;
}
