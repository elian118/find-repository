import React from 'react';

const LoadingView = () => {
  return (
    <div className="w-full flex flex-col items-center justify-center bg-base-100">
      <span className="loading loading-dots loading-lg text-primary"></span>
    </div>
  );
};

export default LoadingView;
