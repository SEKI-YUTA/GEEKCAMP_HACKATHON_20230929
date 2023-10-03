import type { ChangeEvent, FC, FormEvent } from 'react';
import { Layout } from '../../../../../application/UI/Components/layout';
import { MenuItem } from '../Components/MenuItem';
import { Category } from '../Components/Category';
import { Box, Button, Grid, HStack } from '@chakra-ui/react';
import type { MenuItemType } from '../../../../../application/@types/Menu';
import { AddMenuModal } from '../Components/AddMenuModal';

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
  // モーダル呼び出し
  isOpen: boolean
  onClose: () => void
  handleSetCategoryValue: (categoryId: string) => void
  menuName: string
  handleSetMenuName: (e: ChangeEvent<HTMLInputElement>) => void
  menuPrice: number
  handleSetMenuPrice: (e: ChangeEvent<HTMLInputElement>) => void
  menuDetail: string
  handleSetMenuDetail: (e: ChangeEvent<HTMLTextAreaElement>) => void
  imgLink: string
  handleSetImgLink: (e: ChangeEvent<HTMLInputElement>) => void
  handleMenuSubmit: (e: FormEvent<HTMLFormElement>) => Promise<void>
}

/**
 * ホーム画面のコンポーネント（Presentational）
 * ここにUIを書く
 * @returns
 */
export const OwnerHomePre: FC<OwnerHomePreProps> = ({
  categoryList,
  menuItemList,
  onClickAddMenuButton,
  onClickCategory,
  selectedCategory,
  isOpen,
  onClose,
  handleSetCategoryValue,
  menuName,
  handleSetMenuName,
  menuPrice,
  handleSetMenuPrice,
  menuDetail,
  handleSetMenuDetail,
  imgLink,
  handleSetImgLink,
  handleMenuSubmit
}) => {
  return (
    <>
      <AddMenuModal
        isOpen={isOpen}
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
      />
      <Layout title='MaaS'>
        <Box px={12}>
          <HStack py={5}>
            <HStack overflowX='auto' flex={4} spacing={1}>
              {categoryList.map((category, index) => (
                <Category key={index} name={category} selectedCategory={selectedCategory} onClick={() => onClickCategory(category)} />
              ))}
            </HStack>
            <Box
              flex={2}
              textAlign="right"
            >
              <Button
                border="solid 1px #833F29"
                borderRadius="10px"
                color="#B14B4B"
                backgroundColor="#FBFBFB"
                size="lg"
                fontSize="3xl"
                px={10}
                py={7}
                onClick={onClickAddMenuButton}
              >
              新規登録
              </Button>
            </Box>
          </HStack>
          <Box>
            <Grid gridTemplateColumns='repeat(4, 1fr)' rowGap={5} columnGap={10}>
              {menuItemList.map((menuItem, index) => (
                <MenuItem
                  key={index}
                  item={menuItem}
                  onPress={() => { console.log('アイテム' + menuItem.id); }}
                />
              ))}
            </Grid>
          </Box>
        </Box>
      </Layout>
    </>
  );
};
