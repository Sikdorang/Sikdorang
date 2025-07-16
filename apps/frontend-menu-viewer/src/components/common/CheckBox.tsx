import CheckBoxCheckSvg from '@/assets/icons/ic_checkbox_check.svg?react';

interface Props {
  checked: boolean;
  onClick?: () => void;
}

export default function CheckBox({ checked, onClick }: Props) {
  return (
    <div
      onClick={onClick}
      className={`flex h-6 w-6 items-center justify-center rounded border transition-colors duration-200 ${
        checked ? 'bg-main-500 border-main-500' : 'border-gray-200 bg-white'
      }`}
    >
      {checked && <CheckBoxCheckSvg width={20} height={20} />}
    </div>
  );
}
