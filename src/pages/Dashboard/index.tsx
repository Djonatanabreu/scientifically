import { useState } from 'react';
import { CardContainer } from '../../components/CardContainer';
import styles from './dashboard.module.css';
import { useQuery } from 'graphql-hooks';

export type UpdatedCharacterStatus = 'Alive' | 'Dead' | 'Unknown';

interface IDashboardQueryResponse {
  characters: {
    info: {
      pages: number;
    };
    results: ICharacterUnit[];
  };
}

interface IUpdatedCharacterUnit
  extends Omit<ICharacterUnit, 'episode' | 'location'> {
  firstSeenIn: string;
  location: string;
}

interface IEpisode {
  id: string;
  name: string;
}

export interface ICharacterUnit {
  name: string;
  status: UpdatedCharacterStatus;
  species: string;
  location: { name: string };
  episode: IEpisode[];
  image: string;
}

export const Dashboard = () => {
  const [page, setPage] = useState(1);
  const [form, setForm] = useState({
    name: '',
    status: 'all',
  });

  const DASHBOARD_QUERY = `query {
    characters(page:${page}) {
     info {
       pages
     },
     results {
       name,
       status,
       species,
       location {
         name
       },
       image,
       episode {
        id, 
        name
      }
     } 
   }
 }
 `;

  const { loading, error, data } =
    useQuery<IDashboardQueryResponse>(DASHBOARD_QUERY);

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

  const updatedData = () => {
    return data?.characters.results.map((character) => {
      const copyData: IUpdatedCharacterUnit = {
        ...character,
        firstSeenIn: character.episode[0].name,
        status: (character.status.charAt(0).toUpperCase() +
          character.status.slice(1)) as UpdatedCharacterStatus,
        location: character.location.name,
      };

      return copyData;
    });
  };

  const filterByName = (filterData: IUpdatedCharacterUnit[], name: string) => {
    return filterData.filter((character) => {
      return character.name.toLowerCase().includes(name.toLowerCase());
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

  const filterByStatus = (
    filterData: IUpdatedCharacterUnit[],
    status: string
  ) => {
    if (status === 'all') {
      return filterData;
    }
    return filterData.filter((character) => {
      return character.status === status;
    });
  };

  const render = (status: string, name: string) => {
    const filteredChar = filterByName(updatedData(), name);

    return filterByStatus(filteredChar, status);
  };

  console.log(render(form.status, form.name));
  return (
    <div className={styles.dashboardContainer}>
      <input value={form.name} onChange={onSearch} />
      <select value={form.status} onChange={onSelect}>
        <option value='all'>All</option>
        <option value='Alive'>Alive</option>
        <option value='Dead'>Dead</option>
        <option value='Unknown'>Unknown</option>
      </select>
      <h1>Character List</h1>
      <div className={styles.charCardsContainer}>
        {render(form.status, form.name).length ? (
          render(form.status, form.name).map((character, index: number) => {
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
