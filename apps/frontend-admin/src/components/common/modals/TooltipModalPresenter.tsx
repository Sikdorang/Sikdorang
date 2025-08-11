'use client';

import { TooltipModal } from './TooltipModal';
import { useTooltipModal } from '@/hooks/useTooltipModal';
import React, { useEffect, useRef } from 'react';

interface TooltipModalPresenterProps {
  children: React.ReactNode;
  isTextInput?: boolean;
  onButtonClick?: (inputText: string) => void;
}

const exampleGuide = [
  {
    title: '매장 이용 가이드가 무엇인가요 ?',
    description:
      '매장의 운영 정보와 각종 편의사항을 고객에게 명확히 공지할 수 있는 안내 기능입니다.',
  },
  {
    title: '어떻게 보여지나요 ?',
    description:
      '상위 3개의 정보가 우선 표시되며, ‘펼치기’를 누르면 나머지 모든 내용을 한눈에 확인할 수 있습니다.',
  },
];

export function TooltipModalPresenter({
  children,
  isTextInput = false,
  onButtonClick,
}: TooltipModalPresenterProps) {
  const tooltip = useTooltipModal();
  const triggerRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!tooltip.visible) return;

    function handleDocumentClick(e: MouseEvent) {
      const triggerEl = triggerRef.current;
      const modalEl = modalRef.current;

      const clickedInsideTrigger = triggerEl?.contains(e.target as Node);
      const clickedInsideModal = modalEl?.contains(e.target as Node);

      if (!clickedInsideTrigger && !clickedInsideModal) {
        tooltip.hide();
      }
    }

    document.addEventListener('mousedown', handleDocumentClick);
    return () => document.removeEventListener('mousedown', handleDocumentClick);
  }, [tooltip.visible]);

  function handleClick(e: React.MouseEvent) {
    const rect = (e.target as HTMLElement).getBoundingClientRect();
    if (tooltip.visible) {
      tooltip.hide();
    } else {
      if (isTextInput) {
        tooltip.showText(rect.left - 130, rect.bottom + 15, exampleGuide);
      } else {
        tooltip.showText(rect.left, rect.bottom + 15, exampleGuide);
      }
    }
  }

  return (
    <>
      <div ref={triggerRef} onClick={handleClick}>
        {children}
      </div>
      <TooltipModal
        ref={modalRef}
        visible={tooltip.visible}
        contents={tooltip.contents}
        position={tooltip.position}
        onClose={tooltip.hide}
        isTextInput={isTextInput}
        onButtonClick={onButtonClick}
      />
    </>
  );
}
