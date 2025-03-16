'use server';

import { callFetchApi } from '@/utils';

export const getRepository = async (username: string, repoId: number) => {
  return await callFetchApi({
    url: `https://api.github.com/repos/${username}/${repoId}`,
    method: 'GET',
  });
};
