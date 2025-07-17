import CheckBoxCheckSvg from '@/assets/icons/ic_checkbox_check.svg?react';

interface Props {
  checked: boolean;
  onClick?: () => void;
}

/**
 * 체크 상태에 따라 스타일이 변경되는 커스텀 체크박스 컴포넌트를 렌더링합니다.
 *
 * @param checked - 체크박스가 선택된 상태인지 여부
 * @param onClick - 체크박스를 클릭할 때 호출되는 선택적 콜백 함수
 * @returns 체크 상태에 따라 아이콘과 스타일이 달라지는 체크박스 요소
 */
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
