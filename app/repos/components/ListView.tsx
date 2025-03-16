'use client';

import React, { useContext, useEffect, useRef, useState } from 'react';
import { headers } from '@/app/repos/consts';
import { convertToLocalDateTime } from '@/utils';
import { ReposContext } from '@/app/repos/ReposContext';
import { getRepositories } from '@/app/repos/services';
import { Repo } from '@/app/repos/types/Repo';
import IconBtn from '@/components/IconBtn';
import ArrowDown from '@/public/icons/arrow-down';
import ArrowUp from '@/public/icons/arrow-up';
import ArrowPath from '@/public/icons/arrow-path';

const ListView = () => {
  const { usernameState, pageState, reposState, isLoadingState, isLastPageState } =
    useContext(ReposContext);
  const [username] = usernameState;
  const [page, setPage] = pageState;
  const [repos, setRepos] = reposState;
  const [isLoading, setIsLoading] = isLoadingState;
  const [isLastPage, setIsLastPage] = isLastPageState;
  const [order, setOrder] = useState<'none' | 'asc' | 'desc'>('none');

  const trigger = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      async (entries: IntersectionObserverEntry[], observer: IntersectionObserver) => {
        const element = entries[0];

        const fetchData = (newRepos: Repo[]) => {
          setRepos([...repos, ...newRepos]);
          sort(order);
          setPage((prev: number) => prev + 1);
        };

        if (element.isIntersecting && trigger.current) {
          observer.unobserve(trigger.current);
          setIsLoading(true);
          const newRepos: Repo[] = await getRepositories(username, page);
          !!newRepos && newRepos.length > 0 ? fetchData(newRepos) : setIsLastPage(true);
          setIsLoading(false);
        }
      },
      {
        threshold: 0.5,
        rootMargin: '0px 0px -150px 0px',
      },
    );
    trigger?.current && observer.observe(trigger.current);

    return () => {
      observer.disconnect();
    };
  }, [page]);

  const sort = (orderBy: 'none' | 'asc' | 'desc') => {
    setOrder(orderBy);
    const sortedRepos = repos
      .slice()
      .sort((a, b) =>
        a.updated_at > b.updated_at ? (orderBy ? 1 : -1) : orderBy ? -1 : 1,
      );

    setRepos(
      orderBy === 'none'
        ? sortedRepos.sort((a, b) => (a.name > b.name ? 1 : -1))
        : sortedRepos,
    );
  };

  return (
    <div className="rounded-md h-160 overflow-y-scroll">
      {repos.length > 0 && (
        <table className="table table table-pin-rows">
          <thead>
            <tr className="bg-gray-100 text-gray-800">
              {headers.map((col) => (
                <td
                  key={col.key}
                  className={`truncate ${
                    ['name', 'description'].includes(col.key)
                      ? 'min-w-40 max-w-60'
                      : col.key === 'updated_at'
                        ? 'flex items-center gap-2 w-36'
                        : 'w-24'
                  }`}
                >
                  <span className="truncate">{col.name}</span>
                  <div className={`${col.key === 'updated_at' ? '' : 'hidden'}`}>
                    {order === 'none' ? (
                      <IconBtn icon={<ArrowDown />} onClick={() => sort('asc')} />
                    ) : order === 'asc' ? (
                      <IconBtn icon={<ArrowUp />} onClick={() => sort('desc')} />
                    ) : order === 'desc' ? (
                      <IconBtn icon={<ArrowPath />} onClick={() => sort('none')} />
                    ) : (
                      ''
                    )}
                  </div>
                </td>
              ))}
            </tr>
          </thead>
          <tbody>
            {repos.map((repo, idx) => (
              <tr className="hover:bg-sky-50" key={idx}>
                <td>{repo.id}</td>
                <td>{repo.name}</td>
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
          <div
            ref={trigger}
            className={`flex justify-center items-center ${isLoading ? 'visible' : 'invisible'}`}
          >
            <button className="flex justify-center btn btn-sm btn-ghost btn-primary">
              <ArrowDown />
            </button>
          </div>
        )
      )}
    </div>
  );
};

export default ListView;
