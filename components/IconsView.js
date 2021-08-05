import React from 'react'
import { View } from 'react-native'

export const IconsView = ({children}) => {
    return (
        <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', padding: 10, marginTop: 30}}>
            {children}
        </View>
    )
}
