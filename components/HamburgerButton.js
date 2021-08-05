import React from 'react'
import { TouchableOpacity } from 'react-native'
import { 
    AntDesign, 
    Feather,  
    Octicons,
  } from '@expo/vector-icons';
  
const RED = "#ef5350"
const BLUE = "#4A8EDB"

export const HamburgerButton = ({ onPress }) => {
    return (
        <>
            <TouchableOpacity onPress={onPress}>
                <Octicons name="three-bars" size={80} color={BLUE} />
            </TouchableOpacity>
        </>
    )
}
