import CallStaff from '@/pages/CallStaff';
import Home from '@/pages/Home';
import Orders from '@/pages/Orders';
import StoreInfo from '@/pages/StoreInfo';
import { createBrowserRouter, RouterProvider } from 'react-router';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/call-staff',
    element: <CallStaff />,
  },
  {
    path: '/orders',
    element: <Orders />,
  },
  {
    path: '/store-info/:storeId',
    element: <StoreInfo />,
  },
]);

export default function Router() {
  return <RouterProvider router={router} />;
}
