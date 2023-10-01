import { Button } from "@chakra-ui/react";
import { FC } from "react";

interface CategoryProps {
  name: string
  selected: boolean
  onPress: () => void
}

export const Category: FC<CategoryProps> = (props) => {
  return (
    // 選択されていたら赤くする
    <Button onClick={props.onPress}
      style={props.selected ? { ...styles.button, ...styles.selected } : styles.button}
    >{props.name}</Button>
  )
}

const styles = {
  selected: {
    color: 'red'
  },
  button: {
    backgroundColor: 'white',
    color: 'black',
    fontWeight: 'normal',
    borderRadius: '10px',
  }
}