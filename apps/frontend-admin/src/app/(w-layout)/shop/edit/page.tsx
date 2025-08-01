'use client';

import TextInput from '@/components/common/inputs/TextInput';
import BusinessHours from '@/components/pages/shop/BusinessHours';
import Corkage from '@/components/pages/shop/Corkage';

export default function EditShopPage() {
  return (
    <div className="flex flex-col items-center justify-center border border-gray-100">
      <div className="wrapper flex w-full flex-col items-center justify-center py-4 gap-4">
        <TextInput
          label="전화번호"
          placeholder="‘-’을 제외한 숫자만 입력해주세요."
        />

        <BusinessHours label="영업 시간" />

        <Corkage />

        <TextInput label="네이버 플레이스" placeholder="링크를 첨부해주세요." />

        <div className="flex flex-col w-full">
          <TextInput label="Wifi" placeholder="아이디를 입력해주세요.." />
          <TextInput placeholder="비밀번호를 입력해주세요." />
        </div>

        <TextInput
          label="화장실 가는 길"
          placeholder="화장실 가는 길을 설명해주세요."
        />
      </div>
    </div>
  );
}
