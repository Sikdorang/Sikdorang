import CallStaff from '@/pages/CallStaff';
import CheckUserAgent from '@/pages/CheckUserAgent';
import Home from '@/pages/Home';
import Login from '@/pages/Login';
import Orders from '@/pages/Orders';
import { createBrowserRouter, RouterProvider } from 'react-router';
import MenuDetail from '../pages/MenuDetail';

const router = createBrowserRouter([
  {
    path: '/',
    element: <CheckUserAgent />,
  },
  {
    path: '/stores',
    element: <Home />,
  },
  {
    path: '/menus/:menuId',
    element: <MenuDetail />,
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
]);

export default function Router() {
  return <RouterProvider router={router} />;
}
