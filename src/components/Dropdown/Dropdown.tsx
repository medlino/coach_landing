import React, { useState, useRef, useEffect } from 'react';
import clsx from 'clsx';

import styles from './Dropdown.module.scss';
import { Button } from '../Button/Button';

interface DropdownProps {
  text: string;
  children: React.ReactNode;
}

export const Dropdown = ({ children, text }: DropdownProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dropdownRef]);

  return (
    <div className={styles.dropdown} ref={dropdownRef}>
      <Button onClick={() => setIsOpen(!isOpen)} text={text} />
      <div className={clsx(styles.dropdownContent, isOpen ? styles.show : '')}>
        {children}
      </div>
    </div>
  );
};
