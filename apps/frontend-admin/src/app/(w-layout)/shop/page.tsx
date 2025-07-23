import TextInput from '@/components/common/inputs/TextInput';
import ShopGuide from '@/components/pages/shop/ShopGuide';

export default function ShopPage() {
  return (
    <div className="flex flex-col items-center justify-center border border-gray-100">
      <div className="wrapper flex w-full flex-col items-center justify-center py-4 gap-4">
        <TextInput
          label="매장명"
          placeholder="매장명을 입력해주세요."
          isRequired={true}
        />
        <ShopGuide label="매장 이용 가이드" />
      </div>
    </div>
  );
}
