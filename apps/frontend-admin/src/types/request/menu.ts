export interface UpdateMenuDetailsDto {
  menu?: string;
  price?: number;
  categoryId?: number;
  order?: string;
  status: 'SALE' | 'HIDDEN' | 'SOLDOUT';
  new: boolean;
  popular: boolean;
  description: string;
}

export interface OptionDetailDto {
  menuOptionId?: number;
  optionDetailId?: number;
  optionDetail: string;
  price: number;
}

export interface MenuOptionDto {
  menuId: number;
  option: string;
  minOption: number;
  maxOption: number;
  optionRequired: boolean;
  optionDetails: OptionDetailDto[];
}

export interface UpdateMenuOptionsDto {
  menuId: number;
  options: MenuOptionDto[];
}
