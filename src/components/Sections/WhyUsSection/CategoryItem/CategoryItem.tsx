'use client';

import clsx from 'clsx';
import { FunctionComponent } from 'react';

import styles from './CategoryItem.module.scss';

interface CategoryItemProps {
  id: string;
  imgSrc: string;
  desc: string;
}

export const CategoryItem: FunctionComponent<CategoryItemProps> = ({
  id,
  desc,
  imgSrc,
}) => {
  return (
    <div className={clsx(styles.categoryItem, styles[id])}>
      <img src={imgSrc} />
      <p>{desc}</p>
    </div>
  );
};
