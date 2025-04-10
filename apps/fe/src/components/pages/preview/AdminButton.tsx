'use client';

import { useState } from 'react';
import SettingIcon from '@public/icons/ic_setting.svg';

import TextInput from '@/components/common/inputs/TextInput';
import BaseButton from '@/components/common/buttons/BaseButton';
import BaseModal from '@/components/common/modals/BaseModal';
import { useRouter } from 'next/navigation';

export default function AdminButton() {
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const handleClick = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <button
        className="shadow-sm fixed left-5 bottom-5 z-10 flex items-center justify-center bg-yellow rounded-full w-10 h-10"
        onClick={handleClick}
      >
        <SettingIcon />
      </button>

      {open && (
        <BaseModal onClose={handleClose}>
          <BaseModal.title>관리자 모드 전환</BaseModal.title>
          <BaseModal.content>
            <TextInput type="password" placeholder="비밀번호" />
          </BaseModal.content>
          <BaseModal.actions>
            <BaseButton onClick={handleClose} variant="cancel">
              취소
            </BaseButton>
            <BaseButton
              onClick={() => {
                router.push('/');
              }}
            >
              입력하기
            </BaseButton>
          </BaseModal.actions>
        </BaseModal>
      )}
    </>
  );
}
