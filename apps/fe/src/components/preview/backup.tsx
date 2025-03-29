// 'use client';

// import React, { useState, useEffect } from 'react';
// import Sortable from 'sortablejs';

// import Sidebar from '../../components/preview/Sidebar';
// import TopNav from '@/components/layout/Header/TopNav';
// import Modal from '../../components/preview/MenuModal';
// import MenuItem from '@/components/preview/MenuItem';

// interface MenuItem {
//   id: number;
//   name: string;
//   description: string;
//   price: string;
//   category: string;
//   status: boolean;
//   image?: string; // 이미지 URL 추가 가능
// }

// export default function MenuPage() {
//   const [menuItems, setMenuItems] = useState<MenuItem[]>([
//     {
//       id: 1,
//       name: '주전자 어묵탕 ',
//       description: '김이 모락모락 나는 주전자에서 따스한 국물과 맛깔나는 어묵, 물떡, 곤약을 쏙쏙 뽑아먹는 안주',
//       price: '22,000',
//       category: '시즌 메뉴',
//       status: false,
//       image: '/images/steak.jpg',
//     },
//     {
//       id: 2,
//       name: '청어알 냉 파스타',
//       description: '맛깔나는 청어알과 향긋한 깻잎을 곁들인 차갑게 즐기는 카펠리니면 냉 파스타 (with 특제간장소스)',
//       price: '20,000',
//       category: '시즌 메뉴',
//       status: true,
//       image: '/images/steak.jpg',
//     },

//     {
//       id: 3,
//       name: '참소라무침',
//       description: '참소라살을 낙낙히 넣고 새콤달콤 버무려낸 침샘자극 참소라무침(with 예산시장국수)',
//       price: '25,000',
//       category: '음식',
//       status: true,
//       image: '/images/jiwhaja_dish_1.png',
//     },
//     {
//       id: 4,
//       name: '치즈감자전',
//       description: '치즈를 품고 바질을 덮은 겉바속촉 감자채전',
//       price: '22,000',
//       category: '음식',
//       status: true,
//       image: '/images/jiwhaja_dish_2.png',
//     },
//     {
//       id: 5,
//       name: '청어알 두부쌈',
//       description: '톡!톡! 터지는 청어알 무침을 두부,오이를 곁들여 김에 싸먹는 맛깔스러운 안주',
//       price: '20,000',
//       category: '음식',
//       status: true,
//       image: '/images/jiwhaja_dish_3.png',
//     },
//     {
//       id: 6,
//       name: '닭발편육',
//       description: '알록달록 칼칼,매콤한 닭발편육에 간딱맞는 부추무침을 곁들여 먹는 안주',
//       price: '20,000',
//       category: '음식',
//       status: true,
//       image: '/images/jiwhaja_dish_4.png',
//     },
//     {
//       id: 7,
//       name: '육회',
//       description: '식감 좋은 국내산 꾸리살(홍두깨살)과 영양부추,배를 곁들여 조화로운 맛의 육회',
//       price: '27,000',
//       category: '음식',
//       status: true,
//       image: '/images/jiwhaja_dish_5.png',
//     },
//     {
//       id: 8,
//       name: '아롱사태 수육',
//       description: '쫄깃하고 부드러운 아롱사태 부위를 야채와 함께 곁들여 즐기는 따뜻한 전골요리',
//       price: '27,000',
//       category: '음식',
//       status: true,
//       image: '/images/jiwhaja_dish_6.png',
//     },
//     {
//       id: 9,
//       name: '철판 쭈꾸미볶음',
//       description: '고춧기름으로 얼큰하고 볶아 불맛이 입혀진 매콤달콤 술을 부르는 쭈꾸미볶음',
//       price: '25,000',
//       category: '음식',
//       status: true,
//       image: '/images/steak.jpg',
//     },
//     {
//       id: 10,
//       name: '감자퓌레를 곁들인 소고기찜',
//       description: '아롱사태 부위를 달콤한 간장베이스에 졸인 호불호 없는 맛의 소고기찜',
//       price: '27,000',
//       category: '음식',
//       status: true,
//       image: '/images/steak.jpg',
//     },

