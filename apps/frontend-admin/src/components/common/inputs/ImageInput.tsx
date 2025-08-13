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
import DeleteIcon from '@public/icons/ic_cancel.svg';
import DraggableIcon from '@public/icons/ic_dots.svg';
import EmptyImageIcon from '@public/icons/ic_picture.svg';
import { LexoRank } from 'lexorank';
import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

interface ImageInputProps {
  images?: IMenuImageItem[];
  setImages: React.Dispatch<React.SetStateAction<IMenuImageItem[]>>;
  maxImages?: number;
}

export default function ImageInput({
  images = [],
  setImages,
  maxImages = 10,
}: ImageInputProps) {
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
    fileInputRef.current?.click();
  };

  return (
    <div>
      <div className="flex items-center mb-4">
        <div className="text-mb-1 grow-1">메뉴 사진</div>
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
          <div className="text-mb-5 flex select-none flex-col items-center justify-center gap-4 text-center text-gray-700">
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
                    isFirst={index === 0}
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
  isFirst: boolean;
}

function SortableItem({
  id,
  image,
  selectedImage,
  onSelect,
  onDelete,
  isFirst,
}: SortableItemProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const baseStyle = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const thumbStyle: React.CSSProperties = {
    ...baseStyle,
    borderRadius: 12,
    overflow: 'hidden',
    position: 'relative',
    border:
      selectedImage === image ? '1px solid #111223' : '1px solid transparent',
    boxShadow: isDragging ? '0 4px 10px rgba(0, 0, 0, 0.2)' : undefined,
    zIndex: isDragging ? 10 : undefined,
  };

  const itemStyle: React.CSSProperties = {
    ...baseStyle,
    borderRadius: 8,
    border: selectedImage === image ? '1px solid #111223' : '1px solid #e5e7eb',
    boxShadow: isDragging ? '0px 4px 10px rgba(0, 0, 0, 0.2)' : 'none',
    zIndex: isDragging ? 10 : 'auto',
    position: 'relative',
  };

  const style = isFirst ? thumbStyle : itemStyle;

  return (
    <div ref={setNodeRef} style={style} {...attributes} className={'shrink-0'}>
      <div {...listeners} className="absolute left-0 top-0 cursor-grab p-1">
        <Image src={DraggableIcon} alt={''} width={6} height={6} />
      </div>

      <Image
        src={image}
        className="drag-none h-30 w-30 rounded-md cursor-pointer object-cover"
        onClick={(e) => {
          e.stopPropagation();
          onSelect();
        }}
        alt={''}
        width={12}
        height={12}
      />

      {isFirst ? (
        <div
          className="text-ml-2"
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            width: '100%',
            backgroundColor: 'rgba(0, 0, 0)',
            color: '#ffffff',
            padding: '8px',
            textAlign: 'center',
            boxSizing: 'border-box',
          }}
        >
          썸네일 사진
        </div>
      ) : undefined}

      <button
        onClick={(e) => {
          e.stopPropagation();
          onDelete();
        }}
        className="absolute right-0 top-0 flex h-4 w-4 items-center justify-center"
      >
        <Image src={DeleteIcon} alt="delete" width={12} height={12} />
      </button>
    </div>
  );
}
