'use server';

import { callFetchApi } from '@/utils';
import { Repo } from '@/app/repos/types/Repo';
import { def } from '@/app/repos/consts';
import { Option } from '@/types';
import { ApiResponse } from '@/types/ApiResponse';

export const getRepositories = async (
  username: string,
  page?: number,
  perPage?: number,
): Promise<ApiResponse<Repo[]>> => {
  // delay test
  // await new Promise((r) => setTimeout(r, 3000));
  const res = await callFetchApi<Repo[]>({
    url: `https://api.github.com/users/${username}/repos?page=${page ?? 1}&per_page=${perPage ?? def.perPage}`,
    method: 'GET',
  });

  return {
    ...res,
    data: res.data?.map((e) => ({
      id: e.id,
      name: e.name,
      description: e.description,
      stargazers_count: e.stargazers_count,
      updated_at: e.updated_at,
      language: e.language,
    })) as Repo[],
  };
};

export const getLangOpts = async (username: string): Promise<ApiResponse<Option[]>> => {
  // delay test
  await new Promise((r) => setTimeout(r, 1400));
  const res = await callFetchApi<Repo[]>({
    url: `https://api.github.com/users/${username}/repos?per_page=${def.maxPerPage}`,
    method: 'GET',
  });

  return {
    ...res,
    data:
      ([...new Set(res.data?.map((e) => e.language))]
        .sort((a, b) => (a > b ? 1 : -1))
        .filter((e) => e !== null)
        .map((key) => ({ code: key, name: !!key ? key : '전체' })) as Option[]) ?? [],
  };
};
