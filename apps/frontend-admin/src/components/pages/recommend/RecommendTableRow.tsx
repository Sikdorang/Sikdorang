'use client';

import CtaButton from '../../common/buttons/CtaButton';
import MenuCustomFinderDropdown, {
  MenuCustomFinderDropdownHandle,
} from '../menuEdit/MenuCustomFinderDropdown';
import { IRecommendTableItem, MenuOption } from '@/types/model/menu';
import { useRef } from 'react';

interface RecommendTableRowProps {
  item: IRecommendTableItem;
  isLastRow: boolean;
  updateRecommendationTypeMenus?: (
    recommendationTypeId: number,
    menuIds: number[],
  ) => void;
  onDetailClick: () => void;
  onSetClick: (value: number) => void;
  menus: MenuOption[];
  selectedMenus: number[];
}

export default function RecommendTableRow({
  item,
  isLastRow,
  updateRecommendationTypeMenus,
  onDetailClick,
  onSetClick,
  menus,
  selectedMenus,
}: RecommendTableRowProps) {
  const dropdownRef = useRef<MenuCustomFinderDropdownHandle>(null);

  const handleSetClick = () => {
    dropdownRef.current?.open();
  };

  const handleChange = (ids: number[]) => {
    const lastId = ids[ids.length - 1];
    if (lastId != null) onSetClick(lastId);
  };

  const handleDropdownClose = () => {
    updateRecommendationTypeMenus?.(item.id, selectedMenus);
  };

  return (
    <tr key={item.id}>
      <td
        className={`items-center border-b border-l border-t border-gray-300 px-5 py-5 ${
          isLastRow ? 'rounded-bl-xl' : ''
        }`}
      >
        {item.name}
      </td>
      <td className="border-b border-t border-gray-300 px-5 py-5 justify-center">
        <CtaButton
          width="fit"
          size="small"
          text="설명보기"
          color="gray"
          onClick={onDetailClick}
        />
      </td>
      <td
        className={`relative flex border-b border-r border-t border-gray-300 px-5 py-5 items-center justify-center ${
          isLastRow ? 'rounded-br-xl' : ''
        }`}
      >
        <CtaButton
          width="fit"
          size="small"
          text="지정하기"
          color="white"
          onClick={handleSetClick}
        />

        <div className="absolute z-50 w-60" style={{ top: '80%', right: 80 }}>
          <MenuCustomFinderDropdown
            ref={dropdownRef}
            options={menus}
            selectedOptions={selectedMenus}
            onChange={handleChange}
            onClose={handleDropdownClose}
            hideTrigger
          />
        </div>
      </td>
    </tr>
  );
}
