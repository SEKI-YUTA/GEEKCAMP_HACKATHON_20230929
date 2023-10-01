import { Button } from '@chakra-ui/react';
import type { FC } from 'react';

interface CategoryProps {
  name: string
  selected: boolean
  onPress: () => void
}

export const Category: FC<CategoryProps> = (props) => {
  return (
    <Button
      fontSize={25}
      onClick={props.onPress}
      style={styles.button}
      // 選択されていたら赤くする
      color={props.selected ? 'red' : 'black'}
    >{props.name}</Button>
  );
};

const styles = {
  button: {
    backgroundColor: 'white',
    fontWeight: 'normal',
    borderRadius: '10px',
  }
};