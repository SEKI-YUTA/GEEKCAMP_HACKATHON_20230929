import { Box, ModalContent, ModalOverlay, Modal, ModalBody, ModalHeader, ModalCloseButton, ModalFooter, Button, FormLabel, Input, Flex, FormControl, Radio, RadioGroup, HStack } from '@chakra-ui/react';
import type { ChangeEvent, FC, FormEvent } from 'react';
import type { CategoryType } from '../../../../../application/@types/Category';

export interface FilterMenuModalProps {
  isOpen: boolean
  KeyWord: string
  menuPriceLower: number
  menuPriceUpper: number
  categoryList: CategoryType[]
  categoryValue: string
  onClose: () => void
  handleSetCategoryValue: (categoryId: string) => void
  handleSetKeyWord: (e: ChangeEvent<HTMLInputElement>) => void
  handleSetMenuPriceLower: (e: ChangeEvent<HTMLInputElement>) => void
  handleSetMenuPriceUpper: (e: ChangeEvent<HTMLInputElement>) => void
  handleFilterMenuSubmit: (e: FormEvent<HTMLFormElement>) => Promise<void>
}

export const FilterMenuModal: FC<FilterMenuModalProps> = ({
  isOpen,
  KeyWord,
  menuPriceLower,
  menuPriceUpper,
  categoryList,
  categoryValue,
  handleSetKeyWord,
  onClose,
  handleSetCategoryValue,
  handleSetMenuPriceLower,
  handleSetMenuPriceUpper,
  handleFilterMenuSubmit,
}) => {

  return (
    <>
      <Modal isCentered isOpen={isOpen} size='2xl' onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <form onSubmit={handleFilterMenuSubmit}>
            <ModalHeader>絞り込み</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Box py={2}>
                <FormLabel htmlFor='KeyWord'>キーワード</FormLabel>
                <Input id='KeyWord' type='text' value={KeyWord} onChange={handleSetKeyWord} />
              </Box>
              <FormLabel htmlFor='menuPrice'>価格</FormLabel>
              <HStack>
                <Box py={2}>
                  <Flex alignItems="center" gap={3}>
                    <Input id='menuPriceLower' type='number' value={menuPriceLower} onChange={handleSetMenuPriceLower} />円
                  </Flex>
                </Box>
                <Box py={2}>
                  ~
                </Box>
                <Box py={2}>
                  <Flex alignItems="center" gap={3}>
                    <Input id='menuPriceUpper' type='number' value={menuPriceUpper} onChange={handleSetMenuPriceUpper} />円
                  </Flex>
                </Box>
              </HStack>
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
              <Button type='submit'>検索</Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
  );

};