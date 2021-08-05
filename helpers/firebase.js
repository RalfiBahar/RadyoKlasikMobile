import * as firebase from 'firebase'
import 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyCauv_PIpAVb3Nk7K2EsZVg4xkJczQsl8U",
    authDomain: "radyoklasikchat.firebaseapp.com",
    projectId: "radyoklasikchat",
    storageBucket: "radyoklasikchat.appspot.com",
    messagingSenderId: "59650327186",
    appId: "1:59650327186:web:0708b7fa0e4e668dd21c4b"
  };

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig)
}

export default firebase;