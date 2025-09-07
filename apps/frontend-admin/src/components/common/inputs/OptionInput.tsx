import MenuCustomDropdown from '../../pages/menuEdit/MenuCustomDropdown';
import TextInput from './TextInput';
import AddElementButton from '@/components/common/buttons/CtaButton';
import ToggleSwitch from '@/components/common/buttons/ToggleSwitch';
import MenuOptionElement from '@/components/pages/menuEdit/MenuOptionElement';
import { IMenuOptionGroup } from '@/types/model/menu';
import EmptyOptionIcon from '@public/icons/ic_dotted_plus.svg';
import CancelIcon from '@public/icons/ic_x.svg';
import React from 'react';

interface OptionInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  options?: IMenuOptionGroup[];
  onOptionsChange?: (options: IMenuOptionGroup[]) => void;
  onDelete?: () => void;
  onAddOption: (groupId: number) => void;
  optionName?: string;
  onOptionTitleChange?: (groupId: number, newTitle: string) => void;
  onItemNameChange?: (
    groupId: number,
    optionId: number,
    newName: string,
  ) => void;
  onItemPriceChange?: (
    groupId: number,
    optionId: number,
    newPrice: number,
  ) => void;
  onDeleteItem?: (groupId: number, optionId: number) => void;
  onMaxSelectableChange?: (groupId: number, max: number) => void;
  onRequiredToggle?: (groupId: number, required: boolean) => void;
}

