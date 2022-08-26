import { OTPData } from "./OTP";
import { IUser } from "./User";


export interface IAuthContext {
  isLoggedIn: boolean;
  user: IUser | null;
  login: (user: IUser) => Promise<void>;
  loginAPI: (username: string, password: string) => Promise<any> ;
  signupAPI: (username: string, password: string, email: string, firstName: string, lastName: string, adhaarNo: string) => Promise<any>;
  token: string | null;
  logout: () => Promise<void>;
  verifyOTP:  (id: number, otp: string) => Promise<any>,
  getCurrUser: () => Promise<any>,
}