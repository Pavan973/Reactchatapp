import React from 'react';
import {Menu} from "semantic-ui-react"
import "./sidebars.css"
import UserInfo from "./UserInfo/UserInfo"
import Channels from "./channel/Channels"
export const Side = () => {
    return (
        <Menu vertical fixed="left" borderless size="large" className="side_bar">
            <UserInfo />
            <Channels/>
        </Menu>
    );
}

