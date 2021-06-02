import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import firebase from "firebase/app";
// import * as firebase from 'firebase/app';
// import * as firebase from 'firebase';
import "firebase/analytics";
import firebaseConfig from './firebase.config';
import { auth } from 'firebase/app'; import 'firebase/auth';

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
  }


function App() {


  const [newUser,setNewUser] = useState(false);
  const [user,setUser]= useState({
    isSignedIn:false,
    userName:'',
    email:'',
    password:'',
    photo:''
  })

  const googleProvider = new firebase.auth.GoogleAuthProvider();
  const fbProvider = new firebase.auth.FacebookAuthProvider();
  const handleSignIn = ()=>{
    firebase.auth().signInWithPopup(googleProvider)
  .then((result) => {
    console.log(result);
    const {displayName, email, photoURL} = result.user;
    const signedInUser = {
      isSignedIn : true,
      userName:displayName,
      email:email,
      photo:photoURL
    }
    setUser(signedInUser);
    console.log(displayName, email, photoURL);
  })
  .catch((error) => {
    console.log(error);
    console.log(error.message);
  })
  }

  const handleSignOut =()=>{
    firebase.auth().signOut()
    .then((res) => {
      const signedOutUser= {
        isSignedIn: false,
        userName:'',
        email:'',
        photo:'',
        error:'',
        success:false
      }
      setUser(signedOutUser);
    })
    .catch((error) => {
      // An error happened.
    });
    // console.log("Sign Out clicked");
  }

  const handleFbSignIn = ()=>{
    firebase
    .auth()
    .signInWithPopup(fbProvider)
    .then((result) => {
      /** @type {firebase.auth.OAuthCredential} */
      var credential = result.credential;

      // The signed-in user info.
      var user = result.user;
      console.log('fb user after signIn=', user);
      // This gives you a Facebook Access Token. You can use it to access the Facebook API.
      var accessToken = credential.accessToken;

      // ...
    })
    .catch((error) => {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // The email of the user's account used.
      var email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      var credential = error.credential;
      console.log('error is', errorMessage);
      // ...
    });
  }

  const handleBlur=(event)=>{     //event er ekhane simply e likha jai.. then, e.target.name , e.target.value
    let isFormValid=true;
    if (event.target.name ==='email') {
      const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      isFormValid =  re.test(String(event.target.value).toLowerCase());
    }
    if (event.target.name === 'password') {
      const isPasswordValid = event.target.value.length >6;
      const passHasNumber = /\d{1}/.test(event.target.value);
      isFormValid = isPasswordValid && passHasNumber;
    }
    if(isFormValid) {
      const newUserInfo = {...user, [event.target.name] : event.target.value};
      setUser(newUserInfo);
      console.log(newUserInfo);
    }
  }

  const handleSubmit = (e)=>{
    e.preventDefault();
    
    console.log(user.email, user.password, user.userName);
    if(newUser && user.email && user.password){
      // console.log(e.target.name , e.target.value);
      firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
        .then((userCredential) => {
          // Signed in 
          var User = userCredential.user;
          console.log(User);
          updateUserName(user.userName);
          const newUserInfo = {...User , error :'' , success : true};
          setUser(newUserInfo);
          console.log(user);
          console.log(user.userName);
        })
        .catch((error) => {
          var errorCode = error.code;
          var errorMessage = error.message;
          console.log(errorCode , errorMessage);
          const newUserInfo = {...User, error: errorMessage , success: false};
          setUser(newUserInfo);
        });
      console.log("Form submitted");
    }

    if(!newUser && user.email && user.password){
      console.log(user.userName);
      firebase.auth().signInWithEmailAndPassword(user.email, user.password)
        .then((userCredential) => {
          // Signed in
          console.log(userCredential);
          var oldUser = userCredential.user;
          console.log(oldUser);
          const newUserInfo = {...oldUser, error:'', success:true}
          setUser(newUserInfo);
          console.log(user);
          // ...
        })
        .catch((error) => {
          var errorCode = error.code;
          var errorMessage = error.message;
          const newUserInfo = {...User, error:errorMessage, success:false}
          setUser(newUserInfo);
          console.log(user);
        });

    }
  }

  const updateUserName = userName =>{
    // console.log(userName);
    var user = firebase.auth().currentUser;

      user.updateProfile({
        displayName: userName,
      }).then(function() {
        console.log("User successfully updated");
      }).catch(function(error) {
        console.log(error);
      });
  }

  return (
    <div className="App">
      {
        user.isSignedIn ? <button onClick={handleSignOut}>Sign Out</button> :
        <button onClick={handleSignIn}>Sign in</button>
      }
      <br/>
      <button onClick={handleFbSignIn}>Sign in with Facebook</button>
      {
        user.isSignedIn && <div>
          <h3>Welcome, {user.userName}</h3>
          <p>Your mail= {user.email}</p>
          <img src={user.photo} alt=""/>
        </div>
      }

      <h1>Our Own authentication</h1>
      <input type="checkbox" onChange={()=>{setNewUser(!newUser)}} name="newUser" id=""/>
      <label htmlFor="newUser">New User Sign up</label>
      <p>Name: {user.userName}</p>
      <p>Name: {user.displayName}</p>
      <p>Email:{user.email}</p>
      <p>password: {user.password}</p>
      <form action="" onSubmit={handleSubmit}>
        {newUser && <input type="text" name="userName" onBlur={handleBlur} placeholder="Your name" />} <br/>
        <input type="text" onBlur={handleBlur} name="email" placeholder="Your Email address" required/><br/>
        <input type="password" onBlur={handleBlur} name="password" id="" placeholder="Your Password" required/><br/>
        <input type="submit" value={newUser ? "Sign Up" : "Sign in"}/>
      </form>
      <h3 style={{color:'red'}}>{user.error}</h3>
      {
        user.success && <h3 style={{color:'green'}}>User {newUser ? 'created' : 'Logged In'} successfully</h3>
      }
    </div>
  );
}

export default App;
