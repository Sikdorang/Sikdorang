'use client';

import MenuCustomDropdown from '@/components/pages/menuEdit/MenuCustomDropdown';
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
          className="flex w-full px-12 justify-center"
          style={{ maxHeight: '80vh', width: '100%' }}
        >
          <iframe
            src="http://localhost:3001"
            title="웹뷰 프리뷰"
            style={{
              border: '10px solid #111223',
              borderRadius: '3rem',
              width: viewMode === 'mobile' ? '350px' : '1024px',
              height: viewMode === 'mobile' ? '720px' : '700px',
            }}
          />
        </div>
      </div>
    </div>
  );
}
