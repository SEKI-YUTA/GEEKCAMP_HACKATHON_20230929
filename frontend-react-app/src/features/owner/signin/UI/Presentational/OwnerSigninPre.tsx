import { Box, Button, Container, Heading, Input, Text } from "@chakra-ui/react";
import { FC } from "react";

interface OwnerSigninPreProps {
  
}


export const OwnerSigninPre: FC<OwnerSigninPreProps> = () => {
    return (
      <>
        
        <Container height={"100svh"} py={5}>
            <Box display={"flex"} flexDirection={"column"} alignItems={"center"} width={"full"} height={"full"}>
                <Heading>ログイン</Heading>
                <Box>
                    <Box>
                        <Text as={"label"} htmlFor="ownerEmail">メールアドレス</Text>
                        <Input type="email" id="ownerEmail" placeholder="メールアドレスを入力"/>
                    </Box>
                    <Box>
                        <Text as={"label"} htmlFor="ownerPassword">パスワード</Text>
                        <Input type="password" id="ownerPassword" placeholder="パスワードを入力"/>
                    </Box>
                    <Box>
                        <Button>ログイン</Button>
                    </Box>
                </Box>
            </Box>
        </Container>
        
      </>
    );
};