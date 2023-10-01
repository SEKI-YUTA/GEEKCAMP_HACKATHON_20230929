import { Button, ChakraProvider } from '@chakra-ui/react';
import type { FC } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { StateContext, useStateContext } from '../lib/state/AuthContext';
import { OwnerHomeCon } from '../../features/owner/home/UI/Container/OwnerHomeCon';

import { OwnerSignupCon } from '../../features/owner/signup/UI/Container/OwnerSignupCon';

/**
 * プロバイダーやルーターをラップしてるやつ
 * @returns 
 */
export const AppProviders: FC = () => {
  const ctx = useStateContext();

  return <ChakraProvider>
    <StateContext.Provider value={ctx}>
      <BrowserRouter>
        <Routes>
          {/* `/`または`/owner`の時はrestaurantIdでログイン済みかどうかを確認して、ホームかログイン画面に遷移させるようにする */}
          <Route path="/" element={ctx.restaurantId ? <Navigate to='/owner' /> : <Navigate to='/signin' />} />
          {/* owner（↓後で書き換え） */}
          <Route path="/owner" element={ctx.restaurantId ? <OwnerHomeCon/> : <Navigate to='/signin' />} />
          {/* restaurant（↓後で書き換え） */}
          <Route path="/restaurant" element={<>客側画面</>} />
          <Route path="/signin" element={ctx.restaurantId ? <Navigate to='/owner' /> : <>
          ログイン画面
            <Button onClick={() => ctx.onLogin(1)}>ログイン</Button>
          </>} />
          <Route path="/signup" element={ctx.restaurantId ? <Navigate to='/owner' /> : <OwnerSignupCon />} />
          <Route
            path="*"
            element={<>404 Not Found</>}
          />
        </Routes>
      </BrowserRouter>
    </StateContext.Provider>
  </ChakraProvider>;
};