import { Box, GridItem, Image } from '@chakra-ui/react';
import type { FC } from 'react';
export interface MenuItemType {
  id: number
  name: string
  price: number
  description: string
  photo_url: string
  restaurant_id: number
  category_id: number
  is_sold_out: boolean
  like_count: number
}

interface MenuItemProps {
  item: MenuItemType
  onPress: () => void
}

export const MenuItem: FC<MenuItemProps> = (props) => {
  return (
    <GridItem className='menuItem'
      border="solid 1px black"
      onClick={props.onPress}
    >
      <Box className='imgArea' >
        <Image src={props.item.photo_url} />
      </Box>
      <Box className='nameAndPrice' display="flex" justifyContent="space-around" >
        <Box className='name' >{props.item.name}</Box>
        <Box className='price' >{props.item.price}円</Box>
      </Box>
    </GridItem>
  );
};
