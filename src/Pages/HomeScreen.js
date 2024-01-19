import React, { useState, useEffect, useContext } from "react";
import {
  Text,
  StyleSheet,
  View,
  useColorScheme,
  Image,
  StatusBar,
  Dimensions,
  TouchableOpacity,
  Platform,
  Linking,
  ActivityIndicator,
  Alert,
  PermissionsAndroid,
  ToastAndroid,
  SafeAreaView,
} from 'react-native';
import Colors from "../Constants/Colors";
import {
  AppIcon, BaanerImg, AvtarIcon, NotificationIcon
} from '../Constants/Includes';
import { AuthContext } from "../Context/Context";
import BackgroundService from 'react-native-background-actions';
import auth from '@react-native-firebase/auth';
import axios from "axios";
import APIConstants from "../Constants/APIConstants";
import { myCustomHandler } from "../Constants/APIErrHandling";
import BackgroundGeolocation, {
  Location,
  Subscription
} from "react-native-background-geolocation";
const { width, height } = Dimensions.get('window');

const HomeScreen = (props) => {
  const isDarkMode = useColorScheme() === 'dark';
  const { appLogOut, user } = useContext(AuthContext);
  const [location, setLocation] = useState([]);
  const [loading, setLoading] = useState(false);
  const [enabled, setEnabled] =  useState(false);
  const [enabletrack, setEnableTrack] = useState(false);
  const sleep = (time) => new Promise((resolve) => setTimeout(() => resolve(), time));
  const veryIntensiveTask = async (taskDataArguments) => {
    const { delay } = taskDataArguments;
    await new Promise(async (resolve) => {
      for (let i = 0; BackgroundService.isRunning(); i++) {
        console.log(i);
        await BackgroundService.updateNotification({ taskDesc: 'Background location fetching'});
         getLocationf();
        await sleep(delay);
      }
    });
  }
  const options = {
    taskName: 'Background Location',
    taskTitle: 'Background Location tracking',
    taskDesc: 'Background Location tracking',
    taskIcon: {
      name: 'ic_launcher',
      type: 'mipmap',
    },
    color: '#ff00ff',
    linkingURI: 'yourSchemeHere://chat/jane',
    parameters: {
      delay: 10000,
    },
  };
  
  const sendLocation = async(position) => {
    const header = {
      Content_Type: 'application/json',
      Accept: 'application/json',
    };
    axios
      .post(
        APIConstants.base_url + APIConstants.sendLoc,{

            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            timestamp: position.timestamp
        }
      )
      .then(async function (response) {
          console.log('The response for sending location..', response.data);
      })
      .catch(function (error) {
        console.log('Error in log-in response', error.response);
        myCustomHandler(error);
      });
  };
  
  const logOutAlert = () => {
    Alert.alert(
      "Warning",
      "Do you want to logout ?", [
      {
        text: "Yes", onPress: () => callLogoutService()
      },
      {
        text: "No", onPress: () => console.log("No")
      }
    ]
    );
  }

//** */
useEffect(() => {
  const onLocation= BackgroundGeolocation.onLocation((location) => {
    console.log('[onLocation]', location.coords.latitude, location.coords.longitude, location.timestamp);
    setLocation(location)
    sendLocation(location);
    setEnableTrack(true)
  })

  const onMotionChange = BackgroundGeolocation.onMotionChange((event) => {
    console.log('[onMotionChange]', event);
  });

  const onActivityChange = BackgroundGeolocation.onActivityChange((event) => {
    console.log('[onActivityChange]', event);
  })

  const onProviderChange = BackgroundGeolocation.onProviderChange((event) => {
    console.log('[onProviderChange]', event);
  })

  BackgroundGeolocation.ready({
    desiredAccuracy: BackgroundGeolocation.DESIRED_ACCURACY_HIGH,
    distanceFilter: 0,
    locationUpdateInterval: 1 * 60 * 1000,
    stopOnStationary: false,
    stopTimeout: 5,
    debug: true, 
    logLevel: BackgroundGeolocation.LOG_LEVEL_VERBOSE,
    stopOnTerminate: false,
    startOnBoot: true, 
    url: 'http://yourserver.com/locations',
    batchSync: false,      
    autoSync: true,        
    headers: {         
      "X-FOO": "bar"
    },
    params: {
      "auth_token": "maybe_your_server_authenticates_via_token_YES?"
    }
  }).then((state) => {
    setEnabled(state.enabled)
    console.log("- BackgroundGeolocation is configured and ready: ", state.enabled);
  })
  .catch((error) =>{
    ToastAndroid.showWithGravity("Error for collecting location state & try again later", ToastAndroid.SHORT, ToastAndroid.BOTTOM)
  })
}, []);

const getLocationf = () =>{
  BackgroundGeolocation.getCurrentPosition();
}
const initializeService = async() =>{
  await BackgroundService.start(veryIntensiveTask, options);
  await BackgroundService.updateNotification({taskDesc: 'Location update'});
}
useEffect(() =>{
  if(enabletrack){
    initializeService()
  }
}, [enabletrack])
//*//

  const callLogoutService = async () => {
    setLoading(true)
    await BackgroundService.stop();
    BackgroundGeolocation.stop();
    auth()
      .signOut()
      .then(() => {
        setLoading(false)
        appLogOut();
      })
      .catch(error => {
        console.log("error for logout", error)
        setLoading(false)
      })
  }
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} backgroundColor={Colors.colorPrimary} />
      <View style={styles.headerView}>
        <View style={styles.leftview}>
          <Image source={AppIcon} resizeMode="contain" style={styles.logoSmallStyle} />
          <Text style={styles.headingText}>Ecotence Demo</Text>
        </View>
        <View style={styles.rightview}>
          <Image source={NotificationIcon} resizeMode="contain" style={styles.roundIcon} />
          <Image source={AvtarIcon} resizeMode="contain" style={styles.roundIcon} />
        </View>
      </View>
      <View style={{width: width * 0.96, height: 120, borderRadius: 12}}>
        <Image source={BaanerImg} resizeMode="cover" style={styles.bannerImg} />
        <Text style={{fontSize:16,fontWeight:"800",color:"#fff",marginTop:10,marginLeft:12}}>Welcome {user.payload.userName} !</Text>
        <Text style={{fontSize:10,fontWeight:"300",color:"#fff",marginTop:4,marginLeft:12}}>Please 
        check in here to view your current location !!</Text>
        { location.length != 0 &&
        <View style={{width:width*0.9,alignSelf:'center',marginTop:4}}>
        <Text style={{fontSize:12,fontWeight:"500",color:"#fff",marginTop:2}}>Your current latitude : {location.coords.latitude}</Text>
        <Text style={{fontSize:12,fontWeight:"500",color:"#fff",marginTop:2}}>Your current longitude : {location.coords.longitude}</Text>
        <Text style={{fontSize:12,fontWeight:"500",color:"#fff",marginTop:2}}>Current timeStamp : {location.timestamp}</Text>
        </View>
        }
      </View>
      <View style={{flexDirection:"row",width:width*0.96,justifyContent:'space-between',alignSelf:'center',marginTop:18}}>
      <TouchableOpacity style={{width:width*0.3,height:80,elevation:4,
      borderRadius:18,backgroundColor:Colors.colorDeepGreen,justifyContent:"center",alignItems:'center'}}
        onPress={() => {
          BackgroundGeolocation.start()
        }}
      >
        <Text style={styles.btnText}>Check in</Text>
      </TouchableOpacity>
      <TouchableOpacity style={{width:width*0.3,height:80,elevation:4,
      borderRadius:18,backgroundColor:Colors.colorDeepGreen,justifyContent:"center",alignItems:'center'}}
        onPress={() => {
          props.navigation.navigate('History')
        }}
      >
        <Text style={styles.btnText}>Check History</Text>
      </TouchableOpacity>
      <TouchableOpacity style={{width:width*0.3,height:80,elevation:4,
      borderRadius:18,backgroundColor:Colors.colorDeepGreen,justifyContent:"center",alignItems:'center'}}
        onPress={() => {
          logOutAlert()
        }}
      >
        <Text style={styles.btnText}>Logout</Text>
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
          <ActivityIndicator size="large" color="#6fd4e6" />
          <Text style={{ color: '#000', marginLeft: 20 }}>Please wait ...</Text>
        </View>
      )}
    </SafeAreaView>
  );
}

export default HomeScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.colorLightGreen, alignItems: 'center' },
  headerView: { width: '100%', height: 50, flexDirection: 'row', justifyContent: 'space-between' },
  leftview: { width: 140, height: 50, justifyContent: 'space-evenly', flexDirection: 'row', alignItems: 'center' },
  rightview: { width: 70, height: 50, justifyContent: 'space-evenly', flexDirection: 'row', alignItems: 'center' },
  logoSmallStyle: { width: 40, height: 20 },
  headingText: { fontSize: 12, fontWeight: "900", color: Colors.colorDeepGreen },
  roundIcon: { width: 24, height: 24 },
  bannerImg: { width: width * 0.96, height: 120, borderRadius: 12,position:'absolute'},
  btnText: { fontSize: 12, fontWeight: "500", color: Colors.colorPrimary },
})