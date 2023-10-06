import { Button, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, VStack } from "@chakra-ui/react";
import { FC } from "react";
import { QRCodeCanvas } from "qrcode.react";

interface QRViewModalProps {
    isOpen: boolean
    url: string
    onClose: () => void
}

export const QRViewModal: FC<QRViewModalProps> = ({
    isOpen,
    url,
    onClose,
}) => {
    return <Modal isCentered isOpen={isOpen} size='2xl' onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
            <ModalHeader>店舗情報</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
                <VStack>
                    <Input type="url" value={url} onChange={() => {}} />
                    <QRCodeCanvas
                        value={url}
                        size={128}
                        bgColor={"#fff"}
                        fgColor={"#000"}
                        level={"L"}
                        includeMargin={false}
                        imageSettings={{
                            src: "/favicon.ico",
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
                <Button type='submit'>QRコードを保存</Button>
            </ModalFooter>
        </ModalContent>
    </Modal>;
}