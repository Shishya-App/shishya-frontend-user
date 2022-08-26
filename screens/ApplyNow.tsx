import React, { useContext, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { AppRoutes, StackNavigationProps } from "../constants/AppRoutes";
import CompleteDocs from "../components/completedDocs";
import UncompleteDocs from "../components/uncompleteDocs";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomizedButton from "../components/customizedButton";
import { ScrollView } from "react-native-gesture-handler";
import useAxios from "../hooks/useAxios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import LoadingAPIS from "../components/LoadingApis";
import { AuthContext } from "../store/AuthContext";

const ApplyNow = ({
  navigation,
  route,
}: StackNavigationProps<AppRoutes, "ApplyNow">) => {
  const [index, setIndex] = React.useState(0);
  const [data, setData] = React.useState([]);
  const [completeData, setCompletedData] = React.useState([]);
  const [incompleteData, setIncompleteData] = React.useState([]);
  const {execute} = useAxios();
  const [loading, setLoading] = React.useState(false);
  const [isDone, setIsDone] = React.useState(false);
  const [ques, setQues] = React.useState();
  // const [fetchQues, setFetchQues] = React.useState(true);
  const { form, verifiedDocs} = route.params;
  const [finalUpload, setFinalUpload] = React.useState([]);
  const [uploading, setUploading] = React.useState(false);
  const {user} = useContext(AuthContext);

  console.log("VERIFIED DOCS: ", verifiedDocs);
  useEffect(() => {
    const getQuestions = async () => {
      setLoading(true);
      const res = await execute({
        url: `adminpanel/all-questions/${form?.id}`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${await AsyncStorage.getItem("@token")}`,
        }
      }) 
      
      // console.log("RES: ", res);
      const ques = res?.res;
      // console.log("QUES: ", ques);
      // setQues(res?.res);
      const preVerified = ques?.pre_verified;
      // console.log("PRE: ", preVerified);
      var complete = [];
      var incomplete = [];

      for(let i=0; i<preVerified.length; i++){
        if(verifiedDocs[preVerified[i].title] === true && !complete.includes(preVerified[i])){
          complete.push(preVerified[i]);
        } else {
          if(!incomplete.includes(preVerified[i]) && (!complete.includes(preVerified[i]))){
            incomplete.push(preVerified[i]);
          }
        }
      }


      // iterate through object ques and insert in complete
      for(const[key,value] of Object.entries(ques)){
        if(key != 'pre_verfied'){
            for(let i=0; i<value.length; i++){
                if(!incomplete.includes(value[i]) && !complete.includes(value[i])){
                  incomplete.push(value[i]);
                }
            }
        }
      }

      setCompletedData(complete);
      setIncompleteData(incomplete);
      // console.log("COMPLETE: ",complete);
      // console.log("INCOMPLETE: ", incomplete);
      setLoading(false);
    }
    getQuestions();
  }, [form, verifiedDocs])
  

  // console.log("DATA: ", data);
  console.log("COMPLETED DATA: ", completeData);
  console.log("INCOMPLETE DATA: ", incompleteData);
  
  // now we will filter the questions into two parts questions that are in pre verified and in the verified docs and others in the incomplete data.


  useEffect(() => {
    if (index < completeData.length - 1) {
      const tick = () => setIndex((i) => i + 1);

      const id = setInterval(tick, 2000);
      return () => clearInterval(id);
    }
  }, []);

  console.log("FINAL UPLOAD: ", finalUpload);
  
  const handleSubmitNew = async (fileResponse: any) => {
    if (fileResponse?.type !== "success") return;
    const data = new FormData();

    data.append("answer", {
      // @ts-ignore
      name: fileResponse.name,
      type: "application/pdf",
      uri: fileResponse.uri,
    });
    data.append("form", JSON.stringify(form.id));
    data.append("user", JSON.stringify(user?.id));
    data.append("question", JSON.stringify());
    // data.append("user", "1");

    console.log(data);

    const uploadFile = async () => {
      try {
        console.log("uploading file", fileResponse);
        // const token = await getToken();
        const token = await AsyncStorage.getItem('@token');
        console.log("Bearer", token);
        const response = await execute({
          method: "POST",
          url: "userpanel/submit-file-question/",
          data,
          headers: {
            Authorization: `Bearer ${token}`,
            "content-Type": "multipart/form-data",
          },
        });
        if (response.isErr) throw new Error("Error uploading file");
        // setSuccess(true);
        console.log(response);
      } catch (err) {
        console.log(err);
        // handleError();
      }
    };

    uploadFile();
  };

  const handleSubmit = async () => {
    setUploading(true);
    for(let i=0; i<finalUpload.length; i++){
        handleSubmitNew(finalUpload[i]);
    }
    setUploading(false);
  }

  const handleFakeSubmit = async () => {
    navigation.navigate('Main');
  }
  return (
    !loading || !uploading ?
    <SafeAreaView>
      <ScrollView style={{ padding: 20 }}>
        <View>
          <Text style={{ fontSize: 24, fontWeight: "600" }}>
            Submitting Application..
          </Text>
          <Text
            style={{
              fontSize: 20,
              fontWeight: "400",
              color: "#6C757D",
              marginTop: 8,
            }}
          >
            {form.title}
          </Text>
        </View>
        <View style={{ width: "100%" }}>
          {/* {completeData
            .filter((item, idx) => idx < index)
            .map((item) => (
                <CompleteDocs document={item} />
            ))}
            <Text>
            {index < completeData.length ? (
                <CompleteDocs document={completeData[index]} />
            ) : null} */}
          {/* </Text> */}
          {
            completeData.length > 0 ? 
            <CompleteDocs docArr={completeData} setIsDone={setIsDone}/>
            : null
          }
          {
            isDone || (!isDone && completeData.length === 0) ? 
            <View>
              <Text
                style={{
                  marginVertical: 10,
                  fontSize: 20,
                  fontWeight: "500",
                  marginBottom: 20,
                  color: "grey",
                }}
              >
                Following documents need to be uploaded
              </Text>
              <View>
                  {incompleteData.map((item, index) => (
                    <UncompleteDocs key={index} document={item} setFinalUpload={setFinalUpload} finalUpload={finalUpload} />
                  ))}
              </View>
              <View style={{ marginVertical: 20 }}>
                <CustomizedButton handlePress={handleFakeSubmit} title={"Submit"} />
              </View>
            </View> : null
          }
        </View>
      </ScrollView>
    </SafeAreaView>
    : <LoadingAPIS dialog={!uploading ? "Please wait while we fetch the documents" : "Please wait while we upload the following documents"}/>
  );
};

export default ApplyNow;

const styles = StyleSheet.create({});
