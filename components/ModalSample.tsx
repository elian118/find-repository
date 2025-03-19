'use client';

import React from 'react';
import ClientLayer from '@/components/client-layer';
import Modal from '@/components/modal';
import { useModal } from '@/hooks';

const ModalSample = () => {
  const { openModal } = useModal();
  const open = () =>
    openModal({
      title: '알림',
      body: (
        <div>
          <p>모달 내용</p>
        </div>
      ),
    });

  return (
    <div className="flex justify-center items-center w-screen h-screen">
      <ClientLayer>
        <button className="btn btn-sm btn-primary" onClick={() => open()}>
          모달 열기
        </button>
        <Modal />
      </ClientLayer>
    </div>
  );
};

export default ModalSample;
