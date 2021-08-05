import React from 'react'
import { Dimensions, Image } from 'react-native';

export const HeaderImage = () => {
    return (
        <>
            <Image 
                style={{height: 97, width: 201, resizeMode: "contain", marginTop: 70}} 
                source={require('../assets/LogoDesign.png')}
            />
        </>
    )
}
