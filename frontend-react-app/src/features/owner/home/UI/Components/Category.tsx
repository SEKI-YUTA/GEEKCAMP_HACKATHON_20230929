import { Button } from "@chakra-ui/react";
import { FC } from "react";

interface CategoryProps {
  name: string
  selected: boolean
  onPress: () => void
}

export const Category: FC<CategoryProps> = (props) => {
  return (
    <Button
      onClick={props.onPress}
      style={styles.button}
      // 選択されていたら赤くする
      color={props.selected ? 'red' : 'black'}
      fontSize={25}
    >{props.name}</Button>
  )
}

const styles = {
  button: {
    backgroundColor: 'white',
    fontWeight: 'normal',
    borderRadius: '10px',
  }
}