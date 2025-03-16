'use client';

import React, { useContext, useEffect, useRef, useState } from 'react';
import { headerNms } from '@/app/repos/consts';
import { Column } from '@/types';
import { convertToLocalDateTime } from '@/utils';
import { ReposContext } from '@/app/repos/ReposContext';
import { getRepositories } from '@/app/repos/services';
import { Repo } from '@/app/repos/types/Repo';
import ArrowDown from '@/public/icons/arrow-down';

const ListView = () => {
  const { usernameState, pageState, reposState, isLoadingState, isLastPageState } =
    useContext(ReposContext);
  const [username] = usernameState;
  const [page, setPage] = pageState;
  const [repos, setRepos] = reposState;
  const [headers, setHeaders] = useState<Column[]>([]);
  const [isLoading, setIsLoading] = isLoadingState;
  const [isLastPage, setIsLastPage] = isLastPageState;

  const trigger = useRef<HTMLDivElement>(null);

  const update = async () => {
    const newRepos = await getRepositories(username, page);
    setRepos([...repos, ...newRepos]);
  };

  const init = () => {
    const columns: Column[] = Object?.keys(repos[0]).map((key, idx) => ({
      key: key,
      name: headerNms[idx],
    }));
    setHeaders(columns);
  };

  useEffect(() => {
    if (repos.length > 0) init();
  }, [repos.length]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      async (entries: IntersectionObserverEntry[], observer: IntersectionObserver) => {
        const element = entries[0];

        const fetchData = (newRepos: Repo[]) => {
          setRepos([...repos, ...newRepos]);
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

  return (
    <div className="rounded-md h-160 overflow-y-scroll">
      {repos.length > 0 && (
        <table className="table table table-pin-rows">
          <thead>
            <tr className="bg-gray-100 text-gray-800">
              {headers.map((col) => (
                <td
                  key={col.key}
                  className={
                    ['name', 'description'].includes(col.key)
                      ? 'truncate min-w-40 max-w-60'
                      : col.key === 'updated_at'
                        ? 'truncate w-36'
                        : 'truncate w-24'
                  }
                >
                  <span className="truncate">{col.name}</span>
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
            <button
              className="flex justify-center btn btn-sm btn-ghost btn-primary"
              onClick={update}
            >
              <ArrowDown />
            </button>
          </div>
        )
      )}
    </div>
  );
};

export default ListView;
