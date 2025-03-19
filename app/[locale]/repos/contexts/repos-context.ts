import React, { createContext } from 'react';
import { Repo } from '@/app/[locale]/repos/types/Repo';

export type ReposContextType = {
  usernameState: [username: string | null, (val: string | null) => void];
  reposState: [repos: Repo[], setRepos: (val: Repo[]) => void];
  pageState: [page: number, setPage: (val: (prev: number) => number) => void];
  isLoadingState: [isLoading: boolean, setIsLoading: (val: boolean) => void];
  isLastPageState: [isLastPage: boolean, setIsLastPage: (val: boolean) => void];
  filterState: [filter: string | null, setFilter: (filter: string | null) => void];
};

export const initRepostContext: ReposContextType = {
  usernameState: [null, () => {}],
  pageState: [1, () => {}],
  reposState: [[], () => {}],
  isLoadingState: [false, () => {}],
  isLastPageState: [false, () => {}],
  filterState: [null, () => {}],
};

export const ReposContext: React.Context<ReposContextType> =
  createContext<ReposContextType>(initRepostContext);
