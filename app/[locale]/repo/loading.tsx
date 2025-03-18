'use client';

import React from 'react';
import { useTranslations } from 'next-intl';

const Loading = () => {
  const repo = useTranslations('Repo');
  const t = useTranslations('DetailContainer');
  return (
    <div className="p-4 flex flex-col gap-2 mainContainer">
      <div className="flex items-center justify-between gap-2 w-full">
        <div className="w-1/2 flex items-center gap-2">{repo('repoDetail')}</div>
      </div>
      <div className="flex flex-col p-2 gap-2">
        <div className="flex items-center gap-2">
          <div className="font-bold w-40">{t('name')}</div>
          <div className="skeleton w-40 h-6" />
        </div>
        <div className="flex items-center gap-2">
          <div className="font-bold w-40">{t('description')}</div>
          <div className="skeleton w-40 h-6" />
        </div>
        <div className="flex items-center gap-2">
          <div className="font-bold w-40">{t('starCounts')}</div>
          <div className="skeleton w-6 h-6" />
        </div>
        <div className="flex items-center gap-2">
          <div className="font-bold w-40">{t('mainLanguage')}</div>
          <div className="skeleton w-32 h-6" />
        </div>
        <div className="flex items-center gap-2">
          <div className="font-bold w-40">{t('issueCounts')}</div>
          <div className="skeleton w-6 h-6" />
        </div>
        <div className="flex items-center gap-2">
          <div className="font-bold w-40">url</div>
          <div className="skeleton w-80 h-6" />
        </div>
      </div>
    </div>
  );
};

export default Loading;
