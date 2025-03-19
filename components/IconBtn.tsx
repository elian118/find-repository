import React from 'react';

type IconBtnProps = {
  icon: React.ReactNode;
  onClick?: () => void;
};

const IconBtn = (props: IconBtnProps) => {
  const { icon, onClick } = props;
  return (
    <button
      className="btn-ghost btn-primary hover:cursor-pointer hover:scale-125 hover:shadow-2xl hover:shadow-cyan-950"
      onClick={onClick}
    >
      {icon}
    </button>
  );
};

export default IconBtn;
