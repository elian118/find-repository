'use server';

import { callFetchApi } from '@/utils';
import { RepoDetail } from '@/app/[locale]/repo/types/repo-detail';

export const getRepository = async (username: string, repoName: string) => {
  const res = await callFetchApi<RepoDetail>({
    url: `https://api.github.com/repos/${username}/${repoName}`,
    method: 'GET',
  });
  return {
    ...res,
    data: {
      name: res.data?.name ?? '',
      description: res.data?.description ?? '',
      stargazers_count: res.data?.stargazers_count ?? 0,
      language: res.data?.language ?? '',
      open_issues_count: res.data?.open_issues_count ?? 0,
      html_url: res.data?.html_url ?? '',
    },
  };
};
