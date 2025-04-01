'use client';

import BaseButton from '@/components/common/buttons/BaseButton';
import TextInput from '@/components/common/inputs/TextInput';
import LinkButton from './LinkButton';
import { useState } from 'react';

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState<string | null>(null);

  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    setEmailError(null);
    setPasswordError(null);

    if (email == '') {
      setEmailError('이메일을 입력해 주세요.');
      return;
    }

    if (password == '') {
      setPasswordError('비밀번호를 입력해 주세요.');
      return;
    }

    setEmailError(null);
    setPasswordError(null);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-8 mb-4 w-full max-w-md">
      <h1 className="text-title-sm text-center mb-6 text-blue-500">식도랑</h1>
      <h2 className="text-title-sm text-center mb-7 text-gray-800">로그인</h2>
      <div className="space-y-8">
        <div className="space-y-3">
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
        <div className="space-y-4">
          <BaseButton text="로그인" />
          <div className="flex justify-center items-center gap-2">
            <LinkButton>회원 신청하기</LinkButton>
            <span className="bg-gray-200 mx-2 w-[1.5px] h-4"></span>
            <LinkButton>비밀번호 찾기</LinkButton>
          </div>
        </div>
      </div>
    </form>
  );
}
