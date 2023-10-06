import type { ChangeEvent, FC, FormEvent, MouseEvent } from 'react';
import { headerIconText, headerStyle } from './HeaderItemPre.css';
import { Flex, Heading, Link, Text, } from '@chakra-ui/react';
import { ProfileModal } from '../Components/ProfileModal';
import { CategoryType } from '../../../../../@types/Category';

interface HeaderItemPreProps {
  title: string
  isOwner?: boolean
  isProfileViewModal: boolean
  address: string
  description: string
  email: string
  name: string
  phoneNumber: string
  restaurantCategory: CategoryType[]
  selectedCategoryValue: string
  handleLogout: (e: MouseEvent) => void
  handleProfileShow: (e: MouseEvent) => Promise<void>
  handleProfileHide: () => void
  handleProfileUpdate: (e:FormEvent<HTMLFormElement>) => Promise<void>
  handleAddressChange: (e: ChangeEvent<HTMLInputElement>) => void
  handleEmailChange: (e: ChangeEvent<HTMLInputElement>) => void
  handleNameChange: (e: ChangeEvent<HTMLInputElement>) => void
  handlePhoneNumberChange: (e: ChangeEvent<HTMLInputElement>) => void
  handleDescription: (e: ChangeEvent<HTMLTextAreaElement>) => void
  handleRadioGroupChange: (value: string) => void
}
export const HeaderItemPre: FC<HeaderItemPreProps> = ({
  title,
  isOwner,
  isProfileViewModal,
  address,
  selectedCategoryValue,
  restaurantCategory,
  description,
  email,
  name,
  phoneNumber,
  handleRadioGroupChange,
  handleLogout,
  handleProfileShow,
  handleProfileHide,
  handleProfileUpdate,
  handleAddressChange,
  handleEmailChange,
  handleNameChange,
  handlePhoneNumberChange,
  handleDescription,
}) => {
  return (
    <>
      <ProfileModal 
        address={address}
        description={description}
        email={email}
        name={name}
        phoneNumber={phoneNumber}
        isOpen={isProfileViewModal}
        selectedCategoryValue = {selectedCategoryValue}
        restaurantCategory = {restaurantCategory}
        handleProfileUpdate={handleProfileUpdate}
        handleAddressChange = {handleAddressChange}
        handleEmailChange = {handleEmailChange}
        handleNameChange = {handleNameChange}
        handlePhoneNumberChange = {handlePhoneNumberChange}
        handleDescription = {handleDescription}
        onClose={handleProfileHide}
        handleRadioGroupChange = {handleRadioGroupChange}
      />
      <Flex as='header' css={headerStyle}>
        <Heading css={headerIconText}>
          <Text {...(isOwner && { as: 'a', href: '/' })}>{title}</Text>
        </Heading>
        <Flex flex={1} justify='end' gap={4}>
          {
            isOwner &&
            // レストラン側の場合のみ表示
            <>
              <Link href='/' color="white" onClick={handleProfileShow}>店舗情報</Link>
              {/* 後でボタンにする↓ */}
              <Link href='/signin' color="white" onClick={handleLogout}>ログアウト</Link>
            </>
          }
        </Flex>
      </Flex>
    </>
  );
};