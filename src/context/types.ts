import { TAuthModel } from '@/api/hooks/auth/schema';
import { StringValidation } from 'zod';

export type ErrCallbackType = (err: { [key: string]: string }) => void;
export type SuccessCallbackType = (success: { [key: string]: string | boolean }) => void;

export type LoginParams = {
  email: string;
  password: string;
  rememberMe?: boolean;
};

export type activeRestaurantType = {
  _id: string;
  name:string
}

export type AuthValuesType = {
  isLoading: boolean;
  logout: () => void;
  user: TAuthModel['IUserData'] | null;
  setUser: (value: TAuthModel['IUserData'] | null) => void;
  setHasToken: (token: string) => void;
  activeRestaurant : activeRestaurantType | null
  setActiveRestaurant : (value: activeRestaurantType | null) => void
};
