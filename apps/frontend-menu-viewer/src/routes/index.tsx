import ErrorBoundary from '@/components/common/ErrorBoundary';
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
    errorElement: <ErrorBoundary />,
  },
  {
    path: ROUTES.STORES.DETAIL(),
    element: <Store />,
    errorElement: <ErrorBoundary />,
  },
  {
    path: ROUTES.MENUS.DETAIL(),
    element: <MenuDetail />,
    errorElement: <ErrorBoundary />,
  },
  {
    path: ROUTES.LOGIN,
    element: <Login />,
    errorElement: <ErrorBoundary />,
  },
  {
    path: ROUTES.CALL_STAFF,
    element: <CallStaff />,
    errorElement: <ErrorBoundary />,
  },
  {
    path: ROUTES.ORDERS,
    element: <Orders />,
    errorElement: <ErrorBoundary />,
  },
  {
    path: ROUTES.CARTS,
    element: <Cart />,
    errorElement: <ErrorBoundary />,
  },
  { path: '*', element: <NotFoundView /> },
]);

export default function Router() {
  return <RouterProvider router={router} />;
}
