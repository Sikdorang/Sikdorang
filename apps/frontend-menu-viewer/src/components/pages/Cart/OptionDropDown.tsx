import { showCustomToast } from '../../../utilities/showToast';
import MinMaxText from '../../common/MinMaxText';
import OptionSelector from '../MenuDetail/OptionSelector';
import CheckSvg from '@/assets/icons/ic_check_thin.svg?react';
import ChervonDownSvg from '@/assets/icons/ic_chervon_down.svg?react';
import ChervonUpSvg from '@/assets/icons/ic_chervon_up.svg?react';
import { useState } from 'react';

interface Props {
  group: ISelectableOptionGroup;
  selectedOptionIds: Set<string>;
  onToggle: (itemId: string) => void;
}

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
              <li
                key={item.id}
                className="text-mc-1 text-gray-800 flex items-center"
              >
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
