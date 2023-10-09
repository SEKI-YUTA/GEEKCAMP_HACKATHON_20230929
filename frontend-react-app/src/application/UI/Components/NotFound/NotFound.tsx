import { Box } from "@chakra-ui/react";
import { FC } from "react";

export const NotFound: FC = () => {
  return (
    <Box textAlign='center' fontSize='2xl' fontWeight='bold' pt={10}>
      お探しのページは見つかりませんでした
    </Box>
  );
};