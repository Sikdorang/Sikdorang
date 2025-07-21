export const OrdersData: IOrderItem[] = [
  {
    id: '9b7adc5c-0163-4740-a8d8-a0eec83ea2f4',
    userId: '123',
    storeId: '123',
    createdAt: '2025-07-18T02:18:50.836969',
    totalPrice: 54000,
    availableMenuIds: [],
    items: [
      {
        id: '2',
        state: 'OPTION_UNAVAILABLE',
        name: '오징어 숙회',
        menuPrice: 18000,
        quantity: 3,
        optionGroups: [],
        optionPrice: 0,
      },
    ],
  },
  {
    id: 'ebbc7bd7-d9db-41b9-af3e-ae48d1a85ca5',
    userId: '123',
    storeId: '123',
    createdAt: '2025-07-14T02:18:50.837598',
    totalPrice: 100500,
    availableMenuIds: ['1', '2'],
    items: [
      {
        id: '1',
        state: 'AVAILABLE',
        name: '참소라 무침',
        menuPrice: 25000,
        quantity: 3,
        optionGroups: [
          {
            id: 'opt1',
            title: '맵기 조절',
            items: [{ id: 'opt1-2', name: '보통맛', price: 0 }],
          },
          {
            id: 'opt1-2',
            title: '추가 토핑',
            items: [
              { id: 'opt1-2-2', name: '깻잎 추가', price: 1500 },
              { id: 'opt1-2-1', name: '참깨소스', price: 1000 },
            ],
          },
        ],
        optionPrice: 2500,
      },
      {
        id: '2',
        name: '오징어 숙회',
        state: 'PRICE_CHANGED',
        menuPrice: 18000,
        quantity: 1,
        optionGroups: [],
        optionPrice: 0,
      },
    ],
  },
  {
    id: 'a39602bc-5248-4864-afb5-43ea9395baf8',
    userId: '123',
    storeId: '123',
    createdAt: '2025-07-11T02:18:50.837939',
    totalPrice: 51000,
    availableMenuIds: [],
    items: [
      {
        id: '1',
        name: '참소라 무침',
        state: 'MENU_UNAVAILABLE',
        menuPrice: 25000,
        quantity: 2,
        optionGroups: [
          {
            id: 'opt1',
            title: '맵기 조절',
            items: [{ id: 'opt1-3', name: '매운맛', price: 500 }],
          },
        ],
        optionPrice: 500,
      },
    ],
  },
];
