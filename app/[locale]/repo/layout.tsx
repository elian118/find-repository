import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '저장소',
  description: '사용자를 검색합니다.',
  authors: [{ name: 'elian118', url: 'https://github.com/elian118' }],
};

const RepoLayout = ({ children }: { children: React.ReactNode }) => {
  return <div>{children}</div>;
};

export default RepoLayout;
