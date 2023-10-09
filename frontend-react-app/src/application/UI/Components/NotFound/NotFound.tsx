import { Box } from '@chakra-ui/react';
import type { FC } from 'react';
import { Layout } from '../layout';

export const NotFound: FC = () => {
  return (
    <Layout title='MaaS'>
      <Box textAlign='center' fontSize='2xl' fontWeight='bold' pt={10}
        position='absolute'
        top='50%'
        left='50%'
        transform='translate(-50%, -50%)'
      >
      お探しのページは見つかりませんでした
      </Box>
    </Layout>
  );
};