import { Animated } from "react-native";

export const animations = {
    animate:(value,toValue,duration)=>{
        return Animated.timing(value,{
            toValue,
            duration:duration,
            useNativeDriver:true
        })
    }
}