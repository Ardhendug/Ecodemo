import React, { useState, useEffect } from "react";
import {
  Text,
  StyleSheet,
  View,
  useColorScheme,
  Dimensions,
  TouchableOpacity,
  ActivityIndicator,
  Image,
  FlatList,
  StatusBar,
  SafeAreaView,
} from 'react-native';
import Colors from "../Constants/Colors";
import axios from "axios";
import APIConstants from "../Constants/APIConstants";
import { myCustomHandler } from "../Constants/APIErrHandling";
import {
  AppIcon, BackArrow
} from '../Constants/Includes';
const { width, height } = Dimensions.get('window');
const dummy = [{latitude: "22.34567", longitude:"12.3456",timestamp: 1705559144136},
{latitude: "26.34567", longitude:"17.3456",timestamp: 1705559144136},
{latitude: "28.34567", longitude:"15.3456",timestamp: 1705559144129},
{latitude: "22.34567", longitude:"12.3456",timestamp: 1705559144136},
{latitude: "20.34567", longitude:"19.3456",timestamp: 1705559144136}]

const History = (props) => {
  const isDarkMode = useColorScheme() === 'dark';
  const [locationData, setLocationData] = useState([]);
  const [loading, setLoading] = useState(false);
  function convertMillisecondsToDate(milliseconds) {
    let val = parseInt(milliseconds)
    var date = new Date(val);
    var year = date.getFullYear();
    var month = ('0' + (date.getMonth() + 1)).slice(-2);
    var day = ('0' + date.getDate()).slice(-2);
    var hours = ('0' + date.getHours()).slice(-2);
    var minutes = ('0' + date.getMinutes()).slice(-2);
    var seconds = ('0' + date.getSeconds()).slice(-2);
    var formattedDateTime = year + '-' + month + '-' + day + ' ' + hours + ':' + minutes + ':' + seconds;
    return formattedDateTime;
  }
  const getLocation = async () => {
    setLoading(true)
    const header = {
      Content_Type: 'application/json',
      Accept: 'application/json',
    };
    axios
      .get(
        APIConstants.base_url + APIConstants.collectLocation,
      )
      .then(async function (response) {
        setLoading(false)
        console.log('The response for location..', response.data.payload.data);
        setLocationData(response.data.payload.data);
      })
      .catch(function (error) {
        setLoading(false)
        console.log('Error in log-in response', error.response);
        myCustomHandler(error);
      });
  };
  useEffect(() => {
    getLocation()
  }, []);
  const _HeaderView = () => {
    return (
      <View style={{
        width: '100%', height: height * 0.07, backgroundColor: Colors.colorDeepGreen, elevation: 3, shadowColor: "#2A2A2A", flexDirection: "row",
        alignItems: 'center'
      }}>
        <TouchableOpacity style={{ width: 35, height: 30, justifyContent: 'center', alignItems: 'center', marginLeft: 6 }}
          onPress={() => {
            props.navigation.goBack();
          }}
        >
          <Image source={BackArrow} resizeMode='contain' style={{ width: 20, height: 20 }} />
        </TouchableOpacity>
        <View style={{
          width: width * 0.8, height: height * 0.07, alignSelf: 'center', justifyContent: 'center',
          alignItems: 'center'
        }}>
          <Text style={{ color: Colors.colorLightGreen, fontSize: 16, fontWeight: '500', marginTop: 2 }}>CheckIn History</Text>
        </View>
      </View>
    );
  }
  const ListEmptyView = () => {
    return (
      <View>
        <Text style={{ color: "#000", fontSize: 16, fontWeight: '500', marginTop: 40 }}>No check-in history found</Text>
      </View>
    );
  }
  const _locationlList = ({ item, index }) => {
    return (
      <View style={{
        width: width * 0.96, backgroundColor: Colors.colorDeepGreen, marginBottom: 3, justifyContent: 'center',
        height: 70, borderRadius: 10, marginTop: index == 0 ? 12 : 8, elevation: 4, padding: 10
      }}>
        <Text style={{ color: "#fff", fontSize: 12, fontWeight: '500' }}>Time stamp : {convertMillisecondsToDate(item.timestamp)}</Text>
        <Text style={{ color: "#fff", fontSize: 12, fontWeight: '500' }}>latitude : {item.latitude}</Text>
        <Text style={{ color: "#fff", fontSize: 12, fontWeight: '500' }}>longitude : {item.longitude}</Text>
      </View>
    );
  }
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} backgroundColor={Colors.colorDeepGreen} />
      <_HeaderView />
      <View style={{}}>
        <FlatList
          data={locationData}
          ListEmptyComponent={ListEmptyView}
          keyExtractor={(item, index) => item.id + index.toString()}
          renderItem={({ item, index }) => (
            <_locationlList
              item={item}
              index={index}
            />
          )}
        />
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

export default History;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.colorLightGreen, alignItems: 'center' },
  logoStyle: { width: '65%', height: "40%", marginTop: 220 },
  headingContainer: { width: 'auto' },
  headingText: { fontSize: 17, fontFamily: 'Nunito-BoldItalic', color: "#000" },
  floatingImageContainer: { position: 'absolute', bottom: 0, width: '40%', height: 60, alignItems: 'center' },
  logoSmallStyle: { width: '70%', height: "65%" },
  subHeadingText: { fontSize: 8, fontFamily: 'Nunito-BoldItalic', color: "#000" },
})