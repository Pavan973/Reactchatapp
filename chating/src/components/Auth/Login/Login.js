import React,{useState}from 'react';
import { Button,Form,Grid,Segment,Message} from 'semantic-ui-react'
import Logingo from "../logingo"
import firebase from "../../../server/firease";
import {Link} from "react-router-dom"
import {Sidebar} from "semantic-ui-react"
import "./side.css"

const Login = () => {
    let user={
       
        email :'',
        password :'',
      
    }

    const color={
        color:"white"
    }
    let errors =[];
    const [userState, setUserState] = useState(user);
    const [error, seterror]=useState(errors);
    const [isLoading,setIsLoading] =useState(false);
    const handleInput = (event) =>{
        let target = event.target;
        setUserState((currentState)=>{
            let currentuser= { ...currentState };
            currentuser[target.name]=target.value;
            return currentuser;
        })
        }
        const onSubmit = (event) => {
            setIsLoading(true);
           
            seterror(()=>[])
            if(checkForm()){
              firebase.auth()
              .signInWithEmailAndPassword(userState.email,userState.password)
              .then(user =>{
                setIsLoading(false);
              console.log(user);
              }).catch(servererror => {
                setIsLoading(false);
                seterror((error) => error.concat(servererror));
            } )
            }
        }
        const checkForm = () => {
            if(isFormEmpty()){
             seterror((error) => error.concat({message: "enter all your fields"}))
                return false
            }
           
            return true;
         }
         const isFormEmpty = () =>{
             return  !userState.password.length  || !userState.email.length;
         }
         const formatErrors = () =>{
            return  error.map((errorst,index)=> <p key={index}>{errorst.message}</p>)
          }

    return (
        <>
      <Sidebar vertical visible width="very thin" className="sides"></Sidebar>
      <Grid verticalAlign="middle" textAlign="center" style={{margin:"50px"}}>
         <Grid.Column style={{maxWidth:"500px"}}>   
           <Logingo />
             <Form onSubmit={onSubmit}>
                 <Segment stacked>
                 
                 <h1>Welcome back </h1>
                     
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
              <Button content='Login' secondary  disabled={isLoading} loading={isLoading} className="login"/><br></br>
             
                 
                 </Segment> <h5> Don't have an account?</h5>
                 <Button basic color='black'  style={{margin:"10px"}}><Link to="/forgot">Forgot password</Link></Button>
          
              <Button color='red'><Link to="/register" style={color}>SIGN UP</Link></Button>
             </Form>

            {error.length>0 && <Message error >
            <h3>errors</h3>
            {formatErrors()}
            </Message>
            }
            
         </Grid.Column>
            
        </Grid>
    
        </>
    );
}

export default Login;
