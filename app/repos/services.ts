'use server';

import { callFetchApi } from '@/utils';
import { Repo } from '@/app/repos/types/Repo';

export const getRepositories = async (
  username: string,
  page: number,
  perPage?: number,
): Promise<Repo[]> => {
  // let allRepos: Repo[] = [];
  // let currentPage = page;

  const res = await callFetchApi({
    url: `https://api.github.com/users/${username}/repos?page=${page ?? 1}&per_page=${perPage ?? 10}`,
    method: 'GET',
  });

  return res.map((e) => ({
    id: e.id,
    name: e.name,
    description: e.description,
    stargazers_count: e.stargazers_count,
    updated_at: e.updated_at,
  }));
};
