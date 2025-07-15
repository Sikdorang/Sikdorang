import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router';
import Header from '../components/common/\bHeader';
import BaseButton from '../components/common/BaseButton';
import ButtonWrapper from '../components/common/ButtonWrapper';
import Chip from '../components/common/Chip';
import Carousel from '../components/pages/MenuDetail/Carousel';
import OptionGroup from '../components/pages/MenuDetail/OptionGroup';
import { useFetchMenuDetailQuery } from '../hooks/useFetchMenuDetailQuery';
import { useCartStore } from '../stores/useCartStore';
import { useMenuSelectionStore } from '../stores/useMenuSelectionStore';
import formatNumber from '../utils/formatNumber';

export default function MenuDetail() {
  const navigate = useNavigate();
  const { menuId } = useParams<{ menuId: string }>();
  if (!menuId) return <div>error</div>;

  const { data, isLoading, isError } = useFetchMenuDetailQuery(menuId);
  const {
    startMenu,
    quantity,
    setQuantity,
    selectedOptions,
    toggleOption,
    optionPrice,
    optionItemPriceMap,
  } = useMenuSelectionStore();
  const { addItem } = useCartStore();

  function isAllRequiredSelected(
    optionGroups: IOptionGroup[],
    selectedOptions: Record<string, Set<string>>,
  ) {
    return optionGroups.every((group) => {
      if (!group.required) return true;
      const selectedCount = selectedOptions[group.id]?.size ?? 0;
      const minSelectable = group.minSelectable ?? 0;
      return (
        selectedCount >= minSelectable && selectedCount <= group.maxSelectable
      );
    });
  }

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (data) {
      startMenu(data);

      // radio 버튼은 첫 옵션 자동 선택
      for (const group of data.optionGroups) {
        if (
          group.required &&
          group.maxSelectable === 1 &&
          group.items.length > 0
        ) {
          toggleOption(group.id, group.items[0].id, true);
        }
      }
    }
  }, [data]);

  if (isLoading) return <div>loading</div>;
  if (isError || !data) return <div>error</div>;

  return (
    <div className="min-w-xs mx-auto w-full">
      <Header title="메뉴보기" />
      <div className="wrapper">
        <div className="mb-3 mt-6">
          <Carousel imgUrls={data.imageUrls} />
        </div>

        <div className="mb-2 flex items-center gap-1">
          {data.isNew && <Chip label="신메뉴" color="green" />}
          {data.isPopular && <Chip label="인기" color="red" />}
        </div>
        <h1 className="text-mb-3 text-gray-700">{data?.name}</h1>
        <p className="text-mb-4 mb-3 text-gray-700">{data.description}</p>
        <div className="mb-6 flex items-center justify-between">
          <div className="text-mb-1 text-gray-800">
            {formatNumber(data.price ?? 0)}원
          </div>
          <div className="flex gap-1 rounded-md bg-gray-200 p-0.5">
            <button
              onClick={() => setQuantity(quantity - 1)}
              className={`transition-colors duration-300 ${quantity === 1 ? 'text-gray-400' : 'text-gray-600'} text-mb-1 flex aspect-square h-6 w-6 flex-col items-center justify-center`}
            >
              -
            </button>
            <span className="text-mb-1 flex aspect-square h-6 w-6 flex-col items-center justify-center rounded-md bg-white text-gray-800">
              {quantity}
            </span>
            <button
              onClick={() => setQuantity(quantity + 1)}
              className="text-mb-1 flex aspect-square h-6 w-6 flex-col items-center justify-center text-gray-600"
            >
              +
            </button>
          </div>
        </div>
      </div>
      {data.optionGroups.map((group) => (
        <OptionGroup
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
      <div className="h-48"></div>
      <ButtonWrapper>
        <BaseButton
          onClick={() => {
            addItem({
              originalItem: data,
              optionPrice: optionPrice,
              quantity: quantity,
              selectedOptions: selectedOptions,
              optionItemPriceMap: optionItemPriceMap,
            });
            navigate(-1);
          }}
          disabled={!isAllRequiredSelected(data.optionGroups, selectedOptions)}
        >
          총 {formatNumber(((data.price ?? 0) + optionPrice) * quantity)}원 ·
          담기
        </BaseButton>
      </ButtonWrapper>
    </div>
  );
}
