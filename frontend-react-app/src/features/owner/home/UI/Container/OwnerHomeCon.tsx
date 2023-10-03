import type { ChangeEvent, FC, FormEvent } from 'react';
import { OwnerHomePre } from '../Presentational/OwnerHomePre';
import { useContext, useEffect, useState } from 'react';
import { StateContext } from '../../../../../application/lib/state/AuthContext';
import type { MenuItemType } from '../../../../../application/@types/Menu';
import type { CategoryResponce, CategoryType } from '../../../../../application/@types/Category';
import { useMediaQuery, useDisclosure } from '@chakra-ui/react';


/**
 * ホーム画面のコンポーネント（Container）
 * ここにコンポーネントのロジックを書いて、OwnerHomePreに渡す
 * @returns 
 */
export const OwnerHomeCon: FC = () => {
  
  const { restaurantId } = useContext(StateContext);

  // 全メニュー, 毎回フェッチするのは無駄なので、一度取得したら保持しておく
  const [allMenus, setAllMenus] = useState<MenuItemType[]>([]);

  const [menuItemList, setMenuItemList] = useState<MenuItemType[]>([]);
  const [categoryList, setCategoryList] = useState<CategoryType[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<CategoryType>({id:-1, name: ''});


  const [selectedCategory, setSelectedCategory] = useState<string>(tempCategoryList[0]);
  // const [selectedCategory, setSelectedCategory] = useState<string>("");
  const { isOpen, onOpen, onClose } = useDisclosure();
  // メデイアクエリ
  const [isLargerThan1200] = useMediaQuery('(min-width: 1200px)');
  const [isLargerThan800] = useMediaQuery('(min-width: 800px)');

  const [categoryValue, setCategoryValue] = useState<string>('1');
  const handleSetCategoryValue = (categoryId:string)=>{
    setCategoryValue(categoryId)
  }

  const [categoryInfo, setCategoryInfo] = useState<string>('');
  //const

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
    try{
        if(categoryValue === '' || menuName === '' || menuPrice == 0 || Number.isNaN(menuPrice) === true || menuDetail === ''){
          // 空欄がある場合
          console.log("記入漏れあり")
        }
        else{
          // 記入されている場合
          const menuObjStr=JSON.stringify({
            name:menuName,
            price:menuPrice,
            description:menuDetail,
            category:categoryValue
          });
          console.log("記入済み",menuObjStr)
        }

        // const getInfo = await fetch('http://localhost:8080/menus/categories')
        // console.log(getInfo);
        // const response = await fetch('http://localhost:8080/restaurants/:id/menus/add',{
        //   method:'POST',
        //   headers: {
        //     'Content-Type': 'application/json'
        //   },
        //   body: JSON.stringify({
        //     name:menuName,
        //     price:menuPrice,
        //     description:menuDetail,
        //     category:categoryValue,
        //   })
        // })
        // console.log(response);
        // const json = await response.json();
        // console.log(json);
        
    }
    catch(error){
      console.log(error);
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
  const onClickCategory = (category: CategoryType) => {
    console.log(category);
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

  useEffect(()=>{
    // 初回のみ実行
    fetchMenu();
    fetchCategory();
  },[]);

  return <OwnerHomePre
    menuItemList={menuItemList}
    categoryList={categoryList}
    selectedCategory={selectedCategory}
    isOpen={isOpen}
    isLargerThan800={isLargerThan800}
    isLargerThan1200={isLargerThan1200}
    onClickAddMenuButton={onClickAddMenuButton}
    onClickCategory={onClickCategory}
    onClose={onClose}
    handleSetCategoryValue={handleSetCategoryValue}
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