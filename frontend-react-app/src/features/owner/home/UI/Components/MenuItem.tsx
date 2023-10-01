import { Box, Image } from "@chakra-ui/react"
import { FC } from "react";

export interface MenuItemProps {
  id: number
  name: string
  img: string
  price: number
  onPress: () => void
}

// export interface MenuItemProps {
//   MenuItemType: info
//   onPress: () => void
// }

export const MenuItem: FC<MenuItemProps> = (props) => {
  return (
    <Box className='menu_item' onClick={props.onPress} border={"solid 1px black"}>
      <Box className='img_area' >
        <Image src={props.img} alt="" />
      </Box>
      <Box className='name_and_price' display={"flex"} justifyContent={"space-around"} >
        <Box className='name' >{props.name}</Box>
        <Box className='price' >{props.price}円</Box>
      </Box>
    </Box>
  )
}
