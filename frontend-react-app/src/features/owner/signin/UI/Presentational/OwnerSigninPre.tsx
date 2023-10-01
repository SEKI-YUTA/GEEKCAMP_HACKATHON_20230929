import { Box, Button, Heading, Input, Link, Text, VStack } from '@chakra-ui/react';
import { ChangeEvent, FC, FormEvent } from 'react';

interface OwnerSigninPreProps {
    ownerEmail: string
    ownerPassword: string
    handleOwnerEmailChange:(e: ChangeEvent<HTMLInputElement>) => void
    handleFormSubmit: (e: FormEvent<HTMLFormElement>) => Promise<void>
    handleOwnerPasswordChange: (e: ChangeEvent<HTMLInputElement>) => void
    errorMsg: string
}


export const OwnerSigninPre: FC<OwnerSigninPreProps> = ({
    ownerEmail,
    ownerPassword,
    handleOwnerEmailChange,
    handleFormSubmit,
    handleOwnerPasswordChange,
    errorMsg
}) => {

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
            <Box>
              {errorMsg!==""&&errorMsg}
            </Box>
          </form>
        </Box>
      </VStack>
    </>
  );
};