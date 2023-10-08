import { Box, GridItem, Image, Text, VStack } from '@chakra-ui/react';
import type { FC } from 'react';
import type { MenuItemType } from '../../../../../application/@types/Menu';

interface MenuItemProps {
  item: MenuItemType
  isLargerThan1200: boolean
  onPress: () => void
}

export const MenuItem: FC<MenuItemProps> = ({ isLargerThan1200, item, onPress }) => {
  return (
    <GridItem className='menuItem'
      p={3}
      onClick={onPress}
      boxShadow='2xl'
    >
      <Box className='imgArea'>
        <Image src={item.photo_url} />
      </Box>
      <VStack className='nameAndPrice' pt={3}>
        <Box className='name' w="full" textAlign='center' flex={1} >
          <Text fontSize={isLargerThan1200 ? '2xl' : undefined}>{item.name}</Text>
        </Box>
        <Box className='price' w="full" textAlign='right' flex={1}>
          <Text fontSize={isLargerThan1200 ? '2xl' : undefined}>{item.price}円</Text>
        </Box>
      </VStack>
    </GridItem>
  );
};
