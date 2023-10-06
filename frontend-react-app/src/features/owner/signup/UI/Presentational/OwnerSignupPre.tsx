import type { FC, ChangeEvent, FormEvent } from 'react';
import { CategoryType } from '../../../../../application/@types/Category';

import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Button,
  useColorModeValue,
  VStack,
  Radio,
  RadioGroup,
  Grid,
  GridItem
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
  errorMsgArray: string[]
  handleOwnerEmailChange: (e: ChangeEvent<HTMLInputElement>) => void
  handleOwnerPasswordChange: (e: ChangeEvent<HTMLInputElement>) => void
  handleNameChange: (e: ChangeEvent<HTMLInputElement>) => void
  handlePhoneNumberChange: (e: ChangeEvent<HTMLInputElement>) => void
  handleSetAddress: (e: ChangeEvent<HTMLInputElement>) => void
  handleDescription: (e: ChangeEvent<HTMLInputElement>) => void
  handleRadioGroupChange: (value: string) => void
  handleFormSubmit: (e: FormEvent<HTMLFormElement>) => Promise<void>
};

export const OwnerSignupPre: FC<OwnerSignupProps> = ({
  ownerEmail,
  ownerPassword,
  name,
  phoneNumber,
  address,
  description,
  selectedCategoryValue,
  errorMsg,
  errorMsgArray,
  handleOwnerEmailChange,
  handleOwnerPasswordChange,
  handleNameChange,
  handlePhoneNumberChange,
  handleSetAddress,
  handleDescription,
  handleRadioGroupChange,
  handleFormSubmit,
  restaurantCategory,
}) => {

  return (
    <VStack spacing={8} mx="auto" maxW="2xl" py={12} px={6} align="stretch">
      <form onSubmit={handleFormSubmit}>
        <Box
          rounded="lg"
          bg={useColorModeValue('white', 'gray.700')}
          boxShadow="lg"
          p={8}>
          <Stack spacing={4}>
            <FormControl id="email">
              <FormLabel htmlFor="ownerEmail">メールアドレス</FormLabel>
              <Input type="email" id="ownerEmail" placeholder="メールアドレスを入力" value={ownerEmail} onChange={handleOwnerEmailChange}  />
            </FormControl>


            <FormLabel htmlFor="ownerpassword">パスワード</FormLabel>
            <Input type="password" id="ownerpassword" placeholder="パスワードを入力" value={ownerPassword} onChange={handleOwnerPasswordChange}  />


            <FormControl id="name">
              <FormLabel htmlFor="name">名前</FormLabel>
              <Input type="text" id="name" placeholder="名前を入力" value={name} onChange={handleNameChange}  />
            </FormControl>

            <FormControl id="phone_number">
              <FormLabel htmlFor="phone_number">電話番号</FormLabel>
              <Input type="text" id="phone_number" placeholder="名前を入力" value={phoneNumber} onChange={handlePhoneNumberChange} />
            </FormControl>

            <FormControl id="address">
              <FormLabel htmlFor="address">住所</FormLabel>
              <Input type="text" id="address" placeholder="住所を入力" value={address} onChange={handleSetAddress} />
            </FormControl>

            <FormControl id="description">
              <FormLabel htmlFor="description">お店の説明</FormLabel>
              <Input type="text" id="description" placeholder="お店の説明を入力" value={description} onChange={handleDescription} />
            </FormControl>

            <FormControl id="categoryId">
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
            </FormControl>
            <Button
              bg="blue.400"
              color="white"
              _hover={{
                bg: 'blue.500',
              }} type='submit'>
              Sign in
            </Button>
          </Stack>
          {errorMsgArray.length > 0 && errorMsgArray.map((msg, index) => (
            <Box key={index}>{msg}</Box>
          ))}
        </Box>
      </form>
    </VStack>
  );
};