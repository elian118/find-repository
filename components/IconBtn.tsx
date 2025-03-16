import React from 'react';

type IconBtnProps = {
  icon: React.ReactNode;
  onClick?: () => void;
};

const IconBtn = (props: IconBtnProps) => {
  const { icon, onClick } = props;
  return (
    <button className="btn btn-sm btn-ghost btn-primary" onClick={onClick}>
      {icon}
    </button>
  );
};

export default IconBtn;
