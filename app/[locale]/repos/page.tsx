import ReposContainer from '@/app/[locale]/repos/components/repos-container';
import { getLangOpts } from '@/app/[locale]/repos/services';
import { def } from '@/app/[locale]/repos/consts';
import React from 'react';
import ModalContainer from '@/components/modal-container';

export default async function Repos() {
  try {
    const { data } = await getLangOpts(def.username);
    return (
      <main className="flex flex-col gap-2 p-4 w-full mainContainer">
        <ReposContainer langOpts={data ?? []} />
      </main>
    );
  } catch (error: any) {
    console.error(error.message || error);
    return (
      <main className="flex flex-col gap-2 p-4 w-full mainContainer">
        <ModalContainer
          title="오류"
          body={
            <div>
              <p>{error.message || error}</p>
            </div>
          }
        />
      </main>
    );
  }
}
