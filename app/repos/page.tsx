import ReposContainer from '@/app/repos/components/ReposContainer';
import { getLangOpts } from '@/app/repos/services';
import { def } from '@/app/repos/consts';

export default async function Repos() {
  const langOpts = await getLangOpts(def.username);

  return (
    <main className="flex flex-col gap-2 p-4 w-full mainContainer">
      <ReposContainer langOpts={langOpts.data ?? []} />
      {/*<ModalContainer />*/}
    </main>
  );
}
