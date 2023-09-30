import type { FC } from 'react';
import { Layout } from '../../../../../application/UI/Components/layout';
import type { MenuItemProps } from '../Components/MenuItem'
import { MenuItem } from '../Components/MenuItem'
import { Category } from '../Components/Category'
import { Button } from '@chakra-ui/react';
interface OwnerHomePreProps {
  // 表示するメニューのリスト
  menu_item_list: MenuItemProps[]
  //新規登録ボタンを押したときの処理
  onPressAddMenuButton: () => void
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

        {/*おすすめ　焼き鳥　アルコール　, 新規登録  */}
        <div className='category and sinkitouroku' style={{ display: 'flex', justifyContent: 'space-around' }}>
          <div className="category" style={{ display: 'flex', justifyContent: 'space-around' }}>
            <Category name='おすすめ' />
            <Category name='焼き鳥' />
            <Category name='アルコール' />
          </div>
          <Button onClick={props.onPressAddMenuButton}>新規登録</Button>
        </div>

        {/* 商品のリスト 行列で表示*/}
        <div className='menu_item_list'>
          {menu_item_split.map((menu_item_row) => {
            return (
              <div className='menu_item_row' style={{ display: 'flex', justifyContent: 'space-around' }} key={menu_item_row[0].id}>
                {menu_item_row.map((menu_item) => {
                  return (
                    <div className='menu_item' key={menu_item.id}>
                      <MenuItem id={menu_item.id} name={menu_item.name} img={tmp_img_url} price={menu_item.price} />
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
    height: '60px',
  },
};