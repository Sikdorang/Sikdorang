'use client';

import { useState } from 'react';
import BaseButton from '@/components/common/buttons/BaseButton';
import TextInput from '@/components/common/inputs/TextInput';
import LinkButton from './LinkButton';
import { toast } from 'react-toastify';
import ErrorMessage from '@/components/common/labels/ErrorMessage';
import { MESSAGES } from '@/constants/messages';
import { useLogin } from '@/hooks/useLogin';

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState<string | null>(null);

  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState<string | null>(null);

  const { isLoading, setIsLoading, submit, loginError, setLoginError } = useLogin();

  const clearErrors = () => {
    setEmailError(null);
    setPasswordError(null);
    setLoginError(null);
  };

  const validation = () => {
    if (email === '') {
      setEmailError(MESSAGES.emailRequired);
      return false;
    }

    if (password === '') {
      setPasswordError(MESSAGES.passwordRequired);
      return false;
    }

    return true;
  };

  const handleShowingComingSoonToast = (event: React.MouseEvent) => {
    event.preventDefault();
    toast(MESSAGES.featureComingSoon, {
      type: 'info',
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setIsLoading(true);
    clearErrors();

    if (!validation()) {
      setIsLoading(false);
      return;
    }

    await submit(email, password);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-8 mb-4 w-full max-w-md">
      <h1 className="text-title-sm text-center mb-6 text-blue-500">식도랑</h1>
      <h2 className="text-title-sm text-center mb-7 text-gray-800">로그인</h2>
      <div className="">
        <div className="space-y-3 mb-6">
          <TextInput
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            errorMessage={emailError ?? undefined}
            placeholder="아이디를 입력하세요"
          />
          <TextInput
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            errorMessage={passwordError ?? undefined}
            placeholder="비밀번호를 입력하세요"
          />
        </div>
        {loginError && <ErrorMessage className="block text-center mb-2">{loginError}</ErrorMessage>}
        <div className="space-y-4 w-full">
          <BaseButton isLoading={isLoading}>로그인</BaseButton>
          <div className="flex justify-center items-center gap-2">
            <LinkButton onClick={handleShowingComingSoonToast}>회원 신청하기</LinkButton>
            <span className="bg-gray-200 mx-2 w-[1.5px] h-4"></span>
            <LinkButton onClick={handleShowingComingSoonToast}>비밀번호 찾기</LinkButton>
          </div>
        </div>
      </div>
    </form>
  );
}
