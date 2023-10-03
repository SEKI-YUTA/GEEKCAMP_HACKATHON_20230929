import type { ChangeEvent, FC, FormEvent } from 'react';
import { OwnerHomePre } from '../Presentational/OwnerHomePre';
import { useContext, useEffect, useState } from 'react';
import { StateContext } from '../../../../../application/lib/state/AuthContext';
import type { MenuItemType } from '../../../../../application/@types/Menu';
import { useDisclosure } from '@chakra-ui/react';

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
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [menuName, setMenuName] = useState<string>('');
  const handleSetMenuName = (e:ChangeEvent<HTMLInputElement>)=>{
    setMenuName(e.target.value)
  }

  const [menuPrice, setMenuPrice] = useState<number>(0);
  const handleSetMenuPrice = (e:ChangeEvent<HTMLInputElement>)=>{
    setMenuPrice(parseInt(e.target.value))
  }

  const [menuDetail, setMenuDetail] = useState<string>('');
  const handleSetMenuDetail = (e:ChangeEvent<HTMLTextAreaElement>)=>{
    setMenuDetail(e.target.value)
  }

  const [imgLink, setImgLink] = useState<string>('');
  const handleSetImgLink = (e:ChangeEvent<HTMLInputElement>)=>{
    setImgLink(e.target.value)
  }

  const handleMenuSubmit=async(e:FormEvent<HTMLFormElement>)=>{
    e.preventDefault();
    if(menuName === '' || menuPrice == 0 || Number.isNaN(menuPrice) === true || menuDetail === ''){
      alert("記入漏れあり")
    }
    else{
      alert("記入済み")
      const menuObjStr=JSON.stringify({
        name:menuName,
        price:menuPrice,
        description:menuDetail
      });
      console.log(menuObjStr)
    }
  }
  /**
   * メニュー新規登録ボタンをクリック時イベント
   */
  const onClickAddMenuButton = () => {
    console.log('新規登録');
    onOpen();
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
  },[]);

  return <OwnerHomePre
    menuItemList={menuItemList}
    categoryList={tempCategoryList}
    selectedCategory={selectedCategory}
    isOpen={isOpen}
    onClickAddMenuButton={onClickAddMenuButton}
    onClickCategory={onClickCategory}
    onClose={onClose}
    menuName={menuName}
    handleSetMenuName={handleSetMenuName}
    menuPrice={menuPrice}
    handleSetMenuPrice={handleSetMenuPrice}
    menuDetail={menuDetail}
    handleSetMenuDetail={handleSetMenuDetail}
    imgLink={imgLink}
    handleSetImgLink={handleSetImgLink}
    handleMenuSubmit={handleMenuSubmit}
  />;
};