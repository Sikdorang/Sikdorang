import CancelIcon from '@public/icons/ic_x.svg';
import Image from 'next/image';
import React from 'react';
import TextInput from './TextInput';

interface OptionInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

export default function OptionInput({}: OptionInputProps) {
  return (
    <div className="flex w-full flex-col rounded-2xl bg-gray-100 p-8">
      <div className="flex">
        <span className="grow-1"></span>
        <Image src={CancelIcon} alt="옵션 삭제" />
      </div>
      <TextInput label="옵션 이름" placeholder="옵션 이름" />
    </div>
  );
}
