import type { FC } from 'react';
import { Layout } from '../../../../../application/UI/Components/layout';
import type { MenuItemType } from '../Components/MenuItem';
import { MenuItem } from '../Components/MenuItem'
import { Category } from '../Components/Category'
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
const split_num = 4
const SplitMenuItem = (menu_item_list: MenuItemType[]) => {
  if (menu_item_list.length === 0) {
    console.error('menu_item_list is empty')
    return []
  }
  const menu_item_list_split = []
  for (let i = 0; i < menu_item_list.length; i += split_num) {
    menu_item_list_split.push(menu_item_list.slice(i, i + split_num))
  }
  return menu_item_list_split
}

/**
 * ホーム画面のコンポーネント（Presentational）
 * ここにUIを書く
 * @returns 
 */

export const OwnerHomePre: FC<OwnerHomePreProps> = (props) => {
  const menu_item_split = SplitMenuItem(props.menu_item_list)
  return (
    <>
      <Layout title='MaaS'>
        {/* ヘッダー分の余白 */}
        <div className="yohaku" style={styles.yohaku}></div>

        <Box
          display={"flex"} justifyContent={"space-around"}
          className='category_and_addmenu'
          height={"70px"}>
          {/* カテゴリーのリスト */}
          <Box className='category-list' >
            {props.category_list.map((category) => {
              const selected = category === props.selected_category
              return (
                <Category
                  name={category} onPress={() => props.onPressCategory(category)}
                  selected={selected} key={category}
                />
              )
            })}
          </Box>
          {/* 新規登録ボタン */}
          <Button onClick={props.onPressAddMenuButton} style={styles.add_menu_button}>
            新規登録
          </Button>
        </Box>

        {/* 商品のリスト 行列で表示*/}
        <Box className='menu_item_list' >
          {menu_item_split.map((menu_item_row) => {
            return (
              <Box display={"flex"} className='menu_item_row' key={menu_item_row[0].id} pl={"50px"} pr={"50px"} >
                {menu_item_row.map((menu_item) => {
                  return (
                    <Box className='menu_item' key={menu_item.id}
                      pl={"15px"} pr={"15px"} pt={"10px"} pb={"10px"}>
                      <MenuItem
                        item={menu_item}
                        onPress={() => { console.log("アイテム" + menu_item.id) }}
                      />
                    </Box>
                  )
                })}
              </Box>
            )
          })}
        </Box>
      </Layout>
    </>
  );
};

const styles = {
  yohaku: {
    height: '65px',
  },
  category: {
    display: 'flex',
    justifyContent: 'space-around',
    // スクロールできるようにする
  },
  add_menu_button: {
    // 外縁
    border: 'solid 1px #833F29',
    // 外縁を丸くする
    borderRadius: '10px',
    // 文字の色
    color: '#B14B4B',
    // 背景色
    backgroundColor: '#FBFBFB',
  },
};