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
            <p className="text-mc-2 mt-2 text-gray-500">
              최대 {group.maxSelectable}개 선택
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
              onChange={() => onToggle(item.id)}
              name={group.id}
            />
          ))}
        </div>
      </div>
    </>
  );
}
