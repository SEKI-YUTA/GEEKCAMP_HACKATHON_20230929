import { Box, Button, FormControl, FormLabel, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Radio, RadioGroup, Textarea } from '@chakra-ui/react';
import type { ChangeEvent, FC, FormEvent } from 'react';
import { CategoryType } from '../../../../../@types/Category';

interface ProfileModalProps {
    isOpen: boolean
    address: string
    description: string
    email: string
    name: string
    phoneNumber: string
    restaurantCategory: CategoryType[]
    selectedCategoryValue: string
    onClose: () => void
    handleProfileUpdate: (e:FormEvent<HTMLFormElement>) => Promise<void>
    handleAddressChange: (e: ChangeEvent<HTMLInputElement>) => void
    handleEmailChange: (e: ChangeEvent<HTMLInputElement>) => void
    handleNameChange: (e: ChangeEvent<HTMLInputElement>) => void
    handlePhoneNumberChange: (e: ChangeEvent<HTMLInputElement>) => void
    handleDescription: (e: ChangeEvent<HTMLTextAreaElement>) => void
    handleRadioGroupChange: (value: string) => void
}

export const ProfileModal: FC<ProfileModalProps> = ({
  isOpen,
  address,
  description,
  email,
  name,
  phoneNumber,
  restaurantCategory,
  selectedCategoryValue,
  onClose,
  handleProfileUpdate,
  handleAddressChange,
  handleEmailChange,
  handleNameChange,
  handlePhoneNumberChange,
  handleDescription,
  handleRadioGroupChange,
}) => {
  return <Modal isCentered isOpen={isOpen} size='2xl' onClose={onClose}>
    <ModalOverlay />
    <ModalContent>
      <form onSubmit={handleProfileUpdate}>
        <ModalHeader>店舗情報</ModalHeader>
        <ModalCloseButton />
        <ModalBody h='full'>
          <Box py={2}>
            <FormLabel htmlFor='restaurantName'>店舗名</FormLabel>
            <Input id='restaurantName' type='text' value={name} onChange={handleNameChange}/>
          </Box>
          <Box py={2}>
            <FormLabel htmlFor='restaurantEmail'>メールアドレス</FormLabel>
            <Input id='restaurantEmail' type='email' value={email} onChange={handleEmailChange} />
          </Box>
          <Box py={2}>
            <FormLabel htmlFor='restaurantAddress'>住所</FormLabel>
            <Input id='restaurantAddress' type='text' value={address} onChange={handleAddressChange} />
          </Box>
          <Box py={2}>
            <FormLabel htmlFor='restaurantPhoneNumber'>電話番号</FormLabel>
            <Input id='restaurantPhoneNumber' type='tel' value={phoneNumber} onChange={handlePhoneNumberChange} />
          </Box>
          <Box py={2}>
            <FormLabel htmlFor='restaurantDetail'>詳細</FormLabel>
            <Textarea id='restaurantDetail' value={description} onChange={handleDescription}/>
          </Box>
          <FormControl>
            <FormLabel htmlFor="restaurantCategory">カテゴリー</FormLabel>
            <RadioGroup id="restaurantCategory" colorScheme='orange' value={selectedCategoryValue} onChange={handleRadioGroupChange}>
              {restaurantCategory.filter(item => item.id !== 0).map((category, index) => (
                <Radio key={index} pr={2} borderColor="gray" value={category.id.toString()}>{category.name}</Radio>
              ))}
            </RadioGroup>
          </FormControl>
        </ModalBody>
        <ModalFooter justifyContent='center'>
          <Button type='submit'>変更</Button>
        </ModalFooter>
      </form>
    </ModalContent>
  </Modal>;
};