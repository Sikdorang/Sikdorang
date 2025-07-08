'use client';
import { useToggleSwitch } from '@/contexts/ToggleSwitchContext';
import { ReactNode } from 'react';

export default function ToggleSwitch({
  children,
  className = '',
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`flex items-center gap-4 ${className}`}>{children}</div>
  );
}

// 토글 라벨 컴포넌트
export function ToggleLabel({
  children,
  className = '',
}: {
  children: ReactNode;
  className?: string;
}) {
  return <span className={`text-lg font-medium ${className}`}>{children}</span>;
}

// 토글 스위치 컴포넌트
export function ToggleSwitchButton({
  onToggle,
  className = '',
}: {
  onToggle?: (isOn: boolean) => void;
  className?: string;
}) {
  const { isOn, toggle } = useToggleSwitch();

  const handleToggle = () => {
    toggle();
    onToggle?.(isOn);
  };

  return (
    <button
      onClick={handleToggle}
      className={`relative inline-flex h-8 w-14 items-center rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 ${
        isOn
          ? 'bg-yellow-400 focus:ring-yellow-500'
          : 'bg-gray-300 focus:ring-gray-500'
      } ${className}`}
    >
      <span
        className={`inline-block h-6 w-6 transform rounded-full bg-white transition-transform duration-200 ${
          isOn ? 'translate-x-7' : 'translate-x-1'
        }`}
      />
    </button>
  );
}

// 상태 표시 컴포넌트
export function ToggleStatus({
  onText = '판매중',
  offText = '품절',
  className = '',
}: {
  onText?: string;
  offText?: string;
  className?: string;
}) {
  const { isOn } = useToggleSwitch();

  return (
    <span
      className={`text-sm font-medium ${
        isOn ? 'text-yellow-600' : 'text-gray-500'
      } ${className}`}
    >
      {isOn ? onText : offText}
    </span>
  );
}
