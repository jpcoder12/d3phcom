"use client";

export function SkeletonCard() {
  return (
    <div className='xs:w-[400px] xs:h-[200px]  sm:w-[500px] md:w-[500px] lg:w-[300px] xl:w-[400px] xl:h-[280px] 4xl:h-[290px] 4xl:w-[780px] flex flex-col bg-card border border-card-border rounded-lg p-4 animate-pulse'>
      <div className='flex-grow bg-gray-700 rounded h-32 mb-4' /> {/* Placeholder for tweet text */}
      <div className='flex items-center justify-between'>
        <div className='h-4 bg-gray-600 rounded w-1/2' /> {/* Placeholder for query */}
        <div className='h-4 bg-gray-600 rounded w-1/3' /> {/* Placeholder for tweet ID */}
      </div>
    </div>
  );
}
