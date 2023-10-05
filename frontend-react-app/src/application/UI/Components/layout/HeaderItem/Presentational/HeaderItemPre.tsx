import type { FC, MouseEvent } from 'react';
import { headerIconText, headerStyle } from './HeaderItemPre.css';
import { Flex, Heading, Link, } from '@chakra-ui/react';

interface HeaderItemPreProps {
  title: string
  handleLogout: (e: MouseEvent) => void
  isOwner?: boolean
}
export const HeaderItemPre: FC<HeaderItemPreProps> = ({ title, handleLogout, isOwner }) => {
  return (
    <Flex as='header' css={headerStyle}>
      <Heading css={headerIconText} {...(isOwner && {as:"a", href:"/"})}>{title}</Heading>
      <Flex flex={1} justify='end' gap={4}>
        {
          isOwner &&
          // レストラン側の場合のみ表示
          <> 
            <Link href='/' color="white">店舗情報</Link> 
            {/* 後でボタンにする↓ */}
            <Link href='/signin' color="white" onClick={handleLogout}>ログアウト</Link>
          </>
        }
      </Flex>
    </Flex>
  );
};