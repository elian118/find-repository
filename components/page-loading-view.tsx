import React from 'react';

const PageLoadingView = () => {
  return (
    <div className="w-screen h-screen flex flex-col items-center justify-center bg-base-100">
      <span className="loading loading-dots loading-lg text-primary"></span>
    </div>
  );
};

export default PageLoadingView;
