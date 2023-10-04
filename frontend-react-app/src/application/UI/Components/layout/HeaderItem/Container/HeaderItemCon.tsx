import type { MouseEvent } from 'react';
import { useContext, type FC } from 'react';
import { HeaderItemPre } from '../Presentational/HeaderItemPre';
import { StateContext } from '../../../../../lib/state/AuthContext';

interface HeaderItemConProps {
  title: string
  isOwner: boolean
}
export const HeaderItemCon: FC<HeaderItemConProps> = ({ title, isOwner }) => {
  const { onLogout } = useContext(StateContext);
  const handleLogout = (e: MouseEvent) => {
    e.preventDefault();
    onLogout();
  };
  return <HeaderItemPre title={title} handleLogout={handleLogout} isOwner={isOwner} />;
};