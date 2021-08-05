import React from 'react'
import { TouchableOpacity } from 'react-native'
import { 
    AntDesign, 
    Feather,  
    Octicons,
  } from '@expo/vector-icons';
  
const RED = "#ef5350"
const BLUE = "#4A8EDB"

export const MessageButton = ({ onPress }) => {
    return (
        <>
            <TouchableOpacity onPress={onPress}>
                <Feather name="message-square" size={80} color={BLUE} />
            </TouchableOpacity>
        </>
    )
}
