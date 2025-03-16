'use client';

import React, { useContext } from 'react';
import Link from 'next/link';
import Moon from '@/public/icons/moon';
import Sun from '@/public/icons/sun';
import { usePathname } from 'next/navigation';
import IconBtn from '@/components/IconBtn';
import { GlobalContext } from '@/global-context';

const Header = () => {
  const { isDarkState } = useContext(GlobalContext);
  const [isDark, setIsDark] = isDarkState;
  const pathname = usePathname();
  const menus = [
    { name: '목록', path: '/repos' },
    { name: '상세조회', path: '/repo' },
  ];

  const isCurrentPage = (path) => {
    return pathname === path ? 'font-bold' : '';
  };

  const changeTheme = (theme: boolean) => setIsDark(theme);

  return (
    <div className="sticky top-0 left-0 z-10 w-full h-12 p-2 flex justify-between items-center gap-4 bg-info">
      <div className="flex  gap-2">
        {menus.map((menu, idx) => (
          <Link key={idx} href={menu.path}>
            <span className={isCurrentPage(menu.path)}>{menu.name}</span>
          </Link>
        ))}
      </div>
      <div className="flex gap-2">
        {isDark ? (
          <IconBtn icon={<Moon />} onClick={() => changeTheme(false)} />
        ) : (
          <IconBtn icon={<Sun />} onClick={() => changeTheme(true)} />
        )}
      </div>
    </div>
  );
};

export default Header;
