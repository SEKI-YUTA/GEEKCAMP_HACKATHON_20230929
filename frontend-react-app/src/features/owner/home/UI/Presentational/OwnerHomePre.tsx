import type { FC } from 'react';
import { Layout } from '../../../../../application/UI/Components/layout';
import type { MenuItemProps } from '../Components/MenuItem'
import { MenuItem } from '../Components/MenuItem'
import { Category } from '../Components/Category'
import { Button } from '@chakra-ui/react';
interface OwnerHomePreProps {
  // 表示するメニューのリスト
  menu_item_list: MenuItemProps[]
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
const SplitMenuItem = (menu_item_list: MenuItemProps[]) => {
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

const tmp_img_url = "https://k-net01.com/wp-content/uploads/2019/01/smartphone-83.jpg"

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

        <div className='category_and_addmenu' style={styles.category_and_addmenu}>
          {/* カテゴリーのリスト */}
          <div className="category" style={styles.category}>
            {props.category_list.map((category) => {
              const selected = category === props.selected_category
              return (
                <Category name={category} onPress={() => props.onPressCategory(category)}
                  selected={selected} key={category}
                />
              )
            })}
          </div>
          {/* 新規登録ボタン */}
          <Button onClick={props.onPressAddMenuButton}
            style={styles.add_menu_button}>新規登録</Button>
        </div>

        {/* 商品のリスト 行列で表示*/}
        <div className='menu_item_list'>
          {menu_item_split.map((menu_item_row) => {
            return (
              <div className='menu_item_row' style={styles.menu_item_row}
                key={menu_item_row[0].id} >
                {menu_item_row.map((menu_item) => {
                  return (
                    <div className='menu_item' key={menu_item.id}>
                      <MenuItem id={menu_item.id} name={menu_item.name}
                        img={tmp_img_url} price={menu_item.price}
                        onPress={menu_item.onPress} />
                    </div>
                  )
                })}
              </div>
            )
          })}
        </div>
      </Layout>
    </>
  );
};

const styles = {
  yohaku: {
    height: '65px',
  },
  category_and_addmenu: {
    display: 'flex',
    justifyContent: 'space-around',
  // 高さを指定
    height: '60px',
  },
  category: {
    display: 'flex',
    justifyContent: 'space-around',
    // スクロールできるようにする
  },
  menu_item_list: {
    display: 'flex',
    justifyContent: 'space-around',
  },
  menu_item_row: {
    display: 'flex',
    justifyContent: 'space-around',
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