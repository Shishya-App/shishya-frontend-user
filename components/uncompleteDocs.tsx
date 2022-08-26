import React from "react";
import {View, Text, Pressable, StyleSheet} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import * as DocumentPicker from "expo-document-picker";
import { Entypo } from "@expo/vector-icons"; 

interface IProps {
    document: any,
    setFinalUpload: React.Dispatch<React.SetStateAction<any[]>>,
    finalUpload: any
}


const UncompleteDocs = ({document, setFinalUpload, finalUpload}: IProps) => {
    const [fileResponse, setFileResponse] =
    React.useState<null | DocumentPicker.DocumentResult>(null);
  const [error, setError] = React.useState<boolean>(false);

  const handleError = () => {
    setFileResponse(null);
    setError(true);
  };

  const handleDocumentUpload = React.useCallback(async () => {
    try {
      const response = await DocumentPicker.getDocumentAsync({
        type: "application/pdf",
      });
      setError(false);
      if (response.type === "success") {
        setFileResponse(response);
        // setIncompleteData([...incompleteData, response]);
        console.log("DOCUMENT: ", document);

        setFinalUpload((prev) => [...prev, {fileRes: response, quesID: document.id}]);
      }
      else if (response.type === "cancel") setFileResponse(null);
      else throw new Error("Something went wrong");
    } catch (err) {
      console.log(err);
      handleError();
    }
  }, []);

  
    return (
        <View style={{marginBottom: 15}}>
            <View style={{display:'flex', flexDirection:'row'}}>
                <View style={{display:'flex', flexDirection:'row', alignItems: 'center', marginRight: 20}}>
                    <FontAwesome name="exclamation-triangle" color={"red"} size={20}/>
                    <Text style={{fontSize: 20, fontWeight: '400', marginLeft: 10}}>{document.title}</Text>
                </View>
                <View style={{marginVertical: 5}}>
                    <View
                    style={{
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        borderWidth: 1,
                        padding: 2,
                        borderRadius: 10,
                        borderColor: 'lightgrey',
                    }}
                    >
                    <Pressable style={styles.button} onPress={handleDocumentUpload}>
                        <Entypo name="upload" size={24} color="#2F4FCD" />
                    </Pressable>
                    {error && (
                        <Text style={[styles.subText, styles.error]}>
                        Error while uploading file please try again!
                        </Text>
                    )}
                    </View>
                    {fileResponse && fileResponse?.type === "success" && (
                        <>
                        <Text
                            style={styles.subText}
                        >{`Selected File: ${fileResponse.name.slice(0,10)}...`}</Text>
                        </>
                    )}
                </View>
            </View>
        </View>
    )
}

export default UncompleteDocs;

const styles = StyleSheet.create({
    
    button: {
      justifyContent: "center",
      alignItems: "center",
      marginVertical: "2%",
    },
    text: {
      fontSize: 20,
      color: "black",
      paddingTop: 10,
    },
    subText: {
      fontSize: 16,
      color: "black",
      paddingTop: 5,
    },
    error: {
      color: "#FF0000",
    },
  });
  