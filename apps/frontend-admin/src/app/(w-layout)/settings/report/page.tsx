'use client';

import CtaButton from '../../../../components/common/buttons/CtaButton';
import ImageInput from '../../../../components/common/inputs/ImageInput';
import TextInput from '../../../../components/common/inputs/TextInput';
import { IMenuImageItem } from '../../../../types/model/menu';
import SubmissionCompleteImage from '@public/images/img_dorang_11.png';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function SettingReportPage() {
  const [description, setDescription] = useState('');
  const [contact, setContact] = useState('');
  const [images, setImages] = useState<IMenuImageItem[]>([]);
  const [submitted, setSubmitted] = useState(false);
  const router = useRouter();

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center border-t border-gray-100 h-[90vh]">
        <div className="wrapper flex w-full flex-col items-center justify-center py-4 gap-8">
          <div className="flex flex-col items-center gap-4 text-center px-6">
            <Image
              src={SubmissionCompleteImage}
              alt="제보 완료"
              width={200}
              height={200}
            />
            <div className="text-dt-1 text-gray-900">
              제보가 접수되었습니다
              <br /> 확인 후 연락드리겠습니다
            </div>
            <div className="text-db-4 text-gray-700">
              앞으로 더 분발하는 식도랑이 되겠습니다
            </div>
            <CtaButton
              size="medium"
              color="gray"
              radius="xl"
              text="닫기"
              onClick={() => router.back()}
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="wrapper flex w-full flex-col items-center justify-center py-4">
        <div className="flex flex-col w-full px-12 gap-10">
          <TextInput
            label="문의하실 내용을 입력해주세요"
            placeholder="발견하신 버그를 자세히 말해주세요."
            limitHide
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <TextInput
            label="응답받으실 메일 혹은 연락처를 입력해주세요"
            placeholder="응답 받으실 연락처를 남겨주세요."
            limitHide
            value={contact}
            onChange={(e) => setContact(e.target.value)}
          />
          <ImageInput label="이미지 첨부 (선택)" setImages={setImages} />
        </div>

        <div className="flex mb-12 px-12">
          <div className="flex-1" />
          <div className="text-mb-5 text-gray-500">
            *10MB 이하, PNG/JPG만 허용
          </div>
        </div>

        <CtaButton
          text="제보하기"
          color="white"
          onClick={() => setSubmitted(true)}
        />
      </div>
    </div>
  );
}
