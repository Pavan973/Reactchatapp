import React ,{useEffect, useState}from 'react';
import MessageHeader from "./MessageHeader/MessageHeader.component"
import MessageContent from "./MessageContent/MessageContent.component"
import MessageInput from "./MessageInput/MessageInput.component"
import firebase from "../../server/firease"
import {connect} from "react-redux"
import {Segment,Comment} from "semantic-ui-react"
import "./Messages.css"

const Messages = (props) => {
    const messageRef = firebase.database().ref('messages');
    const [messageState, setMessageState] = useState([]);
    const [searchTermState, setSearchTerm] =useState("")
    
    useEffect(() =>{
        
        if(props.channel){
            setMessageState([]);
        messageRef.child(props.channel.id).on('child_added',(snap) =>  {
            setMessageState((currentState) =>{
                let updatedState = [...currentState];
                updatedState.push(snap.val());
                return updatedState;
            })
        })
        return () => messageRef.child(props.channel.id).off();
        }
    },[props.channel])

    const displayMessages = () =>{
        let messagesToDisplay = searchTermState ? fiterMessageBySearchTerm() : messageState;
        if(messagesToDisplay.length>0){
          return  messagesToDisplay.map((message) =>{
             return <MessageContent  ownmessage={message.user.id === props.user.uid} key={message.timestamp} message={message} />
            })
        }
    }

    const uniqueusersCount=()=>{
        const uniqueUsers = messageState.reduce((acc,message)=>{
                if(!acc.includes(message.user.name)){
                    acc.push(message.user.name);
                }
                return acc;
        },[])
        return uniqueUsers.length;
    } 

    const searchTermChange =(e) =>{
    const target = e.target;
  setSearchTerm(target.value);
    }
    
const fiterMessageBySearchTerm =()=>{
    const regex = new RegExp(searchTermState,"gi")
    const messages = messageState.reduce((acc,message)=>{
        if((message.content && message.content.match(regex)) || message.user.name.match(regex)){
            acc.push(message);
        }
        return acc;
},[]);
return messages;
}
    return (
        <div>
            <MessageHeader searchTermChange={searchTermChange} channelName={props.channel?.name} uniqueUsers={uniqueusersCount()}/>
            <Segment className="messagecontent">
                <Comment.Group>
               {displayMessages()} 
                </Comment.Group>
            </Segment>
            <MessageInput />
        </div>
    );
}
const mapStateToProps =(state) =>{
    return{
        channel: state.channel.currentChannel,
        user: state.user.currentUser
    }
}

export default connect(mapStateToProps)(Messages);
