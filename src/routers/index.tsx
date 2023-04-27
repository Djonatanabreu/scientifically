import { createBrowserRouter } from 'react-router-dom';

import { Dashboard } from '../pages/Dashboard';
import HomePage from '../App';

export const routers = createBrowserRouter(
  // createRoutesFromElements(
  //   <Route path='/' element={<Layout />}>
  //     <Route index element={<HomePage />} />
  //     <Route path='/dashboard' element={<Dashboard />} />
  //   </Route>
  // )
  [
    { path: '/', element: <HomePage /> },
    { path: '/dashboard', element: <Dashboard /> },
  ]
);
