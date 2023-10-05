export interface RestaurantType {
  id: number;
  email: string;
  password: string;
  name: string;
  address: string;
  description: string;
  // category id
  category: number; 
  phone_number: string;
}