import React from 'react';
import {Segment,Header,Input,Icon} from "semantic-ui-react"


const MessageHeader = (props) => {
    return (
        <>
           <Segment clearing>
           <Header floated="left" >
             <span>
                  {props.channelName}
                 <Icon name="star outline"/>
             </span>
             <Header.Subheader> {props.uniqueUsers} users </Header.Subheader>
           </Header>
          
           <Header floated="right">        
           <Input name="search" icon="search" placeholder="search messages" size="mini" onChange={props.searchTermChange}/>
           </Header>
           </Segment>
        </>
    )
}

export default MessageHeader;
