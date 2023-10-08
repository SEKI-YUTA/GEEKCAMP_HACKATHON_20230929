import type { MenuItemType } from './Menu';

// GET /restaurants/:id/menus/yosan のレスポンスの型を定義する
export type MenuSetResponse = {
  status: string;
  yosan: number;
  menuSet: MenuItemType[];
};
