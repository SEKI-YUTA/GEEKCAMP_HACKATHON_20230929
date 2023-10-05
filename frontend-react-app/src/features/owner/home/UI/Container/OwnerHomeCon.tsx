import type { ChangeEvent, FC, FormEvent } from 'react';
import { OwnerHomePre } from '../Presentational/OwnerHomePre';
import { useContext, useEffect, useState } from 'react';
import { StateContext } from '../../../../../application/lib/state/AuthContext';
import type { MenuItemType } from '../../../../../application/@types/Menu';
import type { CategoryResponce, CategoryType } from '../../../../../application/@types/Category';
import { useMediaQuery, useDisclosure } from '@chakra-ui/react';
import { AddMenuModalProps } from '../Components/AddMenuModal';

/**
 * ホーム画面のコンポーネント（Container）
 * ここにコンポーネントのロジックを書いて、OwnerHomePreに渡す
 * @returns 
 */
export const OwnerHomeCon: FC = () => {

  const { restaurantId } = useContext(StateContext);

  // 全メニュー, 毎回フェッチするのは無駄なので、一度取得したら保持しておく
  const [allMenus, setAllMenus] = useState<MenuItemType[]>([]);
  // 画面上に表示されるメニュー
  const [menuItemList, setMenuItemList] = useState<MenuItemType[]>([]);
  // 選択されたメニューの保持
  const [selectedMenuItem, setSelectedMenuItem] = useState<MenuItemType | undefined>();
  const [categoryList, setCategoryList] = useState<CategoryType[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<CategoryType>({ id: -1, name: '' });
  const [menuModalMode, setModalMode] = useState<AddMenuModalProps["mode"]>("add")
  const { isOpen: isAddMenuModalOpen, onOpen: addMenuModalOnOpen, onClose: addMenuModalOnClose } = useDisclosure();
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
  const [menuPrice, setMenuPrice] = useState<number>(0);
  const handleSetMenuPrice = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.value !== '' && parseInt(e.target.value) >= 0) {
      setMenuPrice(parseInt(e.target.value));
    } else {
      setMenuPrice(0);
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
    setModalMode('add')
    addMenuModalOnOpen();
  };

  /**
   * メニュークリック時のイベント
   * @param id メニューのid
   */
  const onClickMenu = (menuItem: MenuItemType) => {
    // メニュービューのモーダル表示
    menuViewModalOnOpen()
    setSelectedMenuItem(menuItem)
  }

  /**
   * カテゴリータブをクリック時のイベント
   * @param category カテゴリー
   */
  const onClickCategory = (category: CategoryType) => {
    console.log(category);
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
    setModalMode('edit')
    setCategoryValue(categoryList.find(category => category.name === item.category)?.id.toString() ?? "1")
    setMenuName(item.name)
    setMenuPrice(item.price)
    setMenuDetail(item.description)
    setImgLink(item.photo_url)

    addMenuModalOnOpen()
  }

  /**
   * メニューモーダルの入力値のリセット
   */
  const resetMenuValues = () => {
    setCategoryValue('1');
    setMenuName('');
    setMenuPrice(0);
    setMenuDetail('');
    setImgLink('');
  }

  /**
   * メニュー追加
   * @param e 
   * @returns 
   */
  const handleAddMenuSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      // menuName・menuDetail・imgLinkが空白のみ入力されていた場合もはじく処理をする
      if (categoryValue === '' || menuName === '' || menuPrice == 0 || isNaN(menuPrice) === true || menuDetail === '') {
        // 空欄がある場合
        console.log('記入漏れあり');
        return;
      }
      console.log('記入済み', {
        name: menuName,
        price: menuPrice,
        description: menuDetail,
        category: categoryValue
      });

      const responce = await fetch(`http://localhost:8080/restaurants/${restaurantId}/menus/add`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: menuName,
          price: menuPrice,
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
        resetMenuValues()
        // モーダル閉じる
        addMenuModalOnClose();
        // データの再同期
        fetchMenu();
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
      if (categoryValue === '' || menuName === '' || menuPrice == 0 || isNaN(menuPrice) === true || menuDetail === '') {
        // 空欄がある場合
        console.log('記入漏れあり');
        return;
      }
      console.log('記入済み', {
        name: menuName,
        price: menuPrice,
        description: menuDetail,
        category: categoryValue
      });

      const responce = await fetch(`http://localhost:8080/restaurants/${restaurantId}/menus/edit`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          id: selectedMenuItem?.id,
          name: menuName,
          price: menuPrice,
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
        resetMenuValues()
        setSelectedMenuItem({
          id: selectedMenuItem?.id ?? 0,
          category: categoryList.find(category => category.id === parseInt(categoryValue))?.name ?? '',
          description: menuDetail,
          name: menuName,
          photo_url: imgLink,
          price: menuPrice,
          restaurant_id: restaurantId ?? 0
        })
        // モーダル閉じる
        addMenuModalOnClose();
        // データの再同期
        fetchMenu();
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
      // photo_urlがないので、追加
      const data: MenuItemType[] = json.map((item: MenuItemType) => ({
        id: item.id,
        category: item.category,
        description: item.description,
        name: item.name,
        photo_url: 'https://k-net01.com/wp-content/uploads/2019/01/smartphone-83.jpg',
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
  }, []);

  return <OwnerHomePre
    menuItemList={menuItemList}
    categoryList={categoryList}
    selectedCategory={selectedCategory}
    isAddMenuModalOpen={isAddMenuModalOpen}
    isLargerThan800={isLargerThan800}
    isLargerThan1200={isLargerThan1200}
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
    onClickAddMenuButton={onClickAddMenuButton}
    onClickCategory={onClickCategory}
    onClickMenuEdit={onClickMenuEdit}
    onClickMenu={onClickMenu}
    menuViewModalOnClose={() => {resetMenuValues();menuViewModalOnClose()}}
    addMenuModalOnClose={() => {resetMenuValues();addMenuModalOnClose()}}
    handleAddMenuSubmit={handleAddMenuSubmit}
    handleUpdateMenuSubmit={handleUpdateMenuSubmit}
  />;
};