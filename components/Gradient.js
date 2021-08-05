import React from 'react'
import { LinearGradient } from 'expo-linear-gradient';
import { Dimensions } from 'react-native';

const WIDTH = Dimensions.get("screen").width
const HEIGHT = Dimensions.get("screen").height

export const Gradient = () => {
    return (
        <>
            <LinearGradient 
                colors={['white', 'transparent']}//['white', 'rgba(255,255,255,0.8)', 'transparent']
                style={{position: "absolute", width: WIDTH, height: HEIGHT * 0.4, borderRadius: 40, bottom: 0}}
            />
        </>
    )
}
