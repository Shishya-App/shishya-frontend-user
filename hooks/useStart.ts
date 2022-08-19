import {useState, useEffect} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { IUser } from "../types/User";

const useStart = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState<IUser | null>(null);

    useEffect(() => {
        const getInitialState = async () => {
            const user = await AsyncStorage.getItem("@token");
            if(!user){
                setIsLoggedIn(false);
            }
            else {
                setIsLoggedIn(true);
                setUser(JSON.parse(JSON.stringify(user)));
            }
        }
        getInitialState();
    }, [])

    return {isLoggedIn, user};
}

export default useStart;