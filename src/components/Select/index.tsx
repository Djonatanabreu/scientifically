import { ISelectProps } from './types';
import styles from './select.module.css';
import { ArrowDown } from '../Icons/lib/ArrowDown';

export const Select = ({
  selectValue,
  optionsData,
  ...props
}: ISelectProps) => {
  return (
    <div className={styles.selectContainer}>
      <select value={selectValue} {...props}>
        {optionsData.map((option) => (
          <option key={option.label + Math.random()} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};
