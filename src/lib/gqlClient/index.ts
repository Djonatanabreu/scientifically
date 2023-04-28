import { GraphQLClient } from 'graphql-hooks';

export const client = new GraphQLClient({
  url: 'https://rickandmortyapi.com/graphql',
});
