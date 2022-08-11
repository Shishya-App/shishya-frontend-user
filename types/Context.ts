import { IUser } from "./User";


export interface IAuthContext {
  isLoggedIn: boolean;
  user: IUser | null;
  login: (user: IUser) => Promise<void>;
  loginAPI: (username: string, password: string) => Promise<any> ;
  signupAPI: (username: string, password: string, email: string) => Promise<any>;
}