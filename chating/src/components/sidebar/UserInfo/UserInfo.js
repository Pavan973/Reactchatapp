import React from 'react';
import { Grid,Header,Image,Dropdown} from 'semantic-ui-react';
import {connect} from "react-redux"
import "./UserInfo.css"
import firebase from '../../../server/firease';
const UserInfo = (props) => {
  
    const getDropDownOptions =() => {
        return [{
            key: 'signout',
            text: <span onClick={signout}>Sign Out</span>
        }]
    }
const signout = () =>{
    firebase.auth().signOut().then(()=>console.log("user signed out"))
}

    if(props.user){
    return (
        <Grid>
        <Grid.Column>
            <Header className="name">
            <Dropdown trigger={
                    <span>
                <Image src={props.user.photoURL} avatar></Image>
                    {props.user.displayName}
                </span>
                }
                options={getDropDownOptions()}>
                
            </Dropdown>
                
            </Header>
        </Grid.Column>
            
        </Grid>);
    }
    return null;
}

const mapStateToProps = (state) => {
    return {
        user: state.user.currentUser
}
    }

    
export default connect(mapStateToProps)(UserInfo);
