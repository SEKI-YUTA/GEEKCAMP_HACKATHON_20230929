import { Box, Button, Heading, Input, Link, Text, VStack } from '@chakra-ui/react';
import type { ChangeEvent, FormEvent } from 'react';
import { useState, type FC } from 'react';

interface OwnerSigninPreProps {

}


export const OwnerSigninPre: FC<OwnerSigninPreProps> = () => {
  const [ownerEmail,setOwnerEmail]=useState<string>('');
  const [ownerPassword,setOwnerPassword]=useState<string>('');
  const handleOwnerEmailChange=(e:ChangeEvent<HTMLInputElement>)=>{
    setOwnerEmail(e.target.value);
  };
  const handleOwnerPasswordChange=(e:ChangeEvent<HTMLInputElement>)=>{
    setOwnerPassword(e.target.value);
  };
  const handleFormSubmit=async(e:FormEvent<HTMLFormElement>)=>{
    e.preventDefault();
    try {
      if(ownerEmail === '' || ownerPassword === '' )return;
      console.log(ownerEmail);
      const response = await fetch('http://localhost:8080/restaurants/login',{
        method:'POST',
        headers:{
          'Content-Type': 'application/json'
        },
        body:JSON.stringify({
          'email':ownerEmail,
          'password':ownerPassword
        })
      });
      console.log(response);
      const json = await response.json();
      console.log(json);
            
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <VStack justifyContent="center" alignItems="center" width="100vw" height="100svh">
        <Heading py={2}>ログイン</Heading>
        <Box>
          <form onSubmit={handleFormSubmit}>
            <Box py={2}>
              <Text as="label" htmlFor="ownerEmail">メールアドレス</Text>
              <Input type="email" id="ownerEmail" placeholder="メールアドレスを入力" value={ownerEmail} onChange={handleOwnerEmailChange} />
            </Box>
            <Box py={2}>
              <Text as="label" htmlFor="ownerPassword">パスワード</Text>
              <Input type="password" id="ownerPassword" placeholder="パスワードを入力" value={ownerPassword} onChange={handleOwnerPasswordChange} />
            </Box>
            <Box py={2}>
              <Link href="/signup">新規登録はこちらから</Link>
            </Box>
            <Box py={2} textAlign="center">
              <Button type='submit'>ログイン</Button>
            </Box>
          </form>
        </Box>
      </VStack>
    </>
  );
};