'use client';

import React from 'react';
import { def, headers } from '@/app/[locale]/repos/consts';
import { useTranslations } from 'next-intl';

const Loading = () => {
  const l = useTranslations('ListView');
  const t = useTranslations('SearchView');
  return (
    <div className="flex flex-col gap-2 p-4 w-full mainContainer">
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between gap-2 w-full">
          <div className="w-1/2 flex items-center gap-2">
            <div className="w-30 flex items-center gap-2">{t('repository')}</div>
            <div className="w-40 h-8 skeleton" />
          </div>
          <div className="w-1/2 flex justify-end items-center gap-2">
            <div className="w-40 h-8 skeleton" />
            <button className="btn btn-sm btn-primary">{t('search')}</button>
            <button className="btn btn-sm btn-primary">{t('init')}</button>
          </div>
        </div>
        <div className="rounded-md h-160 overflow-y-scroll">
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
                      <span className="truncate">{l(col.intlKey)}</span>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[...Array(def.perPage)].map((_, idx) => (
                <tr key={idx}>
                  {headers.map((col, cIdx) => (
                    <td
                      key={cIdx}
                      className={`${
                        ['name', 'description'].includes(col.key)
                          ? 'min-w-40 max-w-60'
                          : col.key === 'updated_at'
                            ? 'w-36'
                            : 'w-32'
                      }`}
                    >
                      <div className="skeleton w-full h-8" />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Loading;
