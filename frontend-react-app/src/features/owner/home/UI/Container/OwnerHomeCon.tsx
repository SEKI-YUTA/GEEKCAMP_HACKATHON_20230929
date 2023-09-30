import type { FC } from 'react';
import { OwnerHomePre } from '../Presentational/OwnerHomePre';
import { useState } from 'react';
import type { MenuItemProps } from '../Components/MenuItem'
/**
 * ホーム画面のコンポーネント（Container）
 * ここにコンポーネントのロジックを書いて、OwnerHomePreに渡す
 * @returns 
 */

const temp_menu_item_list: MenuItemProps[] = [
  {
    id: 1,
    name: 'a',
    img: 'https://k-net01.com/wp-content/uploads/2019/01/smartphone-83.jpg',
    price: 100,
  },
  {
    id: 2,
    name: '焼き鳥',
    img: 'https://k-net01.com/wp-content/uploads/2019/01/smartphone-83.jpg',
    price: 100,
  },
  {
    id: 3,
    name: '焼き鳥',
    img: 'https://k-net01.com/wp-content/uploads/2019/01/smartphone-83.jpg',
    price: 100,
  },
  {
    id: 4,
    name: '焼き鳥',
    img: 'https://k-net01.com/wp-content/uploads/2019/01/smartphone-83.jpg',
    price: 100,
  },
  {
    id: 5,
    name: '焼き鳥',
    img: 'https://k-net01.com/wp-content/uploads/2019/01/smartphone-83.jpg',
    price: 100,
  },
  {
    id: 6,
    name: '焼き鳥',
    img: 'https://k-net01.com/wp-content/uploads/2019/01/smartphone-83.jpg',
    price: 100,
  },
  {
    id: 7,
    name: '焼き鳥',
    img: 'https://k-net01.com/wp-content/uploads/2019/01/smartphone-83.jpg',
    price: 100,
  },
  {
    id: 8,
    name: '焼き鳥',
    img: 'https://k-net01.com/wp-content/uploads/2019/01/smartphone-83.jpg',
    price: 100,
  },
]

export const OwnerHomeCon: FC = () => {
  const [menu_item_list, setMenu_item_list] = useState<MenuItemProps[]>(temp_menu_item_list)
  const OnPressAddMenuButton = () => { }
  return <OwnerHomePre menu_item_list={menu_item_list} onPressAddMenuButton={OnPressAddMenuButton} />;
};