//     {
//       id: 11,
//       name: '옥수수 동동주',
//       description: '구운 옥수수를 연상케 하는 구수함과 온은하며 적당한 바디감이 좋은 막걸리',
//       price: '6,000',
//       category: '막걸리',
//       status: true,
//       image: '/images/haenam_12.jpeg',
//     },
//     {
//       id: 12,
//       name: '소백산 막걸리',
//       description: '청와대 만찬주로 유명하며, 밀이 함유되어 농후하고 진하며 구수한 곡물의 향이 특징',
//       price: '6,000',
//       category: '막걸리',
//       status: true,
//       image: '/images/haenam_12.jpeg',
//     },
//     {
//       id: 13,
//       name: '단청 막걸리',
//       description: '단아하고 청량한 가벼운 스타일의 막걸리, 국내산 쌀로 만들어 진한 막걸리',
//       price: '7,000',
//       category: '막걸리',
//       status: true,
//       image: '/images/haenam_12.jpeg',
//     },
//     {
//       id: 14,
//       name: '선호 막걸리',
//       description: '천연감미료를 사용하여 담백하고 청량감이 강하며, 단맛이 없고 목넘김이 좋음',
//       price: '7,000',
//       category: '막걸리',
//       status: true,
//       image: '/images/haenam_12.jpeg',
//     },
//     {
//       id: 15,
//       name: '지장수 호박막걸리',
//       description: '지장수로 빚어 목넘김이 부드럽고 단호박의 달달함이 은은하게 퍼지는 깔끔한 막걸리',
//       price: '7,000',
//       category: '막걸리',
//       status: true,
//       image: '/images/haenam_12.jpeg',
//     },
//     {
//       id: 16,
//       name: '호랑이 생막걸리',
//       description: '아스파탐을 첨가하지 않아 자연스러운 단맛이 특징',
//       price: '7,000',
//       category: '막걸리',
//       status: true,
//       image: '/images/haenam_12.jpeg',
//     },
//     {
//       id: 17,
//       name: '금정산성 막걸리',
//       description: '대한민국 민속주 1호 막걸리, 부산 금정산성에서 제조한 누룩, 산미와 구수함이 일품',
//       price: '8,000',
//       category: '막걸리',
//       status: true,
//       image: '/images/haenam_12.jpeg',
//     },
//     {
//       id: 18,
//       name: '구름을 벗삼아',
//       description: '문경 햅쌀로 만들어져 항아리에 숙성되는 막걸리, 달지 않고 청량한 것이 특징',
//       price: '8,000',
//       category: '막걸리',
//       status: true,
//       image: '/images/haenam_12.jpeg',
//     },
//     {
//       id: 80,
//       name: '오미자 막걸리',
//       description: '문경 오미자의 은은한 연분홍 빛 막걸리, 부드럽고 시원한 청량감이 특징',
//       price: '8,000',
//       category: '막걸리',
//       status: true,
//       image: '/images/haenam_12.jpeg',
//     },
//     {
//       id: 19,
//       name: '대대포 블루',
//       description: '토종벌꿀과 유기농쌀로 빚어 부드러운 단맛과 목넘김이 좋은 막걸리',
//       price: '10,000',
//       category: '막걸리',
//       status: true,
//       image: '/images/haenam_12.jpeg',
//     },
//     {
//       id: 20,
//       name: '송명섭 막걸리',
//       description: '막걸리계의 평양냉면, 가벼운 바디감과 싱거운 듯 드라이한 마성의 맛',
//       price: '11,000',
//       category: '막걸리',
//       status: true,
//       image: '/images/haenam_12.jpeg',
//     },
//     {
//       id: 21,
//       name: '옥주 달콤',
//       description: '귀욤뽀짝! 100% 우리 찹쌀로 빚은 생 막걸리, 찹쌀 본연의 단맛과 귀엽고 부드러운 목넘김',
//       price: '12,000',
//       category: '막걸리',
//       status: true,
//       image: '/images/haenam_12.jpeg',
//     },
//     {
//       id: 22,
//       name: '옥주 새콤',
//       description: '100% 우리 찹쌀로 빚은 생 막걸리, 찹인곰 감미료없이 요구르트처럼 부담되지 않는 새콤달콤한 맛',
//       price: '12,000',
//       category: '막걸리',
//       status: true,
//       image: '/images/haenam_12.jpeg',
//     },
//     {
//       id: 23,
//       name: '부자 막걸리',
//       description: '드라이한 맛과 묵직함이 느껴지는 진한 느낌의 탁주',
//       price: '12,000',
//       category: '막걸리',
//       status: true,
//       image: '/images/haenam_12.jpeg',
//     },
//     {
//       id: 24,
//       name: '별산',
//       description: '침샘자극하는 상큼한 유자향, 달지 않아 깔끔하고 구수한 끝맛이 매력적인 막걸리',
//       price: '13,000',
//       category: '막걸리',
//       status: true,
//       image: '/images/haenam_12.jpeg',
//     },
//     {
//       id: 81,
//       name: '해남 막걸리 9도',
//       description: '해남 현지분들의 원픽! 무감미료 찹쌀막걸리로 청량한 청포도향이 향긋한 막걸리 ',
//       price: '13,000',
//       category: '막걸리',
//       status: true,
//       image: '/images/haenam_12.jpeg',
//     },
//     {
//       id: 82,
//       name: '쌀은 원래 달다',
//       description: '국내산 쌀로만 단맛을 구현한 무감미료 프리미엄 막걸리, 은은한 유당의 단맛이 매력적인 탁주',
//       price: '14,000',
//       category: '막걸리',
//       status: true,
//       image: '/images/haenam_12.jpeg',
//     },

