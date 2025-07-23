import AddButton from '../buttons/CtaButton';
import { IMenuImageItem } from '@/types/model/menu';
import {
  DndContext,
  DragEndEvent,
  PointerSensor,
  closestCenter,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import { restrictToHorizontalAxis } from '@dnd-kit/modifiers';
import {
  SortableContext,
  arrayMove,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import DraggableIcon from '@public/icons/ic_dots.svg';
import EmptyImageIcon from '@public/icons/ic_picture.svg';
import DeleteIcon from '@public/icons/ic_x.svg';
import { LexoRank } from 'lexorank';
import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

interface MenuImageGalleryProps {
  images?: IMenuImageItem[];
  setImages: React.Dispatch<React.SetStateAction<IMenuImageItem[]>>;
  maxImages?: number;
}

export default function MenuImageGallery({
  images = [],
  setImages,
  maxImages = 10,
}: MenuImageGalleryProps) {
  const sensors = useSensors(useSensor(PointerSensor));
  const CDN_URL = process.env.NEXT_PUBLIC_CDN_BASE_URL;

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (active.id !== over?.id && over) {
      setImages((prevImages) => {
        const oldIndex = prevImages.findIndex(
          (img) => img.image_url === active.id,
        );
        const newIndex = prevImages.findIndex(
          (img) => img.image_url === over.id,
        );
        const reorderedImages = arrayMove(prevImages, oldIndex, newIndex);

        let lastOrder = LexoRank.middle();
        return reorderedImages.map((img) => {
          const newOrder = lastOrder.genNext();
          lastOrder = newOrder;
          return { ...img, order: newOrder.toString() };
        });
      });
    }
  };

  const [selectedImage, setSelectedImage] = useState<IMenuImageItem | null>(
    (images || [])[0] || null,
  );
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

      const uploadedImages: IMenuImageItem[] = [];
      let currentRank: LexoRank;

      if (validImages.length > 0) {
        const lastOrder = validImages[validImages.length - 1].order;
        currentRank = LexoRank.parse(lastOrder);
      } else {
        currentRank = LexoRank.middle().genPrev();
      }

      files.forEach((file) => {
        currentRank = currentRank.genNext();
        const uuid = uuidv4();
        uploadedImages.push({
          id: 0,
          image_url: uuid,
          order: currentRank.toString(),
          preview: URL.createObjectURL(file),
          file,
        });
      });

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

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    fileInputRef.current?.click(); // input을 강제로 클릭
  };

  return (
    <div>
      <div className="flex items-center mb-4">
        <div className="text-mobile-body-l-semibold grow-1">메뉴 사진</div>
        <>
          <AddButton
            text="사진 추가하기"
            color="black"
            width="fit"
            size="small"
            onClick={handleClick}
          />
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleImageUpload}
            ref={fileInputRef}
            className="hidden"
          />
        </>
      </div>

      <div className="mb-4 flex h-64 w-full items-center justify-center rounded-xl bg-gray-100">
        {selectedImage ? (
          <img
            src={
              selectedImage.id === 0
                ? (selectedImage.preview ?? '')
                : selectedImage.image_url
                  ? CDN_URL + '/' + selectedImage.image_url
                  : ''
            }
            alt="선택된 이미지"
            className="h-full w-full rounded-md object-contain"
          />
        ) : (
          <div className="text-mobile-body-m-semibold flex select-none flex-col items-center justify-center gap-4 text-center text-gray-700">
            <Image src={EmptyImageIcon} alt="add" width={55} height={55} />
            <div>
              메뉴 사진이 아직 없어요.
              <br />
              사진을 추가 해주세요 !
            </div>
          </div>
        )}
      </div>

      <DndContext
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
        sensors={sensors}
        modifiers={[restrictToHorizontalAxis]}
      >
        <SortableContext
          items={
            Array.isArray(images) ? images.map((img) => img.image_url) : []
          }
          strategy={verticalListSortingStrategy}
        >
          <div className="mb-3 flex items-center space-x-2 overflow-x-auto">
            {Array.isArray(images) &&
              images.map((image, index) => {
                const image_path = CDN_URL + '/' + image.image_url;
                return (
                  <SortableItem
                    key={image.image_url}
                    id={image.image_url}
                    image={
                      image.id === 0
                        ? (image.preview ?? '')
                        : image.image_url
                          ? image_path
                          : ''
                    }
                    selectedImage={
                      selectedImage?.id === 0
                        ? (selectedImage?.preview ?? '')
                        : (image_path ?? '')
                    }
                    onSelect={() => setSelectedImage(image)}
                    onDelete={() => handleDeleteImage(index)}
                  />
                );
              })}
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

function SortableItem({
  id,
  image,
  selectedImage,
  onSelect,
  onDelete,
}: SortableItemProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    border: selectedImage === image ? '2px solid #3b82f6' : '2px solid #e5e7eb',
    zIndex: isDragging ? 10 : 'auto',
    boxShadow: isDragging ? '0px 4px 10px rgba(0, 0, 0, 0.2)' : 'none',
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      className="relative shrink-0"
    >
      <div {...listeners} className="absolute left-0 top-0 cursor-grab p-1">
        <DraggableIcon />
      </div>

      <Image
        src={image}
        className="drag-none h-16 w-16 cursor-pointer rounded-md object-cover"
        onClick={(e) => {
          e.stopPropagation();
          onSelect();
        }}
        alt={''}
        width={12}
        height={12}
      />

      <button
        onClick={(e) => {
          e.stopPropagation();
          onDelete();
        }}
        className="absolute right-0 top-0 flex h-4 w-4 items-center justify-center rounded-full bg-white text-xs text-white"
      >
        <Image src={DeleteIcon} alt="delete" width={12} height={12} />
      </button>
    </div>
  );
}
