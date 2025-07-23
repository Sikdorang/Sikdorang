interface Props {
  minSelectable?: number;
  maxSelectable?: number;
}

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
