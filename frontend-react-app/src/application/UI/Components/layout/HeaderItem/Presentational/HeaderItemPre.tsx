import type { ChangeEvent, FC, FormEvent, MouseEvent, RefObject } from 'react';
import { headerIconText, headerStyle } from './HeaderItemPre.css';
import { Flex, Heading, Link, Text, } from '@chakra-ui/react';
import { ProfileModal } from '../Components/ProfileModal';
import type { CategoryType } from '../../../../../@types/Category';
import { QRViewModal } from '../Components/QRViewModal';

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
  isQRViewModal: boolean
  url: string
  urlInputRef: RefObject<HTMLInputElement>
  QRViewModalOnOpen: (e: MouseEvent) => void
  QRViewModalOnClose: () => void
  handleLogout: (e: MouseEvent) => void
  handleProfileShow: (e: MouseEvent) => Promise<void>
  handleProfileHide: () => void
  handleProfileUpdate: (e: FormEvent<HTMLFormElement>) => Promise<void>
  handleAddressChange: (e: ChangeEvent<HTMLInputElement>) => void
  handleEmailChange: (e: ChangeEvent<HTMLInputElement>) => void
  handleNameChange: (e: ChangeEvent<HTMLInputElement>) => void
  handlePhoneNumberChange: (e: ChangeEvent<HTMLInputElement>) => void
  handleDescription: (e: ChangeEvent<HTMLTextAreaElement>) => void
  handleRadioGroupChange: (value: string) => void
  onURLCopy: () => Promise<void>
  saveQR: () => void
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
  isQRViewModal,
  url,
  urlInputRef,
  QRViewModalOnOpen,
  QRViewModalOnClose,
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
  onURLCopy,
  saveQR,
}) => {
  return (
    <>
      <QRViewModal
        isOpen={isQRViewModal}
        urlInputRef={urlInputRef}
        url={url}
        saveQR={saveQR}
        onClose={QRViewModalOnClose}
        onURLCopy={onURLCopy}
      />
      <ProfileModal
        address={address}
        description={description}
        email={email}
        name={name}
        phoneNumber={phoneNumber}
        isOpen={isProfileViewModal}
        selectedCategoryValue={selectedCategoryValue}
        restaurantCategory={restaurantCategory}
        handleProfileUpdate={handleProfileUpdate}
        handleAddressChange={handleAddressChange}
        handleEmailChange={handleEmailChange}
        handleNameChange={handleNameChange}
        handlePhoneNumberChange={handlePhoneNumberChange}
        handleDescription={handleDescription}
        handleRadioGroupChange={handleRadioGroupChange}
        onClose={handleProfileHide}
      />
      <Flex as='header' css={headerStyle}>
        <Heading css={headerIconText}>
          <Text {...(isOwner && { as: 'a', href: '/' })}>{title}</Text>
        </Heading>
        {
          isOwner &&
          <Flex flex={2} justify='end' gap={4}>
            {/* レストラン側の場合のみ表示 */}
            <>
              <Link href='/' color="white" onClick={QRViewModalOnOpen}>QRコード</Link>
              <Link href='/' color="white" onClick={handleProfileShow}>店舗情報</Link>
              {/* 後でボタンにする↓ */}
              <Link href='/signin' color="white" onClick={handleLogout}>ログアウト</Link>
            </>
          </Flex>
        }
      </Flex>
    </>
  );
};