import React from 'react';
import Spinner from '@/public/icons/spinner';

type BtnProps = {
  isLoading: boolean;
  children: React.ReactNode;
  ref?: React.Ref<HTMLButtonElement>;
} & React.HTMLAttributes<HTMLButtonElement>;

const Btn = ({ isLoading, children, ref, className, ...props }: BtnProps) => {
  return (
    <button
      ref={ref}
      disabled={isLoading}
      className={`${className ?? 'p-2 flex justify-center items-center gap-2 btn btn-sm btn-neutral'}`}
      {...props}
    >
      {isLoading && <Spinner isLoading={isLoading} />}
      {children}
    </button>
  );
};

export default Btn;
