import { Box, Button } from '@chakra-ui/react';
import type { FC } from 'react';

interface CategoryProps {
  name: string
  selectedCategory: string
  isLargerThan1200: boolean
  onClick: () => void
}

export const Category: FC<CategoryProps> = ({name, selectedCategory, isLargerThan1200, onClick}) => {
  return (
    <Box>
      <Button
        {...(isLargerThan1200 && {
          fontSize:30
        })}
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