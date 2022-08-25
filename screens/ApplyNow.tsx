import React, { useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { AppRoutes, StackNavigationProps } from "../constants/AppRoutes";
import CompleteDocs from "../components/completedDocs";
import UncompleteDocs from "../components/uncompleteDocs";
import { SafeAreaView } from "react-native-safe-area-context";


const ApplyNow = ({ navigation }: StackNavigationProps<AppRoutes, "ApplyNow">) => {
    const [index, setIndex] = React.useState(0);
    
    useEffect(() => {
        if(index < completeData.length-1){
            const tick = () => setIndex(i => i + 1);
        
            const id = setInterval(tick, 2000);
            return () => clearInterval(id);
        }
    }, []);
      

    // todo -> EXPECT THIS DATA TO COME FROM THE API
    const data = [
        {
            title: "Death Certificate",
            status: true,
        },
        {
            title: "Marksheet",
            status: true,
        },
        {
            title: "ID Card",
            status: true
        },
        {
            title: "XYZ",
            status: false,
        },
        {
            title: "PQR",
            status: false
        }
    ]
    const incompleteData = data.filter((item,idx) => item.status === false);
    
    const completeData = data.filter((item,idx) => item.status === true);


    return (
        <SafeAreaView>
            <View>
            <Text>Apply Now</Text>
            {
                completeData.filter((item, idx) => idx < index).map((item) => <CompleteDocs />)
            }
            <Text>
                {index < completeData.length ? <CompleteDocs /> : null}
            </Text>

            {
                index >= completeData.length ? 
                <View>
                    {
                        incompleteData.map(item => (
                            <UncompleteDocs />
                        ))
                    }
                </View>
                :
                null
            }
            </View>
        </SafeAreaView>
    );
}

export default ApplyNow;

const styles = StyleSheet.create({
});