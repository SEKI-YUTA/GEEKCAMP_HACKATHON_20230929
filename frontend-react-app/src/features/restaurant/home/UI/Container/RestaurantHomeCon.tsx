import { useEffect, type FC, useState } from 'react';
import { RestaurantHomePre } from '../Presentational/RestaurantHomePre';
import type { CategoryResponce, CategoryType } from '../../../../../application/@types/Category';
import { useMediaQuery } from '@chakra-ui/react';
import type { MenuItemType } from '../../../../../application/@types/Menu';
import { useParams } from 'react-router-dom';
import type { RestaurantType } from '../../../../../application/@types/Restaurant';
/**
 * レストラン, ホーム画面のコンポーネント（Container）
 * ここにコンポーネントのロジックを書いて、RestaurantHomePreに渡す
 */

export const RestaurantHomeCon: FC = () => {
  // URLからrestaurantIdを取得
  const restaurantId = useParams().id;
  const [restaurantName, setRestaurantName] = useState<string>('');

  // 全メニュー, 毎回フェッチするのは無駄なので、一度取得したら保持しておく
  const [allMenus, setAllMenus] = useState<MenuItemType[]>([]);

  const [menuItemList, setMenuItemList] = useState<MenuItemType[]>([]);
  const [categoryList, setCategoryList] = useState<CategoryType[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<CategoryType>({ id: -1, name: '' });

  // メデイアクエリ
  const [isLargerThan1200] = useMediaQuery('(min-width: 1200px)');
  const [isLargerThan800] = useMediaQuery('(min-width: 800px)');

  const fetchRestaurantInfo = async () => {
    try {
      // fetchでAPIにリクエスト
      const responce = await fetch(`http://localhost:8080/restaurants/${restaurantId}`);
      // レスポンスからJSONを取り出し
      const data = await responce.json() as RestaurantType;
      // レストラン名をセット
      setRestaurantName(data.name);
    } catch (error) {
      // 失敗時の処理
      // boolで管理して画面に失敗のメッセージを表示しても良い
      console.log('取得失敗', error);
    }
  };

  /**
   * カテゴリータブをクリック時のイベント
   * @param category カテゴリー
   */
  const onClickCategory = (category: CategoryType) => {
    console.log(category);
    setSelectedCategory(category);
    // 選択されたカテゴリーのみ表示
    if (category.id === 0) {
      // 全てのカテゴリーを表示
      setMenuItemList(allMenus);
    }
    else {
      const filteredMenu = allMenus.filter((item: MenuItemType) => item.name === category.name);
      setMenuItemList(filteredMenu);
    }
  };

  /**
   * カテゴリー一覧取得関数
   */
  const fetchCategory = async () => {
    try {
      // fetchでAPIにリクエスト
      const responce = await fetch('http://localhost:8080/menus/categories');
      // レスポンスからJSONを取り出し
      const json: CategoryResponce = await responce.json();
      console.log(json);
      // すべてのカテゴリーを追加
      const data: CategoryType[] = [{ id: 0, name: '全て' }, ...json.categories];
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
      const json: MenuItemType[] = await responce.json();
      console.log(json);
      const data: MenuItemType[] = json.map((item: MenuItemType) => ({
        id: item.id,
        category: item.category,
        description: item.description,
        name: item.category,
        // photo_url がない場合は仮の画像を表示
        photo_url: item.photo_url ? item.photo_url : 'https://k-net01.com/wp-content/uploads/2019/01/smartphone-83.jpg',
        price: item.price,
        restaurant_id: item.restaurant_id
      }));
      // allMenusにセット
      setAllMenus(data);
      // menuItemListにセット
      setMenuItemList(data);
    } catch (error) {
      // 失敗時の処理
      // boolで管理して画面に失敗のメッセージを表示しても良い
      console.log('取得失敗', error);
    }
  };

  useEffect(() => {
    // 初回のみ実行
    fetchMenu();
    fetchCategory();
    fetchRestaurantInfo();
  }, []);

  return <RestaurantHomePre
    restaurantName={restaurantName}
    categoryList={categoryList}
    menuItemList={menuItemList}
    selectedCategory={selectedCategory}
    isLargerThan800={isLargerThan800}
    isLargerThan1200={isLargerThan1200}
    onClickCategory={onClickCategory}
  />;
};
