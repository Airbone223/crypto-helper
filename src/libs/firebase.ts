import Firebase from 'firebase/app'
import 'firebase/storage'
import 'firebase/firestore'
import 'firebase/auth'

type configType = {
    apiKey: string
    authDomain: string
    projectId: string
    storageBucket: string
    messagingSenderId: string
    appId: string
}

const config : configType = {
    apiKey: "AIzaSyBr-w6Lp2xItJO6iAGyTX8uLrJ_60IzbjU",
    authDomain: "your-crypto-helper.firebaseapp.com",
    projectId: "your-crypto-helper",
    storageBucket: "your-crypto-helper.appspot.com",
    messagingSenderId: "345009262320",
    appId: "1:345009262320:web:c62a2608302160e74dfc35"
}

const firebase: Firebase.app.App = Firebase.initializeApp(config)
const { FieldValue } = Firebase.firestore



export { firebase, FieldValue }
