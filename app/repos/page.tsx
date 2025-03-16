import React from 'react';
import UsersContainer from '@/app/repos/components/UsersContainer';
import SearchContainer from '@/app/repos/components/SearchContainer';

const Repos = () => {
  return (
    <main className="flex p-4 h-full w-full overflow-hidden">
      <SearchContainer />
      리포지토리 목록이 표시됩니다.
      <UsersContainer />
    </main>
  );
};

export default Repos;
