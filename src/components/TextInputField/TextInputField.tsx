import React, { ChangeEvent } from 'react';
import clsx from 'clsx';

import styles from './TextInputField.module.scss';

interface TextInputFieldProps {
  label?: string;
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  error: boolean;
  errorMessage?: string;
  className?: string;
}

export const TextInputField: React.FC<TextInputFieldProps> = ({
  label,
  value,
  onChange,
  error,
  required = false,
  errorMessage = 'Invalid input',
  className,
}) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(e);
  };

  return (
    <div className={clsx(styles.inputWrapper, className)}>
      {label && (
        <label className={`${styles.label} ${error ? styles.error : ''}`}>
          {label}
        </label>
      )}
      <input
        className={`${styles.inputField} ${error ? styles.error : ''}`}
        value={value}
        onChange={handleChange}
        required={required}
      />
      <span
        className={`${styles.errorMessage} ${error ? styles.errorVisible : ''}`}
      >
        {errorMessage}
      </span>
    </div>
  );
};
