import type { FC } from 'react';
import { OwnerHomePre } from '../Presentational/OwnerHomePre';
import { useState } from 'react';
import type { MenuItemType } from '../Components/MenuItem';
/**
 * ホーム画面のコンポーネント（Container）
 * ここにコンポーネントのロジックを書いて、OwnerHomePreに渡す
 * @returns 
 */
const tempMenuItemList: MenuItemType[] = [
  {
    id: 1,
    name: 'a',
    photo_url: 'https://k-net01.com/wp-content/uploads/2019/01/smartphone-83.jpg',
    price: 100,
    description: 'a',
    restaurant_id: 1,
    category_id: 1,
    is_sold_out: false,
    like_count: 1,
  },
  {
    id: 2,
    name: '焼き鳥',
    photo_url: 'https://k-net01.com/wp-content/uploads/2019/01/smartphone-83.jpg',
    price: 100,
    description: 'a',
    restaurant_id: 1,
    category_id: 1,
    is_sold_out: false,
    like_count: 1,
  },
  {
    id: 3,
    name: '焼き鳥',
    photo_url: 'https://k-net01.com/wp-content/uploads/2019/01/smartphone-83.jpg',
    price: 100,
    description: 'a',
    restaurant_id: 1,
    category_id: 1,
    is_sold_out: false,
    like_count: 1,
  },
  {
    id: 4,
    name: '焼き鳥',
    photo_url: 'https://k-net01.com/wp-content/uploads/2019/01/smartphone-83.jpg',
    price: 100,
    description: 'a',
    restaurant_id: 1,
    category_id: 1,
    is_sold_out: false,
    like_count: 1,
  },
  {
    id: 5,
    name: '焼き鳥',
    photo_url: 'https://k-net01.com/wp-content/uploads/2019/01/smartphone-83.jpg',
    price: 100,
    description: 'a',
    restaurant_id: 1,
    category_id: 1,
    is_sold_out: false,
    like_count: 1,
  },
  {
    id: 6,
    name: '焼き鳥',
    photo_url: 'https://k-net01.com/wp-content/uploads/2019/01/smartphone-83.jpg',
    price: 100,
    description: 'a',
    restaurant_id: 1,
    category_id: 1,
    is_sold_out: false,
    like_count: 1,
  },
  {
    id: 7,
    name: '焼き鳥',
    photo_url: 'https://k-net01.com/wp-content/uploads/2019/01/smartphone-83.jpg',
    price: 100,
    description: 'a',
    restaurant_id: 1,
    category_id: 1,
    is_sold_out: false,
    like_count: 1,
  },
  {
    id: 8,
    name: '焼き鳥',
    photo_url: 'https://k-net01.com/wp-content/uploads/2019/01/smartphone-83.jpg',
    price: 100,
    description: 'a',
    restaurant_id: 1,
    category_id: 1,
    is_sold_out: false,
    like_count: 1,
  },
  {
    id: 9,
    name: '焼き鳥',
    photo_url: 'https://k-net01.com/wp-content/uploads/2019/01/smartphone-83.jpg',
    price: 100,
    description: '',
    restaurant_id: 1,
    category_id: 1,
    is_sold_out: false,
    like_count: 1,
  },
];

const tempCategoryList = ['おすすめ', '焼き鳥', 'アルコール', 'おすすめ2', '焼き鳥2', 'アルコール2', 'おすすめ3', '焼き鳥3', 'アルコール3', 'おすすめ4', '焼き鳥4'];

export const OwnerHomeCon: FC = () => {
  const [menuItemList, ] = useState<MenuItemType[]>(tempMenuItemList);
  // const [menuItemList, ] = useState<MenuItemType[]>([]);

  const [selectedCategory, setSelectedCategory] = useState<string>(tempCategoryList[0]);
  // const [selectedCategory, setSelectedCategory] = useState<string>("");

  const onClickAddMenuButton = () => {
    console.log('新規登録');
  };

  const onClickCategory = (category: string) => {
    console.log(category);
    setSelectedCategory(category);
  };

  return <OwnerHomePre
    menuItemList={menuItemList}
    categoryList={tempCategoryList}
    selectedCategory={selectedCategory}
    onClickAddMenuButton={onClickAddMenuButton}
    onClickCategory={onClickCategory}
  />;
};