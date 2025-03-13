import React from 'react';
import Link from 'next/link';
import Moon from '@/public/icons/moon';
import Sun from '@/public/icons/sun';

const Header = () => {
  return (
    <div className="w-full h-8 p-2 flex justify-between gap-4">
      <div className="flex gap-2">
        <Link href="/">홈</Link>
        <Link href="/users">사용자 목록</Link>
      </div>
      <div className="flex gap-2">
        <Moon />
        <Sun />
      </div>
    </div>
  );
};

export default Header;
