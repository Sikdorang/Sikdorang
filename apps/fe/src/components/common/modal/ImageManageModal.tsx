import React, { useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';

// Import required modules
import { FreeMode, Navigation, Thumbs } from 'swiper/modules';

export default function ImageManageModal({ isOpen, onClose, item }) {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [images, setImages] = useState([]);
  const [shortDescription, setShortDescription] = useState('');
  const [detailedDescription, setDetailedDescription] = useState('');
  const [origin, setOrigin] = useState('');
  const MAX_IMAGES = 10; // 최대 업로드 가능한 이미지 수

  // 이미지 업로드 핸들러
  const handleImageUpload = (event) => {
    const files = Array.from(event.target.files);
    if (images.length + files.length > MAX_IMAGES) {
      alert(`최대 ${MAX_IMAGES}개의 이미지만 업로드할 수 있습니다.`);
      return;
    }

    const uploadedImages = files.map((file) => URL.createObjectURL(file));
    setImages((prevImages) => [...prevImages, ...uploadedImages]);
  };

  // 이미지 삭제 핸들러
  const handleImageRemove = (index) => {
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));
  };

  // 확인 버튼 핸들러
  const handleConfirm = () => {
    const modalData = {
      images,
      shortDescription,
      detailedDescription,
      origin,
    };
    console.log('Modal Data:', modalData);
    onClose(); // 모달 닫기
  };

  // 모달이 열리지 않거나 아이템이 없으면 렌더링하지 않음
  if (!isOpen || !item) return null;

  return (
    <div className="fixed inset-0 backdrop-blur-md flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-[600px]">
        {/* 제목 */}
        <h2 className="text-xl font-bold mb-4">이미지 및 설명 관리</h2>

        {/* 이미지 업로드 */}
        <div className="mb-4 flex items-center space-x-4">
          {/* 업로드 버튼 */}
          <label
            htmlFor="imageUpload"
            className="bg-blue-500 hover:bg-blue-600 text-white text-sm font-semibold py-2 px-4 rounded cursor-pointer"
          >
            이미지 업로드
          </label>
          <input
            id="imageUpload"
            type="file"
            multiple
            accept="image/*"
            onChange={handleImageUpload}
            className="hidden" // input을 숨김 처리
          />

          {/* 업로드 상태 표시 */}
          <p className="text-sm text-gray-500">
            {images.length}/{MAX_IMAGES} 이미지를 업로드했습니다.
          </p>
        </div>

        {/* 이미지 캐러셀 미리보기 */}
        {images.length > 0 && (
          <div className="mb-4">
            <label className="block text-sm font-semibold mb-2">이미지 미리보기</label>
            <Swiper
              style={
                {
                  '--swiper-navigation-color': '#fff',
                  '--swiper-pagination-color': '#fff',
                } as React.CSSProperties
              }
              loop={true}
              spaceBetween={10}
              navigation={true}
              thumbs={{ swiper: thumbsSwiper }}
              modules={[FreeMode, Navigation, Thumbs]}
              className="mySwiper2"
            >
              {images.map((image, index) => (
                <SwiperSlide key={index} className="relative">
                  <img src={image} alt={`Uploaded ${index}`} className="w-full h-[200px] object-cover rounded" />
                  {/* 삭제 버튼 */}
                  <button
                    onClick={() => handleImageRemove(index)}
                    className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded"
                  >
                    삭제
                  </button>
                </SwiperSlide>
              ))}
            </Swiper>
            <Swiper
              onSwiper={setThumbsSwiper}
              loop={true}
              spaceBetween={10}
              slidesPerView={4}
              freeMode={true}
              watchSlidesProgress={true}
              modules={[FreeMode, Navigation, Thumbs]}
              className="mySwiper"
            >
              {images.map((image, index) => (
                <SwiperSlide key={index}>
                  <img src={image} alt={`Thumbnail ${index}`} className="w-full h-[100px] object-cover rounded" />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        )}

        {/* 한 줄 설명 */}
        <div className="mb-4">
          <label className="block text-sm font-semibold mb-2">한 줄 설명</label>
          <input
            type="text"
            value={shortDescription}
            onChange={(e) => setShortDescription(e.target.value)}
            placeholder="간단한 설명을 입력하세요."
            className="w-full border rounded px-2 py-1"
          />
        </div>

        {/* 자세한 설명 */}
        <div className="mb-4">
          <label className="block text-sm font-semibold mb-2">자세한 설명</label>
          <textarea
            value={detailedDescription}
            onChange={(e) => setDetailedDescription(e.target.value)}
            placeholder="자세한 설명을 입력하세요."
            rows={4}
            className="w-full border rounded px-2 py-1"
          ></textarea>
        </div>

        {/* 원산지 선택 */}
        <div className="mb-4">
          <label className="block text-sm font-semibold mb-2">원산지</label>
          <textarea
            value={origin}
            onChange={(e) => setOrigin(e.target.value)}
            placeholder="원산지를 입력하세요."
            rows={4}
            className="w-full border rounded px-2 py-1"
          ></textarea>
        </div>

        {/* 하단 버튼 */}
        <div className="flex justify-between mt-6">
          {/* 취소 버튼 */}
          <button onClick={onClose} className="bg-gray-300 hover:bg-gray-400 text-black px-4 py-2 rounded">
            취소
          </button>

          {/* 확인 버튼 */}
          <button onClick={handleConfirm} className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded">
            확인
          </button>
        </div>
      </div>
    </div>
  );
}
