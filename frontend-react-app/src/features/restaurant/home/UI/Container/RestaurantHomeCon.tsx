import { useEffect, type FC, useState } from 'react';
import type { ChangeEvent, FormEvent } from 'react';
import { RestaurantHomePre } from '../Presentational/RestaurantHomePre';
import type { CategoryResponce, CategoryType } from '../../../../../application/@types/Category';
import { useDisclosure, useMediaQuery } from '@chakra-ui/react';
import type { MenuItemType } from '../../../../../application/@types/Menu';
import { useParams } from 'react-router-dom';
import type { RestaurantType } from '../../../../../application/@types/Restaurant';
import type { FilterMenuModalProps } from '../Components/FilterMenuModal';
import { ExchangeHost } from '../../../../../application/lib/host/exchangeHost';
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
  // 全カテゴリー, 毎回フェッチするのは無駄なので、一度取得したら保持しておく
  const [allCategories, setAllCategories] = useState<CategoryType[]>([]);

  const [menuItemList, setMenuItemList] = useState<MenuItemType[]>([]);
  const [categoryList, setCategoryList] = useState<CategoryType[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<CategoryType>({ id: -1, name: '' });
  // 絞り込みモーダル
  const [isFiltered, setIsFiltered] = useState<boolean>(false);

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
   * メニュー絞り込み
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
      const responce = await fetch(`http://${ExchangeHost()}:8080/restaurants/${restaurantId}/menus?keyword=${keyWord}&lower=${menuPriceUpper}&higher=${menuPriceLower}`);
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
        photo_url: item.photo_url ? item.photo_url : '/src/assets/GEEKCAMP_HACKATHON2023_UI_Placeholder.png',
        category: item.category,
        is_sold_out: item.is_sold_out,
        like_count: item.like_count,
      }));
      // menuItemListにセット
      setMenuItemList(data);
      // カテゴリーを絞り込み結果に変更
      const filteringCategory: CategoryType = { id: -1, name: '絞り込み結果' };
      setCategoryList([filteringCategory]);
      setIsFiltered(true);
      // 絞り込みモーダルを閉じる
      filterMenuModalOnClose();
    } catch (error) {
      console.log('送信失敗', error);
    }
  };

  /**
   * 絞り込みボタンを押したときの処理
   */
  const onClickFilterButton = () => {
    if (isFiltered) {
      console.log('絞り込み解除');
      // 絞り込み結果が表示されている場合は、絞り込み解除
      setMenuItemList(allMenus);
      setCategoryList(allCategories);
      setIsFiltered(false);
      return;
    }
    console.log('絞り込み');
    // 絞り込みモーダルを開く
    filterMenuModalOnOpen();
  };

  const filterMenuModal: FilterMenuModalProps = {
    isOpen:isFilterMenuModalOpen,
    KeyWord:keyWord,
    menuPriceLower:menuPriceLower,
    menuPriceUpper:menuPriceUpper,
    categoryList:categoryList,
    categoryValue:categoryValue,
    handleSetCategoryValue:handleSetCategoryValue,
    handleSetKeyWord:handleSetKeyWord,
    handleSetMenuPriceLower:handleSetMenuPriceLower,
    handleSetMenuPriceUpper:handleSetMenuPriceUpper,
    handleFilterMenuSubmit:handleFilterMenuSubmit,
    onClose:filterMenuModalOnClose,
  };

  ////// 絞り込みモーダル ここまで///////

  const fetchRestaurantInfo = async () => {
    try {
      // fetchでAPIにリクエスト
      const responce = await fetch(`http://${ExchangeHost()}:8080/restaurants/${restaurantId}`);
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
    if (isFiltered) {
      // 何もしない
      return;
    }
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
      const responce = await fetch(`http://${ExchangeHost()}:8080/menus/categories`);
      // レスポンスからJSONを取り出し
      const json: CategoryResponce = await responce.json();
      console.log(json);
      // すべてのカテゴリーを追加
      const data: CategoryType[] = [{ id: 0, name: '全て' }, ...json.categories];
      // categoryListにセット
      setCategoryList(data);
      setSelectedCategory(data[0]);
      setAllCategories(data);
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
      const responce = await fetch(`http://${ExchangeHost()}:8080/restaurants/${restaurantId}/menus`);
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
        photo_url: item.photo_url ? item.photo_url : '/src/assets/GEEKCAMP_HACKATHON2023_UI_Placeholder.png',
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
  const [selectedMenuItem, setSelectedMenuItem] = useState<MenuItemType | undefined>();
  const { isOpen: isMenuViewModalOpen, onOpen: menuViewModalOnOpen, onClose: menuViewModalOnClose } = useDisclosure();
  const onClickMenu = (menuItem: MenuItemType) => {
    // メニュービューのモーダル表示
    menuViewModalOnOpen();
    setSelectedMenuItem(menuItem);
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
    filterModal={filterMenuModal}
    isFiltered={isFiltered}
    selectedMenuItem={selectedMenuItem}
    isMenuViewModalOpen={isMenuViewModalOpen}
    menuViewModalOnClose={menuViewModalOnClose}
    onClickCategory={onClickCategory}
    onClickFilterButton={onClickFilterButton}
    onClickMenu={onClickMenu}
  />;
};