//     {
//       id: 25,
//       name: '우곡생주',
//       description: '고급스러운 맛의 탁주, 2019 대한민국 우리술품평회 탁주부문 대상 수상',
//       price: '15,000',
//       category: '프리미엄 탁주',
//       status: true,
//       image: '/images/haenam_12.jpeg',
//     },
//     {
//       id: 26,
//       name: '붉은원숭이',
//       description: '붉은색을 띄는 홍국쌀으로 빚어 붉은빛의 탁주, 전체적인 밸런스가 좋은 막걸리',
//       price: '17,000',
//       category: '프리미엄 탁주',
//       status: true,
//       image: '/images/haenam_12.jpeg',
//     },
//     {
//       id: 27,
//       name: '해남 막걸리 (12도)',
//       description: '부담스럽지 않은 산도와 톡쏘는 알콜향, 가성비의 웰메이드 막걸리',
//       price: '18,000',
//       category: '프리미엄 탁주',
//       status: true,
//       image: '/images/haenam_12.jpeg',
//     },
//     {
//       id: 28,
//       name: '너디호프 드라이',
//       description: '바질막걸리라니!! 바질의 향긋함이 입안을 스치고 가벼운 산미가 올라오는 다채로운 풍미',
//       price: '19,000',
//       category: '프리미엄 탁주',
//       status: true,
//       image: '/images/haenam_12.jpeg',
//     },
//     {
//       id: 29,
//       name: '복순도가 손막걸리',
//       description: '막걸리계의 돔페리뇽, 샴페인 막걸리, 풍부한 탄산과 과실향 느껴지는 산미가 특징',
//       price: '25,000',
//       category: '프리미엄 탁주',
//       status: true,
//       image: '/images/haenam_12.jpeg',
//     },
//     {
//       id: 30,
//       name: '유톡자톡 스파클 링',
//       description: '청량 달콤한 유자향이 스파클하게 톡톡 터져 상큼한 샴페인 막걸리',
//       price: '25,000',
//       category: '프리미엄 탁주',
//       status: true,
//       image: '/images/haenam_12.jpeg',
//     },
//     {
//       id: 31,
//       name: '별산 오디 스파클링',
//       description: '국내산 오디 100%, 짜릿한 천연탄산의 청량감과 상큼한 오디 맛의 조화',
//       price: '25,000',
//       category: '프리미엄 탁주',
//       status: true,
//       image: '/images/haenam_12.jpeg',
//     },
//     {
//       id: 32,
//       name: '쑥크레',
//       description: '달콤함을 뜻하는 불어 수크레(Sucre), 쑥의 어린 잎만 엄선하여 빚은 부드럽고 달콤한 향긋한 쑥 탁주',
//       price: '25,000',
//       category: '프리미엄 탁주',
//       status: true,
//       image: '/images/haenam_12.jpeg',
//     },
//     {
//       id: 33,
//       name: '해창 막걸리 (6도)',
//       description: '막걸리계의 롤스로이스 해창막걸리, 6도는 달콤한 햇과일의 향, 담백·깔끔, 화사한 마무리',
//       price: '16,000',
//       category: '프리미엄 탁주',
//       status: true,
//       image: '/images/haenam_12.jpeg',
//     },
//     {
//       id: 34,
//       name: '해창 막걸리 (9도)',
//       description: '막걸리계의 롤스로이스 해창막걸리, 9도는 살짝 묵직함 뒤에 오는 기분좋은 산미, 고소항 풍미',
//       price: '24,000',
//       category: '프리미엄 탁주',
//       status: true,
//       image: '/images/haenam_12.jpeg',
//     },
//     {
//       id: 35,
//       name: '해창막걸리 (12도)',
//       description: '막걸리계의 롤스로이스 해창막걸리, 12도 묵직한 바디감, 기분좋은 산미, 고소한 풍미 가득채운 탁주',
//       price: '30,000',
//       category: '프리미엄 탁주',
//       status: true,
//       image: '/images/haenam_12.jpeg',
//     },

