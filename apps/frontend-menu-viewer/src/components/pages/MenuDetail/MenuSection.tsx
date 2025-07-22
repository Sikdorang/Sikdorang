import BottomSpace from '@/components/common/BottomSpace';
import ErrorView from '@/components/common/ErrorView';
import AddToCartButton from '@/components/pages/MenuDetail/AddToCartButton';
import MenuInfo from '@/components/pages/MenuDetail/MenuInfo';
import OptionGroupList from '@/components/pages/MenuDetail/OptionGroupList';
import { useFetchMenuDetailQuery } from '@/hooks/useFetchMenuDetailQuery';
import { useCartStore } from '@/stores/useCartStore';
import { useMenuSelectionStore } from '@/stores/useMenuSelectionStore';
import { isAllRequiredSelected } from '@/utilities/isAllRequiredSelected';
import { useEffect } from 'react';
import { useNavigate } from 'react-router';

interface Props {
  menuId: string;
}

export default function MenuSection({ menuId }: Props) {
  const navigate = useNavigate();
  const { data, isError } = useFetchMenuDetailQuery(menuId);
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

  if (isError || !data) return <ErrorView />;

  return (
    <>
      <MenuInfo menu={data} quantity={quantity} setQuantity={setQuantity} />
      <OptionGroupList
        optionGroups={data.optionGroups}
        selectedOptions={selectedOptions}
        toggleOption={toggleOption}
      />
      <BottomSpace />
      <AddToCartButton
        totalPrice={(data.price ?? 0) + optionPrice}
        quantity={quantity}
        disabled={!isAllRequiredSelected(data.optionGroups, selectedOptions)}
        addToCart={() => {
          addItem({
            originalItem: data,
            optionPrice,
            quantity,
            selectedOptions,
            optionItemPriceMap,
          });
          navigate(-1);
        }}
      />
    </>
  );
}
