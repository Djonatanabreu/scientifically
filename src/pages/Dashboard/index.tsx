import { useState } from 'react';
import { CardContainer } from '../../components/CardContainer';
import styles from './dashboard.module.css';
import { useQuery } from 'graphql-hooks';
import { REQUEST_DASHBOARD_BODY } from './queries/dashboardQuery';
import {
  IDashboardQueryResponse,
  IFormParams,
  IUpdatedCharacterUnit,
  UpdatedCharacterStatus,
} from './types';
import { Select } from '../../components/CardContainer/components/Select';
import { selectData } from './_helpers/selectData';
import { Input } from '../../components/CardContainer/components/Input';

export const Dashboard = () => {
  const [page, setPage] = useState(1);
  const [form, setForm] = useState<IFormParams>({
    name: '',
    status: '',
  });

  const { loading, error, data } = useQuery<IDashboardQueryResponse>(
    REQUEST_DASHBOARD_BODY(page, form)
  );

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!data) {
    return <div>No data</div>;
  }

  if (error) {
    return <div>Error</div>;
  }

  const maxPageNumber = page < data.characters.info.pages;

  const minPageNumber = page > 1;

  const onGoNextPage = () => {
    if (maxPageNumber) {
      setPage(page + 1);
    }
  };
  const onGoPreviousPage = () => {
    if (minPageNumber) {
      setPage(page - 1);
    }
  };

  const onInputClear = () => {
    setForm({ ...form, name: '' });
  };

  const updatedData = () => {
    return data.characters.results.map((character) => {
      const copyCharacterData: IUpdatedCharacterUnit = {
        ...character,
        firstSeenIn: character.episode[0].name,
        status: (character.status.charAt(0).toUpperCase() +
          character.status.slice(1)) as UpdatedCharacterStatus,
        location: character.location.name,
      };

      return copyCharacterData;
    });
  };

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
      <div className={styles.charCardsContainer}>
        {updatedData().length ? (
          updatedData().map((character, index: number) => {
            return <CardContainer {...character} key={index} />;
          })
        ) : (
          <div>No Data</div>
        )}
      </div>
      <button onClick={onGoPreviousPage} disabled={!minPageNumber}>
        Previous
      </button>
      <p>
        {page} - {data.characters.info.pages}
      </p>
      <button onClick={onGoNextPage} disabled={!maxPageNumber}>
        Next
      </button>
    </div>
  );
};
