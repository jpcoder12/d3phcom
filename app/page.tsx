import { Dashboard } from "./components/dashboard-main/dashboard";
import { TweetDashboard } from "./components/tweet-dashboard/tweet-dashboard";

export default function Home() {
  return (
    <>
      <Dashboard /> <TweetDashboard />
    </>
  );
}
