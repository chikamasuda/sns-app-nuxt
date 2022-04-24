import firebase from "firebase/compat/app"
import "firebase/compat/auth"

const fbConfig = {
  apiKey: "AIzaSyCtoHV06m57lQErkRRat3cL53cTIhf4LMU",
  authDomain: "fir-pj-17ad9.firebaseapp.com",
  projectId: "fir-pj-17ad9",
  storageBucket: "fir-pj-17ad9.appspot.com",
  messagingSenderId: "477244423834",
  appId: "1:477244423834:web:0ed0ca260dff120e25a923",
  measurementId: "G-VX9VVEP5TF"
};
firebase.initializeApp(fbConfig)

export default firebase