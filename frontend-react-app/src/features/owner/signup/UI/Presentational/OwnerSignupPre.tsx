import type { FC, ChangeEvent, FormEvent } from 'react';

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

import type { OwnerRestaurantCategoryType } from '../Container/OwnerSignupCon';

interface OwnerSignupProps {
  ownerEmail: string
  ownerPassword: string
  name: string
  phone_number: string
  address: string
  description: string
  selectedValue: string
  restaurantCategory: OwnerRestaurantCategoryType[]
  errorMsg: number
  handleOwnerEmailChange: (e: ChangeEvent<HTMLInputElement>) => void
  handleOwnerPasswordChange: (e: ChangeEvent<HTMLInputElement>) => void
  handleNameChange: (e: ChangeEvent<HTMLInputElement>) => void
  handlePhone_numberChange: (e: ChangeEvent<HTMLInputElement>) => void
  handleSetAddress: (e: ChangeEvent<HTMLInputElement>) => void
  handleDescription: (e: ChangeEvent<HTMLInputElement>) => void
  handleRadioGroupChange: (value: string) => void
  handleFormSubmit: (e: FormEvent<HTMLFormElement>) => Promise<void>
  // category_id: number
}


export const OwnerSignupPre: FC<OwnerSignupProps> = ({
  ownerEmail,
  ownerPassword,
  name,
  phone_number,
  address,
  description,
  selectedValue,
  handleOwnerEmailChange,
  handleOwnerPasswordChange,
  handleNameChange,
  handlePhone_numberChange,
  handleSetAddress,
  handleDescription,
  handleRadioGroupChange,
  handleFormSubmit,
  restaurantCategory,
  // category_id
}) => {

  return (
  // <Flex
  //   minH={'100vh'}
  //   align={'center'}
  //   justify={'center'}
  //   bg={useColorModeValue('gray.50', 'gray.800')}>

    // <Box maxWidth={'1000px'} >
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
              <Input type="email" id="ownerEmail" placeholder="メールアドレスを入力" value={ownerEmail} onChange={handleOwnerEmailChange} />
              {/* <Input type="email" id="ownerEmail" placeholder="メールアドレスを入力" /> */}
            </FormControl>

            <FormControl id="password">
              <FormLabel htmlFor="ownerpassword">パスワード</FormLabel>
              <Input type="password" id="ownerpassword" placeholder="パスワードを入力" value={ownerPassword} onChange={handleOwnerPasswordChange} />
              {/* <Input type="password" id="ownerpassword" placeholder="パスワードを入力" /> */}
            </FormControl>

            <FormControl id="name">
              <FormLabel htmlFor="name">名前</FormLabel>
              <Input type="text" id="name" placeholder="名前を入力" value={name} onChange={handleNameChange} />
              {/* <Input type="text" id="name" placeholder="名前を入力" /> */}
            </FormControl>

            <FormControl id="phone_number">
              <FormLabel htmlFor="phone_number">電話番号</FormLabel>
              <Input type="text" id="phone_number" placeholder="名前を入力" value={phone_number} onChange={handlePhone_numberChange} />
              {/* <Input type="text" id="phone_number" placeholder="名前を入力" /> */}
            </FormControl>

            <FormControl id="address">
              <FormLabel htmlFor="address">住所</FormLabel>
              <Input type="text" id="address" placeholder="住所を入力" value={address} onChange={handleSetAddress} />
              {/* <Input type="text" id="address" placeholder="住所を入力" /> */}
            </FormControl>

            <FormControl id="description">
              <FormLabel htmlFor="description">お店の説明</FormLabel>
              <Input type="text" id="description" placeholder="お店の説明を入力" value={description} onChange={handleDescription} />
            </FormControl>

            <FormControl id="category_id">
              <FormLabel htmlFor="category_id">お店のカテゴリー</FormLabel>
              <RadioGroup colorScheme='green' value={selectedValue} onChange={handleRadioGroupChange}>
                <Grid templateColumns="repeat(4, 1fr)" gap={6}>
                  {/* <Grid templateColumns={{ base: "repeat(5, 1fr)", md: "repeat(7, 1fr)", lg: "repeat(9, 1fr)" }} gap={6}> */}

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
        </Box>
      </form>
    </VStack>
    // </Box>
    // </Flex>
  );
};