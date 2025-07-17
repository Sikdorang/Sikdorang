import { showCustomToast } from '../../../utilities/showToast';
import MinMaxText from '../../common/MinMaxText';
import OptionSelector from '../MenuDetail/OptionSelector';
import CheckSvg from '@/assets/icons/ic_check_thin.svg?react';
import ChervonDownSvg from '@/assets/icons/ic_chervon_down.svg?react';
import ChervonUpSvg from '@/assets/icons/ic_chervon_up.svg?react';
import { useState } from 'react';

interface Props {
  group: IOptionGroup;
  selectedOptionIds: Set<string>;
  onToggle: (itemId: string) => void;
}

/**
 * 옵션 그룹에 대한 드롭다운 선택 UI를 렌더링하는 React 컴포넌트입니다.
 *
 * 옵션 그룹의 제목, 필수 여부, 선택 가능 개수 정보를 표시하며, 현재 선택된 옵션을 보여주고, 드롭다운을 열어 전체 옵션 목록을 선택할 수 있습니다. 최대 선택 개수를 초과하여 선택 시 토스트 알림을 표시합니다.
 *
 * @param group - 옵션 그룹 데이터 객체
 * @param selectedOptionIds - 현재 선택된 옵션의 ID 집합
 * @param onToggle - 옵션 선택/해제 시 호출되는 콜백 함수
 * @returns 옵션 그룹 드롭다운 UI 요소
 */
export default function OptionDropDown({
  group,
  selectedOptionIds,
  onToggle,
}: Props) {
  const [open, setOpen] = useState(false);
  const type: 'radio' | 'checkbox' =
    group.required && group.maxSelectable === 1 ? 'radio' : 'checkbox';
  const isMaxReached = selectedOptionIds.size == group.maxSelectable;
  return (
    <li className="bg-gray-100 rounded-2xl p-5">
      <div className="flex gap-5 items-start">
        <div className="flex-1 space-y-1">
          <h3 className="text-mb-3 text-gray-800">
            <span>{group.title}</span>
            {group.required && <span>필수</span>}
          </h3>
          <MinMaxText
            minSelectable={group.minSelectable}
            maxSelectable={group.maxSelectable}
          />
        </div>
        <button onClick={() => setOpen((prev) => !prev)}>
          {open ? <ChervonUpSvg /> : <ChervonDownSvg />}
        </button>
      </div>
      {selectedOptionIds.size > 0 && (
        <ul className="space-y-1 mt-5">
          {group.items.map((item) =>
            selectedOptionIds.has(item.id) ? (
              <li className="text-mc-1 text-gray-800 flex items-center">
                <CheckSvg />
                <span>{item.name}</span>
              </li>
            ) : null,
          )}
        </ul>
      )}
      {open && (
        <ul className="space-y-6 mt-5">
          {group.items.map((item) => (
            <OptionSelector
              key={item.id}
              type={type}
              label={item.name}
              price={item.price}
              checked={selectedOptionIds.has(item.id)}
              onChange={() => {
                if (
                  type === 'checkbox' &&
                  isMaxReached &&
                  !selectedOptionIds.has(item.id)
                ) {
                  showCustomToast({
                    icon: 'error',
                    message: `최대 ${group.maxSelectable}개까지만 선택할 수 있어요`,
                  });
                } else {
                  onToggle(item.id);
                }
              }}
              name={group.id}
            />
          ))}
        </ul>
      )}
    </li>
  );
}
