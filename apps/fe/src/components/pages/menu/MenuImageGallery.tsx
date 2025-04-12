import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { DndContext, closestCenter } from '@dnd-kit/core';

import { SortableContext, arrayMove, useSortable, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

import deleteIcon from '@public/icons/ic_x.svg';
import addIcon from '@public/icons/ic_plus.svg';
import draggableIcon from '@public/icons/ic_3_lines.svg';

interface MenuImageGalleryProps {
  images?: string[];
  setImages: (images: string[]) => void;
  maxImages?: number;
}

export default function MenuImageGallery({ images = [], setImages, maxImages = 10 }: MenuImageGalleryProps) {
  const [selectedImage, setSelectedImage] = useState<string | null>((images || [])[0] || null);

  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    if (active.id !== over?.id) {
      setImages((prevImages) => {
        if (!Array.isArray(prevImages)) {
          return [];
        }
        const oldIndex = prevImages.findIndex((img) => img === active.id);
        const newIndex = prevImages.findIndex((img) => img === over.id);
        return arrayMove(prevImages, oldIndex, newIndex);
      });
    }
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    setImages((prevImages) => {
      const validImages = Array.isArray(prevImages) ? prevImages : [];
      if (validImages.length + files.length > maxImages) {
        return validImages;
      }
      const uploadedImages = files.map((file) => URL.createObjectURL(file));
      const updatedImages = [...validImages, ...uploadedImages];
      if (!selectedImage && uploadedImages.length > 0) {
        setSelectedImage(uploadedImages[0]);
      }
      return updatedImages;
    });
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

      <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={Array.isArray(images) ? images : []} strategy={verticalListSortingStrategy}>
          <div className="flex items-center space-x-2 mb-3">
            {Array.isArray(images) &&
              images.map((image, index) => (
                <SortableItem
                  key={image}
                  id={image}
                  image={image}
                  selectedImage={selectedImage}
                  onSelect={() => setSelectedImage(image)}
                  onDelete={() => handleDeleteImage(index)}
                />
              ))}

            {(images?.length || 0) < maxImages && (
              <label className="w-16 h-16 flex items-center justify-center bg-gray-100 hover:bg-gray-200 rounded-md cursor-pointer">
                <Image src={addIcon} alt="추가" width={16} height={16} />
                <input type="file" multiple accept="image/*" onChange={handleImageUpload} className="hidden" />
              </label>
            )}
          </div>
        </SortableContext>
      </DndContext>
    </div>
  );
}

function SortableItem({ id, image, selectedImage, onSelect, onDelete }: any) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    border: selectedImage === image ? '2px solid #3b82f6' : '2px solid #e5e7eb',
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} className="relative">
      <div {...listeners} className="absolute top-0 left-0 p-1 cursor-grab">
        <Image src={draggableIcon} alt="드래그" />
      </div>

      <img
        src={image}
        alt=""
        className="w-16 h-16 object-cover rounded-md cursor-pointer drag-none"
        onClick={(e) => {
          e.stopPropagation();
          onSelect();
        }}
      />

      <button
        onClick={(e) => {
          e.stopPropagation();
          onDelete();
        }}
        className="absolute top-0 right-0 bg-white text-white text-xs rounded-full w-4 h-4 flex items-center justify-center"
      >
        <Image src={deleteIcon} alt="삭제" width={8} height={8} />
      </button>
    </div>
  );
}
