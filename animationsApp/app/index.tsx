import { Animated, Button, StyleSheet, Text, useAnimatedValue, View } from 'react-native'
import React, { useEffect } from 'react'
import { Jost_300Light, Jost_500Medium, Jost_900Black, Jost_900Black_Italic, useFonts } from '@expo-google-fonts/jost'
import { animations } from './animations/indexAnimations'

export default function index() {
  // Preparación
  const positionVertical = useAnimatedValue(100)
  const positionUpperValue = useAnimatedValue(-250)
  const positionLowerValue = Animated.subtract(0, positionUpperValue)
  const opacityTitleValue = useAnimatedValue(0)
  const opacityTextValue = useAnimatedValue(0)
  const sizeValue = useAnimatedValue(0)
  const AnimatedText = Animated.createAnimatedComponent(Text)
  const [fontIsLoaded] = useFonts({
    Jost_500Medium,
    Jost_300Light,
  })
  // Animaciones
  const titleMovement = animations.animate(positionUpperValue, 0, 1000)
  const titleOpacity = animations.animate(opacityTitleValue, 1, 1000)
  const textOpacity = animations.animate(opacityTextValue,1,1000)
  const textEntry = animations.animate(positionVertical, 0, 1000)
  const resize = animations.animate(sizeValue,1,2000)
  const handleAction = () => {
    resize.start()
  }
  useEffect(() => {
    Animated.sequence([
      Animated.delay(1000),
      Animated.parallel([
        titleMovement,
        titleOpacity
      ]),
      Animated.delay(500),
      Animated.parallel([
        textOpacity,
        textEntry
      ])
    ]).start()
  })
  return (
    <View style={styles.container}>
      <Animated.View style={{transform:[/*rotateX:sizeValue.interpolate({
        inputRange:[0,1],
        outputRange:['0deg','60deg']
      })*/{skewY:sizeValue.interpolate({
        inputRange:[0,1],
        outputRange:['0deg','90deg']
      })}],height:"120%",width:"110%",backgroundColor:"#eee",position:"absolute"}}></Animated.View>
      <AnimatedText style={[styles.title, { transform: [{ translateX: positionUpperValue }], opacity: opacityTitleValue }]}>Animations</AnimatedText>
      <AnimatedText style={[styles.title, { transform: [{ translateX: positionLowerValue }], opacity: opacityTitleValue }]}>Playground</AnimatedText>
      <AnimatedText style={[styles.text, { transform: [{ translateY: positionVertical }], opacity: opacityTextValue }]}>Welcome to my personal Proyect! Here you'll find different scenarios i've made across my journey learning React Native's Animated API.</AnimatedText>
      <Button onPress={handleAction} title='Animate'></Button>
    </View>
  )
}
// Estilos
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: "center",
    backgroundColor: "black"
  },
  title: {
    fontFamily: 'Jost_500Medium',
    fontSize: 50,
    textAlign: "center"
  },
  text: {
    fontFamily: 'Jost_300Light',
    textAlign:"center",
    lineHeight:55,
    fontSize: 35
  }
})