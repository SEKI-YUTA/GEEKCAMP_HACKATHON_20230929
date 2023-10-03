import { Box, ModalContent, ModalOverlay, Modal, ModalBody, ModalHeader, ModalCloseButton, ModalFooter, Button, FormLabel, Input, Textarea, Flex, FormControl, Radio, RadioGroup } from '@chakra-ui/react';
import type { ChangeEvent, FC, FormEvent } from 'react';
import type { CategoryType } from '../../../../../application/@types/Category';

interface AddMenuModalProps {
  isOpen: boolean
  onClose: () => void
  menuName: string
  handleSetCategoryValue: (categoryId: string) => void
  handleSetMenuName: (e: ChangeEvent<HTMLInputElement>) => void
  menuPrice: number
  handleSetMenuPrice: (e: ChangeEvent<HTMLInputElement>) => void
  menuDetail: string
  handleSetMenuDetail: (e: ChangeEvent<HTMLTextAreaElement>) => void
  imgLink: string
  handleSetImgLink: (e: ChangeEvent<HTMLInputElement>) => void
  handleMenuSubmit: (e: FormEvent<HTMLFormElement>) => Promise<void>
  categoryList: CategoryType[]
  categoryValue: string
}

export const AddMenuModal: FC<AddMenuModalProps> = ({
  isOpen,
  onClose,
  menuName,
  handleSetCategoryValue,
  handleSetMenuName,
  menuPrice,
  handleSetMenuPrice,
  menuDetail,
  handleSetMenuDetail,
  imgLink,
  handleSetImgLink,
  handleMenuSubmit,
  categoryList,
  categoryValue
}) => {


  return (
    <>
      <Modal isCentered isOpen={isOpen} size='2xl' onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <form onSubmit={handleMenuSubmit}>
            <ModalHeader>メニュー登録</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Box py={2}>
                <FormLabel htmlFor='menuName'>メニュー名</FormLabel>
                <Input id='menuName' type='text' value={menuName} onChange={handleSetMenuName} />
              </Box>
              <Box py={2}>
                <FormLabel htmlFor='menuPrice'>価格</FormLabel>
                <Flex alignItems="center" gap={3}>
                  <Input id='menuPrice' type='number' value={menuPrice} onChange={handleSetMenuPrice} />円
                </Flex>
              </Box>
              <Box py={2}>
                <FormLabel htmlFor='menuDetail'>詳細</FormLabel>
                <Textarea id='menuDetail' value={menuDetail} onChange={handleSetMenuDetail} />
              </Box>
              <Box py={2}>
                <FormLabel htmlFor='imgLink'>メニューの画像リンク</FormLabel>
                <Input id='imgLink' type='url' value={imgLink} onChange={handleSetImgLink} />
              </Box>
              <FormControl>
                <FormLabel htmlFor="category_id">料理のカテゴリー</FormLabel>
                <RadioGroup id="category_id" colorScheme='orange' value={categoryValue} onChange={handleSetCategoryValue}>
                  {categoryList.filter(item => item.id !== 0).map((category, index) => (
                    <Radio key={index} pr={2} borderColor="gray" value={category.id.toString()}>{category.name}</Radio>
                  ))}
                </RadioGroup>
              </FormControl>
            </ModalBody>
            <ModalFooter justifyContent='center'>
              <Button type='submit'>登録</Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
  );

};