import { InputHTMLAttributes, useState } from 'react';
import styles from './input.module.css';
import { IInputProps } from './types';

export const Input = ({ onClear, ...props }: IInputProps) => {
  return (
    <div className={styles.inputContainer}>
      <input {...props} />
      <button onClick={onClear}>x</button>
    </div>
  );
};
