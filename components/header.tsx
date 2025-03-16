'use client';

import React from 'react';
import Link from 'next/link';
import Moon from '@/public/icons/moon';
import Sun from '@/public/icons/sun';
import { usePathname } from 'next/navigation';

const Header = () => {
  const pathname = usePathname();
  const menus = [
    { name: '리포지토리 목록', path: '/repos' },
    { name: '상세조회', path: '/repo' },
  ];

  const isCurrentPage = (path) => {
    return pathname.includes(path) ? 'font-bold' : '';
  };

  return (
    <div className="w-full h-8 p-2 flex justify-between gap-4">
      <div className="flex gap-2">
        {menus.map((menu, idx) => (
          <Link key={idx} href={menu.path}>
            <span className={isCurrentPage(menu.path)}>{menu.name}</span>
          </Link>
        ))}
      </div>
      <div className="flex gap-2">
        <Moon />
        <Sun />
      </div>
    </div>
  );
};

export default Header;
