import React, { useEffect, useState } from "react";
import './Chat.scss'
import { Avatar, IconButton } from "@mui/material";
import { AttachFile, InsertEmoticon, Mic, MoreVert } from "@mui/icons-material";
import CallOutlinedIcon from '@mui/icons-material/CallOutlined';
import VideoCallOutlinedIcon from '@mui/icons-material/VideoCallOutlined';
import { useParams } from "react-router-dom";
import { ref, onValue, push, set, serverTimestamp, query, onChildAdded, orderByChild } from "firebase/database";
import db from "../../firebase";
import { useStateValue } from "../../StateProvider";

const Chat = () => {

  const [input, setInput] = useState("")
  const [seed, setSeed] = useState("");
  const { roomId } = useParams();
  const [roomName, setRoomName] = useState("")
  const [{ user }] = useStateValue()
  const [messages, setMessages] = useState([])

  useEffect(() => {
    if (roomId) {
      const roomNameRef = ref(db, 'rooms/' + roomId + '/name');
      onValue(roomNameRef, (snapshot) => {
        setRoomName(snapshot.val());
      });
    }
      const chatlistRef = query(ref(db, `rooms/${roomId}`),orderByChild('timestamp'))
      onValue(chatlistRef,(snapshot)=>{
        const chatdata = snapshot.val()
        const chatArray = chatdata ? Object.entries(chatdata).map((id,chat)=>({id,...chat})) : []
        setMessages(chatArray)
    })
  }, [roomId])

  useEffect(() => {
    setSeed(Math.floor(Math.random() * 5000))
  }, [roomId])

  const sendMessage = (e) => {
    e.preventDefault();
    const roomRef = ref(db, `rooms/${roomId}`)
    const chatRef = push(roomRef)
    set(chatRef, {
      message: input,
      name: (user?.displayName).split(" ")[0],
      email:user?.email,
      timestamp: serverTimestamp(),
    })
    setInput("");
  }


  return <div className="chat">

    <div className="chat-header">
      <Avatar src={`https://api.dicebear.com/7.x/lorelei/svg?seed=${seed}`} />
      <div className="chat-header-info">
        <h3>{roomName}</h3>
        <p>online</p>
      </div>
      <div className="chat-header-right">
        <IconButton>
          <CallOutlinedIcon />
        </IconButton>
        <IconButton>
          <VideoCallOutlinedIcon />
        </IconButton>
        <IconButton>
          <MoreVert />
        </IconButton>
      </div>
    </div>

    <div className="chat-body">
      {messages.map((message) => (<>  {message.id[1].message &&
        <div className={`chat-body-message ${message.id[1].email === user?.email && "chat-sender"}`}>
          <p className="name">
            ~{message.id[1].name}
          </p>
          <p className="message">
            {message.id[1].message}
          </p>
          <p className="time">
            Just now
            {/* {new Date(message.timestamp).getUTCHours()+" : "+new Date(message.timestamp).getUTCMinutes()} */}
          </p>
        </div>}</>))}
    </div>

    <div className="chat-footer">
      <IconButton>
        <InsertEmoticon />
      </IconButton>
      <IconButton>
        <AttachFile />
      </IconButton>
      <form>
        <input value={input} onChange={(e) => setInput(e.target.value)} placeholder="Type a message" type="text" />
        <button onClick={sendMessage} type="submit">Send message</button>
      </form>
      <Mic />
    </div>

  </div>;
};

export default Chat;
