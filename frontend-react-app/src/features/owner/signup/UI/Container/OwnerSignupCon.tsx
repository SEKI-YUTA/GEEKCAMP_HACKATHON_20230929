import type { FC, ChangeEvent, FormEvent } from 'react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { OwnerSignupPre } from '../Presentational/OwnerSignupPre';
import type { CategoryResponce, CategoryType } from '../../../../../application/@types/Category';
import { ExchangeHost } from '../../../../../application/lib/host/exchangeHost';

export const OwnerSignupCon: FC = () => {

  const [ownerEmail, setOwnerEmail] = useState<string>('');
  const [ownerPassword, setOwnerPassword] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [address, setAddress] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [restaurantCategory, setRestaurantCategory] = useState<CategoryType[]>([]);
  const [errorMsgObject, setErrorMsgObject] = useState<{ [key: string]: string }>({});
  const [spaceMsgObject, setSpaceMsgObject] = useState<{ [key: string]: string }>({});
  const [selectedCategoryValue, setSelectedCategoryValue] = useState<string>('1');
  const [errorMsg, setErrorMsg] = useState<number>(0);
  const navigate = useNavigate();

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

  const inputCheck = (input: string, isEmptyCheck?: boolean) => {
    // 半角スペースまたは全角スペースの正規表現を使って、文字列をチェックします
    const regex = /^[\x20\u3000]+$/;

    if (isEmptyCheck) {
      return input == '' || regex.test(input);
    }
    return regex.test(input);
  };

  const handleFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const errors: { [key: string]: string } = {};
    const spaceErrors: { [key: string]: string } = {};

    try {
      let flag = false;

      if (inputCheck(ownerEmail, true)) {
        errors['ownerEmail'] = 'メールアドレスが入力されていません';
        flag = true;

      }
      if (inputCheck(ownerPassword, true)) {
        errors['ownerPassword'] = 'パスワードが入力されていません';
        flag = true;

      }
      if (inputCheck(name, true)) {
        errors['name'] = '名前が入力されていません';
        flag = true;

      }
      if (inputCheck(phoneNumber, false)) {
        spaceErrors['phoneNumber'] = 'スペースが含まれています';
        flag = true;

      }
      if (inputCheck(address, false)) {
        spaceErrors['address'] = 'スペースが含まれています';
        flag = true;

      }
      if (inputCheck(description, false)) {
        spaceErrors['description'] = 'スペースが含まれています';
        flag = true;

      }
      if (flag) {
        setErrorMsgObject(errors);
        setSpaceMsgObject(spaceErrors);
        return;
      }
      const responce = await fetch(`http://${ExchangeHost()}:8080/restaurants/signup`, {
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

      const json = await responce.json();

      console.log(json);

      if (json.message === 'ok') {
        setOwnerEmail('');
        setOwnerPassword('');
        setName('');
        setPhoneNumber('');
        setAddress('');
        setDescription('');
        setSelectedCategoryValue('1');
        navigate('/signin');

      } else {
        // サインインに失敗
        console.log('failed to sign up');
        setErrorMsg(1);
      }

    } catch (error) {
      // 送信に失敗
      console.log(error);
      setErrorMsg(2);
    }
  };

  const fetchRestaurantCategorys = async () => {
    const response = await fetch(`http://${ExchangeHost()}:8080/restaurants/categories`);
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
    restaurantCategory={restaurantCategory}
    errorMsg={errorMsg}
    errorMsgObject={errorMsgObject}
    spaceMsgObject={spaceMsgObject}
    handleOwnerEmailChange={handleOwnerEmailChange}
    handleOwnerPasswordChange={handleOwnerPasswordChange}
    handleNameChange={handleSetNameChange}
    handlePhoneNumberChange={handlePhoneNumberChange}
    handleSetAddress={handleSetAddress}
    handleDescription={handleDescription}
    handleRadioGroupChange={handleRadioGroupChange}
    handleFormSubmit={handleFormSubmit}
  />;
};