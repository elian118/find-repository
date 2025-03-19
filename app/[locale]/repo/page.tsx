import React from 'react';
import { createTranslator } from 'next-intl';
import { getRepository } from '@/app/[locale]/repo/services';
import DetailContainer from '@/app/[locale]/repo/components/detail-container';
import ModalContainer from '@/components/modal-container';
import { Link, redirect } from '@/i18n/navigation';
import { defaultLocale } from '@/consts/locales';

const Repo = async ({
  params,
  searchParams,
}: {
  params: { locale: string };
  searchParams: { [key: string]: string | undefined };
}) => {
  const { locale } = params;
  const { username, repoName } = await searchParams;
  const messages = (await import(`@/messages/${locale}.json`)).default;
  const te = createTranslator({ locale, messages: messages['error'] });
  const t = createTranslator({ locale, messages: messages['Repo'] });

  if (!username && !repoName) {
    redirect({ href: '/repos', locale: locale ?? defaultLocale });
  }

  try {
    const { data } = await getRepository(username as string, repoName as string);
    return (
      <div className="p-4 flex flex-col gap-2 mainContainer">
        <div className="flex items-center justify-between gap-2 w-full">
          <div className="w-1/2 flex items-center gap-2">{t('repoDetail')}</div>
          <div className="w-1/2 flex justify-end items-center gap-2">
            <Link
              href="/repos"
              className="btn btn-sm btn-outline btn-neutral"
              locale={locale}
            >
              {t('toList')}
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
          title={te('error')}
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
