'use client';

import React, { useContext, useState } from 'react';
import Moon from '@/public/icons/moon';
import Sun from '@/public/icons/sun';
import { useParams, usePathname, useSearchParams } from 'next/navigation';
import IconBtn from '@/components/IconBtn';
import { GlobalContext } from '@/global-context';
import { Link, useRouter } from '@/i18n/navigation';
import { locales } from '@/consts/locales';
import { menus } from '@/consts/menus';
import { useTranslations } from 'next-intl';

const Header = () => {
  const { isDarkState } = useContext(GlobalContext);
  const [isDark, setIsDark] = isDarkState;
  const t = useTranslations('Header');
  const { locale } = useParams();
  const { replace } = useRouter();
  const [loc] = useState<string>(locale as string);
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const domain = pathname.split('/')[2];

  const isCurrentPage = (path) => {
    return pathname.split('/')[2] === path.replace('/', '') ? 'font-bold' : '';
  };

  const changeTheme = (theme: boolean) => setIsDark(theme);

  const changeLang = (lang: string) => {
    replace(
      `/${domain}?username=${searchParams.get('username')}&repoName=${searchParams.get('repoName')}`,
      { locale: lang },
    );
  };

  return (
    <div className="sticky top-0 left-0 z-10 w-full h-12 p-2 flex justify-between items-center gap-4 bg-info">
      <div className="flex  gap-2">
        {menus.map((menu, idx) => (
          <Link key={idx} href={menu.path} locale={locale as string}>
            <span className={isCurrentPage(menu.path)}>{t(menu.intlKey)}</span>
          </Link>
        ))}
      </div>
      <div className="flex gap-2">
        <select
          className="select select-sm"
          value={loc}
          onChange={(e) => changeLang(e.target.value)}
        >
          {locales.map((locale) => (
            <option key={locale.code} value={locale.code}>
              {locale.name}
            </option>
          ))}
        </select>
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
