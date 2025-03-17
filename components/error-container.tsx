'use client';

import React from 'react';
import { Error } from '@/types/ApiResponse';
import ModalContainer from '@/components/modal-container';
import { useRouter } from 'next/navigation';

type ErrorContainerProps = {
  error?: Error;
  username?: string;
  repoName?: string;
};

const ErrorContainer = (props: ErrorContainerProps) => {
  const { error, username, repoName } = props;
  const router = useRouter();

  return (
    <>
      {error && (
        <ModalContainer
          title="오류"
          body={
            <p>
              오류코드: {error.code}
              <br />
              {error?.message}
            </p>
          }
        />
      )}
      {(!username || !repoName) && (
        <ModalContainer
          title="오류"
          body={
            <p>
              필수 파라미터가 누락되었습니다.
              <br />
              목록으로 돌아갑니다.
            </p>
          }
          closeCallback={() => router.push('/repos')}
        />
      )}
    </>
  );
};

export default ErrorContainer;
