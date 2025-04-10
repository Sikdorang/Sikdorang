import { IMenuItem } from '@/types/model/menu';
import MenuItem from '../../common/items/MenuItem';
import Link from 'next/link';

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
          name: '주전자 어묵탕 ',
          description: '김이 모락모락 나는 주전자에서 따스한 국물과 맛깔나는 어묵, 물떡, 곤약을 쏙쏙 뽑아먹는 안주',
          price: 22000,
          status: false,
          images: ['/images/steak.jpg'],
        },
        {
          id: 2,
          name: '청어알 냉 파스타',
          description: '맛깔나는 청어알과 향긋한 깻잎을 곁들인 차갑게 즐기는 카펠리니면 냉 파스타 (with 특제간장소스)',
          price: 20000,
          status: true,
          images: ['/images/steak.jpg'],
        },

        {
          id: 3,
          name: '참소라무침',
          description: '참소라살을 낙낙히 넣고 새콤달콤 버무려낸 침샘자극 참소라무침(with 예산시장국수)',
          price: 25000,
          status: true,
          images: ['/images/jiwhaja_dish_1.png'],
        },
        {
          id: 4,
          name: '치즈감자전',
          description: '치즈를 품고 바질을 덮은 겉바속촉 감자채전',
          price: 22000,
          status: true,
          images: ['/images/jiwhaja_dish_2.png'],
        },
        {
          id: 5,
          name: '청어알 두부쌈',
          description: '톡!톡! 터지는 청어알 무침을 두부,오이를 곁들여 김에 싸먹는 맛깔스러운 안주',
          price: 20000,

          status: true,
          images: ['/images/jiwhaja_dish_3.png'],
        },
        {
          id: 6,
          name: '닭발편육',
          description: '알록달록 칼칼,매콤한 닭발편육에 간딱맞는 부추무침을 곁들여 먹는 안주',
          price: 20000,
          status: true,
          images: ['/images/jiwhaja_dish_4.png'],
        },
        {
          id: 7,
          name: '육회',
          description: '식감 좋은 국내산 꾸리살(홍두깨살)과 영양부추,배를 곁들여 조화로운 맛의 육회',
          price: 27000,
          status: true,
          images: ['/images/jiwhaja_dish_5.png'],
        },
        {
          id: 8,
          name: '아롱사태 수육',
          description: '쫄깃하고 부드러운 아롱사태 부위를 야채와 함께 곁들여 즐기는 따뜻한 전골요리',
          price: 27000,
          status: true,
          images: ['/images/jiwhaja_dish_6.png'],
        },
        {
          id: 9,
          name: '철판 쭈꾸미볶음',
          description: '고춧기름으로 얼큰하고 볶아 불맛이 입혀진 매콤달콤 술을 부르는 쭈꾸미볶음',
          price: 25000,
          status: true,
          images: ['/images/steak.jpg'],
        },
        {
          id: 10,
          name: '감자퓌레를 곁들인 소고기찜',
          description: '아롱사태 부위를 달콤한 간장베이스에 졸인 호불호 없는 맛의 소고기찜',
          price: 27000,
          status: true,
          images: ['/images/steak.jpg'],
        },

        {
          id: 11,
          name: '옥수수 동동주',
          description: '구운 옥수수를 연상케 하는 구수함과 온은하며 적당한 바디감이 좋은 막걸리',
          price: 6000,
          status: true,
          images: ['/images/haenam_12.jpeg'],
        },
        {
          id: 12,
          name: '소백산 막걸리',
          description: '청와대 만찬주로 유명하며, 밀이 함유되어 농후하고 진하며 구수한 곡물의 향이 특징',
          price: 6000,

          status: true,
          images: ['/images/haenam_12.jpeg'],
        },
        {
          id: 13,
          name: '단청 막걸리',
          description: '단아하고 청량한 가벼운 스타일의 막걸리, 국내산 쌀로 만들어 진한 막걸리',
          price: 7000,
          status: true,
          images: ['/images/haenam_12.jpeg'],
        },
        {
          id: 14,
          name: '선호 막걸리',
          description: '천연감미료를 사용하여 담백하고 청량감이 강하며, 단맛이 없고 목넘김이 좋음',
          price: 7000,
          status: true,
          images: ['/images/haenam_12.jpeg'],
        },
        {
          id: 15,
          name: '지장수 호박막걸리',
          description: '지장수로 빚어 목넘김이 부드럽고 단호박의 달달함이 은은하게 퍼지는 깔끔한 막걸리',
          price: 7000,
          status: true,
          images: ['/images/haenam_12.jpeg'],
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
          images: ['/images/jiwhaja_dish_3.png'],
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
        <Link key={item.id} href={`/preview/${item.id}`}>
          <MenuItem item={item} />
        </Link>
      ))}
    </>
  );
}
