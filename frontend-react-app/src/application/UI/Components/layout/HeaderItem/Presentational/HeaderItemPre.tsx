import type { ChangeEvent, FC, FormEvent, MouseEvent } from 'react';
import { headerIconText, headerStyle } from './HeaderItemPre.css';
import { Flex, Heading, Link, Text, } from '@chakra-ui/react';
import { ProfileModal } from '../Components/ProfileModal';

interface HeaderItemPreProps {
  title: string
  isOwner?: boolean
  isProfileViewModal: boolean
  address: string
  category: string
  description: string
  email: string
  name: string
  phoneNumber: string
  handleLogout: (e: MouseEvent) => void
  handleProfileShow: (e: MouseEvent) => Promise<void>
  handleProfileHide: () => void
  handleProfileUpdate: (e:FormEvent<HTMLFormElement>) => Promise<void>
  handleAddressChange: (e: ChangeEvent<HTMLInputElement>) => void
  handleEmailChange: (e: ChangeEvent<HTMLInputElement>) => void
  handleNameChange: (e: ChangeEvent<HTMLInputElement>) => void
  handlePhoneNumberChange: (e: ChangeEvent<HTMLInputElement>) => void
  handleDescription: (e: ChangeEvent<HTMLTextAreaElement>) => void
}
export const HeaderItemPre: FC<HeaderItemPreProps> = ({
  title,
  isOwner,
  isProfileViewModal,
  address,
  category,
  description,
  email,
  name,
  phoneNumber,
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
        category={category}
        description={description}
        email={email}
        name={name}
        phoneNumber={phoneNumber}
        isOpen={isProfileViewModal}
        handleProfileUpdate={handleProfileUpdate}
        handleAddressChange = {handleAddressChange}
        handleEmailChange = {handleEmailChange}
        handleNameChange = {handleNameChange}
        handlePhoneNumberChange = {handlePhoneNumberChange}
        handleDescription = {handleDescription}
        onClose={handleProfileHide}
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