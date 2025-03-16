'use client';

import React from 'react';
import { useModal } from '@/hooks';

const UsersContainer = () => {
  const { openModal } = useModal();

  const openUserDetails = () => {
    openModal({ title: '사용자 상세정보', body: '내용' });
  };

  return (
    <div>
      <button className="btn btn-sm btn-primary" onClick={openUserDetails}>
        모달 테스트
      </button>
    </div>
  );
};

export default UsersContainer;
