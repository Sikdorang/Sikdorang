export const ROUTES = {
    ROOT: '/',
    STORES: '/stores',
    MENUS: {
      ROOT: '/menus',
      DETAIL: (menuId: string | number = ':menuId') => `/menus/${menuId}`,
    },
    LOGIN: '/login',
    CALL_STAFF: '/call-staff',
    ORDERS: '/orders',
    CARTS: "/carts"
  } as const;
  