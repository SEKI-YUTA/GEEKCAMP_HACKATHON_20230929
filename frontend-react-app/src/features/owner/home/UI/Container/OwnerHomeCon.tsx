import type { FC } from 'react';
import { OwnerHomePre } from '../Presentational/OwnerHomePre';
import { useContext, useEffect, useState } from 'react';
import { StateContext } from '../../../../../application/lib/state/AuthContext';
import type { MenuItemType } from '../../../../../application/@types/Menu';
import type { CategoryType } from '../../../../../application/@types/Category';

// const tempCategoryList = ['おすすめ', '焼き鳥', 'アルコール', 'おすすめ2', '焼き鳥2', 'アルコール2', 'おすすめ3', '焼き鳥3', 'アルコール3', 'おすすめ4', '焼き鳥4'];

/**
 * ホーム画面のコンポーネント（Container）
 * ここにコンポーネントのロジックを書いて、OwnerHomePreに渡す
 * @returns 
 */
export const OwnerHomeCon: FC = () => {
  
  const {restaurantId} = useContext(StateContext);
  
  const [menuItemList, setMenuItemList] = useState<MenuItemType[]>([]);
  const [categoryList, setCategoryList] = useState<string[]>([]);

  const [selectedCategory, setSelectedCategory] = useState<string>('');

  /**
   * メニュー新規登録ボタンをクリック時イベント
   */
  const onClickAddMenuButton = () => {
    console.log('新規登録');
  };

  /**
   * カテゴリータブをクリック時のイベント
   * @param category カテゴリー
   */
  const onClickCategory = (category: string) => {
    console.log(category);
    setSelectedCategory(category);
  };

  /**
   * カテゴリー一覧取得関数
   */
  const fetchCategory = async () => {
    try {
      // fetchでAPIにリクエスト
      const responce = await fetch(`http://localhost:8080/menus/categories`);
      // レスポンスからJSONを取り出し
      interface CategoryResponce {
        categories: CategoryType[]
        categoryName: string
      }
      const json: CategoryResponce = await responce.json();
      console.log(json);
      // nameだけ取り出し
      const data = json.categories.map((item: CategoryType) => item.name);
      // categoryListにセット
      setCategoryList(data);
      setSelectedCategory(data[0]);
    } catch (error) {
      // 失敗時の処理
      // boolで管理して画面に失敗のメッセージを表示しても良い
      console.log('カテゴリー一覧取得失敗', error);
    }
  };

  /**
   * メニュー一覧取得関数
   */
  const fetchMenu = async () => {
    try {
      // fetchでAPIにリクエスト
      const responce = await fetch(`http://localhost:8080/restaurants/${restaurantId}/menus`);
      // レスポンスからJSONを取り出し
      const json:MenuItemType[] = await responce.json();
      console.log(json);
      // photo_urlがないので、追加
      const data:MenuItemType[] = json.map((item:MenuItemType) => ({
        id: item.id,
        category: item.category,
        description: item.description,
        name: item.category,
        photo_url: 'https://k-net01.com/wp-content/uploads/2019/01/smartphone-83.jpg',
        price: item.price,
        restaurant_id: item.restaurant_id
      }));
      // menuItemListにセット
      setMenuItemList(data);
    } catch (error) {
      // 失敗時の処理
      // boolで管理して画面に失敗のメッセージを表示しても良い
      console.log('取得失敗', error);
    }
  };

  useEffect(()=>{
    // 初回のみ実行
    fetchMenu();
    fetchCategory();
  },[]);

  return <OwnerHomePre
    menuItemList={menuItemList}
    categoryList={categoryList}
    selectedCategory={selectedCategory}
    onClickAddMenuButton={onClickAddMenuButton}
    onClickCategory={onClickCategory}
  />;
};