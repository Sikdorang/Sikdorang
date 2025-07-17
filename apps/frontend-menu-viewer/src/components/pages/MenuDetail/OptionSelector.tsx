import CheckBox from '../../common/CheckBox';

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

/**
 * 선택 입력의 타입과 선택 상태에 따라 라디오 버튼 또는 체크박스 아이콘을 렌더링합니다.
 *
 * @param type - 'radio' 또는 'checkbox' 중 하나로, 렌더링할 아이콘의 유형을 지정합니다.
 * @param checked - 선택 여부를 나타냅니다.
 * @returns 선택 상태에 맞는 라디오 버튼 또는 체크박스 아이콘 컴포넌트
 */
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
          checked ? 'bg-main-500 border-main-500' : 'border-gray-200 bg-white'
        }`}
      >
        {checked && <div className="h-3 w-3 rounded-full bg-white" />}
      </div>
    );
  }
  return <CheckBox checked={checked} />;
}
