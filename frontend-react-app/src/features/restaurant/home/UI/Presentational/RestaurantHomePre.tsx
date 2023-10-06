import type { FC } from 'react';
import { Layout } from '../../../../../application/UI/Components/layout';
import { MenuItem } from '../../../../owner/home/UI/Components/MenuItem';
import { Category } from '../../../../owner/home/UI/Components/Category';
import { Box, Button, Grid, HStack } from '@chakra-ui/react';
import type { MenuItemType } from '../../../../../application/@types/Menu';
import type { CategoryType } from '../../../../../application/@types/Category';

interface RestaurantHomePreProps {
  /**
   * レストラン名
   */
  restaurantName: string
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
   * カテゴリーを押したときの処理
   * @param category 
   * @returns 
   */
  onClickCategory: (category: CategoryType) => void
  /**
   * 絞り込みボタンを押したときの処理
   */
  onClickFilterButton: () => void

  /**
   * 絞り込みボタンを押したときモーダル
   */
  filterModal: JSX.Element
}

export const RestaurantHomePre: FC<RestaurantHomePreProps> = ({
  restaurantName,
  categoryList,
  menuItemList,
  selectedCategory,
  isLargerThan800,
  isLargerThan1200,
  onClickCategory,
  onClickFilterButton,
  filterModal,
}) => {
  return (
    <>
      {filterModal}
      <Layout title={`${restaurantName}メニューアプリ`}>
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
                  size: 'lg',
                  fontSize: '3xl',
                  px: 10,
                  py: 7,
                })}
                onClick={() => { onClickFilterButton(); }}
              >
                絞り込み
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
