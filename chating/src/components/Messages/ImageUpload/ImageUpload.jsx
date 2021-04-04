import React, { useState } from 'react';
import {Modal, Input, Button, Icon} from "semantic-ui-react"
import mime from "mime-types"
 export const ImageUpload = (props) => {

const [fileState,setfileState] = useState(null);
const acceptedtypes = ["image/png", "image/jpeg"]
const onFileAdded= (e) =>{
    const file=e.target.files[0];
    if(file){
        setfileState(file);
    }
}
const submit =() => {
 if(fileState && acceptedtypes.includes(mime.lookup(fileState.name))){
     props.uploadImage(fileState,mime.lookup(fileState.name))
     props.onClose();
     setfileState(null)
 }
}

    return (
        <>
            <Modal open={props.open} onClose={props.onClose}>
                <Modal.Header>Select a Image</Modal.Header>
              <Modal.Content>
                  <Input type="file" name="file" onChange={onFileAdded} label="all type"/>
              </Modal.Content>
            <Modal.Actions>
                <Button onClick={submit}>
               <Icon name="checkmark"/> Add
                </Button>
                <Button onClick={props.onClose}>
                <Icon name="remove" /> cancel
                </Button>
            </Modal.Actions>
            
            </Modal>
        </>
    );
}


