import type { FC } from 'react';
import { Layout } from '../../../../../application/UI/Components/layout';
import type { MenuItemType } from '../Components/MenuItem';
import { MenuItem } from '../Components/MenuItem';
import { Category } from '../Components/Category';
import { Box, Button } from '@chakra-ui/react';

interface OwnerHomePreProps {
  // 表示するメニューのリスト
  menuItemList: MenuItemType[]
  // カテゴリーのリスト
  categoryList: string[]
  // 選択されているカテゴリー
  selectedCategory: string
  //新規登録ボタンを押したときの処理
  onClickAddMenuButton: () => void
  // カテゴリーを押したときの処理
  onClickCategory: (category: string) => void
}

// メニューを splitNum 個ずつに分ける関数
const splitNum = 4;
const SplitMenuItem = (menuItemList: MenuItemType[]) => {
  if (menuItemList.length === 0) {
    console.error('menuItemList is empty');
    return [];
  }
  const menuItemListSplit = [];
  for (let i = 0; i < menuItemList.length; i += splitNum) {
    menuItemListSplit.push(menuItemList.slice(i, i + splitNum));
  }
  return menuItemListSplit;
};

/**
 * ホーム画面のコンポーネント（Presentational）
 * ここにUIを書く
 * @returns 
 */
export const OwnerHomePre: FC<OwnerHomePreProps> = (props) => {
  const menuItemSplit = SplitMenuItem(props.menuItemList);
  return (
    <>
      <Layout title='MaaS'>
        {/* ヘッダー分の余白 */}
        <Box className='wrapper'
          ml="30px" mr="30px"
        >

          <Box className='yohaku' h="65px"></Box>

          <Box className='categoryAndAddmenu'
            display="flex"
            justifyContent="space-between"
            height="50px"
          >
            {/* カテゴリーのリスト */}
            <Box
              className='categoryList'
              maxW="80%"
              overflowX="scroll"
              whiteSpace="nowrap"
              ml="15px"
            >
              {props.categoryList.map((category) => {
                const selected = category === props.selectedCategory;
                return (
                  <Category
                    key={category} name={category}
                    selected={selected} onPress={() => props.onClickCategory(category)}
                  />
                );
              })}
            </Box>
            {/* 新規登録ボタン */}
            <Button
              border="solid 1px #833F29"
              borderRadius="10px"
              color="#B14B4B"
              backgroundColor="#FBFBFB"
              size="lg"
              fontSize="2xl"
              onClick={props.onClickAddMenuButton}
            >
            新規登録
            </Button>
          </Box>

          {/* 商品のリスト 行列で表示*/}
          <Box className='menuItemList'
          >
            {menuItemSplit.map((menuItemRow) => {
              return (
                <Box key={menuItemRow[0].id} display="flex" className='menuItemRow' >
                  {menuItemRow.map((menuItem) => {
                    return (
                      <Box key={menuItem.id} className='menuItem'
                        ml="15px" mr="15px" mt="10px" mb="10px">
                        <MenuItem
                          item={menuItem}
                          onPress={() => { console.log('アイテム' + menuItem.id); }}
                        />
                      </Box>
                    );
                  })}
                </Box>
              );
            })}
          </Box>
        </Box>
      </Layout>
    </>
  );
};
