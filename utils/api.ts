'use server';

import { GitRequest } from '@/types';
import { ApiResponse } from '@/types/ApiResponse';
import axios, { AxiosRequestConfig } from 'axios';

export const callAxiosApi = async <T>(req: GitRequest): Promise<ApiResponse<T>> => {
  const { url, method, body } = req;
  const token = process.env.NEXT_PUBLIC_GITHUB_TOKEN;

  if (!token) {
    throw new Error('깃허브 토큰을 찾을 수 없습니다.');
  }

  try {
    const config: AxiosRequestConfig = {
      url,
      method,
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_GITHUB_TOKEN}`,
        Accept: 'application/vnd.github+json',
      },
      data: body,
    };

    const response = await axios(config);

    if (response.status < 200 || response.status >= 300) {
      console.error('응답이 없습니다.');
      throw new Error('응답이 없습니다.');
    }
    // error test
    // console.error('응답이 없습니다.');
    // throw new Error('응답이 없습니다.');

    return { data: response.data };
  } catch (err: any) {
    console.error(err.message || err);
    throw new Error(err.message || err);
  }
};
