import type { FC } from 'react';
import type { MenuItemType } from '../../../../../application/@types/Menu';
import { Box, Button, HStack, Image, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text, VStack } from '@chakra-ui/react';

interface MenuViewModalProps {
  isOpen: boolean
  selectedMenu: MenuItemType | undefined
  onClose: () => void
  onClickMenuEdit?: (item: MenuItemType) => void,
  onClickMenuDelete?: (item: MenuItemType) => void,
}

export const MenuViewModal: FC<MenuViewModalProps> = ({ isOpen, onClose, onClickMenuEdit, onClickMenuDelete, selectedMenu }) => {
  return <Modal isCentered isOpen={isOpen} size='2xl' onClose={onClose}>
    <ModalOverlay />
    <ModalContent>
      <ModalHeader></ModalHeader>
      <ModalCloseButton />
      <ModalBody>
        <HStack spacing={10}>
          <VStack spacing={5} flex={1}>
            <Box>
              <Image src={selectedMenu?.photo_url} />
            </Box>
            <Text fontSize='2xl'>{selectedMenu?.name}</Text>
          </VStack>
          <VStack alignItems='flex-start' flex={1}>
            <Text fontSize='3xl'>{selectedMenu?.price}円</Text>
            <Text fontSize='lg'>カテゴリー：{selectedMenu?.category}</Text>
            <Text fontSize='lg'>{selectedMenu?.description}</Text>
          </VStack>
        </HStack>
      </ModalBody>
      <ModalFooter justifyContent='center' gap={3}>
        {onClickMenuEdit && onClickMenuDelete && <>
          <Button colorScheme="red" onClick={() => selectedMenu && onClickMenuDelete(selectedMenu)}>削除</Button>
          <Button onClick={() => selectedMenu && onClickMenuEdit(selectedMenu)}>編集</Button>
        </>
        }
      </ModalFooter>
    </ModalContent>
  </Modal>;
};