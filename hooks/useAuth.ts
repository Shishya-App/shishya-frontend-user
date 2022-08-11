import { useContext } from "react";
import { AuthContext } from "../store/AuthContext";
import { IAuthContext } from "../types/Context";

const useAuth = () => {
  return useContext<IAuthContext>(AuthContext);
};

export default useAuth;