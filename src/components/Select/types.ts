export interface ISelectProps
  extends React.SelectHTMLAttributes<HTMLSelectElement> {
  selectValue: string;
  optionsData: IOptionProps[];
}

interface IOptionProps {
  value: string;
  label: string;
}
