import NotFoundView from '@/components/common/NotFoundView';
import { ROUTES } from '@/constants/routes';
import CallStaff from '@/pages/CallStaff';
import Cart from '@/pages/Cart';
import CheckUserAgent from '@/pages/CheckUserAgent';
import Login from '@/pages/Login';
import MenuDetail from '@/pages/MenuDetail';
import Orders from '@/pages/Orders';
import Store from '@/pages/Store';
import { createBrowserRouter, RouterProvider } from 'react-router';

const router = createBrowserRouter([
  {
    path: ROUTES.ROOT,
    element: <CheckUserAgent />,
  },
  {
    path: ROUTES.STORES.DETAIL(),
    element: <Store />,
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
  { path: '*', element: <NotFoundView /> },
]);

export default function Router() {
  return <RouterProvider router={router} />;
}
