import React from 'react';

import MainControlButton from './cells/MainControlButton';
import CheckboxInput from '@/components/common/inputs/CheckboxInput';

import { URLS } from '@/constants/urls';

interface MenuHeaderProps {
  showOnlyEmptyMenus: boolean;
  handleCheckboxChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSynchronize: () => void;
  changeLogIds: Set<number>;
  toggleSidebar: () => void;
}

export default function MenuHeader({
  showOnlyEmptyMenus,
  handleCheckboxChange,
  handleSynchronize,
  changeLogIds,
  toggleSidebar,
}: MenuHeaderProps) {
  return (
    <div>
      <header className="mb-6">
        <h1 className="text-title-xl">메뉴 관리</h1>
      </header>
      <header className="flex flex-row w-full mb-6">
        <MainControlButton
          className="flex-none w-fit"
          onClick={() => window.open(URLS.helpMenuManageUrl, '_blank', 'noopener noreferrer')}
        >
          사용 설명 보기
        </MainControlButton>
        <div className="grow"></div>
        <CheckboxInput checked={showOnlyEmptyMenus} onChange={handleCheckboxChange}>
          미입력 메뉴만 보기
        </CheckboxInput>
        <MainControlButton
          variant="menu"
          className="flex-none w-fit mr-3"
          onClick={handleSynchronize}
          disabled={changeLogIds.size === 0}
        >
          변경사항 저장하기
        </MainControlButton>
        <MainControlButton variant="category" className="flex-none w-fit" onClick={toggleSidebar}>
          카테고리 편집
        </MainControlButton>
      </header>
    </div>
  );
}
