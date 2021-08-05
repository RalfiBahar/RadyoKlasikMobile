import React from 'react'
import { View, Dimensions } from 'react-native'

const WIDTH = Dimensions.get("screen").width
const HEIGHT = Dimensions.get("screen").height

export const LowerContainer = ({children}) => {
    return (
        <View style={{position: 'absolute', width: WIDTH, height: HEIGHT * 0.4, bottom: 0, zIndex: 20}}>
            <View style={{display: 'flex', flex: 1, position: 'relative', padding: 20}}>
                {children}
            </View>
        </View>
    )
}
