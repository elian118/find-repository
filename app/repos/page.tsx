import React from 'react';
import ModalContainer from '@/app/repos/components/ModalContainer';
import SearchContainer from '@/app/repos/components/SearchContainer';

const Repos = () => {
  return (
    <main className="flex flex-col gap-2 p-4 h-full w-full overflow-hidden">
      리포지토리 목록이 표시됩니다.
      <SearchContainer />
      <ModalContainer />
    </main>
  );
};

export default Repos;
