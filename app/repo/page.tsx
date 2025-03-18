import React from 'react';
import { getRepository } from '@/app/repo/services';
import DetailContainer from '@/app/repo/components/detail-container';
import Link from 'next/link';
import ModalContainer from '@/components/modal-container';

const Repo = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) => {
  const { username, repoName } = await searchParams;
  try {
    const { data } = await getRepository(username as string, repoName as string);
    return (
      <div className="p-4 flex flex-col gap-2 mainContainer">
        <div className="flex items-center justify-between gap-2 w-full">
          <div className="w-1/2 flex items-center gap-2">리포지토리 정보</div>
          <div className="w-1/2 flex justify-end items-center gap-2">
            <Link href="/repos" className="btn btn-sm btn-outline btn-neutral">
              목록으로
            </Link>
          </div>
        </div>
        <DetailContainer repo={data} />
      </div>
    );
  } catch (error: any) {
    console.error(error.message || error);
    return (
      <div className="p-4 flex flex-col gap-2 mainContainer">
        <ModalContainer
          title="오류"
          body={
            <div>
              <p>{error.message || error}</p>
            </div>
          }
        />
      </div>
    );
  }
};

export default Repo;
