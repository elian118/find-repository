'use server';

import { callGithubApi } from '@/utils';

export const getRepository = async (username: string, repoId: number) => {
  return await callGithubApi({
    url: `https://api.github.com/repos/${username}/${repoId}`,
    method: 'GET',
  });
};
