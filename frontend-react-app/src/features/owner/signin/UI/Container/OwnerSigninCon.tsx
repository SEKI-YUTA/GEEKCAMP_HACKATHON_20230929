import { OwnerSigninPre } from '../Presentational/OwnerSigninPre';
import type { ChangeEvent, FormEvent } from 'react';
import { useState, type FC, useContext } from 'react';
import { StateContext } from '../../../../../application/lib/state/AuthContext';

/**
 * ホーム画面のコンポーネント（Container）
 * ここにコンポーネントのロジックを書いて、OwnerSigninPreに渡す
 * @returns 
 */
export const OwnerSigninCon: FC = () => {
  const [ownerEmail,setOwnerEmail]=useState<string>('');
  const [ownerPassword,setOwnerPassword]=useState<string>('');
  const [errorMsg,setErrorMsg]=useState<number>(0);
  const {onLogin}=useContext(StateContext);
  const handleOwnerEmailChange=(e:ChangeEvent<HTMLInputElement>)=>{
    setOwnerEmail(e.target.value);
  };
  const handleOwnerPasswordChange=(e:ChangeEvent<HTMLInputElement>)=>{
    setOwnerPassword(e.target.value);
  };

  const handleFormSubmit=async(e:FormEvent<HTMLFormElement>)=>{
    e.preventDefault();
    try {
      if(ownerEmail === '' || ownerPassword === '' ){
        // 空だった場合
        setErrorMsg(1);
        return;
      }
      console.log(ownerEmail);
      const response = await fetch('http://localhost:8080/restaurants/login',{
        method:'POST',
        headers:{
          'Content-Type': 'application/json'
        },
        body:JSON.stringify({
          'email':ownerEmail,
          'password':ownerPassword
        })
      });
      console.log(response);
      const json = await response.json();
      console.log(json);
      if(json.message==='ok'){
        setOwnerEmail('');
        setOwnerPassword('');
        onLogin(json.restaurant_id);
      }
      else{
        // サインインに失敗
        console.log('failed to sign in');
        setErrorMsg(2);
      }
    } catch (error) {
      // 送信に失敗
      console.log(error);
      setErrorMsg(3);
    }
  };

  return <OwnerSigninPre
    ownerEmail={ownerEmail}
    ownerPassword={ownerPassword}
    handleOwnerEmailChange={handleOwnerEmailChange}
    handleFormSubmit={handleFormSubmit}
    handleOwnerPasswordChange={handleOwnerPasswordChange}
    errorMsg={errorMsg}
  />;
};