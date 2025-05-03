import React, { useEffect, useState } from 'react';
import { DndContext, closestCenter, PointerSensor, useSensor, useSensors, DragEndEvent } from '@dnd-kit/core';
import { SortableContext, arrayMove, useSortable, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { restrictToHorizontalAxis } from '@dnd-kit/modifiers';
import { CSS } from '@dnd-kit/utilities';
import { v4 as uuidv4 } from 'uuid';
import { IMenuImageItem } from '@/types/model/menu';

import DeleteIcon from '@public/icons/ic_x.svg';
import AddIcon from '@public/icons/ic_plus.svg';
import DraggableIcon from '@public/icons/ic_3_lines.svg';

interface MenuImageGalleryProps {
  images?: IMenuImageItem[];
  setImages: React.Dispatch<React.SetStateAction<IMenuImageItem[]>>;
  maxImages?: number;
}

export default function MenuImageGallery({ images = [], setImages, maxImages = 10 }: MenuImageGalleryProps) {
  const sensors = useSensors(useSensor(PointerSensor));

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (active.id !== over?.id && over) {
      setImages((prevImages) => {
        if (!Array.isArray(prevImages)) {
          return [];
        }
        const oldIndex = prevImages.findIndex((img) => img.id === active.id);
        const newIndex = prevImages.findIndex((img) => img.id === over.id);
        return arrayMove(prevImages, oldIndex, newIndex);
      });
    }
  };

  const [selectedImage, setSelectedImage] = useState<IMenuImageItem | null>((images || [])[0] || null);
  useEffect(() => {
    if (images.length > 0 && !selectedImage) {
      setSelectedImage(images[0]);
    }
  }, [images, selectedImage]);
  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    setImages((prevImages: IMenuImageItem[] = []) => {
      const validImages = Array.isArray(prevImages) ? prevImages : [];
      if (validImages.length + files.length > maxImages) {
        return validImages;
      }

      const uploadedImages: IMenuImageItem[] = files.map((file, index) => ({
        id: 0,
        image_url: uuidv4(),
        order: String(validImages.length + index + 1),
      }));

      const updatedImages = [...validImages, ...uploadedImages];
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
          <img src={selectedImage.image_url} alt="선택된 이미지" className="w-full h-full object-cover rounded-md" />
        ) : (
          <p className="text-gray-400 text-body-xs select-none">이미지를 업로드해 주세요</p>
        )}
      </div>

      <DndContext
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
        sensors={sensors}
        modifiers={[restrictToHorizontalAxis]}
      >
        <SortableContext items={Array.isArray(images) ? images : []} strategy={verticalListSortingStrategy}>
          <div className="flex items-center space-x-2 mb-3 overflow-x-auto">
            {Array.isArray(images) &&
              images.map((image, index) => (
                <SortableItem
                  key={image.image_url}
                  id={image.image_url}
                  image={image.image_url}
                  selectedImage={selectedImage?.image_url ?? null}
                  onSelect={() => setSelectedImage(image)}
                  onDelete={() => handleDeleteImage(index)}
                />
              ))}
            {(images?.length || 0) < maxImages && (
              <label className="w-16 h-16 flex shrink-0 items-center justify-center bg-gray-100 hover:bg-gray-200 rounded-md cursor-pointer">
                <AddIcon width={16} height={16} />
                <input type="file" multiple accept="image/*" onChange={handleImageUpload} className="hidden" />
              </label>
            )}
          </div>
        </SortableContext>
      </DndContext>
    </div>
  );
}

interface SortableItemProps {
  id: string;
  image: string;
  selectedImage: string | null;
  onSelect: () => void;
  onDelete: () => void;
}

function SortableItem({ id, image, selectedImage, onSelect, onDelete }: SortableItemProps) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    border: selectedImage === image ? '2px solid #3b82f6' : '2px solid #e5e7eb',
    zIndex: isDragging ? 10 : 'auto',
    boxShadow: isDragging ? '0px 4px 10px rgba(0, 0, 0, 0.2)' : 'none',
    transition,
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} className="relative shrink-0">
      <div {...listeners} className="absolute top-0 left-0 p-1 cursor-grab">
        <DraggableIcon />
      </div>

      <img
        src={image}
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
        <DeleteIcon width={8} height={8} />
      </button>
    </div>
  );
}
