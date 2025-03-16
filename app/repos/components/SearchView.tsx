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
  // const [langOpts, setLangOpts] = langOptsState;
  const [username, setUsername] = usernameState;
  const [, setIsLastPage] = isLastPageState;

  const searchInput = useRef<HTMLInputElement>(null);

  const init = () => {
    setUsername('');
    setRepos([]);
    setPage(1);
    setIsLastPage(false);
    // setLangOpts([]);
  };

  const search = async () => {
    if (username.length > 0) {
      const res = await getRepositories(username, page);
      setRepos(res);
      setPage(page + 1);
      // setLangOpts([...new Set(res.map((e) => e.language))]);
    } else setRepos([]);
  };

  // const filter = (lang) => {
  //   !!lang ? setRepos(repos.filter((e) => e.language === lang)) : search();
  // };

  return (
    <div className="flex items-center justify-between gap-2 w-full">
      <div className="w-1/2 flex items-center gap-2">
        <div className="w-30">리포지토리({repos.length})</div>
        {/*<select*/}
        {/*  className="w-40 select select-sm select-border"*/}
        {/*  disabled={langOpts.length <= 0}*/}
        {/*  onChange={(e) => filter(e.target.value)}*/}
        {/*>*/}
        {/*  <option value="">전체</option>*/}
        {/*  {langOpts.map((lang, idx) => (*/}
        {/*    <option key={idx} value={lang}>*/}
        {/*      {lang}*/}
        {/*    </option>*/}
        {/*  ))}*/}
        {/*</select>*/}
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
        <button className="btn btn-sm btn-primary" onClick={init}>
          초기화
        </button>
      </div>
    </div>
  );
};

export default SearchView;
