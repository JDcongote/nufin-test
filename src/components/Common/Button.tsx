import React from 'react';
import './Button.scss';

type ButtonProps = {
  onClick: (data: any) => void;
  text?: string;
  floating?: string;
  context: any;
  visible?: boolean;
};

const Button = ({ text, onClick, context, floating, visible }: ButtonProps) => {
  function handleCLick(event: React.MouseEvent) {
    onClick(context);
  }
  return (
    <button
      className={`button button-primary ${floating}`}
      onClick={handleCLick}
      style={visible ? { display: 'block' } : { display: 'none' }}
    >
      {text}
    </button>
  );
};
Button.defaultProps = {
  visible: true
};
export default Button;
