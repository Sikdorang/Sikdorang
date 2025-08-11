export enum MenuStatus {
  SALE = 'SALE',
  HIDDEN = 'HIDDEN',
  SOLDOUT = 'SOLDOUT',
}

export const MenuStatusLabel: Record<MenuStatus, string> = {
  [MenuStatus.SALE]: '판매 중',
  [MenuStatus.HIDDEN]: '숨김',
  [MenuStatus.SOLDOUT]: '품절',
};
