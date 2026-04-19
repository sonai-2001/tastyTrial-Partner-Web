import { UserRole } from "@/types/apps/userTypes";
import { TCommonSchema } from "@/types/common/common.schema";

export interface IUserData {
 name: string;
  email: string;
  phone: string;
  password?: string;
  roles: UserRole[];
  profileImage?: string | null;
  isEmailVerified: boolean;
  isPhoneVerified: boolean;
  lastLoginAt?: Date;
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
    otp: string;
  };
  ISendOtpReq: {
    email: string;
  };
  IRegisterResponse: IRegisterResponse;
  IUserData: IUserData;
  ILoginReq: {
    email:string,
    password:string
  };
  ILoginResponse: TCommonSchema['BaseApiResponse'] & {
    data:{
      user:IUserData,
      accessToken:string,
    restaurants: {
       _id: string;
       name: string;
  }[];
    restaurantCount:number
}

    
  }
  IForgotPassReq: any;
  IResetPassReq: any;
  IResetPassResponse: any;
};

export type TAuthSchema = TAuthModel;