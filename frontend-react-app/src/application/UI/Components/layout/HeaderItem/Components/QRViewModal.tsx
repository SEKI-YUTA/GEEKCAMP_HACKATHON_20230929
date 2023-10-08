import { Button, Input, InputGroup, InputRightElement, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, VStack } from '@chakra-ui/react';
import type { FC, RefObject } from 'react';
import { QRCodeCanvas } from 'qrcode.react';

interface QRViewModalProps {
    isOpen: boolean
    url: string
    urlInputRef: RefObject<HTMLInputElement>
    onClose: () => void
    onURLCopy: () => Promise<void>
    saveQR: () => void
}

export const QRViewModal: FC<QRViewModalProps> = ({
  isOpen,
  url,
  urlInputRef,
  onClose,
  onURLCopy,
  saveQR,
}) => {
  return <Modal isCentered isOpen={isOpen} size='2xl' onClose={onClose}>
    <ModalOverlay />
    <ModalContent>
      <ModalHeader>店舗情報</ModalHeader>
      <ModalCloseButton />
      <ModalBody>
        <VStack>
          <InputGroup>
            <Input ref={urlInputRef} readOnly type="url" value={url} />
            <InputRightElement width='4.5rem'>
              <Button onClick={onURLCopy}>コピー</Button>
            </InputRightElement>
          </InputGroup>
          <QRCodeCanvas
            id="qr-canvas"
            value={url}
            size={128}
            bgColor="#fff"
            fgColor="#000"
            level="L"
            includeMargin={false}
            imageSettings={{
              src: '/favicon.ico',
              x: undefined,
              y: undefined,
              height: 24,
              width: 24,
              excavate: true,
            }}
                        
          />
        </VStack>
      </ModalBody>
      <ModalFooter justifyContent='center'>
        <Button type='submit' onClick={saveQR}>QRコードを保存</Button>
      </ModalFooter>
    </ModalContent>
  </Modal>;
};