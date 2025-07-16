import BellSvg from '@/assets/icons/ic_bell.svg?react';
import CheckSvg from '@/assets/icons/ic_check.svg?react';
import ErrorSvg from '@/assets/icons/ic_error.svg?react';
import type { ReactNode } from 'react';
import toast from 'react-hot-toast';

export type ToastIconType = 'bell' | 'error' | 'check';

const IconMap: Record<ToastIconType, ReactNode> = {
  bell: <BellSvg />,
  error: <ErrorSvg />,
  check: <CheckSvg />,
};

export function showCustomToast({
  icon,
  message,
}: {
  icon?: ToastIconType;
  message: string;
}) {
  toast.custom(
    (t) => (
      <div
        className={`flex transform items-center gap-2 rounded-2xl border border-gray-100 bg-white/80 px-6 py-3 backdrop-blur-sm transition-all duration-300 ${t.visible ? 'animate-toast-in' : 'animate-toast-out'}`}
      >
        <div className="bg-main-500 flex h-6 w-6 flex-col items-center justify-center rounded-full text-gray-700">
          {icon && IconMap[icon]}
        </div>
        <div>
          {message.split('\n').map((line, index) => (
            <p className="text-mb-4 text-gray-700" key={index}>
              {line}
            </p>
          ))}
        </div>
      </div>
    ),
    {
      duration: 2000,
      position: 'bottom-center',
    },
  );
}
