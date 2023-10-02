import { Box, ModalContent, ModalOverlay, Modal, ModalBody, ModalHeader, ModalCloseButton, ModalFooter, Button, FormLabel, Input, Textarea, Flex } from '@chakra-ui/react';
import type { FC } from 'react';

interface AddMenuModalProps {
    isOpen: boolean
    onClose: () => void
}

export const AddMenuModal: FC<AddMenuModalProps> = ({
  isOpen,
  onClose
}) => {


  return (
    <>
      <Modal isCentered isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>メニュー登録</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box py={2}>
              <FormLabel htmlFor='menuName'>メニュー名</FormLabel>
              <Input id='menuName' type='text' />
            </Box>
            <Box py={2}>
              <FormLabel htmlFor='menuPrice'>価格</FormLabel>
              <Flex alignItems={"center"} gap={3}>
              <Input id='menuPrice' type='number' />円
              </Flex>
            </Box>
            <Box py={2}>
              <FormLabel htmlFor='menuDetail'>詳細</FormLabel>
              <Textarea id='menuDetail'/>
            </Box>
            <Box py={2}>
              <FormLabel htmlFor='imgLink'>メニューの画像リンク</FormLabel>
              <Input id='imgLink' type='url'/>
            </Box>
          </ModalBody>
          <ModalFooter justifyContent='center'>
            <Button>登録</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );

};