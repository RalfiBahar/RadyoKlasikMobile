import React from 'react'
import { View, Text } from 'react-native'
import { normalize } from '../helpers'

export const TextComponent = ({variant = 'title', children}) => {
    return (
        <>
            {variant === 'title' ?             
            <Text style={{      
                textAlign: 'left',
                backgroundColor: 'transparent',
                fontSize: normalize(19),
                padding: 10,
                color: "black",
                fontWeight: "bold"
            }}>
                {children}
            </Text> : 
            <Text style={{
                textAlign: 'left',
                backgroundColor: 'transparent',
                fontSize: normalize(17),
                padding: 10,
                color: "#6a787a",//#798b8f
                fontWeight: "700"
            }}>
                {children}
            </Text>
            }

        </>
    )
}
