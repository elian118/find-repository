import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '리포지토리 상세 조회',
  description: '선택한 리포지토리 정보를 조회합니다.',
  authors: [{ name: 'elian118', url: 'https://github.com/elian118' }],
};

const RepoLayout = ({ children }: { children: React.ReactNode }) => {
  return <div>{children}</div>;
};

export default RepoLayout;
