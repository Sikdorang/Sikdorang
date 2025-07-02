import CallStaff from '@/pages/CallStaff';
import CheckUserAgent from '@/pages/CheckUserAgent';
import Home from '@/pages/Home';
import Login from '@/pages/Login';
import Orders from '@/pages/Orders';
import StoreInfo from '@/pages/StoreInfo';
import { createBrowserRouter, RouterProvider } from 'react-router';

const router = createBrowserRouter([
  {
    path: '/',
    element: <CheckUserAgent />,
  },
  {
    path: '/store',
    element: <Home />,
  },
  {
    path: '/login',
    element: <Login />,
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
