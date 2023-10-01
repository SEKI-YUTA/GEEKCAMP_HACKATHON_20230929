import { Box, GridItem, Image, Text } from '@chakra-ui/react';
import type { FC } from 'react';
import type { MenuItemType } from '../../../../../application/@types/Menu';

interface MenuItemProps {
  item: MenuItemType
  onPress: () => void
}

export const MenuItem: FC<MenuItemProps> = ({ item, onPress }) => {
  return (
    <GridItem className='menuItem'
      border="solid 1px black"
      onClick={onPress}
    >
      <Box className='imgArea' p={3}>
        <Image src={item.photo_url} />
      </Box>
      <Box className='nameAndPrice' display="flex" py={3}>
        <Box className='name' textAlign='center' flex={1} >
          <Text fontSize='2xl'>{item.name}</Text>
        </Box>
        <Box className='price' textAlign='center' flex={1} >
          <Text fontSize='2xl'>{item.price}円</Text>
        </Box>
      </Box>
    </GridItem>
  );
};
