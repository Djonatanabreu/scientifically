import { useEffect, useState } from 'react';
import { CardContainer } from '../../components/CardContainer';
import styles from './dashboard.module.css';
import { useQuery } from 'graphql-hooks';
import { REQUEST_DASHBOARD_BODY } from '../../components/CharacterList/queries/dashboardQuery';
import {
  IFormParams,
  IUpdatedCharacterUnit,
  UpdatedCharacterStatus,
} from './types';
import { selectData } from './_helpers/selectData';
import { Input } from '../../components/Input';
import { Select } from '../../components/Select';
import { CharacterList } from '../../components/CharacterList';

export const Dashboard = () => {
  const [form, setForm] = useState<IFormParams>({
    name: '',
    status: '',
  });

  const onSearch = ({
    target: { value },
  }: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, name: value });
  };

  const onSelect = ({
    target: { value },
  }: React.ChangeEvent<HTMLSelectElement>) => {
    setForm({ ...form, status: value });
  };

  const onInputClear = () => {
    setForm({ ...form, name: '' });
  };

  return (
    <div className={styles.dashboardContainer}>
      <h1>Character List</h1>
      <div className={styles.searchContainer}>
        <Input
          type='text'
          onClear={onInputClear}
          value={form.name}
          onChange={onSearch}
        />
        <Select
          optionsData={selectData}
          selectValue={form.status}
          onChange={onSelect}
        />
      </div>
      <CharacterList form={form} />
    </div>
  );
};
