import { ReactNode } from 'react';
import styles from './status.module.css';
import { UpdatedCharacterStatus } from '../../../../pages/Dashboard';

interface IStatusProp {
  children: ReactNode;
  circleStatus: UpdatedCharacterStatus;
}

export const Status = ({ children, circleStatus = 'Alive' }: IStatusProp) => {
  return (
    <div className={styles.statusContainer}>
      <div
        className={`${styles.circleStatus} ${
          styles[circleStatus.toLowerCase()]
        } `}
      />
      <span>
        {circleStatus} - {children}
      </span>
    </div>
  );
};
