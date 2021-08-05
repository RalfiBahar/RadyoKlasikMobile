import React from 'react'
import { Dimensions, Image } from 'react-native';

const WIDTH = Dimensions.get("screen").width
const HEIGHT = Dimensions.get("screen").height

export const BackgroundWithImage = () => {
    return (
        <>
            <Image 
            style={{height: HEIGHT, width: WIDTH, position: "absolute", zIndex: -9999, resizeMode: "cover"}} 
            source={require('../assets/1.png')}
            />
        </>
    )
}


