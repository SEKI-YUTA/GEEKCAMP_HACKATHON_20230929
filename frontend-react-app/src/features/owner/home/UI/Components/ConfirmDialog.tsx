import { AlertDialog, AlertDialogBody, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay, Button } from '@chakra-ui/react';
import { useRef, type FC } from 'react';

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
  const cancelRef = useRef<HTMLButtonElement>(null);
  return (
    <>
      <AlertDialog
        isCentered
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
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
              <Button colorScheme="red" ml={3} onClick={onPositive}>
                {positiveText}
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
};
