import React from 'react';
import Link from 'next/link';
import { RepoDetail } from '@/app/repo/types/repo-detail';

type DetailContainerProps = {
  repo: RepoDetail;
};

const DetailContainer = (props: DetailContainerProps) => {
  const { name, description, stargazers_count, language, open_issues_count, html_url } =
    props.repo;

  return (
    <>
      <div className="flex flex-col p-2 gap-2">
        <div className="flex items-center gap-2">
          <div className="font-bold w-24">이름</div>
          {name}
        </div>
        <div className="flex items-center gap-2">
          <div className="font-bold w-24">설명</div>
          {description}
        </div>
        <div className="flex items-center gap-2">
          <div className="font-bold w-24">별점 수</div>
          {stargazers_count}
        </div>
        <div className="flex items-center gap-2">
          <div className="font-bold w-24">주 언어</div>
          {language}
        </div>
        <div className="flex items-center gap-2">
          <div className="font-bold w-24">이슈 수</div>
          {open_issues_count}
        </div>
        <div className="flex items-center gap-2">
          <div className="font-bold w-24">url</div>
          <Link href={html_url} target="_blank" rel="noopener noreferrer">
            <span className="hover:btn-link cursor-pointer">{html_url}</span>
          </Link>
        </div>
      </div>
    </>
  );
};

export default DetailContainer;
