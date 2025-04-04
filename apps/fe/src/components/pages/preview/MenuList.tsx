import { IMenuItem } from '@/types/model/menu';
import MenuItem from './MenuItem';

type IMenuCategory = {
  id: string;
  name: string;
  items: IMenuItem[];
};

export default function MenuList() {
  const sampleData: IMenuCategory[] = [
    {
      id: 'cat-1',
      name: '메인 메뉴',
      items: [
        {
          id: 1,
          name: '스테이크',
          image: '/images/jiwhaja_dish_1.png',
          description: '육즙 가득한 그릴드 스테이크 육즙 가득한 그릴드 스테이크 ',
          price: 19000,
          status: true,
        },
        {
          id: 2,
          name: '파스타',
          image: '/images/jiwhaja_dish_2.png',
          description: '부드러운 크림 파스타',
          price: 13000,
          status: false,
        },
        {
          id: 3,
          name: '스테이크',
          image: '/images/jiwhaja_dish_1.png',
          description: '육즙 가득한 그릴드 스테이크',
          price: 19000,
          status: true,
        },
        {
          id: 4,
          name: '파스타',
          image: '/images/jiwhaja_dish_2.png',
          description: '부드러운 크림 파스타',
          price: 13000,
          status: false,
        },
        {
          id: 5,
          name: '스테이크',
          image: '/images/jiwhaja_dish_1.png',
          description: '육즙 가득한 그릴드 스테이크',
          price: 19000,
          status: true,
        },
        {
          id: 6,
          name: '파스타',
          image: '/images/jiwhaja_dish_2.png',
          description: '부드러운 크림 파스타',
          price: 13000,
          status: false,
        },
        {
          id: 7,
          name: '스테이크',
          image: '/images/jiwhaja_dish_1.png',
          description: '육즙 가득한 그릴드 스테이크',
          price: 19000,
          status: true,
        },
        {
          id: 8,
          name: '파스타',
          image: '/images/jiwhaja_dish_2.png',
          description: '부드러운 크림 파스타',
          price: 13000,
          status: false,
        },
        {
          id: 9,
          name: '스테이크',
          image: '/images/jiwhaja_dish_1.png',
          description: '육즙 가득한 그릴드 스테이크',
          price: 19000,
          status: true,
        },
        {
          id: 10,
          name: '파스타',
          image: '/images/jiwhaja_dish_2.png',
          description: '부드러운 크림 파스타',
          price: 13000,
          status: false,
        },
      ],
    },
    {
      id: 'cat-2',
      name: '음료',
      items: [
        {
          id: 3,
          name: '아메리카노',
          image: '/images/jiwhaja_dish_3.png',
          description: '진한 에스프레소 베이스',
          price: 4000,
          status: true,
        },
      ],
    },
  ];
  return (
    <>
      {sampleData[0].items.map((item) => (
        <MenuItem key={item.id} item={item} />
      ))}
    </>
  );
}
