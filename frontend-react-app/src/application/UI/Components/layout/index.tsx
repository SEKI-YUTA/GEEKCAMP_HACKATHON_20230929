import type { FC, ReactNode } from 'react';
import { HeaderItemCon } from './HeaderItem/Container/HeaderItemCon';

interface Props {
  title: string
  children: ReactNode
  isOwner?: boolean
}

export const Layout: FC<Props> = ({ children, title, isOwner }) => {
  return (
    <>
      <HeaderItemCon title={title} isOwner={isOwner} />
      <main style={{height:'calc(100svh - 143.9px)'}}>{children}</main>
    </>
  );
};