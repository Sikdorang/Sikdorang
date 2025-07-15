import CheckSvg from '@/assets/icons/ic_check.svg?react';

interface Props {
  type: 'radio' | 'checkbox';
  label: string;
  price: number;
  checked: boolean;
  onChange: () => void;
  name: string;
}

export default function OptionSelector({
  type,
  label,
  price,
  checked,
  onChange,
  name,
}: Props) {
  return (
    <label className="flex cursor-pointer select-none items-center justify-between">
      <input
        type={type}
        className="sr-only"
        checked={checked}
        onChange={onChange}
        name={name}
      />
      <div className="flex items-center gap-4">
        <SelectorIcon type={type} checked={checked} />
        <span className="text-mb-4 text-gray-800">{label}</span>
      </div>
      <span className="text-mb-3 text-gray-800">+{price}원</span>
    </label>
  );
}

function SelectorIcon({
  type,
  checked,
}: {
  type: 'radio' | 'checkbox';
  checked: boolean;
}) {
  if (type === 'radio') {
    return (
      <div
        className={`flex h-6 w-6 items-center justify-center rounded-full border transition-colors duration-200 ${
          checked ? 'bg-main-500 border-main-500' : 'border-gray-200'
        }`}
      >
        {checked && <div className="h-3 w-3 rounded-full bg-white" />}
      </div>
    );
  }
  return (
    <div
      className={`flex h-6 w-6 items-center justify-center rounded border transition-colors duration-200 ${
        checked ? 'bg-main-500 border-main-500' : 'border-gray-200'
      }`}
    >
      {checked && <CheckSvg width={20} height={20} />}
    </div>
  );
}
