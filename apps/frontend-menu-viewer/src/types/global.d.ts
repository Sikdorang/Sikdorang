interface ICategory {
  id: string;
  category: string;
}

interface IMenu {
  id: string;
  name: string;
  price?: number;
  isNew?: boolean;
  isPopular?: boolean;
  imgUrl?: string;
}

interface ICategoryGroup extends ICategory {
  items: IMenu[];
}
