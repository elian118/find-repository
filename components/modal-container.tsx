'use client';

import React, { ReactNode, useEffect } from 'react';
import { useModal } from '@/hooks';

type ModalContainerProps = {
  isTest?: boolean;
  title?: string;
  body?: string | ReactNode;
  closeCallback?: () => void;
};

const ModalContainer = (props: ModalContainerProps) => {
  const { isTest, title, body, closeCallback } = props;
  const { openModal, modal } = useModal();
  const { isOpen } = modal;

  const openUserDetails = () => {
    openModal({ title: title, body: body });
  };

  useEffect(() => {
    if (body) openUserDetails();
  }, [body]);

  useEffect(() => {
    if (isOpen === false && closeCallback) closeCallback();
  }, [isOpen]);

  return (
    <div>
      {isTest && (
        <button className="btn btn-sm btn-primary" onClick={openUserDetails}>
          모달 테스트
        </button>
      )}
    </div>
  );
};

export default ModalContainer;
