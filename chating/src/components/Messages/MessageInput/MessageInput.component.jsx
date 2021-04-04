import React,{useState}from 'react';
import {Segment, Input, Button } from "semantic-ui-react"
import firebase from "../../../server/firease"
import {connect} from "react-redux"
import {ImageUpload} from "../ImageUpload/ImageUpload"
import { uuidv4 } from 'uuidv4';
const MessageInput = (props) => {
     const messageRef = firebase.database().ref('messages')
     
     const [messageState, setMessageState] = useState(" ")

     const [fileDialogState, setFiledialog] = useState(false)

     const storageRef=firebase.storage().ref();
const createMessageInfo =(downloadurl) =>{
    return{
        user:{
            avatar: props.user.photoURL,
            name:props.user.displayName,
            id: props.user.uid
        },
        content: messageState,
        image: downloadurl || ``,
        timestamp: firebase.database.ServerValue.TIMESTAMP
    }
}


     const sendMessage = (downloadurl) =>{
     if(messageState || downloadurl ){
         messageRef.child(props.channel.id)
         .push()
         .set(createMessageInfo(downloadurl))
         .then(() => setMessageState(""))
         .catch((err) => console.log(err))
     }
     }
     const onMessageChange = (e) => {
         const target = e.target;
         setMessageState(target.value)
     }

    const createActionButtons =() =>{
        return <>
            <Button icon="send" onClick={()=>{sendMessage()}}/>
            <Button icon="upload" onClick={() => setFiledialog(true)}/>
        </>
    }

    const uploadImage =(file,contentType) => {
   const filepath =`chat/images/${uuidv4()}.jpg`;
   storageRef.child(filepath).put(file,{contentType:contentType})
   .then((data) =>{
       data.ref.getDownloadURL()
       .then((url)=>{
        sendMessage(url);
       })
       .catch((err)=>console.log(err));
   })
   .catch((err) => console.log(err)); 

}

    return (
        <Segment>
           <Input onChange={onMessageChange}
            fluid={true} name="message" value={messageState}
           label={createActionButtons()}
           labelPosition="right"
           />
           <ImageUpload uploadImage={uploadImage} open={fileDialogState} onClose={()=> setFiledialog(false)}/>
        </Segment>
    );
}
const mapStateToProps = (state) =>{
    return{
        user: state.user.currentUser,
        channel: state.channel.currentChannel
    }
}

export default connect(mapStateToProps)(MessageInput);
