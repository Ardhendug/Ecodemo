import React, { useRef, useEffect } from 'react';
import { View, Image, Animated, StyleSheet, Dimensions } from 'react-native';
import { PanGestureHandler, State, GestureHandlerRootView } from 'react-native-gesture-handler';

const SlidingComp = ({ imageUrls, speed }) => {
  const translateX1 = useRef(new Animated.Value(0)).current;
  const translateX2 = useRef(new Animated.Value(0)).current;
  const translateX3 = useRef(new Animated.Value(0)).current;
  const { width, height } = Dimensions.get('window');
  useEffect(() => {
    const moveImages = () => {
      Animated.loop(
        Animated.parallel([
          Animated.timing(translateX1, {
            toValue: -width,
            duration: width * speed,
            useNativeDriver: true,
          }),
          Animated.timing(translateX2, {
            toValue: -width,
            duration: width * speed,
            useNativeDriver: true,
          }),
          Animated.timing(translateX3, {
            toValue: -width,
            duration: width * speed,
            useNativeDriver: true,
          }),
        ])
      ).start();
    };
    moveImages();
  }, [width, height, speed, translateX1, translateX2, translateX3]);

  return (
    <GestureHandlerRootView style={styles.container}>
      <PanGestureHandler>
        <View style={styles.imageContainer}>
          <Animated.Image
            source={imageUrls[0]}
            style={[
              styles.image,
              {
                transform: [{ translateX: translateX1 }],
              },
            ]}
          />
          <Animated.Image
            source={imageUrls[1]}
            style={[
              styles.image,
              {
                transform: [{ translateX: translateX2 }],
              },
            ]}
          />
          <Animated.Image
            source={imageUrls[2]}
            style={[
              styles.image,
              {
                transform: [{ translateX: translateX3 }],
              },
            ]}
          />
        </View>
      </PanGestureHandler>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, justifyContent: 'center', alignItems: 'center'},
  imageContainer: {flexDirection: 'row',},
  image: {width: Dimensions.get('window').width, height: 170, resizeMode: 'cover'},
});
export default SlidingComp;
