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
