import React,{useState, useEffect } from "react";
import { View,
Alert,
ToastAndroid,
Platform
} from "react-native";

export const myCustomHandler = (errorData) =>{

    if(errorData.message == 'Network Error'){
    if(Platform.OS === 'ios'){
    Alert.alert(
        "Please check your internet connection","",[
        {
            text: "ok", onPress: () => console.log("OK Pressed")
        }
    ], { cancelable: false }
    );}else{
        ToastAndroid.showWithGravity("Please check your internet connection", ToastAndroid.SHORT,ToastAndroid.BOTTOM)
    }
   }else if(errorData.response.status == 500){
    if(Platform.OS === 'macos'){
    Alert.alert(
        "Internal server error","",[
        {
            text: "ok", onPress: () => console.log("OK Pressed")
        }
    ], { cancelable: false }
    );}else{
        ToastAndroid.showWithGravity("Internal server error", ToastAndroid.SHORT,ToastAndroid.BOTTOM)
    }
   }else if(errorData.response.status == 503){
    if(Platform.OS === 'ios'){
    Alert.alert(
        "Server maintenance is in progress please try again later","",[
        {
            text: "ok", onPress: () => console.log("OK Pressed")
        }
    ], { cancelable: false }
    );}else{
        ToastAndroid.showWithGravity("Server maintenance is in progress, please try again later", ToastAndroid.SHORT,ToastAndroid.BOTTOM)
    }
   }else if(errorData.response.status == 420){
    if(Platform.OS === 'ios'){
    Alert.alert(
        `${errorData.response.data.msg}`,"",[
        {
            text: "ok", onPress: () => console.log("OK Pressed")
        }
    ], { cancelable: false }
    );}else{
        ToastAndroid.showWithGravity(`${errorData.response.data.msg}`, ToastAndroid.SHORT,ToastAndroid.BOTTOM)
    }
   }else if(errorData.response.status == 404){
    if(Platform.OS === 'ios'){
    Alert.alert(
        "Url not found","",[
        {
            text: "ok", onPress: () => console.log("OK Pressed")
        }
    ], { cancelable: false }
    );}else{
        ToastAndroid.showWithGravity("Url not found", ToastAndroid.SHORT,ToastAndroid.BOTTOM)
    }
   }else if(errorData.response.status == 401){
    if(Platform.OS === 'ios'){
    Alert.alert(
        "Session expired, please login again","",[
        {
            text: "ok", onPress: () => console.log("OK Pressed")
        }
    ], { cancelable: false }
    );}else{
        ToastAndroid.showWithGravity("Session expired please login again ", ToastAndroid.SHORT,ToastAndroid.BOTTOM)
    }
    // TODO FOR LOG-OUT USING CONTEXT-API
   }else if(errorData.response.status == 400){
    if(Platform.OS === 'ios'){
    Alert.alert(
        "Bad request","",[
        {
            text: "ok", onPress: () => console.log("OK Pressed")
        }
    ], { cancelable: false }
    );}else{
        ToastAndroid.showWithGravity("Bad request", ToastAndroid.SHORT,ToastAndroid.BOTTOM)
    }
   }
}