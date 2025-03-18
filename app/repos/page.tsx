import ReposContainer from '@/app/repos/components/repos-container';
import { getLangOpts } from '@/app/repos/services';
import { def } from '@/app/repos/consts';
import ModalContainer from '@/components/modal-container';
import React from 'react';

export default async function Repos() {
  const { data, error } = await getLangOpts(def.username);
  return (
    <main className="flex flex-col gap-2 p-4 w-full mainContainer">
      <ReposContainer langOpts={data ?? []} />
      {error && (
        <ModalContainer
          title="오류"
          body={
            <div>
              <p>
                오류코드: {error.code}
                <br />
                {error?.message}
              </p>
            </div>
          }
        />
      )}
    </main>
  );
}
