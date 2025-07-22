import OptionGroup from './OptionGroup';

interface OptionGroupListProps {
  optionGroups: ISelectableOptionGroup[];
  selectedOptions: Record<string, Set<string>>;
  toggleOption: (groupId: string, itemId: string, checked: boolean) => void;
}

export default function OptionGroupList({
  optionGroups,
  selectedOptions,
  toggleOption,
}: OptionGroupListProps) {
  return (
    <>
      {optionGroups.map((group) => (
        <OptionGroup
          key={group.id}
          group={group}
          selectedOptionIds={selectedOptions[group.id] ?? new Set()}
          onToggle={(itemId) =>
            toggleOption(
              group.id,
              itemId,
              group.maxSelectable === 1 && group.required,
            )
          }
        />
      ))}
    </>
  );
}
