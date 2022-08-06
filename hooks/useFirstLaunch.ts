import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const useFirstLaunch = () => {
  const [isFirstLaunch, setIsFirstLaunch] = useState<null | boolean>(null);

  useEffect(() => {
    const getInitialState = async () => {
      // await AsyncStorage.removeItem("@launched");
      const value = await AsyncStorage.getItem("@launched");
      if (value === null) {
        await AsyncStorage.setItem("@launched", "true");
        setIsFirstLaunch(true);
      } else setIsFirstLaunch(false);
    };
    getInitialState();
  }, []);

  return isFirstLaunch;
};

export default useFirstLaunch;