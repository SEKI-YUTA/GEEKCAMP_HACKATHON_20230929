import { Box, ModalContent, ModalOverlay, Modal, ModalBody, ModalHeader, ModalCloseButton, ModalFooter, Button, FormLabel, Input, Textarea, Flex } from '@chakra-ui/react';
import type { ChangeEvent, FC, FormEvent } from 'react';

interface AddMenuModalProps {
    isOpen: boolean
    onClose: () => void
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

export const AddMenuModal: FC<AddMenuModalProps> = ({
  isOpen,
  onClose,
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
      <Modal isCentered isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
        <form onSubmit={handleMenuSubmit}>
          <ModalHeader>メニュー登録</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box py={2}>
              <FormLabel htmlFor='menuName'>メニュー名</FormLabel>
              <Input id='menuName' type='text' value={menuName} onChange={handleSetMenuName}/>
            </Box>
            <Box py={2}>
              <FormLabel htmlFor='menuPrice'>価格</FormLabel>
              <Flex alignItems={"center"} gap={3}>
              <Input id='menuPrice' type='number' value={menuPrice} onChange={handleSetMenuPrice}/>円
              </Flex>
            </Box>
            <Box py={2}>
              <FormLabel htmlFor='menuDetail'>詳細</FormLabel>
              <Textarea id='menuDetail' value={menuDetail} onChange={handleSetMenuDetail}/>
            </Box>
            <Box py={2}>
              <FormLabel htmlFor='imgLink'>メニューの画像リンク</FormLabel>
              <Input id='imgLink' type='url' value={imgLink} onChange={handleSetImgLink}/>
            </Box>
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