import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { RouterProvider } from 'react-router-dom';
import { routers } from './routers/index.tsx';
import { ClientContext, GraphQLClient } from 'graphql-hooks';

const client = new GraphQLClient({
  url: 'https://rickandmortyapi.com/graphql',
});

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ClientContext.Provider value={client}>
      <RouterProvider router={routers} />
    </ClientContext.Provider>
  </React.StrictMode>
);
