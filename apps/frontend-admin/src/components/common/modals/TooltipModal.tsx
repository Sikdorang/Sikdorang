import CreateCategoryButton from '@/components/common/buttons/CtaButton';
import TextInput from '@/components/common/inputs/TextInput';
import React, { useState } from 'react';

interface TooltipModalProps {
  contents: { title: string; description: string }[];
  visible: boolean;
  position?: { top: number; left: number };
  onClose?: () => void;
  isTextInput?: boolean;
  onButtonClick?: (inputText: string) => void;
}

export const TooltipModal = React.forwardRef<HTMLDivElement, TooltipModalProps>(
  function TooltipModal(
    { visible, contents, position, isTextInput, onButtonClick },
    ref,
  ) {
    const [inputValue, setInputValue] = useState<string>('');

    if (!visible) return null;

    const handleClick = () => {
      if (inputValue.trim()) {
        onButtonClick?.(inputValue.trim());
        setInputValue('');
      }
    };

    return (
      <div
        className="fixed bg-white text-black px-4 py-3 rounded-lg shadow-lg z-50"
        style={position ? { top: position.top, left: position.left } : {}}
        ref={ref}
        onClick={(e) => e.stopPropagation()}
      >
        {isTextInput ? (
          <div className="flex flex-col">
            <div className="flex">
              <div className="grow-1 text-mb-1">카테고리 추가</div>
              <CreateCategoryButton
                text="추가하기"
                color="yellow"
                size="small"
                width="fit"
                onClick={handleClick}
              />
            </div>
            <TextInput
              label="카테고리명"
              placeholder="카테고리명을 입력해주세요."
              labelClassName="text-mb-5"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onClear={() => setInputValue('')}
              maxLength={50}
            />
          </div>
        ) : (
          contents.map((item, idx) => (
            <div key={idx} className="mb-4 max-w-[22vw]">
              <div className="text-mobile-body-m-semibold text-xl mb-2">
                {item.title}
              </div>
              <div className="text-mobile-body-m-regular text-gray-500 whitespace-pre-line">
                {item.description}
              </div>
            </div>
          ))
        )}
      </div>
    );
  },
);
