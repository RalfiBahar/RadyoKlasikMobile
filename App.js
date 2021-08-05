import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Dimensions, SafeAreaView, Image, TouchableOpacity, Modal } from 'react-native';
import { 
  BackgroundWithImage, 
  HeaderImage, 
  AlbumImage, 
  Gradient, 
  LowerContainer, 
  TextComponent,
  IconsView,
  HamburgerButton,
  MessageButton,
  ChatModal
} from './components'
import { LinearGradient } from 'expo-linear-gradient';
import { 
  AntDesign, 
  Feather,  
  Octicons,
} from '@expo/vector-icons';
import { Audio } from 'expo-av';
import { Asset } from 'expo-asset';
import AppLoading from 'expo-app-loading';
import { normalize } from './helpers'
import AsyncStorage from '@react-native-async-storage/async-storage'
import * as Notifications from 'expo-notifications';

import firebase from './helpers/firebase';
import 'firebase/firestore'

const RED = "#ef5350"
const BLUE = "#4A8EDB"
const WIDTH = Dimensions.get("screen").width
const HEIGHT = Dimensions.get("screen").height

const source = {
  uri: 'http://stream.radiojar.com/bw66d94ksg8uv',
};

export default class App extends React.Component {
  state = {
    playingStatus: "nosound",
    ifHamburgerVisible: false,
    ifVisibleChat: false,
    isReady: false,
    title: "",
    artist: "",
    json: "",
    fontMin: 0,
    pushCode: "",
  };

  async componentDidMount(){

    const hasPush = await AsyncStorage.getItem('hashPush')
    if(!hasPush){
      await AsyncStorage.setItem('hasPush', 'true')
      this.getPushNotificationPermissions()
    }    

    this.timer = setInterval(()=> this.getSongData(), 1000)
  }

  getPushNotificationPermissions = async () => {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;

    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }

