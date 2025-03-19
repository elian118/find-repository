'use client';

import React, { useContext, useEffect } from 'react';
import { useAsync, useModal } from '@/hooks';
import Btn from '@/components/btn';
import { ReposContext } from '@/app/[locale]/repos/contexts/repos-context';

const ClientComponent = () => {
  const { isLoadingState } = useContext(ReposContext);
  const [isLoading, setIsLoading] = isLoadingState;
  const { openModal } = useModal();
  const callback = async () => {
    try {
      setIsLoading(true);
      const message = '호출 성공';
      return { data: message };
    } catch (err: any) {
      console.error(err);
      throw new Error(err.message || err);
    } finally {
      setIsLoading(false);
    }
  };

  const callFailReq = async () => {
    setIsLoading(true);
    console.error('클라이언트사이드 오류 메시지');
    setIsLoading(false);
    throw new Error('클라이언트사이드 오류 메시지');
  };

  const [error, resetError] = useAsync(async () => {
    await callback();
  }, []);

  useEffect(() => {
    if (!!error) {
      console.error(error.message);
      openModal({ title: '오류', body: error.message });
    }
    resetError();
  }, [error]);

  return (
    <div className="flex items-center gap-2">
      <Btn isLoading={isLoading} className="btn btn-sm btn-primary" onClick={callback}>
        모달 띄우기
      </Btn>
      <Btn isLoading={isLoading} className="btn btn-sm btn-primary" onClick={callFailReq}>
        오류 띄우기
      </Btn>
    </div>
  );
};

export default ClientComponent;
