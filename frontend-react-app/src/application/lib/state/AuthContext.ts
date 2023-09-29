import { createContext, useState } from 'react';

export interface StateContextType {
    restaurantId: number | undefined
    onLogin: (restaurantId: number) => void
    onLogout: () => void
}
const defaultContext:StateContextType = {
  restaurantId: Number(sessionStorage.getItem('restaurantId')) || undefined,
  onLogin: () => {},
  onLogout: () => {}
};

export const StateContext = createContext<StateContextType>(defaultContext);

export const useStateContext = () => {
  const [restaurantId, setRestaurantId] = useState<StateContextType['restaurantId']>(Number(sessionStorage.getItem('restaurantId')) || undefined);
  const onLogin:StateContextType['onLogin'] = (restaurantId) => {
    setRestaurantId(restaurantId);
    sessionStorage.setItem('restaurantId', restaurantId.toString());
  };
  const onLogout:StateContextType['onLogout'] = () => {
    setRestaurantId(undefined);
    sessionStorage.removeItem('restaurantId');
  };
  const contextValue:StateContextType = {
    restaurantId,
    onLogin,
    onLogout
  };
  return contextValue;
};