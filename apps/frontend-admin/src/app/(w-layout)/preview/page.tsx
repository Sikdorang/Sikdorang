'use client';

import MenuCustomDropdown from '@/components/pages/menuEdit/MenuCustomDropdown';
import PhoneImage from '@public/images/img_menu_viewer_phone.png';
import TabletImage from '@public/images/img_menu_viewer_tablet.png';
import Image from 'next/image';
import { useState } from 'react';

export default function PreviewPage() {
  const [viewMode, setViewMode] = useState<'mobile' | 'tablet'>('mobile');
  const options = [
    { label: '모바일로 보기', value: 'mobile' },
    { label: '태블릿으로 보기', value: 'tablet' },
  ];

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="wrapper flex w-full flex-col items-center justify-center py-4 gap-8 border-t border-gray-100">
        <div className="flex w-full items-center px-12">
          <div className="grow" />
          <MenuCustomDropdown
            options={options.map((o) => o.label)}
            selectedOption={
              options.find((o) => o.value === viewMode)?.label || ''
            }
            onChange={(label) => {
              const found = options.find((o) => o.label === label);
              if (found) setViewMode(found.value as 'mobile' | 'tablet');
            }}
          />
        </div>

        <div
          className="flex w-full px-12 py-4 justify-center"
          style={{ maxHeight: '80vh' }}
        >
          {viewMode === 'tablet' ? (
            <Image
              src={PhoneImage}
              alt="모바일 미리보기"
              style={{ maxHeight: '80vh', height: 'auto', width: 'auto' }}
            />
          ) : (
            <Image
              src={TabletImage}
              alt="태블릿 미리보기"
              style={{ maxHeight: '80vh', height: 'auto', width: 'auto' }}
            />
          )}
        </div>
      </div>
    </div>
  );
}
