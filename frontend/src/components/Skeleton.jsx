import React from 'react';

const Skeleton = () => {
  return (
    <div className="flex flex-col gap-4 w-full h-full animate-pulse">
      {/* Header Skeleton */}
      <div className="flex items-center h-20 px-4 w-full bg-gray-200 rounded-md">
        <div className="w-12 h-12 rounded-full bg-gray-300"></div>
        <div className="ml-4 flex-grow">
          <div className="h-4 w-1/2 bg-gray-300 rounded-md"></div>
          <div className="h-3 w-1/3 bg-gray-300 rounded-md mt-2"></div>
        </div>
        <div className="flex gap-4 ml-auto">
          <div className="w-6 h-6 bg-gray-300 rounded-md"></div>
          <div className="w-6 h-6 bg-gray-300 rounded-md"></div>
          <div className="w-6 h-6 bg-gray-300 rounded-md"></div>
        </div>
      </div>

      {/* Lines Skeleton */}
      <div className="h-4 w-28 bg-gray-300 rounded-md"></div>
      <div className="h-4 w-full bg-gray-300 rounded-md"></div>
      <div className="h-4 w-full bg-gray-300 rounded-md"></div>

      {/* Message Input Skeleton (Positioned at bottom) */}
      <div className="flex items-center h-16 px-4 w-full bg-gray-200 rounded-md mt-auto">
        <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
        <div className="flex-grow h-10 ml-4 bg-gray-300 rounded-md"></div>
        <div className="w-10 h-10 bg-gray-300 rounded-full ml-4"></div>
      </div>
    </div>
  );
};

export default Skeleton;
