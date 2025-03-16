'use client';

import React, { useState } from 'react';
import SearchView from '@/app/repos/components/SearchView';
import ListView from '@/app/repos/components/ListView';
import { Repo } from '@/app/repos/types/Repo';
import { ReposContext, ReposContextType } from '@/app/repos/ReposContext';

const ReposView = () => {
  const [username, setUsername] = useState<string>('');
  const [repos, setRepos] = useState<Repo[]>([]);
  // const [langOpts, setLangOpts] = useState<string[]>([]);
  const [page, setPage] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isLastPage, setIsLastPage] = useState<boolean>(false);

  const value: ReposContextType = {
    usernameState: [username, setUsername],
    pageState: [page, setPage],
    reposState: [repos, setRepos],
    // langOptsState: [langOpts, setLangOpts],
    isLoadingState: [isLoading, setIsLoading],
    isLastPageState: [isLastPage, setIsLastPage],
  };

  return (
    <ReposContext.Provider value={value}>
      <div className="flex flex-col gap-2">
        <SearchView />
        <ListView />
      </div>
    </ReposContext.Provider>
  );
};

export default ReposView;