//     {
//       id: 36,
//       name: '동학 1957',
//       description: '담백하면서도 미세한 단맛과 가벼운 산미가 있어 깔끔하며 밸런스가 좋은 청주',
//       price: '10,000',
//       category: '청주',
//       status: true,
//       image: '/images/haenam_12.jpeg',
//     },
//     {
//       id: 37,
//       name: '조선주조사',
//       description: '누룩향없이 깔끔하고 담백한 맛이 좋은 사케에 가까운 청주',
//       price: '12,000',
//       category: '청주',
//       status: true,
//       image: '/images/haenam_12.jpeg',
//     },
//     {
//       id: 38,
//       name: '한청',
//       description: '한국청주, 새콤달콤한 맛에 깊은 향, 청량감으로 한식과 잘 어울리는 청주',
//       price: '16,000',
//       category: '청주',
//       status: true,
//       image: '/images/haenam_12.jpeg',
//     },
//     {
//       id: 39,
//       name: '서설',
//       description: '새벽에 내린 눈과 같은 깨끗한 청주, 깔끔하고 뒤끝 없는 맛과 여심저격 패키징',
//       price: '28,000',
//       category: '청주',
//       status: true,
//       image: '/images/haenam_12.jpeg',
//     },

//     {
//       id: 40,
//       name: '지리산강쇠',
//       description: '지리산에서 자생하는 약초를 넣고 전통방식으로 발효시킨 약주, 단맛이 강함',
//       price: '8,000',
//       category: '약주',
//       status: true,
//       image: '/images/haenam_12.jpeg',
//     },
//     {
//       id: 41,
//       name: '사랑할 때',
//       description: '충주 사과의 달콤한 풍미가 가득한 러블리한 약주, 새콤하고 가벼운 느낌의 약주',
//       price: '10,000',
//       category: '약주',
//       status: true,
//       image: '/images/haenam_12.jpeg',
//     },
//     {
//       id: 42,
//       name: '감자술',
//       description: '평창 특산품인 감자를 쪄서 누룩과 함께 빚어낸 약주, 산미가 있으면서도 구수한 단맛',
//       price: '10,000',
//       category: '약주',
//       status: true,
//       image: '/images/haenam_12.jpeg',
//     },
//     {
//       id: 43,
//       name: '빙탄복',
//       description: '복분자가 들어간 스파클링 과실주, 포도 탄산음료를 마시는 듯 가벼운 느낌',
//       price: '13,000',
//       category: '약주',
//       status: true,
//       image: '/images/haenam_12.jpeg',
//     },
//     {
//       id: 44,
//       name: '이제 (梨製)',
//       description: '나주배로 만든 국내최초 Perry, 풍부한 배의 풍미와 달콤하고 청량한 맛의 과실주',
//       price: '14,000',
//       category: '약주',
//       status: true,
//       image: '/images/haenam_12.jpeg',
//     },
//     {
//       id: 45,
//       name: '궁중술 왕주',
//       description: '명성왕후 민씨 집안에서 빚던 가양주, 궁중술로 유명, 적당한 산미와 단맛, 은은한 약초내음이 일품',
//       price: '15,000',
//       category: '약주',
//       status: true,
//       image: '/images/haenam_12.jpeg',
//     },
//     {
//       id: 46,
//       name: '오메기술',
//       description: "'오메기'는 좁쌀의 제주 방언으로, 뛰어난 산미와 감칠맛의 약주",
//       price: '15,000',
//       category: '약주',
//       status: true,
//       image: '/images/haenam_12.jpeg',
//     },
//     {
//       id: 47,
//       name: '제주 니모메',
//       description: "'니모메'는 제주 방언으로 '너의 마음에'라는 뜻, 귤피가 들어가 상큼하고 가볍게 마실 수 있는 약주",
//       price: '15,000',
//       category: '약주',
//       status: true,
//       image: '/images/haenam_12.jpeg',
//     },
//     {
//       id: 48,
//       name: '우희열 한산소곡주',
//       description: '가장 오래된 술, 충남 서천의 가양주, 곡물의 고소함, 장맛의 구수함, 묵직한 단맛의 앉은뱅이 술',
//       price: '18,000',
//       category: '약주',
//       status: true,
//       image: '/images/haenam_12.jpeg',
//     },
//     {
//       id: 49,
//       name: '솔송주',
//       description: '송순(소나무싹)이 들어가 은은한 솔향기와 함께 감칠맛, 쌉쌀한 맛으로 끝맛이 좋은 약주',
//       price: '18,000',
//       category: '약주',
//       status: true,
//       image: '/images/haenam_12.jpeg',
//     },
//     {
//       id: 50,
//       name: '술샘 16',
//       description: '국내산 오미자를 넣어 빚은 약주 적당한 단맛과 산미가 조화로운 맛',
//       price: '21,000',
//       category: '약주',
//       status: true,
//       image: '/images/haenam_12.jpeg',
//     },
//     {
//       id: 51,
//       name: '송이주',
//       description: '은은하고 향긋한 송이버섯 향이 매력적인 깔끔한 맛의 약주',
//       price: '23,000',
//       category: '약주',
//       status: true,
//       image: '/images/haenam_12.jpeg',
//     },
//     {
//       id: 52,
//       name: '능이주',
//       description: '향긋한 능이버섯향이 매력적이며 미세한 단맛과 새콤한 산미의 약주',
//       price: '23,000',
//       category: '약주',
//       status: true,
//       image: '/images/haenam_12.jpeg',
//     },
//     {
//       id: 53,
//       name: '꿀샘 16',
//       description: '달콤한 벌꿀향이지만 적당한 단맛과 밸런스가 좋아 목넘김이 부드러워 호불호 없는 약주',
//       price: '24,000',
//       category: '약주',
//       status: true,
//       image: '/images/haenam_12.jpeg',
//     },
//     {
//       id: 54,
//       name: '고흥유자주 8도/12도',
//       description: '유자 특유의 상큼함과 입에 머금었을 때 입안 전체에 은은히 퍼지는 유자향이 매력적인 약주',
//       price: '20,000 / 23,000',
//       category: '약주',
//       status: true,
//       image: '/images/haenam_12.jpeg',
//     },
//     {
//       id: 55,
//       name: '매화깊은밤',
//       description: '추위를 이겨내고 피어난 매화의 향을 머금은 향긋한 매실 약주',
//       price: '25,000',
//       category: '약주',
//       status: true,
//       image: '/images/haenam_12.jpeg',
//     },
//     {
//       id: 56,
//       name: '김포예주',
//       description: '약주의 중후함과 화이트와인 같은 달달함, 깔끔하고 은은한 향취 프리미엄 약주',
//       price: '33,000',
//       category: '약주',
//       status: true,
//       image: '/images/haenam_12.jpeg',
//     },

