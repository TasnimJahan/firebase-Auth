import { useState } from "react";

function practice() {
    const [user,setUser]= useState({
        isSignedIn:false,
        userName:'',
        email:'',
        password:'',
        photo:''
      })


      //Handle blur
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


      //Handle submit
      const handleSubmit = (e)=>{
        e.preventDefault(); 
        console.log(user.email, user.password, user.userName);
        if(newUser && user.email && user.password){
          firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
            .then((userCredential) => {
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
              console.log(userCredential);
              var oldUser = userCredential.user;
              console.log(oldUser);
              const newUserInfo = {...oldUser, error:'', success:true}
              setUser(newUserInfo);
              console.log(user);
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

    //   User Name update
      const updateUserName = userName =>{
        var user = firebase.auth().currentUser;
          user.updateProfile({
            displayName: userName,
          }).then(function() {
            console.log("User successfully updated");
          }).catch(function(error) {
            console.log(error);
          });
      }
      

}