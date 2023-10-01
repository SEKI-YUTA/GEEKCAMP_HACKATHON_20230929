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
  const [errorMsg,setErrorMsg]=useState<string>('');
  const {onLogin}=useContext(StateContext)
  const handleOwnerEmailChange=(e:ChangeEvent<HTMLInputElement>)=>{
    setOwnerEmail(e.target.value);
  };
  const handleOwnerPasswordChange=(e:ChangeEvent<HTMLInputElement>)=>{
    setOwnerPassword(e.target.value);
  };
  
{/*
    const msgStyle = {
      fontSize: "18px",
      fontWeight: "bold",
      padding: "10px",
      color: "red",
      backgroundColor: "pink"
    };
  };
*/}
  const handleFormSubmit=async(e:FormEvent<HTMLFormElement>)=>{
    e.preventDefault();
    try {
      if(ownerEmail === '' || ownerPassword === '' ){
        // 空だった場合
        setErrorMsg("メールアドレスかパスワードが空になっています。")
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
      if(json.message==="ok"){
        setOwnerEmail("");
        setOwnerPassword("");
        onLogin(json.restaurant_id)
      }
      else{
        console.log("failed to sign in")
        setErrorMsg("メールアドレスかパスワードが間違っています")
        // サインインに失敗
      }
    } catch (error) {
      console.log(error);
      setErrorMsg("送信に失敗し増した、もう一度やり直してください。")
      //　送信に失敗
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