//     {
//       id: 57,
//       name: '바다한잔 동해',
//       description: '동해바다의 해양심층수를 사용하여 미네랄이 풍부하고 달달하고 부드럽고 향긋한 소주',
//       price: '7,000',
//       category: '증류식 소주, 리큐르',
//       status: true,
//       image: '/images/haenam_12.jpeg',
//     },
//     {
//       id: 58,
//       name: '한라산 순한',
//       description: "제로슈거의 깔끔한 소주, '제주산 보리' 증류 원액을 사용하여 깊은 풍미의 순한 소주",
//       price: '7,000',
//       category: '증류식 소주, 리큐르',
//       status: true,
//       image: '/images/haenam_12.jpeg',
//     },
//     {
//       id: 59,
//       name: '한라산 21도',
//       description: '청정 제주에서 생산된 증류원액과 화산안밤수로 만든 소주, 첫 느낌이 부드럽고 뒤 끝이 깨끗한 소주',
//       price: '7,000',
//       category: '증류식 소주, 리큐르',
//       status: true,
//       image: '/images/haenam_12.jpeg',
//     },
//     {
//       id: 60,
//       name: '느린마을증류주',
//       description: '고창의 농산물로 만든 구수한 쌀의 풍미와 부드러운 목넘김이 좋은 소주',
//       price: '8,000',
//       category: '증류식 소주, 리큐르',
//       status: true,
//       image: '/images/haenam_12.jpeg',
//     },
//     {
//       id: 61,
//       name: '밀담',
//       description: '예천의 토종 단수수를 세 번 증류한 깔끔한 럼스타일, 맑고 투명하여 부드러운 목넘김',
//       price: '10,000',
//       category: '증류식 소주, 리큐르',
//       status: true,
//       image: '/images/haenam_12.jpeg',
//     },
//     {
//       id: 62,
//       name: '독도소주',
//       description: '우리 쌀과 울릉도 심층수 우리 소주, 쌀의 은은한 향이 살아있는 부드럽고 감미로운 맛의 감압증류주',
//       price: '11,000',
//       category: '증류식 소주, 리큐르',
//       status: true,
//       image: '/images/haenam_12.jpeg',
//     },
//     {
//       id: 63,
//       name: '안동일품 17도',
//       description: '전통적인 안동소주 제조방식으로 빚은 후 가볍게 17도로 마실 수 있는 증류주',
//       price: '1,1000',
//       category: '증류식 소주, 리큐르',
//       status: true,
//       image: '/images/haenam_12.jpeg',
//     },
//     {
//       id: 64,
//       name: '도래하',
//       description: '민트와 감초의 향미가 가볍고 부드러운 목넘김이 장점인 증류주',
//       price: '13,000',
//       category: '증류식 소주, 리큐르',
//       status: true,
//       image: '/images/haenam_12.jpeg',
//     },
//     {
//       id: 65,
//       name: '명량 스컬',
//       description: '서울의 밤 저도수 버전으로 향긋한 매실향과 부담없는 도수로 술술 넘어가는 매실소주',
//       price: '13,000',
//       category: '증류식 소주, 리큐르',
//       status: true,
//       image: '/images/haenam_12.jpeg',
//     },
//     {
//       id: 66,
//       name: '매실원주',
//       description: '매실의 새콤달콤한 맛과 같은 도수로 여성분들의 취향저격 매실주',
//       price: '13,000',
//       category: '증류식 소주, 리큐르',
//       status: true,
//       image: '/images/haenam_12.jpeg',
//     },
//     {
//       id: 67,
//       name: '안동일품 21도',
//       description: '전통적인 안동소주 제조방식, 21도이지만 자극적이지 않은 부드러운 목넘김',
//       price: '13,000',
//       category: '증류식 소주, 리큐르',
//       status: true,
//       image: '/images/haenam_12.jpeg',
//     },
//     {
//       id: 68,
//       name: '도원결의',
//       description: '입안을 가득 매우는 향긋한 복숭아 증류주',
//       price: '14,000',
//       category: '증류식 소주, 리큐르',
//       status: true,
//       image: '/images/haenam_12.jpeg',
//     },
//     {
//       id: 69,
//       name: '강릉소주',
//       description: '강릉에서 나오는 쌀 소주, 고도수의 타격감은 있지만 순한 목넘김과 적당한 단맛',
//       price: '14,000',
//       category: '증류식 소주, 리큐르',
//       status: true,
//       image: '/images/haenam_12.jpeg',
//     },
//     {
//       id: 70,
//       name: '두레앙 증류주',
//       description: '천안 거봉을 증류하여 만든 증류주, 거봉의 향긋한 풍미와 깔끔함이 일품',
//       price: '15,000',
//       category: '증류식 소주, 리큐르',
//       status: true,
//       image: '/images/haenam_12.jpeg',
//     },
//     {
//       id: 71,
//       name: '황금보리',
//       description: '황금보리를 원료로 하여 만든 증류주, 고소한 향미가 한식과 잘 어울림',
//       price: '15,000',
//       category: '증류식 소주, 리큐르',
//       status: true,
//       image: '/images/haenam_12.jpeg',
//     },
//     {
//       id: 72,
//       name: '서울의 밤',
//       description: '노간주열매가 들어간 진스타일의 황매실 리큐르, 풍부한 매실 향과 은은한 단맛',
//       price: '17,000',
//       category: '증류식 소주, 리큐르',
//       status: true,
//       image: '/images/haenam_12.jpeg',
//     },

