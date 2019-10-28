import React from 'react';
import './Button.scss';

type ButtonProps = {
  onClick: (data: any) => void;
  text?: string;
  context: any;
};

const Button = ({ text, onClick, context }: ButtonProps) => {
  function handleCLick(event: React.MouseEvent) {
    onClick(context);
  }
  return (
    <button className="button button-primary" onClick={handleCLick}>
      {text}
    </button>
  );
};

export default Button;
