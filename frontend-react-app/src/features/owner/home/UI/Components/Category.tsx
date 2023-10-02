import { Box, Button } from '@chakra-ui/react';
import type { FC } from 'react';
import type { CategoryType } from '../../../../../application/@types/Category';

interface CategoryProps {
  category: CategoryType
  isSelected: boolean
  onClick: () => void
}

export const Category: FC<CategoryProps> = ({ category, isSelected, onClick }) => {
  return (
    <Box>
      <Button
        fontSize={30}
        backgroundColor='white'
        fontWeight='normal'
        borderRadius='10px'
        // 選択されていたら赤くする
        color={isSelected ? 'red' : 'black'}
        onClick={onClick}
      >{category.name}</Button>
    </Box>
  );
};