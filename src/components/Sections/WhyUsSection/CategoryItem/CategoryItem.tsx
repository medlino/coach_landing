'use client';

import { FunctionComponent } from 'react';
import styles from './CategoryItem.module.scss';

interface CategoryItemProps {
  imgSrc: string;
  title: string;
  desc: string;
}

export const CategoryItem: FunctionComponent<CategoryItemProps> = ({
  title,
  desc,
  imgSrc,
}) => {
  return (
    <div className={styles.categoryItem}>
      <img src={imgSrc} />
      <h3>{title}</h3>
      <p>{desc}</p>
    </div>
  );
};
