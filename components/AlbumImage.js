import React, {useEffect} from 'react'
import { Dimensions, Image } from 'react-native';

export const AlbumImage = (imgAddress) => {
    return (
        <>
            <Image
                style={{width: 200, height:200, resizeMode: "contain", borderRadius: 10, marginTop: 30}}
                source={{uri: imgAddress.imgAddress}}
            />
        </>
    )
}
