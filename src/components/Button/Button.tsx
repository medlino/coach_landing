import clsx from 'clsx';
import { FunctionComponent } from 'react';

import styles from './Button.module.scss';

interface ButtonProps {
  text: string;
  onClick?: () => void;
  className?: string;
}

export const Button: FunctionComponent<ButtonProps> = ({
  text,
  onClick,
  className,
}) => {
  return (
    <button className={clsx(styles.button, className)} onClick={onClick}>
      {text}
    </button>
  );
};
