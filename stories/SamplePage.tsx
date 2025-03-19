import React from 'react';
import ClientLayer from '@/components/client-layer';
import ClientComponent from '@/stories/ClientComponent';
import ServerComponent from '@/stories/ServerComponent';

const SamplePage: React.FC = () => {
  return (
    <div className="flex flex-col gap-2 p-4 w-full mainContainer">
      <h3>서버 컴포넌트</h3>
      <ServerComponent />
      <h3>클라이언트 컴포넌트</h3>
      <ClientLayer>
        <ClientComponent />
      </ClientLayer>
    </div>
  );
};

export default SamplePage;
