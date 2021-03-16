import firebase from 'firebase'
import 'firebase/auth'
import 'firebase/storage'
import 'firebase/database'

var firebaseConfig = {
    apiKey: "AIzaSyA9-Q53m63_o07oMBeXqEl9QQIq-16bl70",
    authDomain: "chatting-12f4a.firebaseapp.com",
    projectId: "chatting-12f4a",
    storageBucket: "chatting-12f4a.appspot.com",
    messagingSenderId: "257127028069",
    appId: "1:257127028069:web:e392c57fd8086f6c737d8c",
    measurementId: "G-B0J338WZ6H"
  };

  firebase.initializeApp(firebaseConfig);
  firebase.analytics();

  export default firebase;