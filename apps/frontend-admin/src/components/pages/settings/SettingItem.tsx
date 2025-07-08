import Image from 'next/image';
import { HTMLAttributes, PropsWithChildren } from 'react';

interface SettingItemProps
  extends HTMLAttributes<HTMLButtonElement>,
    PropsWithChildren {
  image: string;
}

export default function SettingItem({ children, image }: SettingItemProps) {
  return (
    <button className="flex w-full max-w-xl items-center gap-2">
      <div>
        <Image src={image} alt="setting" />
      </div>
      <div className="text-mobile-body-m-semibold text-gray-700">
        {children}
      </div>
    </button>
  );
}