//     {
//       id: 73,
//       name: '제5원소',
//       description: '평양냉면의 식초 세 방울!! 깔끔, 상큼, 우아한 맛의 탁주!! 드라이한 막걸리 마니아분들에게 강추',
//       price: '15,000',
//       category: '지화자 PICK! 전통주',
//       status: true,
//       image: '/images/haenam_12.jpeg',
//     },
//     {
//       id: 74,
//       name: '옥주 패션후르츠',
//       description: '패션후르츠의 상큼한 향이 풍기는 신상 탁주!! 옅은 단맛과 산미가 밸런스 좋은 탁주',
//       price: '15,000',
//       category: '지화자 PICK! 전통주',
//       status: true,
//       image: '/images/haenam_12.jpeg',
//     },
//     {
//       id: 75,
//       name: '스톡홀롬신드롬',
//       description: '패션후르츠, 라임의 상큼함이 돋보이는 탁주, 식전주로 추천드리는 가벼운 탁주',
//       price: '15,000',
//       category: '지화자 PICK! 전통주',
//       status: true,
//       image: '/images/haenam_12.jpeg',
//     },
//     {
//       id: 76,
//       name: '낙화주',
//       description: '찹쌀을 고온에서 로스팅하여 발효한 로스팅 막걸리, 달달고소하고 부드러운 목넘김의 탁주',
//       price: '15,000',
//       category: '지화자 PICK! 전통주',
//       status: true,
//       image: '/images/haenam_12.jpeg',
//     },
//     {
//       id: 77,
//       name: '댄싱22',
//       description: '7개의 사과로 빚은 증류주, 은은한 사과향과 부드러운 목넘김, 깔끔하고 옅은 알콜향의 증류주',
//       price: '16,000',
//       category: '지화자 PICK! 전통주',
//       status: true,
//       image: '/images/haenam_12.jpeg',
//     },
//     {
//       id: 78,
//       name: '동해22',
//       description: '국산쌀 100% 증류해 만든 소주, 울릉도 해양심층의 천연미네랄 함유, 균형감이 좋고 깔끔한 소주',
//       price: '17,000',
//       category: '지화자 PICK! 전통주',
//       status: true,
//       image: '/images/haenam_12.jpeg',
//     },
//     {
//       id: 79,
//       name: '서설',
//       description: '새벽에 내린 눈과 같은 깨끗한 청주, 깔끔하고 뒤끝 없는 맛과 여심저격 패키징',
//       price: '28,000',
//       category: '지화자 PICK! 전통주',
//       status: true,
//       image: '/images/haenam_12.jpeg',
//     },

