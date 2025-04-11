import React, { useState } from 'react';
import Image from 'next/image';

import deleteIcon from '@public/icons/ic_x.svg';
import addIcon from '@public/icons/ic_plus.svg';

interface MenuImageGalleryProps {
  images?: string[];
  setImages: (images: string[]) => void;
  maxImages?: number;
}

export default function MenuImageGallery({ images = [], setImages, maxImages = 10 }: MenuImageGalleryProps) {
  const [selectedImage, setSelectedImage] = useState<string | null>((images || [])[0] || null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    const validImages = images || [];

    if (validImages.length + files.length > maxImages) {
      return;
    }

    const uploadedImages = files.map((file) => URL.createObjectURL(file));
    setImages([...validImages, ...uploadedImages]);

    if (!selectedImage && uploadedImages.length > 0) {
      setSelectedImage(uploadedImages[0]);
    }
  };

  const handleDeleteImage = (index: number) => {
    const updatedImages = images.filter((_, i) => i !== index);
    setImages(updatedImages);

    if (selectedImage === images[index]) {
      setSelectedImage(updatedImages[0] || null);
    }
  };

  return (
    <div>
      <div className="w-full h-64 border border-blue-200 rounded-md flex items-center justify-center mb-4">
        {selectedImage ? (
          <img src={selectedImage} alt="선택된 이미지" className="w-full h-full object-cover rounded-md" />
        ) : (
          <p className="text-gray-400 text-body-xs select-none">이미지를 업로드해 주세요</p>
        )}
      </div>

      <div className="flex items-center space-x-2 overflow-x-auto mb-3">
        {images?.map((image, index) => (
          <div key={index} className="relative">
            <img
              src={image}
              alt={`${index + 1}`}
              className={`w-16 h-16 object-cover rounded-md cursor-pointer ${
                selectedImage === image ? 'border-2 border-blue-500' : 'border border-gray-200'
              }`}
              onClick={() => setSelectedImage(image)}
            />
            <button
              onClick={() => handleDeleteImage(index)}
              className="absolute top-0 right-0 bg-white text-white text-xs rounded-full w-4 h-4 flex items-center justify-center"
            >
              <Image src={deleteIcon} alt="삭제" width={8} height={8} />
            </button>
          </div>
        ))}

        {(images || []).length < maxImages && (
          <label className="w-16 h-16 flex items-center justify-center bg-gray-100 hover:bg-gray-200 rounded-md cursor-pointer">
            <Image src={addIcon} alt="추가" width={16} height={16} />
            <input type="file" multiple accept="image/*" onChange={handleImageUpload} className="hidden" />
          </label>
        )}
      </div>
    </div>
  );
}
