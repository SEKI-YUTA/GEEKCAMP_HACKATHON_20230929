import { Box, Image } from "@chakra-ui/react"
import { FC } from "react";
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
    <Box className='menu_item' onClick={props.onPress} border={"solid 1px black"}>
      <Box className='img_area' >
        <Image src={props.item.photo_url} />
      </Box>
      <Box className='name_and_price' display={"flex"} justifyContent={"space-around"} >
        <Box className='name' >{props.item.name}</Box>
        <Box className='price' >{props.item.price}円</Box>
      </Box>
    </Box>
  )
}
