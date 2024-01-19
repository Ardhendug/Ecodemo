import React from "react";
import StackNavigation from "./src/Navigation/StackNavigation";
import MainNavigator from "./src/Navigation/MainNavigation";
import AuthContextProvider from "./src/Context/Context";

const App = () =>{
  return(
    <AuthContextProvider>
        <MainNavigator />
    </AuthContextProvider>
  );
}

export default App;