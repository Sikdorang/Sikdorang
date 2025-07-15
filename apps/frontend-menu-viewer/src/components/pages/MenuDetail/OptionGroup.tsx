import { showCustomToast } from '../../../utils/showToast';
import Chip from '../../common/Chip';
import Divider from '../../common/Divider';
import OptionSelector from './OptionSelector';

interface Props {
  group: IOptionGroup;
  selectedOptionIds: Set<string>;
  onToggle: (itemId: string) => void;
}

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
          {type === 'checkbox' && (
            <p className="text-mc-2 mt-2 flex items-center gap-1 text-gray-500">
              {group.minSelectable && (
                <>
                  <span> 최대 {group.minSelectable}개</span>
                  <div className="h-1 w-1 rounded-full bg-gray-500"></div>
                </>
              )}
              <span> 최대 {group.maxSelectable}개 선택</span>
            </p>
          )}
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
                    message: '이미 최대 개수만큼 선택하셨어요!',
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
