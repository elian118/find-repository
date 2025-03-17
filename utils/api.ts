import { GitRequest } from '@/types';
import { ApiResponse } from '@/types/ApiResponse';

export const callFetchApi = async <T>(req: GitRequest): Promise<ApiResponse<T>> => {
  const { url, method, body } = req;
  const token = process.env.NEXT_PUBLIC_GITHUB_TOKEN;

  if (!token) {
    throw new Error('깃허브 토큰을 찾을 수 없습니다.');
  }

  try {
    const response = await fetch(url, {
      method,
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_GITHUB_TOKEN}`,
        // 'Content-Type': 'application/json',
        Accept: 'application/vnd.github+json',
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const errorData = await response.json();
      return { error: errorData.error };
    }

    const data = await response.json();
    return { data };
  } catch (err: any) {
    console.error(err);
    return { error: { message: err.message } };
  }
};
