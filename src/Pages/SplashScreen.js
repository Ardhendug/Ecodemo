import React, { useState, useEffect } from "react";
import {
    Text,
    StyleSheet,
    View,
    useColorScheme,
    Image,
    StatusBar,
    SafeAreaView,
} from 'react-native';
import Colors from "../Constants/Colors";
import {
    AppIcon
} from '../Constants/Includes';
import SlidingComp from "../Components/SlidingComponents";
const imageUrls = [
    require("../assets/building.png"),
    require("../assets/building.png"),
    require("../assets/building.png"),
];

const SplashScreen = (props) => {
    const isDarkMode = useColorScheme() === 'dark';
    useEffect(() => {
      const delayDebounce = setTimeout(() => {
        props.navigation.navigate('LoginScreen');
    }, 4000);
        return () => clearTimeout(delayDebounce);
    }, []);
    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} backgroundColor={Colors.colorLightGreen} />
            <Image source={AppIcon} resizeMode="contain" style={styles.logoStyle} />
            <View style={styles.headingContainer}>
                <Text style={styles.headingText}>My Demo Ecotence Project</Text>
            </View>
            <View style={{ position: 'absolute', bottom: 0 }}>
                <SlidingComp
                    imageUrls={imageUrls}
                    speed={16}
                />
            </View>
            <View style={styles.floatingImageContainer}>
                <Image source={AppIcon} resizeMode="contain" style={styles.logoSmallStyle} />
                <Text style={styles.subHeadingText}>My Demo Ecotence Project</Text>
            </View>
        </SafeAreaView>
    );
}

export default SplashScreen;

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: Colors.colorLightGreen, alignItems: 'center' },
    logoStyle: { width: '65%', height: "20%", marginTop: 220 },
    headingContainer: { width: 'auto' },
    headingText: { fontSize: 17, fontFamily: 'Nunito-BoldItalic', color: "#000" },
    floatingImageContainer: { position: 'absolute', bottom: 0, width: '40%', height: 60, alignItems: 'center' },
    logoSmallStyle: { width: '70%', height: "65%" },
    subHeadingText: { fontSize: 8, fontFamily: 'Nunito-BoldItalic', color: "#000" },
})