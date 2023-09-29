import type { FC, ReactNode } from 'react';
import { HeaderItemCon } from './HeaderItem/Container/HeaderItemCon';

interface Props {
    title: string
    children: ReactNode
}

export const Layout: FC<Props> = ({ children, title }) => {
  return (
    <>
      <HeaderItemCon title={title} />
      <main>{children}</main>
    </>
  );
};