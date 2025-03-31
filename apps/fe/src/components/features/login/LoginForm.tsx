import BaseButton from '@/components/common/buttons/BaseButton';
import TextInput from '@/components/common/inputs/TextInput';

export default function LoginForm() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md">
        <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">식도랑</h1>
          <h2 className="text-2xl font-semibold text-center mb-6 text-gray-700">로그인</h2>
          <form>
            <TextInput label="아이디" placeholder={'아이디를 입력하세요'} />
            <TextInput label="비밀번호" placeholder={'비밀번호를 입력하세요'} />
            <BaseButton text={'로그인'} />
            <BaseButton text={'비밀번호 찾기'} />
          </form>
        </div>
      </div>
    </div>
  );
}
