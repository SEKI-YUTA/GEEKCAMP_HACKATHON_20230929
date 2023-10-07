import type { FC, ChangeEvent, FormEvent } from 'react';
import { useState, useEffect } from 'react';

import { OwnerSignupPre } from '../Presentational/OwnerSignupPre';
import type { CategoryResponce, CategoryType } from '../../../../../application/@types/Category';

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

  const handleFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (ownerEmail === '' || ownerEmail.split(' ').join('').split('　').join('') === '') {
        setErrorMsg(1);

      } else if (ownerPassword === '' || ownerPassword.split(' ').join('').split('　').join('') === '') {
        setErrorMsg(2);

      } else if (name === '' || name.split(' ').join('').split('　').join('') === '') {
        setErrorMsg(3);

      } else if (phoneNumber.split(' ').join('').split('　').join('') === '') {
        setErrorMsg(4);

      } else if (address.split(' ').join('').split('　').join('') === '') {
        setErrorMsg(5);

      } else if (description.split(' ').join('').split('　').join('') === '') {
        setErrorMsg(6);

      } else if (selectedCategoryValue === '') {
        setErrorMsg(7);

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
  />;

};