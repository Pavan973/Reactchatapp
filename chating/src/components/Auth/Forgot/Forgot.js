import React from 'react';
import { Button,Form,Grid,Segment} from 'semantic-ui-react'
import "../Forgot/forgot.css"
const Forgot = () => {
    
    return (
        <>
        <Grid verticalAlign="middle" textAlign="center" style={{margin:"100px"}}>
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
                     
              <Button content='SEND' secondary  className="send"/>
             
              <Button color='red'>CANCEL</Button>
                 </Segment> 
          
              
             </Form>
             </Grid.Column>
            
        </Grid>
    
        </>
    );
}

export default Forgot;
