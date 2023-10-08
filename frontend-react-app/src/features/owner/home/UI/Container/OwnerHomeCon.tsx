import type { ChangeEvent, FC, FormEvent } from 'react';
import { OwnerHomePre } from '../Presentational/OwnerHomePre';
import { useContext, useEffect, useState } from 'react';
import { StateContext } from '../../../../../application/lib/state/AuthContext';
import type { MenuItemType } from '../../../../../application/@types/Menu';
import type { CategoryResponce, CategoryType } from '../../../../../application/@types/Category';
import { useMediaQuery, useDisclosure } from '@chakra-ui/react';
import type { MenuEditModalProps } from '../Components/MenuEditModal';
import { ExchangeHost } from '../../../../../application/lib/host/exchangeHost';

/**
 * ホーム画面のコンポーネント（Container）
 * ここにコンポーネントのロジックを書いて、OwnerHomePreに渡す
 * @returns 
 */
export const OwnerHomeCon: FC = () => {

  const { restaurantId } = useContext(StateContext);
  const firstCategory = { id: 0, name: '全て' };
  // 全メニュー, 毎回フェッチするのは無駄なので、一度取得したら保持しておく
  const [allMenus, setAllMenus] = useState<MenuItemType[]>([]);
  // 画面上に表示されるメニュー
  const [menuItemList, setMenuItemList] = useState<MenuItemType[]>([]);
  // 選択されたメニューの保持
  const [selectedMenuItem, setSelectedMenuItem] = useState<MenuItemType | undefined>();
  const [categoryList, setCategoryList] = useState<CategoryType[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<CategoryType>({ id: -1, name: '' });
  const [menuModalMode, setModalMode] = useState<MenuEditModalProps['mode']>('add');
  const { isOpen: isMenuEditModalOpen, onOpen: MenuEditModalOnOpen, onClose: MenuEditModalOnClose } = useDisclosure();
  const { isOpen: isMenuViewModalOpen, onOpen: menuViewModalOnOpen, onClose: menuViewModalOnClose } = useDisclosure();
  // メデイアクエリ
  const [isLargerThan1200] = useMediaQuery('(min-width: 1200px)');
  const [isLargerThan800] = useMediaQuery('(min-width: 800px)');

  // メニュー追加の入力値管理
  const [categoryValue, setCategoryValue] = useState<string>('1');
  const handleSetCategoryValue = (category: string) => {
    setCategoryValue(category);
  };
  const [menuName, setMenuName] = useState<string>('');
  const handleSetMenuName = (e: ChangeEvent<HTMLInputElement>) => {
    setMenuName(e.target.value);
  };
  const [menuPrice, setMenuPrice] = useState<string>('');
  const [blurMsg, setBlurMsg] = useState<boolean>(false);
  const handleSetMenuPrice = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.value !== '' && inputAllZero(e.target.value)) {
      setMenuPrice('0');
      return;
    }
    if (parseInt(e.target.value) >= 0 || e.target.value === '') {
      setMenuPrice(e.target.value);
    }
    setBlurMsg(false);
  };
  const [isSpace, setIsSpace] = useState<boolean>(false);
  const inputCheck = (input: string, isSpace?: boolean) => {
    // 半角スペースまたは全角スペースの正規表現を使って、文字列をチェックします
    const regex = /^[\x20\u3000]+$/;
    if (isSpace) {
      return input == '' || regex.test(input);
    }
    return regex.test(input);
  };

  const inputAllZero = (input: string) => {
    // 半角スペースまたは全角スペースの正規表現を使って、文字列をチェックします

    const regex = /^[0]+$/;
    return input !== '0' && regex.test(input);
  };
  const handleBlur = (e: ChangeEvent<HTMLInputElement>) => {
    if (parseInt(e.target.value) === 0){
      //入力欄が0円の状態でフォーカスが外れた場合
      console.log('error');
      setBlurMsg(true);
    }
    else{
      setBlurMsg(false);
    }
  };
  const [menuDetail, setMenuDetail] = useState<string>('');
  const handleSetMenuDetail = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setMenuDetail(e.target.value);
  };
  const [imgLink, setImgLink] = useState<string>('');
  const handleSetImgLink = (e: ChangeEvent<HTMLInputElement>) => {
    setImgLink(e.target.value);
  };

  /**
   * メニュー新規登録ボタンをクリック時イベント
   */
  const onClickAddMenuButton = () => {
    console.log('新規登録');
    setModalMode('add');
    MenuEditModalOnOpen();
  };

  /**
   * メニュークリック時のイベント
   * @param id メニューのid
   */
  const onClickMenu = (menuItem: MenuItemType) => {
    // メニュービューのモーダル表示
    menuViewModalOnOpen();
    setSelectedMenuItem(menuItem);
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
   * メニュー詳細モーダルの編集ボタンをクリック時のイベント
   * @param item 
   */
  const onClickMenuEdit = (item: MenuItemType) => {
    setModalMode('edit');
    setCategoryValue(categoryList.find(category => category.name === item.category)?.id.toString() ?? '1');
    setMenuName(item.name);
    setMenuPrice(item.price);
    setMenuDetail(item.description);
    setImgLink(item.photo_url);

    MenuEditModalOnOpen();
  };

  /**
   * メニューモーダルの入力値のリセット
   */
  const resetMenuValues = () => {
    setCategoryValue('1');
    setMenuName('');
    setMenuPrice('');
    setMenuDetail('');
    setImgLink('');
  };

  /**
   * メニュー追加
   * @param e 
   * @returns 
   */
  const handleAddMenuSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      // menuName・menuDetail・imgLinkが空白のみ入力されていた場合もはじく処理をする
      if (categoryValue === '' || menuName === '' || menuPrice == '0' || isNaN(parseInt(menuPrice)) === true || menuDetail === '') {
        // 空欄がある場合
        console.log('記入漏れあり');
        return;
      }
      else if(inputCheck(menuName)){
        //全ての文字列がスペースの場合
        console.log('全てスペース');
        setIsSpace(true);
        return;
      }
      setIsSpace(false);
      console.log('記入済み', {
        name: menuName,
        price: menuPrice,
        description: menuDetail,
        category: categoryValue
      });

      const responce = await fetch(`http://${ExchangeHost()}:8080/restaurants/${restaurantId}/menus/add`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: menuName,
          price: parseInt(menuPrice),
          description: menuDetail,
          restaurant_id: restaurantId,
          category: categoryList.find(category => category.id === parseInt(categoryValue))?.name,
          photo_url: imgLink,
          is_sold_out: false,
          like_count: 0
        })
      });
      console.log(responce);
      
      const data = await responce.json();

      console.log(data);
      
      if (responce.status === 200) {
        // 入力値のリセット
        resetMenuValues();
        // モーダル閉じる
        MenuEditModalOnClose();
        // データの再同期
        fetchMenu();
        onClickCategory(firstCategory);
      }

    } catch (error) {
      console.log('送信失敗', error);
    }
  };

  /**
   * メニュー更新
   * @param e 
   * @returns 
   */
  const handleUpdateMenuSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      // menuName・menuDetail・imgLinkが空白のみ入力されていた場合もはじく処理をする
      if (categoryValue === '' || menuName === '' || menuPrice == '0' || isNaN(parseInt(menuPrice)) === true || menuDetail === '') {
        // 空欄がある場合
        console.log('記入漏れあり');
        return;
      }
      else if(inputCheck(menuName)){
        //全ての文字列がスペースの場合
        console.log('全てスペース');
        setIsSpace(true);
        return;
      }
      setIsSpace(false);
      console.log('記入済み', {
        name: menuName,
        price: menuPrice,
        description: menuDetail,
        category: categoryValue
      });

      const responce = await fetch(`http://${ExchangeHost()}:8080/restaurants/${restaurantId}/menus/edit`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          id: selectedMenuItem?.id,
          name: menuName,
          price: parseInt(menuPrice),
          description: menuDetail,
          restaurant_id: restaurantId,
          category: categoryList.find(category => category.id === parseInt(categoryValue))?.name,
          photo_url: imgLink,
          is_sold_out: false,
          like_count: 0
        })
      });
      console.log(responce);
      
      const data = await responce.json();

      console.log(data);
      
      if (responce.status === 200) {
        // 入力値のリセット
        resetMenuValues();
        setSelectedMenuItem({
          id: selectedMenuItem?.id ?? 0,
          name: menuName,
          category: categoryList.find(category => category.id === parseInt(categoryValue))?.name ?? '',
          price: menuPrice,
          restaurant_id: restaurantId ?? 0,
          photo_url: imgLink,
          description: menuDetail,
          is_sold_out: false,
          like_count: 0,
        });
        // モーダル閉じる
        MenuEditModalOnClose();
        menuViewModalOnClose();
        // データの再同期
        fetchMenu();
        onClickCategory(firstCategory);
      }

    } catch (error) {
      console.log('送信失敗', error);
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
      const data: CategoryType[] = [firstCategory, ...json.categories];
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
      const responce = await fetch(`http://${ExchangeHost()}:8080/restaurants/${restaurantId}/menus`);
      // レスポンスからJSONを取り出し
      const json: MenuItemType[] = await responce.json();
      console.log(json);
      // photo_urlがないので、追加
      const data: MenuItemType[] = json.map((item: MenuItemType) => ({
        id: item.id,
        name: item.name,
        category: item.category,
        price: item.price,
        description: item.description,
        restaurant_id: item.restaurant_id,
        // photo_url がない場合は仮の画像を表示
        photo_url: item.photo_url ? item.photo_url : 'https://k-net01.com/wp-content/uploads/2019/01/smartphone-83.jpg',
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
  }, []);

  return <OwnerHomePre
    menuItemList={menuItemList}
    categoryList={categoryList}
    selectedCategory={selectedCategory}
    isLargerThan800={isLargerThan800}
    isLargerThan1200={isLargerThan1200}
    isMenuEditModalOpen={isMenuEditModalOpen}
    menuName={menuName}
    menuPrice={menuPrice}
    menuDetail={menuDetail}
    imgLink={imgLink}
    categoryValue={categoryValue}
    isMenuViewModalOpen={isMenuViewModalOpen}
    selectedMenuItem={selectedMenuItem}
    menuModalMode={menuModalMode}
    handleSetCategoryValue={handleSetCategoryValue}
    handleSetMenuName={handleSetMenuName}
    handleSetMenuPrice={handleSetMenuPrice}
    handleSetMenuDetail={handleSetMenuDetail}
    handleSetImgLink={handleSetImgLink}
    menuViewModalOnClose={() => {resetMenuValues();menuViewModalOnClose();setBlurMsg(false);}}
    MenuEditModalOnClose={() => {resetMenuValues();MenuEditModalOnClose();setBlurMsg(false);}}
    handleAddMenuSubmit={handleAddMenuSubmit}
    handleUpdateMenuSubmit={handleUpdateMenuSubmit}
    handleBlur={handleBlur}
    blurMsg={blurMsg}
    isSpace={isSpace}
    onClickAddMenuButton={onClickAddMenuButton}
    onClickCategory={onClickCategory}
    onClickMenuEdit={onClickMenuEdit}
    onClickMenu={onClickMenu}
  />;
};