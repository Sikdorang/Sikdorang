'use client';

import { TooltipModalPresenter } from '../../../../components/common/modals/TooltipModalPresenter';
import {
  default as CategoryButton,
  default as FilterOptionButton,
  default as TableControlButton,
} from '@/components/common/buttons/CtaButton';
import SearchInput from '@/components/common/inputs/TextInput';
import EditModal, {
  EditModalHeader,
  EditModalImageInput,
  EditModalOptionInput,
  EditModalTextInput,
  EditModaSelectInput,
  EditToggleSwitch,
} from '@/components/common/modals/EditModal';
import MenuGalleryCard from '@/components/pages/menuEdit/MenuGalleryCard';
import MenuTableRow from '@/components/pages/menuEdit/MenuTableRow';
import { useEditModal } from '@/contexts/EditModalContext';
import { IMenuTableItem } from '@/types/model/menu';
import GalleryIcon from '@public/icons/ic_grid.svg';
import TableIcon from '@public/icons/ic_list.svg';
import AddIcon from '@public/icons/ic_plus.svg';
import Image from 'next/image';
import { useState } from 'react';

const categories = [
  { id: 1, text: '전체', count: 1 },
  { id: 2, text: '한식', count: 3 },
  { id: 3, text: '중식', count: 2 },
  { id: 4, text: '일식', count: 4 },
  { id: 5, text: '양식', count: 1 },
];

const filterOptions = [
  { id: 1, text: '전체' },
  { id: 2, text: '판매중만 보기' },
  { id: 3, text: '품절만 보기' },
  { id: 4, text: '숨김만 보기' },
  { id: 5, text: '미입력만 보기' },
];

const menuList: IMenuTableItem[] = [
  {
    id: 1,
    name: '참소라 무침',
    price: 25000,
    category: '안주',
    status: '판매 중',
    checked: false,
    order: '1',
  },
  {
    id: 2,
    name: '아롱사태 수육',
    price: 25000,
    category: '안주',
    status: '품절',
    checked: true,
    order: '1',
  },
  {
    id: 3,
    name: '앞다리살 수육',
    price: 25000,
    category: '안주',
    status: '숨김',
    checked: true,
    order: '1',
  },
];

