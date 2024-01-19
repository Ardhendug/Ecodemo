import React from "react";
import AppNavigation from "./AppNavigation";
import StackNavigation from "./StackNavigation";
import { AuthContext } from "../Context/Context";
import { useContext, useEffect} from "react";

export default function MainNavigator(){

const { user, fetchUserFromAsyncStorage} = useContext(AuthContext);


useEffect (() =>{
    fetchUserFromAsyncStorage()
}, []);

    return(
        ( user !== null) ? <AppNavigation/> : <StackNavigation />
    );
}