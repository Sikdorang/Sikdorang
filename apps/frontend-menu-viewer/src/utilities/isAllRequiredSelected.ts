export function isAllRequiredSelected(
  optionGroups: IOptionGroup[],
  selectedOptions: Record<string, Set<string>>,
) {
  return optionGroups.every((group) => {
    if (!group.required) return true;
    const selectedCount = selectedOptions[group.id]?.size ?? 0;
    const minSelectable = group.minSelectable ?? 0;
    return (
      selectedCount >= minSelectable && selectedCount <= group.maxSelectable
    );
  });
}
