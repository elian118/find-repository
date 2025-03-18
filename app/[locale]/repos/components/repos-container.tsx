'use client';

import React, { useState } from 'react';
import SearchView from '@/app/[locale]/repos/components/views/search-view';
import ListView from '@/app/[locale]/repos/components/views/list-view';
import { Repo } from '@/app/[locale]/repos/types/Repo';
import {
  ReposContext,
  ReposContextType,
} from '@/app/[locale]/repos/contexts/repos-context';
import { Option } from '@/types';

type ReposContainerProps = {
  langOpts: Option[];
};

const ReposContainer = (props: ReposContainerProps) => {
  const [username, setUsername] = useState<string>('');
  const [repos, setRepos] = useState<Repo[]>([]);
  const [page, setPage] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isLastPage, setIsLastPage] = useState<boolean>(false);
  const [filter, setFilter] = useState<string | null>(null);

  const value: ReposContextType = {
    usernameState: [username, setUsername],
    pageState: [page, setPage],
    reposState: [repos, setRepos],
    isLoadingState: [isLoading, setIsLoading],
    isLastPageState: [isLastPage, setIsLastPage],
    filterState: [filter, setFilter],
  };

  return (
    <ReposContext.Provider value={value}>
      <div className="flex flex-col gap-2">
        <SearchView langOpts={props.langOpts} />
        <ListView />
      </div>
    </ReposContext.Provider>
  );
};

export default ReposContainer;
