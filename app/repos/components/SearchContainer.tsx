'use client';

import React, { useRef, useState } from 'react';
import Input from '@/components/input';
import { getRepositories } from '@/app/repos/services';

const SearchContainer = () => {
  const [username, setUsername] = useState<string>('');
  const search = async () => {
    const res = await getRepositories(username);
    console.log(res);
  };
  const searchInput = useRef(null);

  return (
    <div className="flex items-center gap-2 w-full">
      <label htmlFor="searchInput">검색</label>
      <Input
        ref={searchInput}
        type="text"
        name="username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        onKeyUp={(e: React.KeyboardEvent<HTMLInputElement>) =>
          e.keyCode === 13 && search()
        }
        placeholder="사용자 아이디"
      />
    </div>
  );
};

export default SearchContainer;
