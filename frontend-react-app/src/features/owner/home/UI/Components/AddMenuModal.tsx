import { Box, ModalContent, ModalOverlay, Modal, ModalBody, ModalHeader, ModalCloseButton, ModalFooter, Button, FormLabel, Input } from '@chakra-ui/react';
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
            <Box>
              <FormLabel htmlFor='menuName'>メニュー名</FormLabel>
              <Input id='menuName' type='text' />
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