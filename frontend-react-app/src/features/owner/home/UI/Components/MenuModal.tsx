import { Box, Button, CloseButton, SimpleGrid, Heading, Input, Link, Text, VStack, Flex, HStack, ModalContent, ModalOverlay, Modal, useDisclosure, ModalBody } from '@chakra-ui/react';
import React, { ChangeEvent, FC, useState } from 'react';
import ReactDom from 'react-dom/client';

//export const MenuModal:FC=()=>{


interface MenuModalProps {
    isOpen: boolean
    onClose: () => void
}

export const MenuModal: FC<MenuModalProps> = ({
    isOpen,
    onClose
}) => {
    return(
        <>
        <Modal blockScrollOnMount={false} isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <VStack justifyContent="center" alignItems="center" width="100vw" height="100svh">
                <Flex>
                    <ModalBody border={'solid'} background={"#FFF"}>
                        <Box>
                            <Box justifyContent="center" alignItems="center" width="30vw" height="30vw" background="#333">
                                <img src="" alt="" />
                            </Box>
                            <Box>
                                <Heading pl={"55vw"}>{300}円</Heading>
                            </Box>
                            <Text as="label">hogehoge</Text>
                        </Box>                        
                    </ModalBody>
                    <Box onClick={onClose}>
                        <CloseButton />
                    </Box>
                </Flex>
                </VStack>                
            </ModalContent>
        </Modal>
        </>
    )

}