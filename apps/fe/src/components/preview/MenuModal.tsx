import React from 'react';

export default function MenuModal({ isOpen, onClose, item }) {
  return <div>123</div>;
}

// export default function MenuModal({ isOpen, onClose, item }) {
//   // If the modal is not open or no item is provided, return null (do not render the modal)
//   if (!isOpen || !item) return null;

//   const sample_images = ['/images/steak.jpg', '/images/jiwhaja_dish_4.png', '/images/steak.jpg'];

//   return (
//     <div className="fixed inset-0 backdrop-blur-md flex items-center justify-center z-50">
//       <div className="bg-white p-6 rounded-lg shadow-lg w-[400px]">
//         <div className="mb-4">
//           <Swiper
//             slidesPerView={1}
//             spaceBetween={30}
//             loop={true}
//             pagination={{
//               clickable: true,
//             }}
//             navigation={true}
//             modules={[Pagination, Navigation]}
//             className="mySwiper"
//           >
//             {sample_images && sample_images.length > 0 ? (
//               sample_images.map((image, index) => (
//                 <SwiperSlide key={index}>
//                   <img src={image} alt={`Slide ${index}`} className="w-full h-[200px] object-cover rounded" />
//                 </SwiperSlide>
//               ))
//             ) : (
//               <SwiperSlide>
//                 <div className="flex items-center justify-center h-[200px] bg-gray-100 text-gray-500">
//                   이미지가 없습니다.
//                 </div>
//               </SwiperSlide>
//             )}
//           </Swiper>
//         </div>

//         {/* 이름 */}
//         <h2 className="text-xl font-bold mb-4">{item.name}</h2>

//         {/* 상세 설명 */}
//         <p>{item.description}</p>

//         <br />

//         {/* 원산지 */}
//         <p>소고기: 국내산</p>

//         {/* 가격 */}
//         <p className="text-gray-800 font-bold mt-4">{item.price}원</p>

//         <button
//           onClick={onClose}
//           className="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition duration-200"
//         >
//           닫기
//         </button>
//       </div>
//     </div>
//   );
// }
