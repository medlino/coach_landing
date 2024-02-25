'use client';

import { FunctionComponent } from 'react';
import styles from './CategoryItem.module.scss';

interface CategoryItemProps {
  imgSrc: string;
  desc: string;
}

export const CategoryItem: FunctionComponent<CategoryItemProps> = ({
  desc,
  imgSrc,
}) => {
  return (
    <div className={styles.categoryItem}>
      <img src={imgSrc} />
      <p>{desc}</p>
    </div>
  );
};
