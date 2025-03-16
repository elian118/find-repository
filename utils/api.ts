import { GitRequest } from '@/types';

export const callGithubApi = async (req: GitRequest) => {
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
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      throw new Error(`깃허브 API 오류: ${response.statusText}`);
    }

    return await response.json();
  } catch (err) {
    console.error(err);
    return err;
  }
};
