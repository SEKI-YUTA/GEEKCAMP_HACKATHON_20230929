import type { ChangeEvent, FC, FormEvent } from 'react';
import { Layout } from '../../../../../application/UI/Components/layout';
import { MenuItem } from '../Components/MenuItem';
import { Category } from '../Components/Category';
import { Box, Button, Grid, HStack } from '@chakra-ui/react';
import type { MenuItemType } from '../../../../../application/@types/Menu';
import { AddMenuModal } from '../Components/AddMenuModal';
import type { CategoryType } from '../../../../../application/@types/Category';

interface OwnerHomePreProps {
  /**
   * 表示するメニューのリスト
   */
  menuItemList: MenuItemType[]
  /**
   * カテゴリーのリスト
   */
  categoryList: CategoryType[]
  /**
   * 選択されているカテゴリー
   */
  selectedCategory: CategoryType
  /**
   * 800px以上かどうか
   */
  isLargerThan800: boolean
  /**
   * 1200px以上かどうか
   */
  isLargerThan1200: boolean
  /**
   * 新規登録ボタンを押したときの処理
   */
  onClickAddMenuButton: () => void
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
  /**
   * カテゴリーを押したときの処理
   * @param category 
   * @returns 
   */
  onClickCategory: (category: CategoryType) => void
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
  handleMenuSubmit,
  isLargerThan800,
  isLargerThan1200,
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
        <Box px={isLargerThan800 ? 12 : 5} pb={5}>
          <HStack py={5}>
            <HStack overflowX='auto' flex={4} spacing={1}>
              {categoryList.map((category, index) => (
                <Category key={index} category={category} isSelected={category.id === selectedCategory.id} isLargerThan1200={isLargerThan1200} onClick={() => onClickCategory(category)} />
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
                {...(isLargerThan1200 && {
                  size:'lg',
                  fontSize:'3xl',
                  px:10,
                  py:7,
                })}
                onClick={onClickAddMenuButton}
              >
              新規登録
              </Button>
            </Box>
          </HStack>
          <Box>
            <Grid gridTemplateColumns={isLargerThan800 ? 'repeat(4, 1fr)' : 'repeat(2, 1fr)'} rowGap={5} columnGap={isLargerThan800 ? 10 : 5}>
              {menuItemList.map((menuItem, index) => (
                <MenuItem
                  key={index}
                  isLargerThan1200={isLargerThan1200}
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
