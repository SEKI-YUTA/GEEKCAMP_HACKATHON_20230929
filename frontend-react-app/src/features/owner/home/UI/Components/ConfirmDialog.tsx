import { AlertDialog, AlertDialogBody, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay, Button } from "@chakra-ui/react";
import type { FC } from "react";
import React from "react";

export interface ConfirmModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    description: string;
    positiveText: string;
    negativeText: string;
    onPositive: () => void;
    onNegative: () => void;
}

export const ConfirmDialog: FC<ConfirmModalProps> = ({
    isOpen,
    onClose,
    title,
    description,
    positiveText,
    negativeText,
    onPositive,
    onNegative,
}) => {
    const cancelRef = React.useRef(null);
    return (
        <>
            <AlertDialog
                isOpen={isOpen}
                onClose={onClose}
                leastDestructiveRef={cancelRef}
            >
                <AlertDialogOverlay>
                    <AlertDialogContent>
                        <AlertDialogHeader fontSize="lg" fontWeight="bold">
                            {title}
                        </AlertDialogHeader>

                        <AlertDialogBody>
                            {description}
                        </AlertDialogBody>

                        <AlertDialogFooter>
                            <Button ref={cancelRef} onClick={onNegative}>
                                {negativeText}
                            </Button>
                            <Button colorScheme="red" onClick={onPositive} ml={3}>
                                {positiveText}
                            </Button>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialogOverlay>
            </AlertDialog>
        </>
    );
};
