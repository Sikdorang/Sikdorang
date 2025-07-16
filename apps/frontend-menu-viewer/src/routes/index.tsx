import Cart from '../pages/Cart';
import MenuDetail from '../pages/MenuDetail';
import { ROUTES } from '@/constants/routes';
import CallStaff from '@/pages/CallStaff';
import CheckUserAgent from '@/pages/CheckUserAgent';
import Home from '@/pages/Home';
import Login from '@/pages/Login';
import Orders from '@/pages/Orders';
import { createBrowserRouter, RouterProvider } from 'react-router';

const router = createBrowserRouter([
  {
    path: ROUTES.ROOT,
    element: <CheckUserAgent />,
  },
  {
    path: ROUTES.STORES.DETAIL(),
    element: <Home />,
  },
  {
    path: ROUTES.MENUS.DETAIL(),
    element: <MenuDetail />,
  },
  {
    path: ROUTES.LOGIN,
    element: <Login />,
  },
  {
    path: ROUTES.CALL_STAFF,
    element: <CallStaff />,
  },
  {
    path: ROUTES.ORDERS,
    element: <Orders />,
  },
  {
    path: ROUTES.CARTS,
    element: <Cart />,
  },
]);

export default function Router() {
  return <RouterProvider router={router} />;
}
