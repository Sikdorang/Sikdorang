interface ICategory {
  id: string;
  category: string;
}

interface IBaseMenu {
  id: string;
  name: string;
  price?: number;
  isPopular?: boolean;
  isNew?: boolean;
}

interface ICategoryGroup extends ICategory {
  items: IMenuListItem[];
}

interface IMenuListItem extends IBaseMenu {
  imgUrl?: string;
}

interface IMenuDetail extends IBaseMenu {
  description?: string;
  images: string[];
  optionGroups: ISelectableOptionGroup[];
}

interface IBaseOptionGroup {
  id: string;
  title: string;
  items: IOptionItem[];
}

interface ISelectableOptionGroup extends IBaseOptionGroup {
  required: boolean;
  minSelectable?: number;
  maxSelectable: number;
}

interface IOptionItem {
  id: string;
  name: string;
  price: number;
}

type OptionSelection = Record<string, Set<string>>;

type StoreInfoType =
  | 'openHour'
  | 'toilet'
  | 'wifi'
  | 'corkage'
  | 'naverPlace'
  | 'phone';

interface IStoreInfoItem {
  key: StoreInfoType;
  value: string;
}

interface IStoreInfo {
  id: number;
  name: string;
  infoItems: IStoreInfoItem[];
}

interface ICartItem {
  id: string;
  selected: boolean;
  originalItem: IMenuDetail;
  optionPrice: number;
  quantity: number;
  selectedOptions: OptionSelection;
  optionItemPriceMap: Record<string, number>;
}

type OrderMenuStateType =
  | 'MENU_UNAVAILABLE'
  | 'OPTION_UNAVAILABLE'
  | 'AVAILABLE'
  | 'SOLDOUT'
  | 'PRICE_CHANGED';

interface IOrderMenuItem {
  id: string;
  name: string;
  state: OrderMenuStateType;
  menuPrice: number;
  quantity: number;
  optionGroups: IBaseOptionGroup[];
  optionPrice: number;
}

interface IOrderItem {
  id: string;
  userId: string;
  storeId: string;
  createdAt: string;
  totalPrice: number;
  availableMenuIds: string[];
  items: IOrderMenuItem[];
}
