import { isAllRequiredSelected } from '../../../utilities/isAllRequiredSelected';
import BaseButton from '../../common/BaseButton';
import ButtonWrapper from '../../common/ButtonWrapper';
import OptionDropDown from './OptionDropDown';
import CancelSvg from '@/assets/icons/ic_cancel.svg?react';

interface Props {
  menu: IMenuDetail;
  selectedOptions: OptionSelection;
  optionPrice: number;
  menuId: string | null;
  onToggle: (groupId: string, itemId: string, isSingle: boolean) => void;
  onUpdate: (id: string, updates: Partial<ICartItem>) => void;
  onClose: () => void;
}

/**
 * 메뉴 옵션을 선택할 수 있는 모달 시트를 렌더링합니다.
 *
 * 사용자는 옵션 그룹별로 옵션을 선택하거나 해제할 수 있으며, 모든 필수 옵션이 선택된 경우에만 "변경하기" 버튼이 활성화됩니다. 변경 버튼 클릭 시 선택된 옵션과 가격 정보를 업데이트하고 시트를 닫습니다.
 */
export default function OptionSelectorSheet({
  menu,
  selectedOptions,
  optionPrice,
  menuId,
  onToggle,
  onUpdate,
  onClose,
}: Props) {
  return (
    <div
      onClick={onClose}
      className=" z-40 fixed inset-0 bg-black/25 min-w-xs xl:mx-auto xl:max-w-5xl w-full h-full"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="animate-sheet-in scrollbar-hide overflow-y-auto absolute bg-white bottom-0 h-5/6 w-full rounded-t-2xl "
      >
        <div className="pt-5 wrapper bg-white sticky top-0 mb-6 flex items-center justify-between gap-12 pb-2">
          <h2 className="text-mb-3 text-gray-900">{menu.name}</h2>
          <button onClick={onClose}>
            <CancelSvg />
          </button>
        </div>
        <ul className="space-y-3 wrapper">
          {menu.optionGroups.map((group) => (
            <OptionDropDown
              key={group.id}
              group={group}
              selectedOptionIds={selectedOptions[group.id] ?? new Set()}
              onToggle={(itemId) =>
                onToggle(
                  group.id,
                  itemId,
                  group.maxSelectable === 1 && group.required,
                )
              }
            />
          ))}
        </ul>
        <div className="h-48"></div>
      </div>
      <ButtonWrapper>
        <BaseButton
          disabled={!isAllRequiredSelected(menu.optionGroups, selectedOptions)}
          onClick={() => {
            if (menuId) {
              onUpdate(menuId, {
                optionPrice: optionPrice,
                selectedOptions: selectedOptions,
              });
              onClose();
            }
          }}
        >
          변경하기
        </BaseButton>
      </ButtonWrapper>
    </div>
  );
}
