import React, {useEffect} from 'react'
import { 
    Alert, 
    StyleSheet,
    Modal, 
    Text, 
    View, 
    TouchableOpacity, 
    Image,
    Dimensions,
    KeyboardAvoidingView,
    Platform
  } from 'react-native';

import {Chat} from './Chat'
import {normalize} from '../helpers'

const RED = "#ef5350"
const BLUE = "#4A8EDB"

const WIDTH = Dimensions.get("screen").width
const HEIGHT = Dimensions.get("screen").height

export const ChatModal = ({ifVisibleChat, onPress}) => {
    return (
        <Modal
        animationType="slide"
        transparent={true}
        visible={ifVisibleChat}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Image source={require('../assets/LogoDesign.png')} style={{resizeMode: "contain", width:170, height: 100}}/>
            <KeyboardAvoidingView 
              style={{flex: 1}}
              behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
              keyboardVerticalOffset={Platform.OS === 'ios' ? 60 : -40}
            >
              <Chat />
              <TouchableOpacity
                style={{ ...styles.openButton, 
                  backgroundColor: RED, 
                  marginTop: 30,
                  zIndex: 9999
                }}
                onPress={onPress}>
                <Text style={styles.textStyle}>Hide Chat</Text>
              </TouchableOpacity>
              </KeyboardAvoidingView>

          </View>
        </View>
      </Modal>
    )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: "flex-end"
  },
  button: {
    width: WIDTH*0.8,
    height: 100,
    marginBottom: HEIGHT*0.05,
    borderRadius: 10,
    backgroundColor: 'transparent',
    justifyContent: 'center',
  },
  buttonText: {
    textAlign: 'left',
    backgroundColor: 'transparent',
    fontSize: normalize(19),
    padding: 10,
    color: "black",
    fontWeight: "bold"
  },
  buttonText2: {
    textAlign: 'left',
    backgroundColor: 'transparent',
    fontSize: normalize(16),
    padding: 10,
    color: "#798b8f",
    fontWeight: "700"
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height
  },
  openButton: {
    backgroundColor: '#F194FF',
    borderRadius: 20,
    padding: 20,
    elevation: 2,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 17
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'left',
    fontSize: normalize(20),
    fontWeight: "bold"
  },
  modalText2: {
    marginTop: 20,
    textAlign: 'left',
    fontSize: normalize(19)
  },
});
