'use client';

import React, { useState } from 'react';
import Input from '@/components/input';
import { getRepositories } from '@/app/repos/services';

const SearchContainer = () => {
  const [username, setUsername] = useState<string>('');
  const search = async () => {
    const res = await getRepositories(username);
    console.log(res);
  };

  return (
    <div>
      <Input
        type="text"
        name="username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        onKeyUp={(e: React.KeyboardEvent<HTMLInputElement>) =>
          e.keyCode === 13 && search()
        }
      />
    </div>
  );
};

export default SearchContainer;
