import React, { useEffect, useState } from "react";
import './Sidebarchat.scss';
import { Avatar } from "@mui/material";
import { onValue, orderByChild, query, ref, set } from "firebase/database";
import db from "../../firebase";
import {useNavigate} from "react-router-dom";

const Sidebarchat = ({id, name ,addNewChat}) => {

  const navigate = useNavigate();

  const [seed , setSeed] = useState("");
  const [messages, setMessages] = useState([])

  useEffect(() => {
    if (id) {
      const chatlistRef = query(ref(db, `rooms/${id}`),orderByChild('timestamp'))
      onValue(chatlistRef,(snapshot)=>{
        const chatdata = snapshot.val()
        // console.log("l",chatdata)
        const chatArray = chatdata ? Object.entries(chatdata).map((idl,chat)=>({idl,...chat})) : []
        setMessages(chatArray)
        // console.log("v",chatArray)
    })}
  }, [id])


  useEffect(()=>{
    setSeed(Math.floor(Math.random()*5000))
  },[])

  const createChat = ()=>{
    const roomName = prompt("Please Enter Name for Room")

    if(roomName){
      set(ref(db,"rooms/" + Date.now()),{
        name:roomName
      }).catch((error)=>{
        alert(error)
      })
    }
  }

  return  !addNewChat ?  (
      <div className="sidebarchat" onClick={()=>navigate(`rooms/${id}`)}>
    <Avatar src={`https://api.dicebear.com/7.x/lorelei/svg?seed=${seed}`}/>
    <div className="sidebarchat-info">
      <h2>{name}</h2>
      <p>{messages[messages.length-2]?.idl[1].message && (messages[messages.length-2]?.idl[1].message)?.substring(0, 25)+'...'}</p>
    </div>
  </div>
  
  ):(
    <div onClick={createChat} className="sidebarchat add-button">
      <h2>Add New Room</h2>
    </div>
  )
};

export default Sidebarchat;
