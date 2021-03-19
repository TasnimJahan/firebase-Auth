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


//   const [title, setTitle] = useState('');
//   const [user, setUser] = useState({
//     isSignedIn: false,
//     name: '',
//     email:'',
//     photo: ''
//   })

//   const provider = new firebase.auth.GoogleAuthProvider();
//   const handleSignIn = () =>{
//     firebase.auth().signInWithPopup(provider)
//     .then(res => {
//       const {displayName, photoURL, email} = res.user;
//       const signedInUser = {
//         isSignedIn: true,
//         name: displayName,
//         email: email,
//         photo: photoURL
//       }
//       setUser(signedInUser);
//       console.log(displayName, email, photoURL);
//     })
//     .catch(err => {
//       console.log(err);
//       console.log(err.message);
//     })
//   }

//   const handleSignOut = () => {
//     firebase.auth().signOut()
//     .then(res => {
//       const signedOutUser = {
//         isSignedIn: false, 
//         name: '',
//         phot:'',
//         email:'',
//         password:'',
//         error:'',
//         isValid:false,
//         existingUser: false
//       }
//       setUser(signedOutUser);
//       console.log(res);
//     })
//     .catch( err => {

//     })
//   }

//   const is_valid_email = email =>  /(.+)@(.+){2,}\.(.+){2,}/.test(email); 
//   const hasNumber = input => /\d/.test(input);
  
//   const switchForm = e =>{
//     const createdUser = {...user};
//     createdUser.existingUser = e.target.checked;
//     setUser(createdUser);
//   }
//   const handleChange = e =>{
//     const newUserInfo = {
//       ...user
//     };
//     //debugger;
//     // perform validation
//     let isValid = true;
//     if(e.target.name === 'email'){
//       isValid = is_valid_email(e.target.value);
//     }
//     if(e.target.name === "password"){
//       isValid = e.target.value.length > 8 && hasNumber(e.target.value);
//     }

//     newUserInfo[e.target.name] = e.target.value;
//     newUserInfo.isValid = isValid;
//     setUser(newUserInfo);
//   }

//   const createAccount = (event) => {
//     if(user.isValid){
//       firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
//       .then(res => {
//         console.log(res);
//         const createdUser = {...user};
//         createdUser.isSignedIn = true;
//         createdUser.error = '';
//         setUser(createdUser);
//       })
//       .catch(err => {
//         console.log(err.message);
//         const createdUser = {...user};
//         createdUser.isSignedIn = false;
//         createdUser.error = err.message;
//         setUser(createdUser);
//       })
//     }
//     event.preventDefault();
//     event.target.reset();
//   } 

//   const signInUser = event => {
//     if(user.isValid){
//       firebase.auth().signInWithEmailAndPassword(user.email, user.password)
//       .then(res => {
//         console.log(res);
//         const createdUser = {...user};
//         createdUser.isSignedIn = true;
//         createdUser.error = '';
//         setUser(createdUser);
//       })
//       .catch(err => {
//         console.log(err.message);
//         const createdUser = {...user};
//         createdUser.isSignedIn = false;
//         createdUser.error = err.message;
//         setUser(createdUser);
//       })
//     }
//     event.preventDefault();
//     event.target.reset();
//   }
// console.log(title);
//   return (
//     <div className="App">
//       {
//         user.isSignedIn ? <button onClick={handleSignOut} >Sign out</button> :
//         <button onClick={handleSignIn} >Sign in</button>
//       }
//       {
//         user.isSignedIn && <div>
//           <p> Welcome, {user.name}, {title}</p>
//           <p>Your email: {user.email}</p>
//           <img src={user.photo} alt=""></img>
//         </div>
//       }
//       <h1>Our own Authentication</h1>
//       <input type="checkbox" name="switchForm" onChange={switchForm} id="switchForm"/>
//       <label htmlFor="switchForm"> Returning User</label>
//       <form style={{display:user.existingUser ? 'block': 'none'}} onSubmit={signInUser}>
//         <input type="text" onBlur={handleChange} name="email" placeholder="Your Email" required/>
//         <br/>
//         <input type="password" onBlur={handleChange} name="password" placeholder="Your Password" required/>
//         <br/>
//         <input type="submit" value="SignIn"/>
//       </form>
//       <form style={{display:user.existingUser ? 'none': 'block'}} onSubmit={createAccount}>
//       <input type="text" onChange={event => setTitle(event.target.value)} onBlur={handleChange} name="name" placeholder="Your Name" required/>
//         {/* <input type="text" onBlur={handleChange} name="name" placeholder="Your Name" required/> */}
//         <br/>
//         <input type="text" onBlur={handleChange} name="email" placeholder="Your Email" required/>
//         <br/>
//         <input type="password" onBlur={handleChange} name="password" placeholder="Your Password" required/>
//         <br/>
//         <input type="submit" value="Create Account"/>
//       </form>
//       {
//         user.error && <p style={{color:'red'}}>{user.error}</p>
//       }
//     </div>
//   );



const [title, setTitle] = useState('');
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
          console.log(user);

          updateUserName(User.userName);
          const newUserInfo = {...user , error :'' , success : true};
          setUser(newUserInfo);
          console.log(user);
          // updateUserName(user.userName);
          console.log(user.userName);
        })
        .catch((error) => {
          var errorCode = error.code;
          var errorMessage = error.message;
          console.log(errorCode , errorMessage);
          const newUserInfo = {...user, error: errorMessage , success: false};
          setUser(newUserInfo);
        });
      console.log("Form submitted");
    }

    if(!newUser && user.email && user.password){
      console.log(user.userName);
      firebase.auth().signInWithEmailAndPassword(user.email, user.password)
        .then((userCredential) => {
          // Signed in
          var user = userCredential.user;
          console.log(user);
          const newUserInfo = {...user, error:'', success:true}
          setUser(newUserInfo);
          console.log(user);
          // ...
        })
        .catch((error) => {
          var errorCode = error.code;
          var errorMessage = error.message;
          const newUserInfo = {...user, error:errorMessage, success:false}
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
          {/* <h3>Welcome, {user.userName}</h3>
          <p>Your mail= {user.email}</p>
          <img src={user.photo} alt=""/> */}
        </div>
      }

      <h1>Our Own authentication</h1>
      <input type="checkbox" onChange={()=>{setNewUser(!newUser)}} name="newUser" id=""/>
      <label htmlFor="newUser">New User Sign up</label>
      <p>Name: {user.userName}</p>
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
