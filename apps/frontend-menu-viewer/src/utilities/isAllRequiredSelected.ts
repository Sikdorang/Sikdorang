/**
 * 모든 필수 옵션 그룹이 선택 기준을 충족하는지 확인합니다.
 *
 * 각 옵션 그룹에 대해, 필수가 아닌 경우 자동으로 충족된 것으로 간주합니다. 필수 그룹의 경우, 선택된 옵션의 개수가 최소 선택 개수 이상, 최대 선택 개수 이하인지 검사합니다.
 *
 * @param optionGroups - 옵션 그룹 객체 배열
 * @param selectedOptions - 그룹 ID별로 선택된 옵션 ID 집합을 매핑한 객체
 * @returns 모든 필수 옵션 그룹이 선택 조건을 만족하면 true, 그렇지 않으면 false
 */
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
