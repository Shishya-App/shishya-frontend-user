import React, { useState, createContext, useMemo } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { IAuthContext } from "../types/Context";
import { IUser } from "../types/User";
import useAxios from "../hooks/useAxios";

export const AuthContext = createContext<IAuthContext>({
    isLoggedIn: false,
    user: null,
    login: async () => {},
    loginAPI:  async (username: string, password: string) => {},
    signupAPI: async (username: string, password: string, email: string) => {},
    logout: async () => {},
    token: null,
  });
  
  interface Props {
    children: JSX.Element;
  }

  const AuthContextProvider = ({ children }: Props) => {
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
    const [user, setUser] = useState<IUser | null>(null);
    const [token, setToken] = useState<string | null>(null);
  
    const {execute}  = useAxios();

    const login = async () => {
      setIsLoggedIn(true);
    };
    
    const loginAPI = async (username: string, password: string) => {
      const data = {
        username: username,
        password: password,
      };
        const res = await execute({
          method: "POST",
          url: `login/`,
          data: data,
        });
        if(!res.isErr){
          await AsyncStorage.setItem("@token", res.res.tokens.access);
          setToken(res?.res?.tokens?.access);
          return {
            isErr: false,
            res: res.res,
          }
        } else{
          return {
            isErr: true,
            res: res.res,
          }
        }
    }

    const signupAPI = async (username: string, password: string, email: string) => {
      const data = {
        username: username,
        email: email,
        password: password,
      };
        const res = await execute({
          method: "POST",
          url: `register/`,
          data: data,
        });
  
        if(!res.isErr){
          return {
            isErr: false,
            res: res.res,
          }
        } else {
          return {
            isErr: true,
            res: res.res,
          }
        }
    }

    const getCurrUser = () => {

    }
    
    const logout = async () => {
      await AsyncStorage.removeItem("@token");
      setToken(null);
      setIsLoggedIn(false);
    } 
    const value = useMemo(
      () => ({
        isLoggedIn,
        user,
        login,
        loginAPI,
        signupAPI,
        getCurrUser,
        token,
        logout
      }),
      [user, isLoggedIn]
    );
  
    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
  };
  
  export default AuthContextProvider;