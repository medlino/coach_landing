'use client';

import clsx from 'clsx';
import { FunctionComponent } from 'react';

import styles from './InProgItem.module.scss';

interface InProgItemProps {
  id: string;
  imgSrc: string;
  title: string;
  desc: JSX.Element;
}

export const InProgItem: FunctionComponent<InProgItemProps> = ({
  id,
  title,
  desc,
  imgSrc,
}) => {
  return (
    <div className={clsx(styles.inProgItem, styles[id])}>
      <img src={imgSrc} />
      <div className={styles.textWrapper}>
        <h3>{title}</h3>
        {desc}
      </div>
    </div>
  );
};
