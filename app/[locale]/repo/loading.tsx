import React from 'react';

const Loading = () => {
  return (
    <div className="p-4 flex flex-col gap-2 mainContainer">
      <div className="flex items-center justify-between gap-2 w-full">
        <div className="w-1/2 flex items-center gap-2">리포지토리 정보</div>
      </div>
      <div className="flex flex-col p-2 gap-2">
        <div className="flex items-center gap-2">
          <div className="font-bold w-24">이름</div>
          <div className="skeleton w-40 h-6" />
        </div>
        <div className="flex items-center gap-2">
          <div className="font-bold w-24">설명</div>
          <div className="skeleton w-40 h-6" />
        </div>
        <div className="flex items-center gap-2">
          <div className="font-bold w-24">별점 수</div>
          <div className="skeleton w-6 h-6" />
        </div>
        <div className="flex items-center gap-2">
          <div className="font-bold w-24">주 언어</div>
          <div className="skeleton w-32 h-6" />
        </div>
        <div className="flex items-center gap-2">
          <div className="font-bold w-24">이슈 수</div>
          <div className="skeleton w-6 h-6" />
        </div>
        <div className="flex items-center gap-2">
          <div className="font-bold w-24">url</div>
          <div className="skeleton w-80 h-6" />
        </div>
      </div>
    </div>
  );
};

export default Loading;
