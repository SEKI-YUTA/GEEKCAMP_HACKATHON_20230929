import type { FC } from 'react';
import { Layout } from '../../../../../application/UI/Components/layout';
import type { MenuItemType } from '../Components/MenuItem';
import { MenuItem } from '../Components/MenuItem';
import { Category } from '../Components/Category';
import { Box, Button } from '@chakra-ui/react';

interface OwnerHomePreProps {
  // 表示するメニューのリスト
  menu_item_list: MenuItemType[]
  // カテゴリーのリスト
  category_list: string[]
  // 選択されているカテゴリー
  selected_category: string
  //新規登録ボタンを押したときの処理
  onPressAddMenuButton: () => void
  // カテゴリーを押したときの処理
  onPressCategory: (category: string) => void
}

// メニューを split_num 個ずつに分ける関数
const split_num = 4;
const SplitMenuItem = (menu_item_list: MenuItemType[]) => {
  if (menu_item_list.length === 0) {
    console.error('menu_item_list is empty');
    return [];
  }
  const menu_item_list_split = [];
  for (let i = 0; i < menu_item_list.length; i += split_num) {
    menu_item_list_split.push(menu_item_list.slice(i, i + split_num));
  }
  return menu_item_list_split;
};

/**
 * ホーム画面のコンポーネント（Presentational）
 * ここにUIを書く
 * @returns 
 */

export const OwnerHomePre: FC<OwnerHomePreProps> = (props) => {
  const menu_item_split = SplitMenuItem(props.menu_item_list);
  return (
    <>
      <Layout title='MaaS'>
        {/* ヘッダー分の余白 */}
        <Box className='wrapper'
          ml="30px" mr="30px"
        >

          <Box className='yohaku' h="65px"></Box>

          <Box className='category_and_addmenu'
            display="flex"
            justifyContent="space-between"
            height="50px"
          >
            {/* カテゴリーのリスト */}
            <Box
              className='category-list'
              maxW="80%"
              overflowX="scroll"
              whiteSpace="nowrap"
              ml="15px"
            >
              {props.category_list.map((category) => {
                const selected = category === props.selected_category;
                return (
                  <Category
                    key={category} name={category}
                    selected={selected} onPress={() => props.onPressCategory(category)}
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
              onClick={props.onPressAddMenuButton}
            >
            新規登録
            </Button>
          </Box>

          {/* 商品のリスト 行列で表示*/}
          <Box className='menu_item_list'
          >
            {menu_item_split.map((menu_item_row) => {
              return (
                <Box key={menu_item_row[0].id} display="flex" className='menu_item_row' >
                  {menu_item_row.map((menu_item) => {
                    return (
                      <Box key={menu_item.id} className='menu_item'
                        ml="15px" mr="15px" mt="10px" mb="10px">
                        <MenuItem
                          item={menu_item}
                          onPress={() => { console.log('アイテム' + menu_item.id); }}
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
