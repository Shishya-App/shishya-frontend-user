import React, { useState, createContext, useMemo } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { IAuthContext } from "../types/Context";
import { IUser } from "../types/User";
import useAxios from "../hooks/useAxios";
import { verifyProps } from "../types/verifyProps";
export const AuthContext = createContext<IAuthContext>({
  isLoggedIn: false,
  user: null,
  login: async () => {},
  loginAPI: async (username: string, password: string) => {},
  signupAPI: async (
    username: string,
    password: string,
    email: string,
    firstName: string,
    lastName: string,
    adhaarNo: string
  ) => {},
  logout: async () => {},
  verifyOTP: async (id: number, otp: string) => {},
  getCurrUser: async () => {},
  // getVerifiedDocs: async () => {},
  // verifiedDocs: verifyProps[],
  token: null,
});

interface Props {
  children: JSX.Element;
}


const AuthContextProvider = ({ children }: Props) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [user, setUser] = useState<IUser | null>(null);
  const [token, setToken] = useState<string | null>(null);
  // const [verfiedDocs, setVerifiedDocs] = useState<verifyProps[]>([]);
  const { execute } = useAxios();

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
    if (!res.isErr) {
      await AsyncStorage.setItem("@token", res.res.tokens.access);
      setToken(res?.res?.tokens?.access);

      const currUserRes = await getCurrUser();

      if (currUserRes?.isErr === false) {
        return {
          isErr: false,
          res: res.res,
        };
      }
    } else {
      return {
        isErr: true,
        res: res.res,
      };
    }
  };

  const signupAPI = async (
    username: string,
    password: string,
    email: string,
    firstName: string,
    lastName: string,
    adhaarNo: string
  ) => {
    const data = {
      username: username,
      email: email,
      password: password,
      first_name: firstName,
      last_name: lastName,
      adhaar_no: adhaarNo,
    };

    console.log("DATA: ", data);
    const res = await execute({
      method: "POST",
      url: `register/`,
      data: data,
    });

    if (!res.isErr) {
      return {
        isErr: false,
        res: res.res,
      };
    } else {
      return {
        isErr: true,
        res: res.res,
      };
    }
  };

  const verifyOTP = async (id: number, otp: string) => {
    const data = {
      id: id,
      OTP: otp,
    };

    console.log("DATA: ", data);
    const res = await execute({
      method: "POST",
      url: `verify-otp/`,
      data: data,
    });
    if (!res.isErr) {
      return {
        isErr: false,
        res: res.res,
      };
    } else {
      return {
        isErr: true,
        res: res.res,
      };
    }
  };

  const getCurrUser = async () => {
    const tokenn = await AsyncStorage.getItem("@token");
    const res = await execute({
      method: "GET",
      url: `adminpanel/personal-details/`,
      headers: {
        Authorization: `Bearer ${tokenn}`,
      },
    });
    if (!res.isErr) {
      console.log("RES: ", res?.res?.personal_details[0]);
      setUser(res?.res?.personal_details[0]);
      await AsyncStorage.setItem(
        "@user",
        JSON.stringify(res?.res?.personal_details[0])
      );
      return {
        isErr: false,
        res: res.res,
      };
    } else {
      console.log("ERR: ", res);

      return {
        isErr: true,
        res: res.res,
      };
    }
  };

  const logout = async () => {
    await AsyncStorage.removeItem("@token");
    setToken(null);
    setIsLoggedIn(false);
  };
  

  const value = useMemo(
    () => ({
      isLoggedIn,
      user,
      login,
      loginAPI,
      signupAPI,
      getCurrUser,
      token,
      logout,
      verifyOTP,
      // getVerifiedDocs,
      // verfiedDocs
    }),
    [user, isLoggedIn]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContextProvider;
