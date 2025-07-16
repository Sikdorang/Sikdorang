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
  imgUrls: string[];
  optionGroups: IOptionGroup[];
}

interface IOptionGroup {
  id: string;
  title: string;
  required: boolean;
  minSelectable?: number;
  maxSelectable: number;
  items: IOptionItem[];
}

interface IOptionItem {
  id: string;
  name: string;
  price: number;
}

type OptionSelection = Record<string, Set<string>>;
