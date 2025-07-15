export const MenuDetailData: IMenuDetail = {
  id: '12345',
  name: '참소라 무침',
  description:
    '정말 맛있는 참소라 무침입니다. 이거 안 시키면 평생 후회할거야 @@@',
  price: 25000,
  isNew: true,
  isPopular: true,
  imageUrls: [
    'https://cdn.myapp.com/menus/12345/1.jpg',
    'https://cdn.myapp.com/menus/12345/2.jpg',
    'https://cdn.myapp.com/menus/12345/3.jpg',
  ],
  optionGroups: [
    {
      id: '2132131233232',
      title: '맵기 옵션',
      required: false,
      minSelectable: 0,
      maxSelectable: 2,
      items: [
        { id: '1', name: '기본맛', price: 0 },
        { id: '2', name: '보통맛', price: 500 },
        { id: '3', name: '매운맛', price: 1000 },
      ],
    },
    {
      id: 'sid123123eDish',
      title: '사이드 추가',
      required: true,
      minSelectable: 1,
      maxSelectable: 3,
      items: [
        { id: '4', name: '공기밥', price: 1000 },
        { id: '5', name: '김치 추가', price: 500 },
        { id: '6', name: '샐러드', price: 2000 },
      ],
    },
  ],
};
