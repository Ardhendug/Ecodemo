import React from "react";
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from "@react-navigation/native";
import HomeScreen from "../Pages/HomeScreen";
import History from "../Pages/History";

const Stack = createStackNavigator();

const AppNavigation = () => {
    return(
        <NavigationContainer>
        <Stack.Navigator>
            <Stack.Screen name="HomeScreen" component={HomeScreen} options={{headerShown: false}} />
            <Stack.Screen name="History" component={History} options={{headerShown: false}} />
        </Stack.Navigator>
        </NavigationContainer>
    )
}

export default AppNavigation;