import React from 'react';

const SkeletonPic = () => {
  return (
    <div className="w-52 h-52 rounded-full border-2 overflow-hidden animate-pulse">
        <div className="h-52 w-full bg-gray-400 rounded-full">
        </div>
    </div>
  );
};

export default SkeletonPic;
