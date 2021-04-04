import React, { useState,useEffect } from 'react';
import firebase from "firebase"
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth"
import App from "../../App"

const Logingo = () => {
    const [isSignedin,setSigned] = useState(null)
   const uiConfig ={
        signInFlow: "popup",
        signInOptions: [
            firebase.auth.GoogleAuthProvider.PROVIDER_ID,
            firebase.auth.FacebookAuthProvider.PROVIDER_ID
        ],
        callbacks:{
           signInSuccessWithAuthResult: () =>{
               return false;
           }
        }
    }
   useEffect(() => {
      const authObserver = firebase.auth().onAuthStateChanged((user) =>{
          setSigned(user)
      })
      return authObserver;
   });
    return (
        <div>
            {
           isSignedin? <App/>:    <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()}/>
            
               
            }
        </div>
    );
}

export default Logingo;
