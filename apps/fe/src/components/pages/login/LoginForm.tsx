'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import BaseButton from '@/components/common/buttons/BaseButton';
import TextInput from '@/components/common/inputs/TextInput';
import LinkButton from './LinkButton';
import { toast } from 'react-toastify';
import ErrorMessage from '@/components/common/labels/ErrorMessage';

export default function LoginForm() {
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState<string | null>(null);

  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState<string | null>(null);

  const [loginError, setLoginError] = useState<string | null>(null);

  const [isLoading, setIsLoading] = useState(false);

  const clearErrors = () => {
    setEmailError(null);
    setPasswordError(null);
    setLoginError(null);
  };

  const validation = () => {
    clearErrors();

    // 이메일을 입력하지 않았을 경우
    if (email == '') {
      setEmailError('이메일을 입력해 주세요.');
      setIsLoading(false);
      return;
    }

    // 비밀번호를 입력하지 않았을 경우
    if (password == '') {
      setPasswordError('비밀번호를 입력해 주세요.');
      setIsLoading(false);
      return;
    }

    clearErrors();
  };

  const handleShowingComingSoonToast = (event: React.MouseEvent) => {
    event.preventDefault();
    toast('해당 기능은 추후 업데이트될 예정입니다.', {
      type: 'info',
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setIsLoading(true);
    validation();

    try {
      const response = await fetch('http://localhost:4000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          UserId: email,
          Password: password,
        }),
      });

      const data = await response.json();

      // 이메일 혹은 비밀번호가 틀렸을 경우
      if (!response.ok && response.status == 401) {
        setLoginError('이메일 또는 비밀번호가 일치하지 않습니다.');
        setIsLoading(false);
        return;
      }

      localStorage.setItem('accessToken', data.accessToken);

      toast('로그인에 성공했습니다.', {
        type: 'success',
      });

      router.push('/preview');
    } catch (error) {
      toast('일시적인 문제가 발생했습니다.', {
        type: 'error',
      });
      console.error(error);
    } finally {
      setIsLoading(false);
    }
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
