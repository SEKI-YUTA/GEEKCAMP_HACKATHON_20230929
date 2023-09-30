import { Box, Button, Heading, Input, Link, Text, VStack } from '@chakra-ui/react';
import type { FC } from 'react';

interface OwnerSigninPreProps {

}


export const OwnerSigninPre: FC<OwnerSigninPreProps> = () => {
  return (
    <>
      <VStack justifyContent="center" alignItems="center" width="100vw" height="100svh">
        <Heading py={2}>ログイン</Heading>
        <Box>
          <Box py={2}>
            <Text as="label" htmlFor="ownerEmail">メールアドレス</Text>
            <Input type="email" id="ownerEmail" placeholder="メールアドレスを入力" />
          </Box>
          <Box py={2}>
            <Text as="label" htmlFor="ownerPassword">パスワード</Text>
            <Input type="password" id="ownerPassword" placeholder="パスワードを入力" />
          </Box>
          <Box py={2}>
                <Link href="/signup">新規登録はこちらから</Link>
          </Box>
          <Box py={2} textAlign="center">
            <Button>ログイン</Button>
          </Box>
        </Box>
      </VStack>
    </>
  );
};