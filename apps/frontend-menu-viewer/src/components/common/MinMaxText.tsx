interface Props {
  minSelectable?: number;
  maxSelectable?: number;
}

/**
 * 최소 및 최대 선택 가능 개수를 안내하는 텍스트를 렌더링합니다.
 *
 * `minSelectable`이 정의되어 있고 두 값이 모두 1이 아닐 경우, 최소 선택 개수 안내와 구분점을 표시합니다. 항상 최대 선택 개수 안내 문구를 표시합니다.
 *
 * @param minSelectable - 최소 선택 가능 개수(옵션)
 * @param maxSelectable - 최대 선택 가능 개수(옵션)
 * @returns 선택 가능 개수 안내 텍스트를 포함한 JSX 요소
 */
export default function MinMaxText({ minSelectable, maxSelectable }: Props) {
  return (
    <p className="text-mc-2 flex items-center gap-1 text-gray-500">
      {minSelectable && !(minSelectable === 1 && maxSelectable === 1) && (
        <>
          <span> 최소 {minSelectable}개</span>
          <div className="h-1 w-1 rounded-full bg-gray-500"></div>
        </>
      )}
      <span> 최대 {maxSelectable}개 선택</span>
    </p>
  );
}
