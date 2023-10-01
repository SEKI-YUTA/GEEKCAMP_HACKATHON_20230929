import type { FC } from 'react';
import { OwnerHomePre } from '../Presentational/OwnerHomePre';
import { useState } from 'react';
import type { MenuItemType } from '../Components/MenuItem';
/**
 * ホーム画面のコンポーネント（Container）
 * ここにコンポーネントのロジックを書いて、OwnerHomePreに渡す
 * @returns 
 */

const temp_menu_item_list: MenuItemType[] = [
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
]

// const temp_category_list = ["おすすめ", "焼き鳥", "アルコール", "おすすめ2", "焼き鳥2", "アルコール2", "おすすめ3", "焼き鳥3", "アルコール3", "おすすめ4", "焼き鳥4", "アルコール5"]
const temp_category_list = ["おすすめ", "焼き鳥", "アルコール"]

export const OwnerHomeCon: FC = () => {
  const [menu_item_list, setMenu_item_list] = useState<MenuItemType[]>(temp_menu_item_list)

  const [selected_category, setSelected_category] = useState<string>(temp_category_list[0])

  const onPressAddMenuButton = () => {
    console.log("新規登録")
  }

  const onPressCategory = (category: string) => {
    console.log(category)
    setSelected_category(category)
  }

  return <OwnerHomePre
    menu_item_list={menu_item_list}
    category_list={temp_category_list}
    onPressAddMenuButton={onPressAddMenuButton}
    selected_category={selected_category}
    onPressCategory={onPressCategory}
  />;
};