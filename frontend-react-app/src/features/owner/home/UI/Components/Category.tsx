import { Box, Button } from '@chakra-ui/react';
import type { FC } from 'react';

interface CategoryProps {
  name: string
  selectedCategory: string
  onClick: () => void
}

export const Category: FC<CategoryProps> = ({name, selectedCategory, onClick}) => {
  return (
    <Box>
      <Button
        fontSize={30}
        backgroundColor='white'
        fontWeight='normal'
        borderRadius='10px'
        // 選択されていたら赤くする
        color={name === selectedCategory ? 'red' : 'black'}
        onClick={onClick}
      >{name}</Button>
    </Box>
  );
};