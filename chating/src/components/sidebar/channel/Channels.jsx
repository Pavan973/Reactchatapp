import React,{useState,useEffect} from 'react';
import "./Channels.css"
import {connect} from "react-redux";
import {Menu,Modal} from "semantic-ui-react";
import { Button,Form,Segment} from 'semantic-ui-react'
import firebase from "../../../server/firease"
import {setChannel} from "../../../store/actioncreator"

const Channels = (props) => {
    const [modalOpenState, setModalOpenState] = useState(false)
    const [channelState, setChannelState] = useState({Name:'',Description:''});
    const [chanelState, setChanelState] = useState([])
   
    const channelRef = firebase.database().ref("channel");

    useEffect(()=>{
     channelRef.on('child_added',(snap)=>{
        setChanelState((currentState) => {
            let updatedState = [...currentState];
         updatedState.push(snap.val());
         return updatedState;
        })
     }) 

     return() => channelRef.off();
    },[])

  useEffect(()=>{
    if(chanelState.length > 0){
        props.selectChannel(chanelState[0])
    }
  },[!props.channel ? chanelState : null])  

    const openModal =() =>{
     setModalOpenState(true);
   }
   const closeModal = () =>{
     setModalOpenState(false)
   }
   
  const displayChannel = () => {
    if(chanelState.length>0){
     return chanelState.map((channel) =>{
        return <Menu.Item key = {channel.id} name={channel.name}
               onClick={() => props.selectChannel(channel)}
               active={props.channel && channel.id === props.channel.id}>
              
               </Menu.Item>
           })
       }
   }
   const onSubmit = () =>{

    if(!validForm()){
        return ;
    }
    const key = channelRef.push().key;
    const channel = {
        id: key,
        name: channelState.Name,
        Description: channelState.Description,
        created_by:{
            name:props.user.displayName,
            avatar:props.user.photoURL
        }
    }
    channelRef.child(key).update(channel).then(() =>{
        setChannelState({Name:'',Description:''})
        closeModal();
    }).catch((error) => {
        console.log(error)
    })
   }

   
const validForm = () =>{
    return channelState && channelState.Name && channelState.Description;
}

    const handleInput =(e) =>{
        let  target = e.target;
        setChannelState((currentState) =>{
            let updateState = {...currentState};
            updateState[target.name] = target.value;
            return updateState;
        })
    }


   return (
        <>
       <Menu.Menu>
           <Menu.Item>
               <span><br></br>
                 <h3>Adding Channels</h3>  
               </span>
               ({chanelState.length})
           </Menu.Item>
          {displayChannel()}
           <Menu.Item>
               <span onClick={openModal} className="pointy">
                  <h4>+  Create your channel</h4> 
               </span>
           </Menu.Item>
       </Menu.Menu>
       <Modal open= {modalOpenState} onClose={closeModal}>
       <Modal.Header>
        create channel
       </Modal.Header>
        <Modal.Content>
        <Form onSubmit={onSubmit}>
                 <Segment stacked>
                  
                      <Form.Input
                      name="Name"
                      value={channelState.Name}
                      onChange={handleInput}
                      type="text"
                      placeholder="Name of the channel"
                     />
                     <Form.Input
                      name="Description"
                      value={channelState.Description}
                      onChange={handleInput}
                      type="text"
                      placeholder="channel description"
                     />
  
                 </Segment> 
             </Form>
       </Modal.Content>
      <Modal.Actions>
      <Button onClick={onSubmit}>Save</Button>
      <Button onClick={closeModal}>Cancel</Button>
      </Modal.Actions>

       </Modal>
       </>
    );
}

const mapStateToprops = (state) =>{
    return{
        user: state.user.currentUser,
        channel: state.channel.currentChannel
    }
}

const mapDispatchToProps = (dispatch) =>{
    return {
        selectChannel: (channel) => dispatch(setChannel(channel))
    }
}

export default connect(mapStateToprops,mapDispatchToProps)(Channels);
