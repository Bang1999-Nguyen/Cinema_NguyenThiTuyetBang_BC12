import  firebase from "firebase"
import 'firebase/auth'
const app = {
  apiKey: "AIzaSyAmuApfY9JwFIly4pV28skOpeCh0BgSmac",
  authDomain: "film-75e37.firebaseapp.com",
  projectId: "film-75e37",
  storageBucket: "film-75e37.appspot.com",
  messagingSenderId: "1075885097882",
  appId: "1:1075885097882:web:364c80d0bbca0b5e4e7023",
  measurementId: "G-RVDXWETCPZ"
  };
  firebase.initializeApp(app)
 export {firebase}