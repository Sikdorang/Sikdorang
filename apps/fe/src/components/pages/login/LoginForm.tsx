import BaseButton from '@/components/common/buttons/BaseButton';
import TextInput from '@/components/common/inputs/TextInput';
import LinkButton from './LinkButton';

export default function LoginForm() {
  return (
    <div className="bg-white shadow-md rounded-lg p-8 mb-4 w-full max-w-md">
      <h1 className="text-title-sm text-center mb-6 text-blue-500">식도랑</h1>
      <h2 className="text-title-sm text-center mb-7 text-gray-800">로그인</h2>
      <form className="space-y-8">
        <div className="space-y-3">
          <TextInput placeholder={'아이디를 입력하세요'} />
          <TextInput placeholder={'비밀번호를 입력하세요'} />
        </div>
        <div className="space-y-4">
          <BaseButton text={'로그인'} />
          <div className="flex justify-center items-center gap-2">
            <LinkButton>회원 신청하기</LinkButton>
            <span className="bg-gray-200 mx-2 w-[1.5px] h-4"></span>
            <LinkButton>비밀번호 찾기</LinkButton>
          </div>
        </div>
      </form>
    </div>
  );
}
