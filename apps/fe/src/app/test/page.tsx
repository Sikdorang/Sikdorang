import Link from 'next/link';
import Image from 'next/image';

type IMenuCategory = {
  id: string;
  name: string;
  items: IMenuItem[];
};

type IMenuItem = {
  id: string;
  name: string;
  image: string;
  description: string;
  price: number;
  status: boolean;
};

const sampleData: IMenuCategory[] = [
  {
    id: 'cat-1',
    name: '메인 메뉴',
    items: [
      {
        id: '1',
        name: '스테이크',
        image: '/images/jiwhaja_dish_3.png',
        description: '육즙 가득한 그릴드 스테이크',
        price: 19000,
        status: true,
      },
      {
        id: '2',
        name: '파스타',
        image: '/images/jiwhaja_dish_3.png',
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
        id: '3',
        name: '아메리카노',
        image: '/images/jiwhaja_dish_3.png',
        description: '진한 에스프레소 베이스',
        price: 4000,
        status: true,
      },
    ],
  },
];

export default function Page() {
  return (
    <div className="max-w-5xl mx-auto p-6 space-y-12">
      {sampleData.map((category) => (
        <section key={category.id} className="space-y-6">
          {/* 카테고리 이름 */}
          <h2 className="text-xl font-bold text-gray-900 border-b pb-2">{category.name}</h2>

          {/* 메뉴 아이템들 */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {category.items.map((item) => (
              <Link href={`/${item.id}`} key={item.id}>
                <div
                  className={`rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 bg-white 
                  ${!item.status ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                >
                  {/* 이미지 영역 */}
                  <div className="relative aspect-[8/7] w-full">
                    <Image
                      src={item.image || '/placeholder.jpg'}
                      alt={item.name}
                      fill
                      className={`object-cover transition-transform duration-300 ${
                        item.status ? 'hover:scale-105' : 'grayscale blur-[1px]'
                      }`}
                    />
                    {!item.status && (
                      <div className="absolute inset-0 bg-white/70 flex items-center justify-center z-10">
                        <span className="text-sm text-gray-700 font-medium">품절</span>
                      </div>
                    )}
                  </div>

                  {/* 텍스트 영역 */}
                  <div className={`flex flex-col gap-2 p-4 ${!item.status && 'opacity-50'}`}>
                    <div className="flex flex-col gap-1">
                      <h3 className="text-base font-semibold text-gray-900">{item.name}</h3>
                      <p className="text-sm text-gray-500 line-clamp-2">{item.description}</p>
                    </div>
                    <p className="text-base font-bold text-green-600 mt-1">{item.price.toLocaleString()}원</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
