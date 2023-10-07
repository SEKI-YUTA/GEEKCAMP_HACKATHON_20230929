import type { FC, ChangeEvent, FormEvent } from 'react';
import type { CategoryType } from '../../../../../application/@types/Category';

import {
  Box,
  FormLabel,
  Input,
  Stack,
  Button,
  useColorModeValue,
  VStack,
  Radio,
  RadioGroup,
  Grid,
  GridItem,
  FormControl,
  Heading,
  Link
} from '@chakra-ui/react';

interface OwnerSignupProps {
  ownerEmail: string
  ownerPassword: string
  name: string
  phoneNumber: string
  address: string
  description: string
  selectedCategoryValue: string
  restaurantCategory: CategoryType[]
  errorMsg: number
  errorMsgObject: { [key: string]: string }
  spaceMsgObject: { [key: string]: string }
  handleOwnerEmailChange: (e: ChangeEvent<HTMLInputElement>) => void
  handleOwnerPasswordChange: (e: ChangeEvent<HTMLInputElement>) => void
  handleNameChange: (e: ChangeEvent<HTMLInputElement>) => void
  handlePhoneNumberChange: (e: ChangeEvent<HTMLInputElement>) => void
  handleSetAddress: (e: ChangeEvent<HTMLInputElement>) => void
  handleDescription: (e: ChangeEvent<HTMLInputElement>) => void
  handleRadioGroupChange: (value: string) => void
  handleFormSubmit: (e: FormEvent<HTMLFormElement>) => Promise<void>
}

export const OwnerSignupPre: FC<OwnerSignupProps> = ({
  ownerEmail,
  ownerPassword,
  name,
  phoneNumber,
  address,
  description,
  selectedCategoryValue,
  errorMsg,
  errorMsgObject,
  spaceMsgObject,
  restaurantCategory,
  handleOwnerEmailChange,
  handleOwnerPasswordChange,
  handleNameChange,
  handlePhoneNumberChange,
  handleSetAddress,
  handleDescription,
  handleRadioGroupChange,
  handleFormSubmit,
}) => {

  return (
    <VStack spacing={8} mx="auto" maxW="2xl" py={12} px={6} align="stretch">
      <Heading py={2} textAlign='center' >サインアップ</Heading>
      <form onSubmit={handleFormSubmit}>
        <Box
          rounded="lg"
          bg={useColorModeValue('white', 'gray.700')}
          boxShadow="lg"
          p={8}>
          <Stack spacing={4}>
            <Box py={2}>
              <FormControl isRequired>
                <FormLabel htmlFor="ownerEmail">メールアドレス</FormLabel>
                <Input mb={1.5} type="email" id="ownerEmail" placeholder="メールアドレスを入力" value={ownerEmail} onChange={handleOwnerEmailChange} />
                <Box color='red' >{errorMsgObject['ownerEmail']}</Box>
              </FormControl>
            </Box>


            <Box py={2}>
              <FormControl isRequired>
                <FormLabel htmlFor="ownerpassword">パスワード</FormLabel>
                <Input mb={1.5} type="password" id="ownerpassword" placeholder="パスワードを入力" value={ownerPassword} onChange={handleOwnerPasswordChange} />
                <Box color='red' >{errorMsgObject['ownerPassword']}</Box>
              </FormControl>
            </Box>

            <Box py={2}>
              <FormControl isRequired>
                <FormLabel htmlFor="name">名前</FormLabel>
                <Input mb={1.5} type="text" id="name" placeholder="名前を入力" value={name} onChange={handleNameChange} />
                <Box color='red' >{errorMsgObject['name']}</Box>
              </FormControl>
            </Box>

            <Box py={2}>
              <FormLabel htmlFor="phoneNumber">電話番号</FormLabel>
              <Input type="text" id="phoneNumber" placeholder="名前を入力" value={phoneNumber} onChange={handlePhoneNumberChange} />
              <Box color='red' >{spaceMsgObject['phoneNumber']}</Box>
            </Box>

            <Box py={2}>
              <FormLabel htmlFor="address">住所</FormLabel>
              <Input mb={1.5} type="text" id="address" placeholder="住所を入力" value={address} onChange={handleSetAddress} />
              <Box color='red' >{spaceMsgObject['address']}</Box>
            </Box>

            <Box py={2}>
              <FormLabel htmlFor="description">お店の説明</FormLabel>
              <Input mb={1.5} type="text" id="description" placeholder="お店の説明を入力" value={description} onChange={handleDescription} />
              <Box color='red' >{spaceMsgObject['description']}</Box>
            </Box>

            <FormLabel htmlFor="categoryId">お店のカテゴリー</FormLabel>
            <RadioGroup colorScheme='green' value={selectedCategoryValue} onChange={handleRadioGroupChange}>
              <Grid templateColumns="repeat(4, 1fr)" gap={6}>
                {
                  restaurantCategory.map((item, index) => {
                    return <GridItem key={index} w='100%' h='10'> <Radio borderColor="gray" value={item.id.toString()}>{item.name}</Radio> </GridItem>;
                  })
                }
              </Grid>
            </RadioGroup>
            <Box py={2} textAlign='center'>
              <Link href="/signin" fontWeight='bold' >登録済みの方はこちらから</Link>
            </Box>
            <Button
              bg="blue.400"
              color="white"
              _hover={{
                bg: 'blue.500',
              }} type='submit'>
              サインアップ
            </Button>
          </Stack>
          {
            (() => {
              switch (errorMsg) {
                case 1:
                  return 'サインアップに失敗、もう一度やり直してください';
                case 2:
                  return '送信に失敗しました、もう一度やり直してください';
                default:
                  return <></>;
              }
            })()
          }
        </Box>
      </form>
    </VStack>
  );
};