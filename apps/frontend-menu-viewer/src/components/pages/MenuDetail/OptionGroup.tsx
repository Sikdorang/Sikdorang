import { showCustomToast } from '../../../utilities/showToast';
import Chip from '../../common/Chip';
import Divider from '../../common/Divider';
import MinMaxText from '../../common/MinMaxText';
import OptionSelector from './OptionSelector';

interface Props {
  group: ISelectableOptionGroup;
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
    <div className="xl:mx-auto xl:max-w-5xl">
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
    </div>
  );
}
