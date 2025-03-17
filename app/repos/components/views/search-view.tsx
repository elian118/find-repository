'use client';

import React, { useContext, useEffect, useRef } from 'react';
import Input from '@/components/input';
import { getRepositories } from '@/app/repos/services';
import { ReposContext } from '@/app/repos/contexts/repos-context';
import { def } from '@/app/repos/consts';
import { Option } from '@/types';

type ReposContainerProps = {
  langOpts: Option[];
};

const SearchView = (props: ReposContainerProps) => {
  const { langOpts } = props;
  const { usernameState, pageState, reposState, isLastPageState, filterState } =
    useContext(ReposContext);
  const [page, setPage] = pageState;
  const [repos, setRepos] = reposState;
  const [username, setUsername] = usernameState;
  const [, setIsLastPage] = isLastPageState;
  const [, setFilter] = filterState;

  const searchInput = useRef<HTMLInputElement>(null);

  const init = () => {
    setRepos([]);
    setPage(() => 1);
    setIsLastPage(false);
    setFilter(null);
  };

  const search = async () => {
    if (username.length > 0) {
      init();
      const { data } = await getRepositories(username, page);
      setRepos(data ?? []);
      setPage((prev) => prev + 1);
    }
  };

  useEffect(() => {
    setUsername(def.username);
  }, []);

  return (
    <div className="flex items-center justify-between gap-2 w-full">
      <div className="w-1/2 flex items-center gap-2">
        <div className="w-30">리포지토리({repos?.length ?? 0})</div>
        <select
          className="w-40 select select-sm select-border"
          disabled={repos.length <= 0}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="">전체</option>
          {langOpts.map((lang, idx) => (
            <option key={idx} value={lang.code}>
              {lang.name}
            </option>
          ))}
        </select>
      </div>
      <div className="w-1/2 flex justify-end items-center gap-2">
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
        <button
          className="btn btn-sm btn-primary"
          onClick={() => {
            setUsername('');
            init();
          }}
        >
          초기화
        </button>
      </div>
    </div>
  );
};

export default SearchView;
