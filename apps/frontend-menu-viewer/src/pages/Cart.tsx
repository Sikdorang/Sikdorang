import ButtonWrapper from '../components/common/ButtonWrapper';
import CheckBox from '../components/common/CheckBox';
import Header from '../components/common/Header';
import OutlineButton from '../components/common/OutlineButton';
import QuantityCounter from '../components/common/QuantityCounter';
import OptionDropDown from '../components/pages/Cart/OptionDropDown';
import { ROUTES } from '../constants/routes';
import { useCartStore } from '../stores/useCartStore';
import { useMenuSelectionStore } from '../stores/useMenuSelectionStore';
import formatNumber from '../utilities/formatNumber';
import { getStoreId } from '../utilities/getStoreId';
import { isAllRequiredSelected } from '../utilities/isAllRequiredSelected';
import { showCustomToast } from '../utilities/showToast';
import BaseButton from '@/components/common/BaseButton';
import { useEffect } from 'react';
import { useNavigate } from 'react-router';

export default function Cart() {
  const navigate = useNavigate();
  const {
    items,
    getTotalPrice,
    setQuantity,
    toggleSelect,
    clearCart,
    getSelectedItemCount,
    updateItem,
  } = useCartStore();
  const {
    menuId,
    menu,
    startEdit,
    optionPrice,
    selectedOptions,
    toggleOption,
    resetSelection,
  } = useMenuSelectionStore();

  useEffect(() => {
    resetSelection();
  }, []);

  return (
    <div className="min-w-xs mx-auto flex h-full w-full flex-col">
      <Header title="주문하기" />
      <div className="wrapper flex w-full flex-1 flex-col pt-6">
        <ul className="flex flex-col gap-6 mb-6">
          {items.map((item) => (
            <li key={item.id}>
              <div className="flex gap-3">
                <CheckBox
                  onClick={() => toggleSelect(item.id)}
                  checked={item.selected}
                />
                <div className="flex w-full gap-2">
                  <div className="overflow-hidden w-[5.25rem] h-[5.25rem] sm:w-[11.25rem] sm:h-[11.25rem] aspect-square rounded-2xl bg-gray-100 shrink-0">
                    {item.originalItem.imgUrls.length > 0 && (
                      <img src={item.originalItem.imgUrls[0]} />
                    )}
                  </div>
                  <div className="flex flex-col w-full">
                    <h2 className="text-mb-5 mb-2 text-gray-700">
                      {item.originalItem.name}
                    </h2>
                    <ul className="flex mb-3 flex-col gap-1">
                      {item.originalItem.optionGroups.map((group) => {
                        const selectedOptionsSet =
                          item.selectedOptions[group.id];
                        if (
                          !selectedOptionsSet ||
                          selectedOptionsSet.size === 0
                        )
                          return null;

                        const selectedOptionLabels = group.items
                          .filter((option) => selectedOptionsSet.has(option.id))
                          .map((option) => option.name)
                          .join(', ');

                        return (
                          <li
                            key={group.id}
                            className="text-mc-2 text-gray-500"
                          >
                            {group.title}: {selectedOptionLabels}
                          </li>
                        );
                      })}
                    </ul>

                    <p className="text-mb-3 text-gray-700">
                      {formatNumber(
                        (item.originalItem.price ?? 0) + item.optionPrice,
                      )}
                      원
                    </p>
                    <div className="mt-3 flex gap-3 justify-end items-center w-full">
                      <button
                        onClick={() => startEdit(item)}
                        className="text-mc-1 text-gray-700 flex flex-col items-center justify-center py-1 h-7 px-3 border border-gray-200 rounded-2xl bg-white "
                      >
                        옵션 변경
                      </button>
                      <QuantityCounter
                        value={item.quantity}
                        onChange={(value) => setQuantity(item.id, value)}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
        <OutlineButton
          onClick={() => {
            navigate(ROUTES.STORES.DETAIL(getStoreId()), { replace: true });
          }}
        >
          메뉴 더 추가하기
        </OutlineButton>
        {menu && (
          <div className="z-40 fixed inset-0 bg-black/25 min-w-xs xl:mx-auto xl:max-w-5xl w-full h-full">
            <div className="scrollbar-hide overflow-y-auto absolute bg-white bottom-0 h-5/6 w-full rounded-t-2xl ">
              <div className="pt-5 wrapper bg-white sticky top-0 mb-6 flex items-center justify-between gap-12 pb-2">
                <h2 className="text-mb-3 text-gray-900">{menu.name}</h2>
                <button
                  onClick={() => {
                    resetSelection();
                  }}
                >
                  엑스
                </button>
              </div>
              <ul className="space-y-3 wrapper">
                {menu.optionGroups.map((group) => (
                  <OptionDropDown
                    key={group.id}
                    group={group}
                    selectedOptionIds={selectedOptions[group.id] ?? new Set()}
                    onToggle={(itemId) =>
                      toggleOption(
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
                disabled={
                  !isAllRequiredSelected(menu.optionGroups, selectedOptions)
                }
                onClick={() => {
                  if (menuId) {
                    updateItem(menuId, {
                      optionPrice: optionPrice,
                      selectedOptions: selectedOptions,
                    });
                    resetSelection();
                  }
                }}
              >
                변경하기
              </BaseButton>
            </ButtonWrapper>
          </div>
        )}

        {items.length > 0 && (
          <ButtonWrapper>
            <BaseButton
              disabled={getSelectedItemCount() === 0}
              onClick={() => {
                clearCart();
                navigate(ROUTES.STORES.DETAIL(getStoreId()), { replace: true });
                showCustomToast({
                  icon: 'check',
                  message: '주문을 완료 했어요!\n조금만 기다려주세요.',
                });
              }}
              color="black"
            >
              <div className="flex items-center gap-2.5">
                <p className="flex items-center gap-1">
                  <span>총 {formatNumber(getTotalPrice())}원</span>
                  <p className="h-1 w-1 rounded-full bg-white"></p>
                  <span>주문하기</span>
                </p>
                <p className="text-xs font-bold leading-[150%] tracking-[-2%]  flex h-6 w-6 flex-col items-center justify-center rounded-full bg-white text-gray-800">
                  {getSelectedItemCount()}
                </p>
              </div>
            </BaseButton>
          </ButtonWrapper>
        )}
        <div className="h-48"></div>
      </div>
    </div>
  );
}
