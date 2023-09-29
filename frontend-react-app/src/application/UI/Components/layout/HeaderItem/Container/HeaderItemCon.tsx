import { useContext, type FC, MouseEvent } from 'react';
import { HeaderItemPre } from '../Presentational/HeaderItemPre';
import { StateContext } from '../../../../../lib/state/AuthContext';

interface HeaderItemConProps {
  title: string
}
export const HeaderItemCon: FC<HeaderItemConProps> = ({ title }) => {
  const { onLogout } = useContext(StateContext);
  const handleLogout = (e: MouseEvent) => {
    e.preventDefault();
    onLogout();
  }
  return <HeaderItemPre title={title} handleLogout={handleLogout}/>;
};