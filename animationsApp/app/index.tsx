import React = require("react");
import { Button, Dimensions, Easing, StyleSheet, Text, TouchableOpacity, useAnimatedValue, View } from "react-native";
import { Animated } from "react-native";
import { useFonts, Jost_200ExtraLight, Jost_400Regular, Jost_600SemiBold } from '@expo-google-fonts/jost'
export default function Page() {
  const [faded, setFaded] = React.useState(false)
  let [fontIsLoaded] = useFonts({
    Jost_200ExtraLight,
    Jost_400Regular,
    Jost_600SemiBold
  })
  console.log(Dimensions.get('screen').height)
  console.log("Window: "+Dimensions.get('window').height)
  const animated = useAnimatedValue(1)
  const radius = useAnimatedValue(0)
  const scaleValue = useAnimatedValue(0)
  const scaleGrow = (value: number) => {
    return Animated.timing(scaleValue, {
      toValue: value,
      duration: 1000,
      useNativeDriver: true
    })
  }
  const sequence = () => {
    Animated.sequence([
      Animated.parallel([
        scaleGrow(4),
        radiusChange(15)
      ]),
      Animated.delay(500),
      Animated.parallel([
        scaleGrow(1.5),
        radiusChange(50)
      ]),
      Animated.delay(1200),
      Animated.parallel([
        radiusChange(5),
        scaleGrow(0.5)
      ])
    ]).start()
  }
  const radiusChange = (value: number) => {
    return Animated.timing(radius, {
      toValue: value,
      duration: 1000,
      useNativeDriver: true
    })
  }
  const fadeOut = () => {
    Animated.timing(animated, {
      toValue: 0,
      easing: Easing.ease,
      duration: 1000,
      useNativeDriver: true
    }).start()
  }
  const fadeIn = () => {
    Animated.timing(animated, {
      toValue: 1,
      easing: Easing.ease,
      duration: 1000,
      useNativeDriver: true
    }).start()
  }
  const handleFadeIn = () => {
    fadeIn()
    setFaded(!faded)
  }
  const handleFadeOut = () => {
    fadeOut()
    setFaded(!faded)
  }
  const handleAnimate = () => {
    sequence()
  }
  return (
    <View style={styles.container}>
      <View style={styles.main}>
        <Animated.View style={[{ opacity: animated }]}>
          <Text style={styles.title}>Animation Playground</Text>
          <Text style={styles.subtitle}>This application contains various examples/results of React Native's built in Animation API</Text>
        </Animated.View>
        <Button onPress={faded ? handleFadeOut : handleFadeIn} title={faded ? "Fade out" : "Fade in"}></Button>
        {//<Animated.View style={{ borderRadius: radius, backgroundColor: "red", height: 100, width: 100, transform: [{ scale: scaleValue }], alignSelf: "center" }}>
        }
        <View style={{backgroundColor:"blue",position:"absolute",top:-25,left:-25,height:1158,width:50}}></View>
        {//</Animated.View>
        }<Button onPress={handleAnimate} title="Apply"></Button>
      </View>
    </View >
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 24,
  },
  main: {
    flex: 1,
    rowGap: 80,
    justifyContent: "center",
    maxWidth: 960,
    marginHorizontal: "auto",
  },
  title: {
    fontSize: 40,
    textAlign: "center",
    fontFamily: 'Jost_600SemiBold'
  },
  subtitle: {
    fontSize: 28,
    textAlign: "justify",
    color: "#38434D",
    fontFamily: 'Jost_400Regular'
  },
});
