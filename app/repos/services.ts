'use server';

import { callGithubApi } from '@/utils';

export const getRepositories = async (username: string) => {
  return await callGithubApi({
    url: `https://api.github.com/users/${username}/repos`,
    method: 'GET',
  });
};