export default function MenuEditPage() {
  const [searchValue, setSearchValue] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(1);

  const [viewType, setViewType] = useState<'table' | 'gallery'>('table');

  const { openModal, currentModal } = useEditModal();
  const [isTooltipModal, setIsTooltipModal] = useState(false);
  const handleEdit = () => {
    setIsTooltipModal(false);
    openModal('modifyMenu');
  };

  const handleCreate = () => {
    setIsTooltipModal(false);
    openModal('createMenu');
  };

  const handleCreateCategory = () => {
    setIsTooltipModal(true);
    openModal('createCategory');
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="wrapper flex w-full flex-col items-center justify-center py-4">
        <SearchInput
          label="메뉴 편집"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          onClear={() => setSearchValue('')}
          placeholder="찾으시는 메뉴가 있으신가요?"
          maxLength={50}
          disabled={false}
        />

        <div className="flex w-full gap-2">
          <div className="grow-1 flex gap-2">
            {categories.map((cat) => (
              <CategoryButton
                key={cat.id}
                text={cat.text}
                color={selectedCategory === cat.id ? 'black' : 'white'}
                size="small"
                width="fit"
                onClick={() => setSelectedCategory(cat.id)}
              />
            ))}
          </div>
          <TooltipModalPresenter isTextInput={true}>
            <CategoryButton
              text="카테고리 추가"
              color="gray"
              size="small"
              width="fit"
              right={
                <span className="text-mobile-body-s-semibold text-gray-200">
                  <Image src={AddIcon} alt="plus" />
                </span>
              }
              onClick={() => {}}
            />
          </TooltipModalPresenter>
        </div>
      </div>

      <div className="w-full border-b border-gray-100" />

      <div className="wrapper w-full p-4">
        <div className="flex gap-2">
          <div className="grow-1 flex items-center gap-2">
            <div className="">전체 13</div>
            <button
              className={`rounded-md px-2 py-2 ${
                viewType === 'table' ? 'bg-gray-100' : 'hover:bg-gray-50'
              }`}
              onClick={() => setViewType('table')}
            >
              <Image src={TableIcon} alt="table" />
            </button>
            <button
              className={`rounded-md px-2 py-2 ${
                viewType === 'gallery' ? 'bg-gray-100' : 'hover:bg-gray-50'
              }`}
              onClick={() => setViewType('gallery')}
            >
              <Image src={GalleryIcon} alt="gallery" />
            </button>
          </div>

          {viewType === 'table' ? (
            <>
              <TableControlButton
                text="메뉴 추가하기"
                color="white"
                size="small"
                width="fit"
                onClick={handleCreate}
              />
              <TableControlButton
                text="삭제하기"
                color="gray"
                size="small"
                width="fit"
              />
              <TableControlButton
                text="변경사항 저장하기"
                color="gray"
                size="small"
                width="fit"
              />
            </>
          ) : (
            <TableControlButton
              text="메뉴 추가하기"
              color="yellow"
              size="small"
              width="fit"
              onClick={handleCreate}
            />
          )}
        </div>
        <div className="flex gap-4 pt-2">
          {filterOptions.map((option) => (
            <FilterOptionButton
              key={option.id}
              text={option.text}
              color="white"
              size="small"
              width="fit"
            />
          ))}
        </div>
      </div>

      <div className="wrapper w-full p-4">
        {viewType === 'table' ? (
          <>
            <table className="w-full table-auto border-separate border-spacing-0 overflow-hidden rounded-xl">
              <thead className="text-mobile-body-m-semibold text-w rounded-lg border-b border-b-gray-400 bg-gray-700">
                <tr>
                  <th className="w-[3%] whitespace-nowrap rounded-tl-xl px-5 py-5"></th>
                  <th className="w-[35%] whitespace-nowrap px-5 py-5 text-left">
                    메뉴명
                  </th>
                  <th className="w-[10%] whitespace-nowrap px-5 py-5 text-left">
                    가격
                  </th>
                  <th className="w-[12%] whitespace-nowrap px-5 py-5 text-left">
                    카테고리
                  </th>
                  <th className="w-[10%] whitespace-nowrap px-5 py-5 text-left">
                    상태
                  </th>
                  <th className="w-[8%] whitespace-nowrap rounded-tr-xl px-5 py-5">
                    세부사항
                  </th>
                </tr>
              </thead>
              <tbody className="text-mobile-body-m-regular rounded-t-none rounded-bl-xl rounded-br-xl border border-t-0 text-gray-600">
                {menuList.map((item, idx) => (
                  <MenuTableRow
                    key={item.id}
                    item={item}
                    onEdit={handleEdit}
                    isLastRow={idx === menuList.length - 1}
                  />
                ))}
              </tbody>
            </table>
          </>
        ) : (
          <>
            <div className="grid grid-cols-3 gap-4">
              {menuList.map((item) => (
                <MenuGalleryCard
                  key={item.id}
                  item={{
                    id: 0,
                    tags: ['인기', '신메뉴'],
                    name: '아아',
                    price: '100',
                  }}
                />
              ))}
            </div>
          </>
        )}
      </div>

      {currentModal !== null && (
        <EditModal>
          {currentModal === 'createCategory' && (
            <>
              <EditModalHeader onSave={handleCreateCategory}>
                카테고리 추가
              </EditModalHeader>
              <EditModalTextInput
                label="카테고리명"
                placeholder="카테고리명을 입력해주세요."
              />
            </>
          )}

          {currentModal === 'modifyMenu' && (
            <>
              <EditModalHeader onSave={() => {}}>
                세부사항 편집하기
              </EditModalHeader>
              <EditModalTextInput
                label="메뉴 설명"
                placeholder="메뉴설명을 입력해주세요."
              />
              <EditModalImageInput
                label="메뉴 이미지"
                placeholder="메뉴이미지를 추가해주세요."
              />
              <EditModalOptionInput
                label="메뉴 옵션"
                placeholder="옵션을 추가해주세요."
              />
              <EditToggleSwitch
                label="메뉴 강조"
                toggleSwitchItems={[
                  { label: '인기 메뉴로 표시', value: true },
                  { label: '신 메뉴로 표시', value: false },
                ]}
              />
              <EditToggleSwitch
                label="판매중"
                toggleSwitchItems={[
                  { label: '판매중', value: true },
                  { label: '숨김', value: false },
                  { label: '품절', value: false },
                ]}
              />
            </>
          )}

          {currentModal === 'createMenu' && (
            <>
              <EditModalHeader onSave={() => {}}>메뉴 추가하기</EditModalHeader>
              <EditModalTextInput
                label="메뉴명"
                placeholder="메뉴명을 입력해주세요."
              />
              <EditModalTextInput
                label="가격"
                placeholder="가격을 입력해주세요."
              />
              <EditModaSelectInput
                label="카테고리"
                placeholder="카테고리를 선택해주세요."
              />
              <EditModalImageInput
                label="메뉴 이미지"
                placeholder="메뉴이미지를 추가해주세요."
              />
              <EditModalOptionInput
                label="메뉴 옵션"
                placeholder="옵션을 추가해주세요."
              />
              <EditToggleSwitch
                label="메뉴 강조"
                toggleSwitchItems={[
                  { label: '인기 메뉴로 표시', value: true },
                  { label: '신 메뉴로 표시', value: false },
                ]}
              />
              <EditToggleSwitch
                label="판매중"
                toggleSwitchItems={[
                  { label: '판매중', value: true },
                  { label: '숨김', value: false },
                  { label: '품절', value: false },
                ]}
              />
            </>
          )}
        </EditModal>
      )}
    </div>
  );
}
