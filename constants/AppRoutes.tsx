import { ParamListBase, RouteProp } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { DocumentData } from "../types/Document";
import { JobData } from "../types/Job";
import { FormData } from "../types/Form";
import { verifyProps } from "../types/verifyProps";
export interface StackNavigationProps<
  Paramlist extends ParamListBase,
  RouteName extends keyof Paramlist = string
> {
  navigation: NativeStackNavigationProp<Paramlist, RouteName>;
  route: RouteProp<Paramlist, RouteName>;
}

export type AppRoutes = {
  Authentication: undefined;
  Main: undefined;
  "Single Document": { document: DocumentData };
  Jobs: { type: "Job" | "Fellowship" };
  "Single Job": { job: JobData };
  ApplyNow: { form: FormData, verifiedDocs: verifyProps };
};