export default function OptionInput({
  options = [],
  onOptionsChange,
  onDelete,
  onAddOption,
  optionName = '',
  onOptionTitleChange,
}: OptionInputProps) {
  const hasOptions = options && options.length > 0;

  const EmptyPlaceholder = () => (
    <div className="flex flex-col items-center justify-center gap-4 px-4 py-12">
      <EmptyOptionIcon width={50} height={50} />
      <div className="text-mobile-body-m-semibold mb-6 text-center text-gray-700">
        옵션이 아직 없어요.
        <br />
        옵션을 추가해주세요 !
      </div>
    </div>
  );

  const ItemEmptyPlaceholder = () => (
    <div className="flex flex-col items-center justify-center gap-4 px-4 py-12">
      <EmptyOptionIcon width={50} height={50} />
      <div className="text-mobile-body-m-semibold mb-6 text-center text-gray-700">
        항목이 아직 없어요.
        <br />
        항목을 추가해주세요 !
      </div>
    </div>
  );

  const onDeleteOptionGroup = (optionId: number) => {
    if (!onOptionsChange) return;
    const updatedOptions =
      options?.filter((group) => group.optionId !== optionId) ?? [];
    onOptionsChange(updatedOptions);
  };

  // 하위 항목 이름 변경
  const handleItemNameChange = (
    groupId: number,
    optionId: number,
    newName: string,
  ) => {
    if (!onOptionsChange) return;
    const updated = options.map((g) =>
      g.optionId === groupId
        ? {
            ...g,
            optionDetails: g.optionDetails.map((item) =>
              item.optionDetailId === optionId
                ? { ...item, name: newName }
                : item,
            ),
          }
        : g,
    );
    onOptionsChange(updated);
  };

  // 하위 항목 가격 변경
  const handleItemPriceChange = (
    groupId: number,
    optionId: number,
    newPrice: number,
  ) => {
    if (!onOptionsChange) return;
    const updated = options.map((g) =>
      g.optionId === groupId
        ? {
            ...g,
            optionDetails: g.optionDetails.map((item) =>
              item.optionDetailId === optionId
                ? { ...item, price: newPrice }
                : item,
            ),
          }
        : g,
    );
    onOptionsChange(updated);
  };

  // 하위 항목 삭제
  const handleDeleteItem = (groupId: number, optionId: number) => {
    if (!onOptionsChange) return;
    const updated = options.map((g) =>
      g.optionId === optionId
        ? {
            ...g,
            optionDetails: g.optionDetails.filter(
              (item) => item.optionDetailId !== optionId,
            ),
          }
        : g,
    );
    onOptionsChange(updated);
  };

  // **최대 선택 개수 변경 핸들러**
  const handleMaxSelectableChange = (groupId: number, max: number) => {
    if (!onOptionsChange) return;
    const updated = options.map((g) =>
      g.optionId === groupId ? { ...g, maxSelectable: max } : g,
    );
    onOptionsChange(updated);
  };

  // **필수 토글 핸들러**
  const handleRequiredToggle = (groupId: number, required: boolean) => {
    if (!onOptionsChange) return;
    const updated = options.map((g) =>
      g.optionId === groupId ? { ...g, required } : g,
    );
    onOptionsChange(updated);
  };

  return (
    <div className="flex w-full flex-col gap-4 rounded-2xl bg-gray-100 p-8">
      {hasOptions ? (
        options.map((optionGroup, groupIndex) => (
          <div key={optionGroup.optionId} className="mb-6">
            <div className="flex">
              <span className="grow"></span>
              <button
                onClick={() => onDeleteOptionGroup?.(optionGroup.optionId)}
                className="flex h-8 w-8 items-center justify-center rounded-full transition-colors hover:bg-gray-200"
              >
                <CancelIcon width={16} height={16} />
              </button>
            </div>

            <TextInput
              label="옵션 제목"
              placeholder="옵션 제목을 입력해주세요."
              value={optionGroup.option}
              onChange={(e) =>
                onOptionTitleChange?.(optionGroup.optionId, e.target.value)
              }
              maxLength={20}
            />

            <div className="flex">
              <div className="grow-1"></div>
              <AddElementButton
                text="항목 추가하기"
                size="small"
                color="white"
                width="fit"
                onClick={() => onAddOption?.(optionGroup.optionId)}
              />
            </div>

            <div className="flex flex-col items-center justify-center gap-4">
              {optionGroup.optionDetails &&
              optionGroup.optionDetails.length > 0 ? (
                optionGroup.optionDetails.map((item) => (
                  <MenuOptionElement
                    key={item.optionDetailId}
                    optionId={item.optionDetailId}
                    name={item.optionDetail}
                    price={item.price}
                    onNameChange={(newName) =>
                      handleItemNameChange(
                        optionGroup.optionId,
                        item.optionDetailId,
                        newName,
                      )
                    }
                    onPriceChange={(newPrice) =>
                      handleItemPriceChange(
                        optionGroup.optionId,
                        item.optionDetailId,
                        newPrice,
                      )
                    }
                    onDelete={() =>
                      handleDeleteItem(
                        optionGroup.optionId,
                        item.optionDetailId,
                      )
                    }
                  />
                ))
              ) : (
                <ItemEmptyPlaceholder />
              )}
            </div>

            <div className="flex">
              <span className="grow"></span>
              <div className="flex flex-col items-end gap-4">
                <div className="flex justify-center items-center gap-2 text-sm text-gray-600 hover:text-gray-800">
                  <div>옵션 선택 최대 제한</div>
                  <MenuCustomDropdown
                    options={[
                      '1',
                      '2',
                      '3',
                      '4',
                      '5',
                      '6',
                      '7',
                      '8',
                      '9',
                      '10',
                    ]}
                    selectedOption={optionGroup.maxOption.toString()}
                    onChange={(value) =>
                      handleMaxSelectableChange(
                        optionGroup.optionId,
                        parseInt(value),
                      )
                    }
                    isNumbers={true}
                  />
                </div>
                {optionGroup.optionRequired ? (
                  <div className="flex justify-center items-center gap-2 text-sm text-gray-600 hover:text-gray-800">
                    <div>옵션 선택 최소 제한</div>
                    <MenuCustomDropdown
                      options={[
                        '1',
                        '2',
                        '3',
                        '4',
                        '5',
                        '6',
                        '7',
                        '8',
                        '9',
                        '10',
                      ]}
                      selectedOption={optionGroup.minOption.toString()}
                      onChange={(value) =>
                        handleMaxSelectableChange(
                          optionGroup.optionId,
                          parseInt(value),
                        )
                      }
                      isNumbers={true}
                    />
                  </div>
                ) : undefined}
                <ToggleSwitch
                  isOn={optionGroup.optionRequired}
                  onToggle={(isReq) =>
                    handleRequiredToggle(optionGroup.optionId, isReq)
                  }
                  label="주문시 옵션 필수 선택"
                />
              </div>
            </div>
          </div>
        ))
      ) : (
        <EmptyPlaceholder />
      )}
    </div>
  );
}
