import ReposView from '@/app/repos/components/ReposView';

const Repos = () => {
  return (
    <main className="flex flex-col gap-2 p-4 w-full mainContainer">
      <ReposView />
      {/*<ModalContainer />*/}
    </main>
  );
};

export default Repos;
