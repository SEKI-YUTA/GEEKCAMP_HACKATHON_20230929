import type { ChangeEvent, FormEvent, MouseEvent } from 'react';
import { useContext, type FC, useState, useEffect, useRef } from 'react';
import { HeaderItemPre } from '../Presentational/HeaderItemPre';
import { StateContext } from '../../../../../lib/state/AuthContext';
import { useDisclosure, useToast } from '@chakra-ui/react';
import type { RestaurantType } from '../../../../../@types/Restaurant';
import type { CategoryResponce, CategoryType } from '../../../../../@types/Category';

interface HeaderItemConProps {
  title: string
  isOwner?: boolean
}
export const HeaderItemCon: FC<HeaderItemConProps> = ({ title, isOwner }) => {
  const { restaurantId, onLogout } = useContext(StateContext);
  const { isOpen: isProfileViewModal, onOpen: profileViewModalOnOpen, onClose: profileViewModalOnClose } = useDisclosure();
  const { isOpen: isQRViewModal, onOpen: QRViewModalOnOpen_, onClose: QRViewModalOnClose } = useDisclosure();
  const [address, setAddress] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [restaurantCategory, setRestaurantCategory] = useState<CategoryType[]>([]);
  const [selectedCategoryValue, setSelectedCategoryValue] = useState<string>('1');
  const urlInputRef = useRef<HTMLInputElement>(null);
  const url = `http://${window.location.hostname}:${window.location.port}/restaurant/${restaurantId}`;

  const toast = useToast();

  const addToast = () => {
    toast({
      description: '更新しました。',
      status: 'success',
      isClosable: true
    });
  };

  const clipMsgToast = () => {
    toast({
      description: 'コピーされました。',
      status: 'info',
      isClosable: true
    });
  };

  const handleAddressChange = (e: ChangeEvent<HTMLInputElement>) => {
    setAddress(e.target.value);
  };
  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };
  const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };
  const handlePhoneNumberChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPhoneNumber(e.target.value);
  };
  const handleDescription = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(e.target.value);
  };
  const handleRadioGroupChange = (value: string) => {
    setSelectedCategoryValue(value);
  };
  const handleLogout = (e: MouseEvent) => {
    e.preventDefault();
    onLogout();
  };
  const handleProfileShow = async (e: MouseEvent) => {
    e.preventDefault();
    profileViewModalOnOpen();
    await fetchRestaurantProfile();
  };
  const handleProfileHide = () => {
    profileViewModalOnClose();
  };
  const QRViewModalOnOpen = (e: MouseEvent) => {
    e.preventDefault();
    QRViewModalOnOpen_();
  };
  /**
   * リンクのコピー
   */
  const onURLCopy = async () => {
    if (navigator.clipboard) {
      await navigator.clipboard.writeText(url);
      clipMsgToast();
    } 
    urlInputRef?.current?.select();
  };
  const handleProfileUpdate = async (e:FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const responce = await fetch('http://localhost:8080/restaurants/edit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          id: restaurantId,
          email: email,
          name: name,
          phone_number: phoneNumber,
          address: address,
          description: description,
          category_id: parseInt(selectedCategoryValue)
        })
      });
      console.log(responce.ok);
      if (responce.ok) {
        addToast();
      }
      
    } catch (error) {
      console.log(error);
    }
  };
  /**
   * QRコードの保存
   */
  const saveQR = () => {
    const QRCanvas = document.getElementById('qr-canvas') as HTMLCanvasElement;
    QRCanvas?.toBlob(blob => {
      if (blob) {
        const a:HTMLAnchorElement = document.createElement('a');
        a.href = URL.createObjectURL(blob);
        a.download = `${name}_QRCode.jpg`;
        a.click();
        URL.revokeObjectURL(a.href);
      }
    });
  };
  const fetchRestaurantProfile = async () => {
    try {
      const responce = await fetch(`http://localhost:8080/restaurants/${restaurantId}`);
      const data:RestaurantType = await responce.json();
      console.log(data);
      
      setAddress(data.address);
      setDescription(data.description);
      setEmail(data.email);
      setName(data.name);
      setPhoneNumber(data.phone_number);
      setSelectedCategoryValue((restaurantCategory.find(item => item.name === data.category)?.id ?? 0).toString());
    } catch (error) {
      console.log(error);
    }
  };
  const fetchRestaurantCategorys = async () => {
    try {
      const response = await fetch('http://localhost:8080/restaurants/categories');
      const data: CategoryResponce = await response.json();
      setRestaurantCategory(data.categories);
      setSelectedCategoryValue(data.categories[0].id.toString());
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(()=>{
    fetchRestaurantProfile();
    fetchRestaurantCategorys();
  }, [restaurantId]);
  return <HeaderItemPre
    {...{
      title,
      isOwner,
      isProfileViewModal,
      handleLogout,
      handleProfileShow,
      handleProfileHide,
      address,
      selectedCategoryValue,
      restaurantCategory,
      description,
      email,
      name,
      phoneNumber,
      isQRViewModal,
      url,
      urlInputRef,
      handleProfileUpdate,
      handleAddressChange,
      handleEmailChange,
      handleNameChange,
      handlePhoneNumberChange,
      handleDescription,
      handleRadioGroupChange,
      QRViewModalOnOpen,
      QRViewModalOnClose,
      onURLCopy,
      saveQR,
    }}
  />;
};