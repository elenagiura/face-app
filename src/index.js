import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './App';
import firebase from 'firebase';

var firebaseConfig = {
  apiKey: "AIzaSyDUxjcmVFIcwci7bn4wNKIPw16rCcwzwSg",
  authDomain: "face-app-7a95f.firebaseapp.com",
  projectId: "face-app-7a95f",
  storageBucket: "face-app-7a95f.appspot.com",
  messagingSenderId: "789396404803",
  appId: "1:789396404803:web:be99a42ad2646244ea32f6"
};

firebase.initializeApp(firebaseConfig);

ReactDOM.render(<App />,document.getElementById('root'));

