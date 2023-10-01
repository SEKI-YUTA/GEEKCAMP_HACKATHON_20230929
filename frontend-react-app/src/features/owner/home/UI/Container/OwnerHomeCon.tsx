import type { FC } from 'react';
import { OwnerHomePre } from '../Presentational/OwnerHomePre';
import { useContext, useEffect, useState } from 'react';
import { StateContext } from '../../../../../application/lib/state/AuthContext';
import type { MenuItemType } from '../../../../../application/@types/Menu';

const tempCategoryList = ['おすすめ', '焼き鳥', 'アルコール', 'おすすめ2', '焼き鳥2', 'アルコール2', 'おすすめ3', '焼き鳥3', 'アルコール3', 'おすすめ4', '焼き鳥4'];

/**
 * ホーム画面のコンポーネント（Container）
 * ここにコンポーネントのロジックを書いて、OwnerHomePreに渡す
 * @returns 
 */
export const OwnerHomeCon: FC = () => {
  
  const {restaurantId} = useContext(StateContext);
  
  const [menuItemList, setMenuItemList] = useState<MenuItemType[]>([]);

  const [selectedCategory, setSelectedCategory] = useState<string>(tempCategoryList[0]);
  // const [selectedCategory, setSelectedCategory] = useState<string>("");

  const onClickAddMenuButton = () => {
    console.log('新規登録');
  };

  const onClickCategory = (category: string) => {
    console.log(category);
    setSelectedCategory(category);
  };

  const fetchMenu = async () => {
    try {
      const responce = await fetch(`http://localhost:8080/restaurants/${restaurantId}/menus`);
      const json:MenuItemType[] = await responce.json();
      console.log(json);
      const data:MenuItemType[] = json.map((item:MenuItemType) => ({
        id: item.id,
        category: item.category,
        description: item.description,
        name: item.category,
        photo_url: 'https://k-net01.com/wp-content/uploads/2019/01/smartphone-83.jpg',
        price: item.price,
        restaurant_id: item.restaurant_id
      }));
      setMenuItemList(data);
    } catch (error) {
      console.log('取得失敗', error);
    }
  };

  useEffect(()=>{
    fetchMenu();
  },[]);

  return <OwnerHomePre
    menuItemList={menuItemList}
    categoryList={tempCategoryList}
    selectedCategory={selectedCategory}
    onClickAddMenuButton={onClickAddMenuButton}
    onClickCategory={onClickCategory}
  />;
};