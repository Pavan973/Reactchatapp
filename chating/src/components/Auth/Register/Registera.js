import React,{useState}from 'react';
import { Button,Form,Grid,Segment,Message} from 'semantic-ui-react'
import firebase from "../../../server/firease";
import {Sidebar} from "semantic-ui-react"
import "./Registera.css"

const Registera = () => {
    let user={
        username:'',
        email :'',
        password :'',
        confirmPassword:''
    }
    
    let errors =[];
    let userCollectionRef =firebase.database().ref('users');
   const [userState, setUserState] = useState(user);
   const [error, seterror]=useState(errors);
   const [isLoading,setIsLoading] =useState(false);
   const [isSuccess ,setSuccess] = useState(false);



    const handleInput = (event) =>{
    let target = event.target;
    setUserState((currentState)=>{
        let currentuser= { ...currentState };
        currentuser[target.name]=target.value;
        return currentuser;
    })
    }
const checkForm = () => {
   if(isFormEmpty()){
    seterror((error) => error.concat({message: "enter all your fields"}))
       return false
   }
   else if(!checkPassword()){
    seterror((error) => error.concat({message: "fill the password correct"}))
       return false;
   }
   return true;
}
const isFormEmpty = () =>{
    return !userState.username.length || !userState.password.length || !userState.confirmPassword.length || !userState.email.length;
}
const checkPassword =() => {
    if(userState.password.length < 8){
        seterror((error) => error.concat({message: "fill the password greater than 8"}))
        return false
    }
    else if(userState.password !== userState.confirmPassword){
        seterror((error) => error.concat({message: "both should be same"}))
        return false;
    }
    return true
}
const onSubmit = (event) => {
    setIsLoading(true);
    setSuccess(false)
    seterror(()=>[])
    if(checkForm()){
      firebase.auth()
      .createUserWithEmailAndPassword(userState.email,userState.password)
      .then(createduser =>{
        setIsLoading(false);
        updateuserDetail(createduser);
      }).catch(servererror => {
        setIsLoading(false);
        seterror((error) => error.concat(servererror));
    } )
    }
}

const updateuserDetail =(createduser) =>{
    if(createduser){
        setIsLoading(true);
        createduser.user.updateProfile({
            displayName: userState.username,
            photoURL:`https://gravatar.com/avatar/${createduser.user.uid}?d=identicon`
        }).then(()=>{
            setIsLoading(false);
            saveUserInDB(createduser)
        }).catch((servererror)=>{
            setIsLoading(false);
            seterror((error) => error.concat(servererror));
        })
    }
}

const saveUserInDB = (createduser) => {
    setIsLoading(true);
    userCollectionRef.child(createduser.user.uid).set({
        displayName: createduser.user.displayName,
        photoURL:createduser.user.photoURL
    }).then(()=>{
        setIsLoading(false);
       setSuccess(true)
    }).catch(servererror =>{
        setIsLoading(false);
        seterror((error) => error.concat(servererror));
    })
}

const formatErrors = () =>{
  return  error.map((errorst,index)=> <p key={index}>{errorst.message}</p>)
}
    return (
        <>
        <Sidebar vertical visible width="very thin" className="sides"></Sidebar>
        <Grid verticalAlign="middle" textAlign="center" style={{margin:"100px"}}>
         <Grid.Column style={{maxWidth:"500px"}}>
         <h1>Register</h1>
             <Form onSubmit={onSubmit}>
                 <Segment stacked>

                     <Form.Input
                      name="username"
                      value={userState.username}
                      icon="user"
                      iconPosition="left"
                      onChange={handleInput}
                      type="text"
                      placeholder="enter name"
                     />
                      <Form.Input
                      name="email"
                      value={userState.email}
                      icon="mail"
                      iconPosition="left"
                      onChange={handleInput}
                      type="email"
                      placeholder="enter email address"
                     />
                     <Form.Input
                      name="password"
                      value={userState.password}
                      icon="lock"
                      iconPosition="left"
                      onChange={handleInput}
                      type="password"
                      placeholder="password"
                     />
                     <Form.Input
                      name="confirmPassword"
                      value={userState.confirmPassword}
                      icon="lock"
                      iconPosition="left"
                      onChange={handleInput}
                      type="password"
                      placeholder="Password"
                     />

              <Button content='Register' secondary  disabled={isLoading} loading={isLoading} size="large" className="register"/>
                 </Segment>
             </Form>

            {error.length>0 && <Message error >
            <h3>errors</h3>
            {formatErrors()}
            </Message>
            }
            {isSuccess && <Message success >
            <h3>sucessfully Register</h3>
            </Message>
            }

            
         </Grid.Column>
            
        </Grid>
        </>
    );
}

export default Registera;