    if (finalStatus !== 'granted') {
      return;
    }
    //console.log(finalStatus)
    const push = await Notifications.getExpoPushTokenAsync();
    const id = Math.random().toString(36).substring(7);
    this.storePush(push, id);
    //console.log("Notification Token: ", await Notifications.getExpoPushTokenAsync());
  }

  storePush(pushCode, userId) {
    const db = firebase.firestore();
    db.collection("users").doc(pushCode.data).set({
        push: pushCode,
        id: userId,
      }).then(() => {
      //console.log('User added!');
    });
  }

  async _playRecording() {

    Audio.setAudioModeAsync({
      allowsRecordingIOS: false,
      staysActiveInBackground: true,
      interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DUCK_OTHERS,
      playsInSilentModeIOS: true,
      shouldDuckAndroid: true,
      interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DUCK_OTHERS,
      playThroughEarpieceAndroid: false
    })

    const { sound } = await Audio.Sound.createAsync(
      source,
      {
        shouldPlay: true,
        isLooping: true,
      },
      this._updateScreenForSoundStatus,
    );
    this.sound = sound;
    this.setState({
      playingStatus: 'playing'
    });
  }
  
  _updateScreenForSoundStatus = (status) => {
    if (status.isPlaying && this.state.playingStatus !== "playing") {
      this.setState({ playingStatus: "playing" });
    } else if (!status.isPlaying && this.state.playingStatus === "playing") {
      this.setState({ playingStatus: "donepause" });
    }
  };
  
  async _pauseAndPlayRecording() {
    if (this.sound != null) {
      if (this.state.playingStatus == 'playing') {
        //console.log('pausing...');
        await this.sound.pauseAsync();
        //console.log('paused!');
        this.setState({
          playingStatus: 'donepause',
        });
      } else {
        //console.log('playing...');
        await this.sound.playAsync();
        //console.log('playing!');
        this.setState({
          playingStatus: 'playing',
        });
      }
    }
  }

  async _cacheResourcesAsync() {
    const images = [require('./assets/LogoDesign.png'), require('./assets/1.png'), require('./assets/streamImage.png'), require('./assets/splash.png')];

    const cacheImages = images.map(image => {
      return Asset.fromModule(image).downloadAsync();
    }); 
    return Promise.all(cacheImages);
  }
  
  _syncPauseAndPlayRecording() {
    if (this.sound != null) {
      if (this.state.playingStatus == 'playing') {
        this.sound.pauseAsync();
      } else {
        this.sound.playAsync();
      }
    }
  }
  
  _playAndPause = () => {
    switch (this.state.playingStatus) {
      case 'nosound':
        this._playRecording();
        break;
      case 'donepause':
      case 'playing':
        this._pauseAndPlayRecording();
        break;
    }
  }

  async getSongData(){
    fetch('http://www.radiojar.com/api/stations/bw66d94ksg8uv/now_playing/', {method: "GET"})
     .then((response) => response.json())
     .then((responseData) =>
     {
        //console.log(responseData);
        if(responseData !== this.state.json){
            this.setState({json: responseData})
        }
     })
     .catch((error) => {
         console.error(error);
     });
  }

  playStopIcon() {
    if(this.state.playingStatus == "nosound"){
      return(
        <TouchableOpacity onPress={this._playAndPause}>
          <AntDesign name="playcircleo" size={80} color={BLUE} />
        </TouchableOpacity>
      )}
    if(this.state.playingStatus == "playing"){
    return(
      <TouchableOpacity onPress={this._playAndPause}>
        <Feather name="stop-circle" size={80} color={BLUE} />
      </TouchableOpacity>
    )
    }
    else{
      return(
        <TouchableOpacity onPress={this._playAndPause}>
          <AntDesign name="playcircleo" size={80} color={BLUE} />
        </TouchableOpacity>
      )
    }
  }

  render(){
    if (!this.state.isReady) {
      return (
        <AppLoading
          startAsync={this._cacheResourcesAsync}
          onFinish={() => this.setState({ isReady: true })}
          onError={console.warn}
        />
      ); 
    }
    return (
      <SafeAreaView style={styles.container}>
        <BackgroundWithImage />
        <Gradient />
        <HeaderImage />
        {/* Hamburger Modal*/}
        <ChatModal ifVisibleChat={this.state.ifVisibleChat} onPress={() => {
          this.setState({ifVisibleChat: false})
          }}/>
        <Modal
        animationType="slide"
        transparent={true}
        visible={this.state.ifHamburgerVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>

              <Text style={styles.modalText}>Get to know us!</Text>
              <View style={{color: "#000", height: 0.01, width: Dimensions.get("window").width*0.8, borderWidth: 4, borderColor: "black", borderRadius: 10}}></View>
              
              <Text style={styles.modalText2}>This is an online radio for classical music lovers presented by a father and son.{"\n"}{"\n"}

              All classical music enthusiasts are welcome to listen to this radio 24/7. Our live interactive sessions are on Sundays from 10.00 to 12.00 AM.{"\n"}{"\n"}

              E-Mail: radyoklasik01@gmail.com
              </Text>

              <Image 
              style={{width: WIDTH*0.7, height:300, marginTop: -20, alignSelf:"center",resizeMode: "contain", borderRadius: 100}}
              source={require("./assets/streamImage.png")}/>

              <TouchableOpacity
              style={{ ...styles.openButton, 
                backgroundColor: RED, 
                position: "relative",
                bottom: 20
              }}
              onPress={() => {
                this.setState({ ifHamburgerVisible: false })
              }}>
              <Text style={styles.textStyle}>Hide Panel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      {/* End - Hamburger Modal*/}

        <AlbumImage imgAddress={this.state.json.thumb}/>
        
        <LowerContainer>
          
          <TextComponent variant='title'>
            {this.state.json.title}
          </TextComponent>
          <TextComponent variant='subtitle'>
            {this.state.json.artist}
          </TextComponent>

          <IconsView>
            <HamburgerButton onPress={() => {this.setState({ ifHamburgerVisible: true })}}/>
              {this.playStopIcon()}
            <MessageButton onPress={() => {
              this.setState({ ifVisibleChat: true })
          }} />
          </IconsView>

        </LowerContainer>

        <StatusBar style="auto" />
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
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

