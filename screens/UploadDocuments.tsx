import { Entypo } from "@expo/vector-icons";
import React, { useEffect, useRef } from "react";
import {
  Animated,
  Dimensions,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import * as DocumentPicker from "expo-document-picker";
import PdfPreview from "../components/PdfPreview";
import CustomizedButton from "../components/customizedButton";
import useAxios from "../hooks/useAxios";
import { getToken } from "../services/getToken";

interface ModalProps {
  visible: boolean;
  onClose: () => void;
}

const UploadDocuments = ({ visible, onClose }: ModalProps) => {
  const [fileResponse, setFileResponse] =
    React.useState<null | DocumentPicker.DocumentResult>(null);
  const [error, setError] = React.useState<boolean>(false);
  const [success, setSuccess] = React.useState<boolean>(false);
  const { execute } = useAxios();

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
      if (response.type === "success") setFileResponse(response);
      else if (response.type === "cancel") setFileResponse(null);
      else throw new Error("Something went wrong");
    } catch (err) {
      console.log(err);
      handleError();
    }
  }, []);

  const animate: Animated.Value = useRef(new Animated.Value(0)).current;
  const modal = {
    transform: [
      { scale: animate },
      {
        translateY: animate.interpolate({
          inputRange: [0, 1],
          outputRange: [0, 0],
        }),
      },
    ],
  };

  useEffect(() => {
    Animated.spring(animate, {
      toValue: visible ? 1 : 0,
      useNativeDriver: true,
      delay: 100,
    }).start();
  }, [visible]);

  const handleSubmit = () => {
    if (fileResponse?.type !== "success") return;
    const data = new FormData();

    data.append("File", {
      // @ts-ignore
      name: fileResponse.name,
      type: "application/pdf",
      uri: fileResponse.uri,
    });
    data.append("PagesNo", "1");
    data.append("Title", fileResponse.name.replace(".pdf", ""));
    data.append("user", "1");

    console.log(data);

    const uploadFile = async () => {
      try {
        console.log("uploading file", fileResponse);
        const token = await getToken();
        console.log("Bearer", token);
        const response = await execute({
          method: "POST",
          url: "userpanel/custom-document/",
          data,
          headers: {
            Authorization: `Bearer ${token}`,
            "content-Type": "multipart/form-data",
          },
        });
        if (response.isErr) throw new Error("Error uploading file");
        setSuccess(true);
        console.log(response);
      } catch (err) {
        console.log(err);
        handleError();
      }
    };

    uploadFile();
  };

  return (
    <>
      {visible && (
        <View style={styles.modal}>
          <Animated.View style={[styles.container, modal]}>
            <View
              style={{
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                margin: 20,
              }}
            >
              <Pressable style={styles.button} onPress={handleDocumentUpload}>
                <Entypo name="upload" size={36} color="#2F4FCD" />
                <Text style={styles.text}>Upload</Text>
              </Pressable>
              {error && (
                <Text style={[styles.subText, styles.error]}>
                  Error while uploading file please try again!
                </Text>
              )}
              {success && (
                <Text style={[styles.subText, styles.success]}>
                  File uploaded successfully!
                </Text>
              )}
              {fileResponse && fileResponse?.type === "success" && (
                <>
                  <Text
                    style={styles.subText}
                  >{`Selected File: ${fileResponse.name}`}</Text>
                  <PdfPreview
                    handleError={handleError}
                    uri={fileResponse.uri}
                    height={Dimensions.get("window").width / 1.25}
                  />
                  <CustomizedButton title="Upload" handlePress={handleSubmit} />
                </>
              )}
            </View>
          </Animated.View>
        </View>
      )}
    </>
  );
};

export default UploadDocuments;

const styles = StyleSheet.create({
  modal: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    backgroundColor: "white",
  },
  container: {
    width: "80%",
    height: "70%",
    marginTop: "15%",
    marginBottom: "35%",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 25,
  },
  button: {
    justifyContent: "center",
    alignItems: "center",
    marginVertical: "15%",
  },
  text: {
    fontSize: 22,
    color: "black",
    paddingTop: 10,
  },
  subText: {
    fontSize: 18,
    color: "black",
    paddingTop: 5,
  },
  error: {
    color: "#FF0000",
  },
  success: {
    color: "#298D51",
  },
});
