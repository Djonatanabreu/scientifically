export type UpdatedCharacterStatus = 'Alive' | 'Dead' | 'Unknown';

export interface IDashboardQueryResponse {
  characters: {
    info: {
      pages: number;
    };
    results: ICharacterUnit[];
  };
}

export interface IUpdatedCharacterUnit
  extends Omit<ICharacterUnit, 'episode' | 'location'> {
  firstSeenIn: string;
  location: string;
}

export interface IEpisode {
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

export interface IFormParams {
  name: string;
  status: string;
}
