import './style.css';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '상세 조회',
  description: '저장소',
  authors: [{ name: 'elian118', url: 'https://github.com/elian118' }],
};

const ReposLayout = ({ children }: { children: React.ReactNode }) => {
  return <div>{children}</div>;
};

export default ReposLayout;
