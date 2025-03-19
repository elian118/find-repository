'use client';

import React, { useContext, useEffect, useRef } from 'react';
import Input from '@/components/input';
import { getRepositories } from '@/app/[locale]/repos/services';
import { ReposContext } from '@/app/[locale]/repos/contexts/repos-context';
import { def } from '@/app/[locale]/repos/consts';
import { Option } from '@/types';
import { useAsync } from '@/hooks/useAsync';
import { useModal } from '@/hooks';
import { useTranslations } from 'next-intl';

type ReposContainerProps = {
  langOpts: Option[];
};

const SearchView = (props: ReposContainerProps) => {
  const { langOpts } = props;
  const { usernameState, pageState, reposState, isLastPageState, filterState } =
    useContext(ReposContext);
  const { openModal } = useModal();
  const te = useTranslations('error');
  const t = useTranslations('SearchView');

  const [page, setPage] = pageState;
  const [repos, setRepos] = reposState;
  const [username, setUsername] = usernameState;
  const [, setIsLastPage] = isLastPageState;
  const [lang, setFilter] = filterState;

  const searchInput = useRef<HTMLInputElement>(null);
  const searchBtn = useRef<HTMLButtonElement>(null);

  const init = () => {
    setRepos([]);
    setPage(() => 1);
    setIsLastPage(false);
    setFilter(null);
  };

  const search = async () => {
    if (username.length > 0) {
      init();
      try {
        const { data } = await getRepositories(username, page);
        setRepos(data ?? []);
        setPage((prev) => prev + 1);
      } catch (error: any) {
        console.error(error.message);
        openModal({ title: te('error'), body: error.message });
      }
    }
  };

  const [error, resetError] = useAsync(async () => {
    if (repos.length <= 0) {
      await search();
    }
    // searchBtn.current?.click();
  }, [username, repos.length]);

  useEffect(() => {
    setUsername(def.username);
  }, []);

  useEffect(() => {
    if (!!error) {
      console.error(error.message);
      openModal({ title: '오류', body: error.message });
    }
    resetError();
  }, [error]);

  return (
    <div className="flex flex-wrap items-center justify-between gap-2 w-full">
      <div className="flex items-center gap-2">
        <div className="w-30">
          {t('repository')}(
          {repos?.filter((e) => (!!lang ? e.language === lang : true)).length ?? 0})
        </div>
        <select
          className="w-40 select select-sm select-border"
          disabled={repos.length <= 0}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="">{t('all')}</option>
          {langOpts.map((lang, idx) => (
            <option key={idx} value={lang.code}>
              {lang.name}
            </option>
          ))}
        </select>
      </div>
      <div className="flex justify-end items-center gap-2">
        <Input
          ref={searchInput}
          type="text"
          name="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          onKeyUp={(e: React.KeyboardEvent<HTMLInputElement>) =>
            e.keyCode === 13 && search()
          }
          placeholder={t('userId')}
        />
        <button ref={searchBtn} className="btn btn-sm btn-primary" onClick={search}>
          {t('search')}
        </button>
        <button
          className="btn btn-sm btn-primary"
          onClick={() => {
            setUsername('');
            init();
          }}
        >
          {t('init')}
        </button>
      </div>
    </div>
  );
};

export default SearchView;
