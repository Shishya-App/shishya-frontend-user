import { ParamListBase, RouteProp } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

export interface StackNavigationProps<
  Paramlist extends ParamListBase,
  RouteName extends keyof Paramlist = string
> {
  navigation: NativeStackNavigationProp<Paramlist, RouteName>;
  route: RouteProp<Paramlist, RouteName>;
}

export type AuthenticationRoutes = {
    Initial: undefined;
    Onboard: undefined;
    Login: undefined;
    Signup: undefined;
    VerifyOTP: undefined;
    // Dashboard: undefined;
};