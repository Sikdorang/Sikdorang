'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import BaseModal from '@/components/common/modals/BaseModal';
import TextInput from '@/components/common/inputs/TextInput';
import BaseButton from '@/components/common/buttons/BaseButton';
import { MESSAGES } from '@/constants/messages';

const TEMP_PASSWORD = '1234';

interface AdminModalProps {
  onClose: () => void;
  onPass: () => void;
}

export default function AdminModal({ onClose, onPass }: AdminModalProps) {
  const router = useRouter();
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState<string | undefined>(undefined);

  const validatePassword = (password: string) => password == TEMP_PASSWORD;

  const handleSubmit = () => {
    if (validatePassword(password)) {
      onPass();
      toast.success(MESSAGES.adminModeEnter);
      setTimeout(() => {
        router.push('/menu');
      }, 300);
    } else {
      setErrorMessage(MESSAGES.invalidPassword);
      setPassword('');
    }
  };

  useEffect(() => {
    history.pushState(null, '', location.href);
    const handlePopState = () => onClose();
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [onClose]);

  return (
    <BaseModal onClose={onClose}>
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
        <BaseButton onClick={onClose} variant="cancel">
          취소
        </BaseButton>
        <BaseButton disabled={password === ''} onClick={handleSubmit}>
          입력하기
        </BaseButton>
      </BaseModal.actions>
    </BaseModal>
  );
}
