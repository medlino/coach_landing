import clsx from 'clsx';
import { FunctionComponent } from 'react';

import styles from './Button.module.scss';
import { Loading } from '../Loading/Loading';

interface ButtonProps {
  text: string;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
  loading?: boolean;
}

export const Button: FunctionComponent<ButtonProps> = ({
  text,
  onClick,
  className,
  disabled = false,
  loading = false,
}) => {
  return (
    <button
      className={clsx(styles.button, className)}
      onClick={onClick}
      disabled={disabled || loading}
    >
      {loading ? <Loading /> : text}
    </button>
  );
};
