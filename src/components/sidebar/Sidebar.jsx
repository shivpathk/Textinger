import React, { useEffect, useState } from "react";
import './Sidebar.scss'
import { Avatar, IconButton } from "@mui/material";
import DonutLargeIcon from '@mui/icons-material/DonutLarge';
import ChatIcon from '@mui/icons-material/Chat';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { SearchOutlined } from "@mui/icons-material";
import Sidebarchat from "../sidebarchat/Sidebarchat";
import db from "../../firebase"
import { onValue, ref } from "firebase/database";
import { useStateValue } from "../../StateProvider";


const Sidebar = () => {

    const [rooms , setRooms] = useState([]);
    const [{user} , dispatch] = useStateValue()

    useEffect(()=>{
        const roomRef =  ref(db,"rooms/")
        onValue(roomRef,(snapshot)=>{
            const roomsdata = snapshot.val()
            // console.log("roomd"+roomsdata)
            const roomArray = roomsdata ? Object.entries(roomsdata).map((id,room)=>({id,...room})) : []
            setRooms(roomArray)
        })
    },[])

    return <div className="sidebar">
        <div className="sidebar-header">
            <Avatar src={user?.photoURL}/>
            <h1 className="sidebar-header-user">{(user?.displayName).split(" ")[0]}</h1>
            <div className="sidebar-header-right">
                <IconButton>
                    <DonutLargeIcon />
                </IconButton>
                <IconButton>
                    <ChatIcon />
                </IconButton>
                <IconButton>
                    <MoreVertIcon />
                </IconButton>

            </div>
        </div>
        <div className="sidebar-search">
            <div className="sidebar-search-container">
                <SearchOutlined />
                <input placeholder="Search room or add new room" type="text" />

            </div>
        </div>
        <div className="sidebar-chats">
            <Sidebarchat addNewChat={true}/>
            {rooms.map(room=>(
                <Sidebarchat key={room.id[0]} id={room.id[0]} name={room.id[1].name}/>
            ))}
        </div>
    </div>;
};

export default Sidebar;
