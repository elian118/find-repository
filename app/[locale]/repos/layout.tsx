import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '리포지토리 목록',
  description: '특정 사용자의 리포지토리 목록을 조회합니다.',
  authors: [{ name: 'elian118', url: 'https://github.com/elian118' }],
};

const ReposLayout = ({ children }: { children: React.ReactNode }) => {
  return <div>{children}</div>;
};

export default ReposLayout;
