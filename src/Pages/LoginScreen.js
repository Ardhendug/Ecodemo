import React, { useState, useEffect, useContext } from "react";
import {
    Text,
    StyleSheet,
    View,
    useColorScheme,
    Image,
    StatusBar,
    TouchableOpacity,
    KeyboardAvoidingView,
    TextInput,
    Platform,
    Alert,
    BackHandler,
    ToastAndroid,
    ActivityIndicator,
    SafeAreaView,
} from 'react-native';
import Colors from "../Constants/Colors";
import axios from "axios";
import { myCustomHandler } from "../Constants/APIErrHandling";
import { AuthContext } from "../Context/Context";
import APIConstants from "../Constants/APIConstants";
import auth from '@react-native-firebase/auth';
import {
    AppIcon
} from '../Constants/Includes';

const LoginScreen = (props) => {
    const isDarkMode = useColorScheme() === 'dark';
    const { appSignIn } = useContext(AuthContext);
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [isDisabled, setIsDisabled] = useState(true);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);
        return () => {
            BackHandler.removeEventListener('hardwareBackPress', handleBackButtonClick);
        };
    }, []);
    function handleBackButtonClick() {
        return true;
    }
    const checkValidation = () => {
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
        if (email.length == 0) {
            if (Platform.OS === 'ios') {
                Alert.alert(
                    "Please enter your email", "", [
                    {
                        text: "ok", onPress: () => console.log("OK Pressed")
                    }
                ], { cancelable: false }
                );
            } else {
                ToastAndroid.showWithGravity("Please enter your email", ToastAndroid.SHORT, ToastAndroid.BOTTOM)
            }
            return false;
        } else if (reg.test(email) == false) {
            if (Platform.OS === 'ios') {
                Alert.alert(
                    "Please enter a valid email", "", [
                    {
                        text: "ok", onPress: () => console.log("OK Pressed")
                    }
                ], { cancelable: false }
                );
            } else {
                ToastAndroid.showWithGravity("Please enter a valid email", ToastAndroid.SHORT, ToastAndroid.BOTTOM)
            }
            return false;
        } else if (password.length == 0) {
            if (Platform.OS === 'ios') {
                Alert.alert(
                    "Please enter your password", "", [
                    {
                        text: "ok", onPress: () => console.log("OK Pressed")
                    }
                ], { cancelable: false }
                );
            } else {
                ToastAndroid.showWithGravity("Please enter your password", ToastAndroid.SHORT, ToastAndroid.BOTTOM)
            }
            return false;
        } else if (password.length < 5) {
            if (Platform.OS === 'ios') {
                Alert.alert(
                    "Password should be min 5 digit", "", [
                    {
                        text: "ok", onPress: () => console.log("OK Pressed")
                    }
                ], { cancelable: false }
                );
            } else {
                ToastAndroid.showWithGravity("Password should be min 5 digit", ToastAndroid.SHORT, ToastAndroid.BOTTOM)
            }
            return false;
        }
        return true;
    }
    const submitLogin = () => {
        if (checkValidation()) userAuthentications()
    }
    const userAuthentications = async () => {
        setLoading(true)
        auth()
            .signInWithEmailAndPassword(email, password)
            .then(() => {
                if (Platform.OS === 'android') {
                    ToastAndroid.showWithGravity("User authenticated successfully", ToastAndroid.SHORT, ToastAndroid.BOTTOM)
                }
                call_login_API();
            })
            .catch(error => {
                setLoading(false)
                if (error.code === 'auth/invalid-email') {
                    console.log('That email address is invalid!');
                }
                if (error.code === 'auth/invalid-credential') {
                    if (Platform.OS === 'ios') {
                        Alert.alert(
                            "Invalid Credential", "Please check email & password", [
                            {
                                text: "ok", onPress: () => console.log("OK Pressed")
                            }
                        ], { cancelable: false }
                        );
                    } else {
                        ToastAndroid.showWithGravity("Please check email & password", ToastAndroid.SHORT, ToastAndroid.BOTTOM)
                    }
                }
            });
    }
    const call_login_API = async () => {
        const header = {
            Content_Type: 'application/json',
            Accept: 'application/json',
        };
        axios
            .post(
                APIConstants.base_url + APIConstants.login,
                {
                    email: email,
                    password: password
                }, {
                headers: header
            }
            )
            .then(async function (response) {
                setLoading(false)
                console.log('The response for login..', response.data);
                appSignIn(response.data)
            })
            .catch(function (error) {
                setLoading(false)
                console.log('Error in log-in response', error.response);
                myCustomHandler(error);
            });
    };
    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} backgroundColor={Colors.colorPrimary} />
            <View style={styles.logContainer}>
                <Image source={AppIcon} resizeMode="contain" style={styles.logoSmallStyle} />
                <View style={styles.textInput1}>
                    <TextInput
                        placeholder="Enter Email"
                        placeholderTextColor="#fff"
                        value={email}
                        keyboardType="email-address"
                        onChangeText={(text) => setEmail(text)}
                        style={{ paddingLeft: 12 }}
                    />
                </View>
                <View style={styles.textInput1}>
                    <TextInput
                        placeholder="Enter Password"
                        secureTextEntry
                        placeholderTextColor="#fff"
                        value={password}
                        onChangeText={(text) => setPassword(text)}
                        style={{ paddingLeft: 12 }}
                    />
                </View>
                <TouchableOpacity style={styles.btn}
                    onPress={() => {
                        submitLogin()
                    }}
                >
                    <Text style={styles.btnText}>Sign in</Text>
                </TouchableOpacity>
            </View>
            {loading && (
                <View
                    style={{
                        width: '100%',
                        height: '100%',
                        backgroundColor: 'rgba(111, 212, 230, 0.28)',
                        position: 'absolute',
                        alignSelf: 'center',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}>
                    <ActivityIndicator size="large" color={Colors.colorDeepGreen} />
                    <Text style={{ color: '#000', marginLeft: 20 }}>Please wait ...</Text>
                </View>
            )}
        </SafeAreaView>
    );
}

export default LoginScreen;

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: Colors.colorLightGreen, alignItems: 'center', justifyContent: 'center' },
    logContainer: { backgroundColor: Colors.colorDeepGreen, width: "90%", height: '52%', elevation: 8, borderRadius: 12, alignItems: 'center' },
    textInput1: { width: '90%', height: 48, borderWidth: 1, borderColor: Colors.colorLightGreen, marginTop: 12, borderRadius: 12, justifyContent: 'center' },
    logoSmallStyle: { width: '70%', height: "32%",marginTop:12},
    btn: {
        width: "90%", height: 46, backgroundColor: Colors.colorLightGreen, borderRadius: 26, alignItems: 'center', justifyContent: 'center',
        marginTop: 32, elevation: 5
    },
    btnText: { color: "#000", fontSize: 16, fontWeight: '900' }
})