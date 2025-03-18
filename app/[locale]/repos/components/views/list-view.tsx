'use client';

import React, { useContext, useEffect, useRef, useState } from 'react';
import { headers } from '@/app/[locale]/repos/consts';
import { convertToLocalDateTime } from '@/utils';
import { ReposContext } from '@/app/[locale]/repos/contexts/repos-context';
import { getRepositories } from '@/app/[locale]/repos/services';
import { Repo } from '@/app/[locale]/repos/types/Repo';
import IconBtn from '@/components/IconBtn';
import ArrowDown from '@/public/icons/arrow-down';
import ArrowUp from '@/public/icons/arrow-up';
import ArrowPath from '@/public/icons/arrow-path';
import LoadingView from '@/components/loading-view';
import { useAsync } from '@/hooks/useAsync';
import { useModal } from '@/hooks';
import { Link } from '@/i18n/navigation';
import { useParams } from 'next/navigation';
import { useTranslations } from 'next-intl';

const ListView = () => {
  const {
    usernameState,
    pageState,
    reposState,
    isLoadingState,
    isLastPageState,
    filterState,
  } = useContext(ReposContext);
  const [username] = usernameState;
  const [page, setPage] = pageState;
  const [repos, setRepos] = reposState;
  const [isLoading, setIsLoading] = isLoadingState;
  const [isLastPage, setIsLastPage] = isLastPageState;
  const [lang] = filterState;
  const [order, setOrder] = useState<'none' | 'asc' | 'desc'>('none');
  const [targetKey, setTargetKey] = useState<string>('updated_at');
  const { openModal } = useModal();
  const { locale } = useParams();
  const t = useTranslations('ListView');

  const trigger = useRef<HTMLDivElement>(null);

  const fetchData = (newRepos: Repo[]) => {
    setRepos([...repos, ...newRepos]);
    setPage((prev: number) => prev + 1);
  };

  const sort = (orderBy: 'none' | 'asc' | 'desc', targetKey: string) => {
    setTargetKey(targetKey);
    setOrder(orderBy);
    const sortedRepos = repos
      .slice()
      .sort((a, b) =>
        a[targetKey] > b[targetKey]
          ? order === 'asc'
            ? 1
            : -1
          : order === 'desc'
            ? -1
            : 1,
      );

    setRepos(
      orderBy === 'none'
        ? sortedRepos.sort((a, b) => (a.name > b.name ? 1 : -1))
        : sortedRepos,
    );
  };

  const [error, resetError] = useAsync(async () => {
    const observer = new IntersectionObserver(
      async (entries: IntersectionObserverEntry[], observer: IntersectionObserver) => {
        const element = entries[0];

        if (element.isIntersecting && trigger.current) {
          observer.unobserve(trigger.current);
          setIsLoading(true);
          const { data } = await getRepositories(username, page);
          const newRepos = data ?? [];
          // eslint-disable-next-line @typescript-eslint/no-unused-expressions
          newRepos.length > 0 ? fetchData(newRepos) : setIsLastPage(true);
          setIsLoading(false);
        }
      },
      {
        threshold: 0.5,
        rootMargin: '0px 0px -150px 0px',
      },
    );
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    trigger?.current && observer.observe(trigger.current);

    return () => {
      observer.disconnect();
    };
  }, [page]);

  useEffect(() => {
    if (!!error) {
      console.error(error.message);
      openModal({ title: '오류', body: error.message });
    }
    resetError();
  }, [error]);

  useEffect(() => {
    sort(order, targetKey);
  }, [repos.length, order, targetKey]);

  return (
    <div className="rounded-md h-160 overflow-y-scroll">
      {repos.length > 0 && (
        <table className="table table-pin-rows">
          <thead>
            <tr className="bg-gray-100 text-gray-800">
              {headers.map((col) => (
                <th
                  key={col.key}
                  className={`truncate ${
                    ['name', 'description'].includes(col.key)
                      ? 'min-w-40 max-w-60'
                      : col.key === 'updated_at'
                        ? 'w-36'
                        : 'w-32'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span className="truncate">{t(col.intlKey)}</span>
                    <div
                      className={`${['updated_at', 'stargazers_count'].includes(col.key) ? '' : 'hidden'}`}
                    >
                      {order === 'none' ? (
                        <IconBtn
                          icon={<ArrowDown />}
                          onClick={() => sort('asc', col.key)}
                        />
                      ) : order === 'asc' ? (
                        <IconBtn
                          icon={<ArrowUp />}
                          onClick={() => sort('desc', col.key)}
                        />
                      ) : order === 'desc' ? (
                        <IconBtn
                          icon={<ArrowPath />}
                          onClick={() => sort('none', col.key)}
                        />
                      ) : (
                        ''
                      )}
                    </div>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {repos
              .filter((e) => (!!lang ? e.language === lang : true))
              .map((repo, idx) => (
                <tr className="hover:bg-sky-50" key={idx}>
                  <td>{repo.id}</td>
                  <td>
                    <Link
                      className="hover:btn-link cursor-pointer"
                      href={`/repo?username=${username}&repoName=${repo.name}`}
                      locale={locale as string}
                    >
                      {repo.name}
                    </Link>
                  </td>
                  <td>{repo.description}</td>
                  <td>{'⭐️'.repeat(repo.stargazers_count)}</td>
                  <td>{convertToLocalDateTime(repo.updated_at)}</td>
                </tr>
              ))}
          </tbody>
        </table>
      )}
      {isLastPage ? (
        <div className="my-8 flex justify-center items-center">
          <span>모든 데이터를 불러왔습니다.</span>
        </div>
      ) : (
        repos.length > 0 && (
          <>
            <div ref={trigger} className={`flex justify-center items-center invisible`}>
              <button className="flex justify-center btn btn-sm btn-ghost btn-primary">
                <ArrowDown />
              </button>
            </div>
            {isLoading && <LoadingView />}
          </>
        )
      )}
    </div>
  );
};

export default ListView;
