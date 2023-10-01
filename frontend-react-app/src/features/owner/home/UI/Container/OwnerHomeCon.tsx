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
    onPress: () => { console.log("アイテム1") }
  },
  {
    id: 2,
    name: '焼き鳥',
    img: 'https://k-net01.com/wp-content/uploads/2019/01/smartphone-83.jpg',
    price: 100,
    onPress: () => { console.log("アイテム2") }
  },
  {
    id: 3,
    name: '焼き鳥',
    img: 'https://k-net01.com/wp-content/uploads/2019/01/smartphone-83.jpg',
    price: 100,
    onPress: () => { console.log("アイテム3") }
  },
  {
    id: 4,
    name: '焼き鳥',
    img: 'https://k-net01.com/wp-content/uploads/2019/01/smartphone-83.jpg',
    price: 100,
    onPress: () => { console.log("アイテム4") }
  },
  {
    id: 5,
    name: '焼き鳥',
    img: 'https://k-net01.com/wp-content/uploads/2019/01/smartphone-83.jpg',
    price: 100,
    onPress: () => { console.log("アイテム5") }
  },
  {
    id: 6,
    name: '焼き鳥',
    img: 'https://k-net01.com/wp-content/uploads/2019/01/smartphone-83.jpg',
    price: 100,
    onPress: () => { console.log("アイテム6") }
  },
  {
    id: 7,
    name: '焼き鳥',
    img: 'https://k-net01.com/wp-content/uploads/2019/01/smartphone-83.jpg',
    price: 100,
    onPress: () => { console.log("アイテム7") }
  },
  {
    id: 8,
    name: '焼き鳥',
    img: 'https://k-net01.com/wp-content/uploads/2019/01/smartphone-83.jpg',
    price: 100,
    onPress: () => { console.log("アイテム8") }
  },
]
// const temp_category_list = ["おすすめ", "焼き鳥", "アルコール", "おすすめ2", "焼き鳥2", "アルコール2", "おすすめ3", "焼き鳥3", "アルコール3", "おすすめ4", "焼き鳥4", "アルコール5"]
const temp_category_list = ["おすすめ", "焼き鳥", "アルコール"]

export const OwnerHomeCon: FC = () => {
  const [menu_item_list, setMenu_item_list] = useState<MenuItemProps[]>(temp_menu_item_list)

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