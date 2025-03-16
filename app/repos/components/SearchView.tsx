'use client';

import React, { useContext, useRef } from 'react';
import Input from '@/components/input';
import { getRepositories } from '@/app/repos/services';
import { ReposContext } from '@/app/repos/ReposContext';

const SearchView = () => {
  const { usernameState, pageState, reposState, isLastPageState } =
    useContext(ReposContext);
  const [page, setPage] = pageState;
  const [repos, setRepos] = reposState;
  const [username, setUsername] = usernameState;
  const [, setIsLastPage] = isLastPageState;

  const init = () => {
    setUsername('');
    setRepos([]);
    setPage(1);
    setIsLastPage(false);
  };

  const search = async () => {
    if (username.length > 0) {
      const res = await getRepositories(username, page);
      setRepos(res);
      setPage(page + 1);
    } else setRepos([]);
  };
  const searchInput = useRef<HTMLInputElement>(null);

  return (
    <div className="flex items-center justify-between gap-2 w-full">
      <p>리포지토리({repos.length})</p>
      <div className="flex items-center gap-2">
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
        <button className="btn btn-sm btn-primary" onClick={search}>
          검색
        </button>
        <button className="btn btn-sm btn-primary" onClick={init}>
          초기화
        </button>
      </div>
    </div>
  );
};

export default SearchView;
