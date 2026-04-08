export interface IUserData {
  _id: string;
  name: string;
  email: string;
  phone: string;
  roles: string[];
  profileImage: string | null;
  isEmailVerified: boolean;
  isPhoneVerified: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface IRegisterResponse {
  success: boolean;
  message: string;
  data: {
    user: IUserData;
    accessToken: string;
  };
}

export type TAuthModel = {
  IRegisterReq: {
    name: string;
    email: string;
    phone: string;
    password: string;
  };
  IRegisterResponse: IRegisterResponse;
  IUserData: IUserData;
  ILoginReq: any;
  ILoginResponse: any;
  IForgotPassReq: any;
  IResetPassReq: any;
  IResetPassResponse: any;
};

export type TAuthSchema = TAuthModel;