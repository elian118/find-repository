import React from 'react';
import { getRepository } from '@/app/[locale]/repo/services';
import DetailContainer from '@/app/[locale]/repo/components/detail-container';
import ModalContainer from '@/components/modal-container';
import { Link, redirect } from '@/i18n/navigation';

const Repo = async ({
  params,
  searchParams,
}: {
  params: { locale: string };
  searchParams: { [key: string]: string | undefined };
}) => {
  const { locale } = params;
  const { username, repoName } = await searchParams;

  if (!username && !repoName) {
    redirect({ href: '/repos', locale: locale });
  }

  try {
    const { data } = await getRepository(username as string, repoName as string);
    return (
      <div className="p-4 flex flex-col gap-2 mainContainer">
        <div className="flex items-center justify-between gap-2 w-full">
          <div className="w-1/2 flex items-center gap-2">리포지토리 정보</div>
          <div className="w-1/2 flex justify-end items-center gap-2">
            <Link
              href="/repos"
              className="btn btn-sm btn-outline btn-neutral"
              locale={locale}
            >
              목록으로
            </Link>
          </div>
        </div>
        <DetailContainer repo={data} locale={locale} />
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
