import type { FC, ChangeEvent, FormEvent } from 'react';
import { useState, useEffect } from 'react';

import { OwnerSignupPre } from '../Presentational/OwnerSignupPre';
import { CategoryResponce, CategoryType } from '../../../../../application/@types/Category';

export const OwnerSignupCon: FC = () => {

  const [ownerEmail, setOwnerEmail] = useState<string>('');
  const [ownerPassword, setOwnerPassword] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [address, setAddress] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [restaurantCategory, setRestaurantCategory] = useState<CategoryType[]>([]);
  const [selectedCategoryValue, setSelectedCategoryValue] = useState<string>('1');
  const [errorMsg, setErrorMsg] = useState<number>(0);
  const [errorMsgArray, setErrorMsgArray] = useState<string[]>([])

  const handleOwnerEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setOwnerEmail(e.target.value);
  };

  const handleOwnerPasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setOwnerPassword(e.target.value);
  };

  const handleSetNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handlePhoneNumberChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPhoneNumber(e.target.value);
  };

  const handleSetAddress = (e: ChangeEvent<HTMLInputElement>) => {
    setAddress(e.target.value);
  };

  const handleDescription = (e: ChangeEvent<HTMLInputElement>) => {
    setDescription(e.target.value);
  };

  const handleRadioGroupChange = (value: string) => {
    setSelectedCategoryValue(value);
  };

  // const inputCheck = (str: string, isEmptyCheck?: boolean) => {

  //   if (isEmptyCheck) {
  //     return str == '' || str.match(/^[ 　\r\n\t]*$/);
  //   }
  //   return str.match(/^[ 　\r\n\t]*$/);
    
  // };

  const inputCheck = (input: string, isEmptyCheck?: boolean) => {
    // 半角スペースまたは全角スペースの正規表現を使って、文字列をチェックします
    const regex = /^[ 　]+$/;
    if (isEmptyCheck) {
    return input == '' || regex.test(input);
    }
    return regex.test(input);
  };

  // const spaceFilling = (str: string) => {
  //   return str.split(' ').join('').split('　').join('') ==  ''
  // };

  const handleFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const errors: string[] = [];

    try {
      let flag = false;

      if (inputCheck(ownerEmail, true)) {
        setErrorMsg(1);
        errors.push('メールアドレスが入力されていません')
        console.log('メールアドレス');
        flag = true

      } 
      if (inputCheck(ownerPassword, true)) {
        setErrorMsg(2);
        errors.push('パスワードが入力されていません')
        console.log('パスワード');
        flag = true

      } 
      if (inputCheck(name, true)) {
        setErrorMsg(3);
        errors.push('名前が入力されていません')
        console.log('名前');
        flag = true

      } 
      if (inputCheck(phoneNumber)) {
        setErrorMsg(4);
        console.log('電話番号');
        flag = true

      } 
      if (inputCheck(address)) {
        setErrorMsg(5);
        console.log('住所');
        flag = true

      } 
      if (inputCheck(description)) {
        setErrorMsg(6);
        console.log('お店の説明');
        flag = true

      }
      if (flag) {
        setErrorMsgArray(errors);
        return
      }

      const responce = await fetch('http://localhost:8080/restaurants/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          'email': ownerEmail,
          'password': ownerPassword,
          'name': name,
          'phone_number': phoneNumber,
          'address': address,
          'description': description,
          'category_id': parseInt(selectedCategoryValue)
        })
      });
      console.log(responce);

    } catch (error) {
      setErrorMsg(8);
      console.log(error);
    }
  };

  const fetchRestaurantCategorys = async () => {
    const response = await fetch('http://localhost:8080/restaurants/categories');
    const data: CategoryResponce = await response.json();
    setRestaurantCategory(data.categories);
    setSelectedCategoryValue(data.categories[0].id.toString());
    console.log(data);
  };

  useEffect(() => {
    fetchRestaurantCategorys();
  }, []);

  return <OwnerSignupPre
    ownerEmail={ownerEmail}
    ownerPassword={ownerPassword}
    name={name}
    phoneNumber={phoneNumber}
    address={address}
    description={description}
    selectedCategoryValue={selectedCategoryValue}
    handleOwnerEmailChange={handleOwnerEmailChange}
    handleOwnerPasswordChange={handleOwnerPasswordChange}
    handleNameChange={handleSetNameChange}
    handlePhoneNumberChange={handlePhoneNumberChange}
    handleSetAddress={handleSetAddress}
    handleDescription={handleDescription}
    handleRadioGroupChange={handleRadioGroupChange}
    handleFormSubmit={handleFormSubmit}
    restaurantCategory={restaurantCategory}
    errorMsg={errorMsg}
    errorMsgArray={errorMsgArray  }
  />;

};