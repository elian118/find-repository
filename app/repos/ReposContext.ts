import React, { createContext } from 'react';
import { Repo } from '@/app/repos/types/Repo';

export type ReposContextType = {
  usernameState: [username: string, (val: string) => void];
  reposState: [repos: Repo[], setRepos: (val: Repo[]) => void];
  // langOptsState: [langOpts: string[], setLangOpts: (val: string[]) => void];
  pageState: [page: number, setPage: (val: number) => void];
  isLoadingState: [isLoading: boolean, setIsLoading: (val: boolean) => void];
  isLastPageState: [isLastPage: boolean, setIsLastPage: (val: boolean) => void];
};

export const initRepostContext: ReposContextType = {
  usernameState: ['', () => {}],
  pageState: [1, () => {}],
  reposState: [[], () => {}],
  // langOptsState: [[], () => {}],
  isLoadingState: [false, () => {}],
  isLastPageState: [false, () => {}],
};

export const ReposContext: React.Context<ReposContextType> =
  createContext<ReposContextType>(initRepostContext);
