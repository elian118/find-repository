import { Metadata } from 'next';
import UserDetails from '@/components/modal';

export const metadata: Metadata = {
  title: '사용자',
  description: '사용자를 검색합니다.',
  authors: [{ name: 'elian118', url: 'https://github.com/elian118' }],
};

const UsersLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      {children}
      <UserDetails />
    </div>
  );
};

export default UsersLayout;
