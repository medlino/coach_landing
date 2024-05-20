import clsx from 'clsx';
import { ColorRing } from 'react-loader-spinner';

import styles from './Loading.module.scss';

interface LoadingProps {
  type?: string;
  className?: string;
}

export const Loading = ({ className }: LoadingProps) => {
  return (
    <div className={clsx(styles.loading, className)}>
      <ColorRing
        visible
        height="80"
        width="80"
        ariaLabel="color-ring-loading"
        colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
      />
    </div>
  );
};
