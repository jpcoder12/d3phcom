" use client";

import React from "react";
import Tweets from "@/app/components/tweets/Tweets";

export default function TweetsPage() {
  return (
    <div className=' h-screen overflow-auto'>
      <Tweets />
    </div>
  );
}
