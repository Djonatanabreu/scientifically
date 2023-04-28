import { ISelectProps } from './types';

export const Select = ({
  selectValue,
  optionsData,
  ...props
}: ISelectProps) => {
  return (
    <div>
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