//     {
//       id: 83,
//       name: '소면 추가',
//       description: '',
//       price: '3,000',
//       category: '추가 메뉴',
//       status: true,
//       image: '/images/steak.jpg',
//     },
//     {
//       id: 84,
//       name: '두부 추가',
//       description: '',
//       price: '3,000',
//       category: '추가 메뉴',
//       status: true,
//       image: '/images/steak.jpg',
//     },
//     // 추가 메뉴 아이템...
//   ]);

//   const [categories] = useState([
//     '시즌 메뉴',
//     '음식',
//     '막걸리',
//     '프리미엄 탁주',
//     '청주',
//     '약주',
//     '증류식 소주, 리큐르',
//     '지화자 PICK! 전통주',
//     '추가 메뉴',
//   ]);
//   const [selectedCategory, setSelectedCategory] = useState('시즌 메뉴');
//   const [filteredMenuItems, setFilteredMenuItems] = useState<MenuItem[]>([]);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);

//   // 편집 모드 상태 관리
//   const [isEditing, setIsEditing] = useState(false);

//   // 모달 열기/닫기 함수
//   const openModal = (item: MenuItem) => {
//     if (!isEditing) {
//       setSelectedItem(item);
//       setIsModalOpen(true);
//     }
//   };

//   const closeModal = () => {
//     setSelectedItem(null);
//     setIsModalOpen(false);
//   };

