import React from 'react';
import {Side} from "./components/sidebar/Side"
import Messages from "./components/Messages/Messages.component"
import {Grid} from "semantic-ui-react"
import './App.css'
function App() {
  return (
   <Grid columns="equal">
     <Side />
     <Grid.Column className="messagepanel">  
     <Messages />
     </Grid.Column>

     <Grid.Column width={3}>
     <span>
      </span>
     </Grid.Column>
</Grid>
   
  );
}

export default App;
