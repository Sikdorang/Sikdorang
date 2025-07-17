import { showCustomToast } from '../../../utilities/showToast';
import Chip from '../../common/Chip';
import Divider from '../../common/Divider';
import MinMaxText from '../../common/MinMaxText';
import OptionSelector from './OptionSelector';

interface Props {
  group: IOptionGroup;
  selectedOptionIds: Set<string>;
  onToggle: (itemId: string) => void;
}

/**
 * 옵션 그룹과 해당 항목들을 렌더링하며, 선택 가능한 옵션 수를 제한합니다.
 *
 * 옵션 그룹의 필수 여부와 최대/최소 선택 개수에 따라 라디오 버튼 또는 체크박스를 사용하여 옵션을 선택할 수 있습니다. 최대 선택 개수를 초과하려고 할 경우 사용자에게 토스트 메시지로 안내합니다.
 *
 * @param group - 옵션 그룹 정보 및 항목 목록
 * @param selectedOptionIds - 현재 선택된 옵션 ID의 집합
 * @param onToggle - 옵션 선택/해제 시 호출되는 콜백 함수
 */
export default function OptionGroup({
  group,
  selectedOptionIds,
  onToggle,
}: Props) {
  const type: 'radio' | 'checkbox' =
    group.required && group.maxSelectable === 1 ? 'radio' : 'checkbox';
  const isMaxReached = selectedOptionIds.size == group.maxSelectable;
  return (
    <>
      <Divider />
      <div className="wrapper py-3">
        <div className="mb-6">
          <div className="flex items-center justify-between">
            <h2 className="text-mb-3 text-gray-800">{group.title}</h2>
            {group.required && <Chip label="필수" color="blue" />}
          </div>
          <div className="mt-2">
            <MinMaxText
              minSelectable={group.minSelectable}
              maxSelectable={group.maxSelectable}
            />
          </div>
        </div>
        <div className="flex flex-col gap-6">
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
        </div>
      </div>
    </>
  );
}
