import { ORDER_MENU_STATE } from '../constants/constants';

export function getWarningText(state: OrderMenuStateType) {
  switch (state) {
    case ORDER_MENU_STATE.MENU_UNAVAILABLE:
      return '메뉴가 삭제됐어요 !';
    case ORDER_MENU_STATE.OPTION_UNAVAILABLE:
      return '변동된 옵션이 있어요 !';
    case ORDER_MENU_STATE.SOLDOUT:
      return '메뉴가 다 팔렸어요 !';
    case ORDER_MENU_STATE.PRICE_CHANGED:
      return '가격이 변동됐어요 !';
    default:
      return null;
  }
}
