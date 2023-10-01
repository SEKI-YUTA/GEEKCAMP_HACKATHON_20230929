import { Button } from '@chakra-ui/react';
import type { FC } from 'react';

interface CategoryProps {
  name: string
  selected: boolean
  onPress: () => void
}

export const Category: FC<CategoryProps> = ({name, selected, onPress}) => {
  return (
    <Button
      fontSize={25}
      style={styles.button}
      // 選択されていたら赤くする
      color={selected ? 'red' : 'black'}
      onClick={onPress}
    >{name}</Button>
  );
};

const styles = {
  button: {
    backgroundColor: 'white',
    fontWeight: 'normal',
    borderRadius: '10px',
  }
};