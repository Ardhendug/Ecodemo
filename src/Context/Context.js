import React, {useState} from "react";
import { createContext } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';

export const AuthContext = createContext();

function AuthContextProvider (props) {
    const [user, setUser] = useState(null);

    async function fetchUserFromAsyncStorage () {
        let strUser = await AsyncStorage.getItem("user");
        setUser(JSON.parse(strUser));
    }
    function appSignIn(value) {
        if(value !== null) {
            AsyncStorage.setItem("user", JSON.stringify(value));
            console.log("new user value ", value);
            setUser(value);
        }
    }
    function appLogOut () {
        AsyncStorage.removeItem("user");
        setUser(null);
    }
    return(
        <AuthContext.Provider
        value={{user, fetchUserFromAsyncStorage, appSignIn, appLogOut}}
        >
            {props.children}
        </AuthContext.Provider>
    );
}
export default AuthContextProvider;