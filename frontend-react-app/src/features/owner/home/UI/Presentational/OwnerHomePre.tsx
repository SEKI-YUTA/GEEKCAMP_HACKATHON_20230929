import type { ChangeEvent, FC, FormEvent } from 'react';
import { Layout } from '../../../../../application/UI/Components/layout';
import { MenuItem } from '../Components/MenuItem';
import { Category } from '../Components/Category';
import { Box, Button, Center, Grid, HStack, Text, VStack } from '@chakra-ui/react';
import type { MenuItemType } from '../../../../../application/@types/Menu';
import type { MenuEditModalProps } from '../Components/MenuEditModal';
import { MenuEditModal } from '../Components/MenuEditModal';
import type { CategoryType } from '../../../../../application/@types/Category';
import { MenuViewModal } from '../Components/MenuVIewModal';
import { ConfirmDialog } from '../Components/ConfirmDialog';

interface OwnerHomePreProps {
    /**
     * 表示するメニューのリスト
     */
    menuItemList: MenuItemType[];
    /**
     * カテゴリーのリスト
     */
    categoryList: CategoryType[];
    /**
     * 選択されているカテゴリー
     */
    selectedCategory: CategoryType;
    /**
     * 800px以上かどうか
     */
    isLargerThan800: boolean;
    /**
     * 1200px以上かどうか
     */
    isLargerThan1200: boolean;
    // モーダル呼び出し
    isMenuEditModalOpen: boolean;
    isConfirmModalOpen: boolean;
    menuName: string;
    menuPrice: string;
    menuDetail: string;
    imgLink: string;
    categoryValue: string;
    selectedMenuItem: MenuItemType | undefined;
    isMenuViewModalOpen: boolean;
    menuModalMode: MenuEditModalProps['mode'];
    /**
     * 新規登録ボタンを押したときの処理
     */
    onClickAddMenuButton: () => void;
    onClickMenu: (menuItem: MenuItemType) => void;
    menuViewModalOnClose: () => void;
    MenuEditModalOnClose: () => void;
    onClickMenuEdit: (item: MenuItemType) => void;
    onClickMenuDelete: (item: MenuItemType) => void;
    handleSetCategoryValue: (categoryId: string) => void;
    handleSetMenuName: (e: ChangeEvent<HTMLInputElement>) => void;
    handleSetMenuPrice: (e: ChangeEvent<HTMLInputElement>) => void;
    handleSetMenuDetail: (e: ChangeEvent<HTMLTextAreaElement>) => void;
    handleSetImgLink: (e: ChangeEvent<HTMLInputElement>) => void;
    handleAddMenuSubmit: (e: FormEvent<HTMLFormElement>) => Promise<void>;
    handleUpdateMenuSubmit: (e: FormEvent<HTMLFormElement>) => Promise<void>;
    handleBlur: (e: ChangeEvent<HTMLInputElement>) => void;
    blurMsg: boolean;
    isSpace: boolean;
    /**
     * カテゴリーを押したときの処理
     * @param category
     * @returns
     */
    onClickCategory: (category: CategoryType) => void;
    onConfirmDialogPositive: () => void;
    onConfirmDialogNegative: () => void;
}

/**
 * ホーム画面のコンポーネント（Presentational）
 * ここにUIを書く
 * @returns
 */
export const OwnerHomePre: FC<OwnerHomePreProps> = ({
  categoryList,
  menuItemList,
  selectedCategory,
  isLargerThan800,
  isLargerThan1200,
  isMenuEditModalOpen,
  menuName,
  menuPrice,
  menuDetail,
  imgLink,
  categoryValue,
  isMenuViewModalOpen,
  selectedMenuItem,
  menuModalMode,
  menuViewModalOnClose,
  onClickMenuEdit,
  onClickMenuDelete,
  onClickMenu,
  onClickAddMenuButton,
  onClickCategory,
  MenuEditModalOnClose,
  handleSetCategoryValue,
  handleSetMenuName,
  handleSetMenuPrice,
  handleSetMenuDetail,
  handleSetImgLink,
  handleAddMenuSubmit,
  handleUpdateMenuSubmit,
  isConfirmModalOpen,
  handleBlur,
  blurMsg,
  isSpace,
  onConfirmDialogNegative,
  onConfirmDialogPositive
}) => {
  return (
    <>
      <MenuViewModal
        isOpen={isMenuViewModalOpen}
        selectedMenu={selectedMenuItem}
        onClose={menuViewModalOnClose}
        onClickMenuEdit={onClickMenuEdit}
        onClickMenuDelete={onClickMenuDelete}
      />
      <MenuEditModal
        isOpen={isMenuEditModalOpen}
        menuName={menuName}
        menuPrice={menuPrice}
        menuDetail={menuDetail}
        imgLink={imgLink}
        categoryList={categoryList}
        categoryValue={categoryValue}
        mode={menuModalMode}
        handleSetCategoryValue={handleSetCategoryValue}
        handleSetMenuName={handleSetMenuName}
        handleSetMenuPrice={handleSetMenuPrice}
        handleSetMenuDetail={handleSetMenuDetail}
        handleSetImgLink={handleSetImgLink}
        handleAddMenuSubmit={handleAddMenuSubmit}
        handleUpdateMenuSubmit={handleUpdateMenuSubmit}
        handleBlur={handleBlur}
        blurMsg={blurMsg}
        isSpace={isSpace}
        onClose={MenuEditModalOnClose}
      />
      <ConfirmDialog
        isOpen={isConfirmModalOpen}
        title="メニューの削除"
        description="本当に削除しますか？"
        positiveText="削除"
        negativeText="キャンセル"
        onClose={MenuEditModalOnClose}
        onPositive={onConfirmDialogPositive}
        onNegative={onConfirmDialogNegative}
      />
      <Layout title="MaaS" isOwner={true}>
        <Box px={isLargerThan800 ? 12 : 5} pb={5}>
          <HStack py={5}>
            <HStack overflowX="auto" flex={4} spacing={1}>
              {categoryList.map((category, index) => (
                <Category
                  key={index}
                  category={category}
                  isSelected={
                    category.id === selectedCategory.id
                  }
                  isLargerThan1200={isLargerThan1200}
                  onClick={() => onClickCategory(category)}
                />
              ))}
            </HStack>
            <Box flex={2} textAlign="right">
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
                onClick={onClickAddMenuButton}
              >新規登録</Button>
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
                    onPress={() => onClickMenu(menuItem)}
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