//   // 카테고리 변경 시 필터링
//   useEffect(() => {
//     const filtered = menuItems.filter((item) => item.category === selectedCategory);
//     setFilteredMenuItems(filtered);
//   }, [selectedCategory, menuItems]);

//   // 드래그 앤 드롭 설정
//   useEffect(() => {
//     const gridElement = document.querySelector('.menu-grid');
//     if (gridElement && isEditing) {
//       Sortable.create(gridElement, {
//         animation: 150,
//         onEnd(evt) {
//           const newFilteredItems = [...filteredMenuItems];
//           const [movedItem] = newFilteredItems.splice(evt.oldIndex!, 1);
//           newFilteredItems.splice(evt.newIndex!, 0, movedItem);

//           // 필터링된 메뉴 아이템 업데이트
//           setFilteredMenuItems(newFilteredItems);

//           // 전체 메뉴 아이템 업데이트
//           const updatedMenuItems = menuItems.map(
//             (item) => newFilteredItems.find((newItem) => newItem.id === item.id) || item,
//           );
//           setMenuItems(updatedMenuItems);
//         },
//       });
//     }
//   }, [filteredMenuItems, isEditing]);

//   return (
//     <>
//       <TopNav />
//       <div className="wrapper mx-auto flex flex-col sm:flex-row gap-16 mt-12">
//         <Sidebar categories={categories} selectedCategory={selectedCategory} onSelectCategory={setSelectedCategory} />

//         <div className=" grid md:grid-cols-2 lg:grid-cols-3 grid-cols-1 gap-10 flex-1">
//           {filteredMenuItems.map((item) => MenuItem(openModal, item, isEditing))}
//         </div>

//         {EditButton(isEditing, setIsEditing)}
//       </div>

//       {isModalOpen && <Modal isOpen={isModalOpen} onClose={closeModal} item={selectedItem} />}
//     </>
//   );
// }
// function EditButton(isEditing: boolean, setIsEditing: React.Dispatch<React.SetStateAction<boolean>>) {
//   return (
//     <button
//       className={`fixed bottom-15 right-15 text-black font-bold py-2 px-4 w-25 h-25 rounded-full shadow-lg focus:outline-none ${isEditing ? 'bg-green-300 hover:bg-green-400' : 'bg-white hover:bg-gray-100'}`}
//       onClick={() => setIsEditing((prev) => !prev)}
//     >
//       {isEditing ? '편집 완료' : '편집 모드'}
//     </button>
//   );
// }
