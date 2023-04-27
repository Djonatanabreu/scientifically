import { ReactNode } from 'react';
import styles from './status.module.css';

interface IStatusProp {
  children: ReactNode;
  circleStatus: 'on' | 'off';
}

export const Status = ({ children, circleStatus = 'on' }: IStatusProp) => {
  return (
    <div className={styles.statusContainer}>
      <div className={`${styles.circleStatus} ${styles[circleStatus]} `} />
      <span>{children}</span>
    </div>
  );
};
