"use client";

export function SkeletonCard() {
  return (
    <div className=' flex flex-col bg-card border border-card-border rounded-lg p-4 animate-pulse'>
      <div className='flex-grow bg-black/20 rounded h-32 mb-4' /> {/* Placeholder for tweet text */}
      <div className='flex items-center justify-between'>
        <div className='h-4 bg-black/20  rounded w-1/2' /> {/* Placeholder for query */}
        <div className='h-4 bg-black/20  rounded w-1/3' /> {/* Placeholder for tweet ID */}
      </div>
    </div>
  );
}
