import React, { useEffect, useState } from "react";
import {View, Text} from "react-native";
import { LinearProgress } from "@rneui/base";
import { AntDesign } from "@expo/vector-icons";

interface IProps {
    document: any
}
const CompleteDocs = ({document}: IProps) => {
    const [val, setVal] = useState(0.00001);
   
    useEffect(() => {
        const interval = setInterval(() => {
            setVal(val + 12);
        }, 800);
        return () => clearInterval(interval);
    }, []);

    return (
        <View style={{marginBottom: 5, marginVertical: 20}}>
            <View style={{display:'flex', flexDirection:'row', alignItems:'center', marginBottom: 5, width: '80%'}}>
                <Text style={{fontSize: 20, fontWeight: '400', marginRight: 10}}>{document.title}</Text>
                <AntDesign name={"checkcircle"} color={"#52C41A"} size={16}/>
            </View>
            
            <View style={{width: '80%'}}>
                <LinearProgress color="#52C41A" variant="determinate" value={val}/>
            </View>
        </View>
    )
}

export default CompleteDocs;