import { Box, GridItem, Image, Text } from '@chakra-ui/react';
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
      border="solid 1px black"
      p={3}
      onClick={onPress}
    >
      <Box className='imgArea'>
        <Image src={item.photo_url} />
      </Box>
      <Box className='nameAndPrice' display="flex" pt={3}>
        <Box className='name' textAlign='center' flex={1} >
          <Text fontSize={isLargerThan1200 ? '2xl' : undefined}>{item.name}</Text>
        </Box>
        <Box className='price' textAlign='center' flex={1}>
          <Text fontSize={isLargerThan1200 ? '2xl' : undefined}>{item.price}円</Text>
        </Box>
      </Box>
    </GridItem>
  );
};
