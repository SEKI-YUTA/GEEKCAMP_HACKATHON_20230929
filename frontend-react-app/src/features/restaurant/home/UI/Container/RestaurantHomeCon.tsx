import { useEffect, type FC, useState, ChangeEvent, FormEvent } from 'react';
import { RestaurantHomePre } from '../Presentational/RestaurantHomePre';
import type { CategoryResponce, CategoryType } from '../../../../../application/@types/Category';
import { useDisclosure, useMediaQuery } from '@chakra-ui/react';
import type { MenuItemType } from '../../../../../application/@types/Menu';
import { useParams } from 'react-router-dom';
import type { RestaurantType } from '../../../../../application/@types/Restaurant';
import { FilterMenuModal } from '../Components/FilterMenuModal';
import { MenuSetResponse } from '../../../../../application/@types/MenuSetResponse';

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
  // 絞り込みモーダル

  // メデイアクエリ
  const [isLargerThan1200] = useMediaQuery('(min-width: 1200px)');
  const [isLargerThan800] = useMediaQuery('(min-width: 800px)');

  /////// 絞り込みモーダル ///////
  const { isOpen: isFilterMenuModalOpen, onOpen: filterMenuModalOnOpen, onClose: filterMenuModalOnClose } = useDisclosure();
  const [categoryValue, setCategoryValue] = useState<string>('1');
  const handleSetCategoryValue = (category: string) => {
    setCategoryValue(category);
  };

  const [keyWord, setKeyWord] = useState<string>('');
  const handleSetKeyWord = (e: ChangeEvent<HTMLInputElement>) => {
    setKeyWord(e.target.value);
  };

  const [menuPriceLower, setMenuPriceLower] = useState<number>(0);
  const handleSetMenuPriceLower = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.value !== '' && parseInt(e.target.value) >= 0) {
      setMenuPriceLower(parseInt(e.target.value));
    } else {
      setMenuPriceLower(0);
    }
  };

  const [menuPriceUpper, setMenuPriceUpper] = useState<number>(0);
  const handleSetMenuPriceUpper = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.value !== '' && parseInt(e.target.value) >= 0) {
      setMenuPriceUpper(parseInt(e.target.value));
    } else {
      setMenuPriceUpper(0);
    }
  };

  /**
   * メニュー追加
   * @param e 
   * @returns 
   */
  const handleFilterMenuSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      // menuName・menuDetail・imgLinkが空白のみ入力されていた場合もはじく処理をする
      if (categoryValue === '' || isNaN(menuPriceLower) || isNaN(menuPriceUpper)) {
        // 空欄がある場合
        console.log('不正な値');
        return;
      }
      console.log('入力値', {
        keyWord: keyWord,
        menuPriceLower: menuPriceLower,
        menuPriceUpper: menuPriceUpper,
        categoryValue: categoryValue
      });
      const responce = await fetch(`http://localhost:8080/restaurants/${restaurantId}/menus?${menuPriceUpper}`);
      console.log('responce', responce);
      const json: MenuItemType[] = await responce.json();
      console.log('json', json);
      const data = json.map((item: MenuItemType) => ({
        id: item.id,
        name: item.name,
        price: item.price,
        description: item.description,
        restaurant_id: item.restaurant_id,
        // photo_url がない場合は仮の画像を表示
        photo_url: item.photo_url ? item.photo_url : 'https://k-net01.com/wp-content/uploads/2019/01/smartphone-83.jpg',
        category: item.category,
        is_sold_out: item.is_sold_out,
        like_count: item.like_count,
      }));
      // menuItemListにセット
      setMenuItemList(data);
    } catch (error) {
      console.log('送信失敗', error);
    }
  };

  /**
   * メニュー新規登録ボタンをクリック時イベント
   */
  const onClickFilterButton = () => {
    console.log('新規登録');
    filterMenuModalOnOpen();
  };

  const filterMenuModal: JSX.Element = <FilterMenuModal
    isOpen={isFilterMenuModalOpen}
    KeyWord={keyWord}
    menuPriceLower={menuPriceLower}
    menuPriceUpper={menuPriceUpper}
    categoryList={categoryList}
    categoryValue={categoryValue}
    handleSetCategoryValue={handleSetCategoryValue}
    handleSetKeyWord={handleSetKeyWord}
    handleSetMenuPriceLower={handleSetMenuPriceLower}
    handleSetMenuPriceUpper={handleSetMenuPriceUpper}
    onClose={filterMenuModalOnClose}
    handleFilterMenuSubmit={handleFilterMenuSubmit}
  />;

  ////// 絞り込みモーダル ここまで///////

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
      const filteredMenu = allMenus.filter((item: MenuItemType) => item.category === category.name);
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
        name: item.name,
        price: item.price,
        description: item.description,
        restaurant_id: item.restaurant_id,
        // photo_url がない場合は仮の画像を表示
        photo_url: item.photo_url ? item.photo_url : 'https://k-net01.com/wp-content/uploads/2019/01/smartphone-83.jpg',
        category: item.category,
        is_sold_out: item.is_sold_out,
        like_count: item.like_count,
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
    onClickFilterButton={onClickFilterButton}
    filterModal={filterMenuModal}
  />;
};
