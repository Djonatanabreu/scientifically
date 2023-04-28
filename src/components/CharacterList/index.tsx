import { useQuery } from 'graphql-hooks';
import {
  IDashboardQueryResponse,
  IFormParams,
  IUpdatedCharacterUnit,
  UpdatedCharacterStatus,
} from '../../pages/Dashboard/types';
import { REQUEST_DASHBOARD_BODY } from './queries/dashboardQuery';
import { CardContainer } from '../CardContainer';
import { useState } from 'react';
import styles from './characterList.module.css';

export interface ICharacterListProps {
  form: IFormParams;
}

export const CharacterList = ({ form }: ICharacterListProps) => {
  const [page, setPage] = useState(1);
  const { loading, error, data } = useQuery<IDashboardQueryResponse>(
    REQUEST_DASHBOARD_BODY(page, form)
  );

  if (loading) {
    return <p>Loading...</p>;
  }
  if (!data) {
    return <p>no Characters found...</p>;
  }

  if (error) {
    return <p>Error {`:(`} </p>;
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

  return (
    <div className={styles.container}>
      <div className={styles.charCardsContainer}>
        {updatedData().map((character, index: number) => (
          <CardContainer {...character} key={index} />
        ))}
      </div>
      {updatedData().length > 1 && (
        <div className={styles.pageCounterBox}>
          <button onClick={onGoPreviousPage} disabled={!minPageNumber}>
            Previous
          </button>
          <p>
            Pages: {page} - {data.characters.info.pages}
          </p>
          <button onClick={onGoNextPage} disabled={!maxPageNumber}>
            Next
          </button>
        </div>
      )}
    </div>
  );
};
