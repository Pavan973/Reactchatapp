import React from 'react';
import { Button,Form,Grid,Segment} from 'semantic-ui-react'
import "../Forgot/forgot.css"
import {Sidebar} from "semantic-ui-react"
const Forgot = () => {
    
    return (
        <>
        <Sidebar vertical visible width="very thin" className="sides"></Sidebar>
        <Grid verticalAlign="middle" textAlign="center" style={{marginTop:"50px"}}>
         <Grid.Column style={{maxWidth:"500px"}}>
            <Form >
                 <Segment stacked>
                 
                 <h1>Registered email </h1>
                     
                      <Form.Input
                      name="email"
                    
                      icon="mail"
                      iconPosition="left"
                      
                      type="email"
                      placeholder="enter email address"
                     />
                     
              <Button content='SEND' secondary  className="send"/><br></br><br></br>
             
              <Button color='red' className="cancel">CANCEL</Button>
                 </Segment> 
          
              
             </Form>
             </Grid.Column>
            
        </Grid>
    
        </>
    );
}

export default Forgot;
