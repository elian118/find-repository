import React from 'react';
import UsersContainer from '@/app/users/components/UsersContainer';

const Page = () => {
  return (
    <main className="flex p-4 h-full w-full overflow-hidden">
      사용자 목록이 표시됩니다.
      <UsersContainer />
    </main>
  );
};

export default Page;
