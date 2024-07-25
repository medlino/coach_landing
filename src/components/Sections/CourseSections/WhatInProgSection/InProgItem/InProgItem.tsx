'use client';

import clsx from 'clsx';
import { FunctionComponent } from 'react';

import styles from './InProgItem.module.scss';

interface InProgItemProps {
  id: string;
  imgSrc: string;
  title: string;
  desc: JSX.Element;
  proofImg: JSX.Element;
}

export const InProgItem: FunctionComponent<InProgItemProps> = ({
  id,
  title,
  desc,
  imgSrc,
  proofImg,
}) => {
  return (
    <div className={clsx(styles.inProgItem, styles[id])}>
      <img className={styles.desktopImg} src={imgSrc} />
      <div className={styles.textWrapper}>
        <div>
          <img className={styles.mobileImg} src={imgSrc} />
          <h3>{title}</h3>
        </div>
        {desc}
      </div>
      {proofImg}
    </div>
  );
};
