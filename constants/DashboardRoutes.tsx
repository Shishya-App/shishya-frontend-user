import { ParamListBase, RouteProp } from "@react-navigation/native";
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";

export interface BottomTabNavigationProps<
  Paramlist extends ParamListBase,
  RouteName extends keyof Paramlist = string
> {
  navigation: BottomTabNavigationProp<Paramlist, RouteName>;
  route: RouteProp<Paramlist, RouteName>;
}

export type DashboardRoutes = {
  Dashboard: undefined;
  "My Documents": undefined;
  "Upload Documents": undefined;
  Profile: undefined;
  Apply: undefined;
};
