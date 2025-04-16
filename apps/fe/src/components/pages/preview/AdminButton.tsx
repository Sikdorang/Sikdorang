'use client';

import { useState } from 'react';
import SettingIcon from '@public/icons/ic_setting.svg';

import TextInput from '@/components/common/inputs/TextInput';
import BaseButton from '@/components/common/buttons/BaseButton';
import BaseModal from '@/components/common/modals/BaseModal';
import { useRouter } from 'next/navigation';
import { MESSAGES } from '@/constants/messages';

const TEMP_PASSWORD = '1234';

export default function AdminButton() {
  const router = useRouter();
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState<string | undefined>(undefined);
  const [open, setOpen] = useState(false);

  const validatePassword = (password: string) => {
    return password == TEMP_PASSWORD;
  };

  const handleClick = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleSubmit = () => {
    if (validatePassword(password)) router.push('/menu');
    else {
      setErrorMessage(MESSAGES.invalidPassword);
      setPassword('');
    }
  };

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
            <TextInput
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setErrorMessage(undefined);
              }}
              type="password"
              placeholder="비밀번호"
              errorMessage={errorMessage}
            />
          </BaseModal.content>
          <BaseModal.actions>
            <BaseButton onClick={handleClose} variant="cancel">
              취소
            </BaseButton>
            <BaseButton disabled={password == ''} onClick={handleSubmit}>
              입력하기
            </BaseButton>
          </BaseModal.actions>
        </BaseModal>
      )}
    </>
  );
}
