import type { FC } from 'react';
import { Layout } from '../../../../../application/UI/Components/layout';
import { MenuItem } from '../../../../owner/home/UI/Components/MenuItem';
import { Category } from '../../../../owner/home/UI/Components/Category';
import { Box, Button, Center, Grid, HStack, Text, VStack } from '@chakra-ui/react';
import type { MenuItemType } from '../../../../../application/@types/Menu';
import type { CategoryType } from '../../../../../application/@types/Category';
import { MenuViewModal } from '../../../../owner/home/UI/Components/MenuVIewModal';
import type { FilterMenuModalProps } from '../Components/FilterMenuModal';
import { FilterMenuModal } from '../Components/FilterMenuModal';

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
   * 絞り込みボタンを押したときモーダル
   */
  filterModal: FilterMenuModalProps

  /**
   * 絞り込みされているかどうか
   */
  isFiltered: boolean

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
  onClickMenu: (menuItem: MenuItemType) => void
  selectedMenuItem: MenuItemType | undefined
  isMenuViewModalOpen: boolean
  menuViewModalOnClose: () => void
}

export const RestaurantHomePre: FC<RestaurantHomePreProps> = ({
  restaurantName,
  categoryList,
  menuItemList,
  selectedCategory,
  isLargerThan800,
  isLargerThan1200,
  filterModal,
  isFiltered,
  onClickCategory,
  onClickFilterButton,
  isMenuViewModalOpen,
  onClickMenu,
  selectedMenuItem,
  menuViewModalOnClose
}) => {
  return (
    <>
      <MenuViewModal
        isOpen={isMenuViewModalOpen} selectedMenu={selectedMenuItem} onClose={menuViewModalOnClose}
      />
      <FilterMenuModal
        {...filterModal}
      />
      <Layout title={`${restaurantName}メニューアプリ`}>
        <Box px={isLargerThan800 ? 12 : 5} pb={5}>
          <HStack py={5}>
            <HStack overflowX='auto' flex={4} spacing={1}>
              {categoryList.map((category, index) => (
                <Category key={index} category={category} isSelected={category.id === selectedCategory.id} isLargerThan1200={isLargerThan1200} onClick={
                  () => onClickCategory(category)
                } />
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
                {isFiltered ? '絞り込み中' : '絞り込み'}
              </Button>
            </Box>
          </HStack>
          <Box>
            {menuItemList.length > 0 ?
              <Grid gridTemplateColumns={isLargerThan800 ? 'repeat(4, 1fr)' : 'repeat(2, 1fr)'} rowGap={5} columnGap={isLargerThan800 ? 10 : 5}>
                {menuItemList.map((menuItem, index) => (
                  <MenuItem
                    key={index}
                    isLargerThan1200={isLargerThan1200}
                    item={menuItem}
                    onPress={() => {
                      onClickMenu(menuItem);
                      console.log('アイテム' + menuItem.id);
                    }}
                  />
                ))}
              </Grid>
              :
              <VStack justifyContent="center" height="calc(95svh - 143.9px)">
                <Center>
                  <Text fontSize="2xl">メニューがありません</Text>
                </Center>
              </VStack>
            }
          </Box>
        </Box>
      </Layout>
    </>
  );
};
