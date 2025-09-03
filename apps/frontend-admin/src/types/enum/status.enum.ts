export enum MenuStatus {
  SALE = 1,
  HIDDEN = 2,
  SOLDOUT = 3,
}

export const MenuStatusLabel: Record<MenuStatus, string> = {
  [MenuStatus.SALE]: '판매 중',
  [MenuStatus.HIDDEN]: '숨김',
  [MenuStatus.SOLDOUT]: '품절',
};
