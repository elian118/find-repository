import React, { Suspense } from 'react';
import { getLangOpts } from '@/app/[locale]/repos/services';
import { def } from '@/app/[locale]/repos/consts';
import ModalContainer from '@/components/modal-container';
import Spinner from '@/public/icons/spinner';

const ServerComponent = async () => {
  try {
    const { data } = await getLangOpts(def.username);
    return (
      <main className="flex flex-col gap-2 p-4 w-full mainContainer">
        <Suspense fallback={<Spinner isLoading={true} />}>
          {data?.map((e, idx) => <div key={idx}>{e.name}</div>)}
        </Suspense>
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
};

export default ServerComponent;
