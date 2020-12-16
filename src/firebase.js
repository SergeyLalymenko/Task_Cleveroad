import firebase from 'firebase'
import 'firebase/storage'

const fire = firebase.initializeApp({
    apiKey: "AIzaSyBQz7DtuIRJfPpffp2g7W6Sdu8AWqZ0VPc",
    authDomain: "react-test-339ff.firebaseapp.com",
    projectId: "react-test-339ff",
    storageBucket: "react-test-339ff.appspot.com",
    messagingSenderId: "216968303967",
    appId: "1:216968303967:web:47cc1a5dc217b60ad312ea"
});
  
const api = firebase.firestore();
const storage = firebase.storage();

export { api, fire, storage }