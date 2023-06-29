import React, {useEffect, useState, useRef} from "react";
import { Container } from "./styles";
import Logout from "../Logout";
import ChatInput from "../ChatInput";
import Messages from "../Messages/Messages";
import { getAllMessagesRoute, sendMenssageRoute, host } from "../../utils/APIRoute";
import axios from "axios";
import {v4 as uuidv4} from "uuid";

const ChatContainer = ({ currentChat, currentUser, socket }) => {
  const [messages, setMessages]= useState([])
  const [arrivalMessage, setArrivalMessage]= useState(null)
  const scrollRef = useRef();

  const handleSendMsg = async (msg) =>{
    socket.current.emit("send-msg", {
      to: currentChat._id,
      from: currentUser._id,
      msg
    });
    await axios.post(sendMenssageRoute,{
      from: currentUser._id,
      to: currentChat._id,
      message: msg,
    })

    const msgs = [...messages];
    msgs.push({ fromSelf: true, message: msg });
    setMessages(msgs);
  }


  useEffect(()=>{
    if(socket.current){
      socket.current.on("msg-received", (msg) =>{
        console.log(msg)
        setArrivalMessage({fromSelf: false, message: msg});
      })
    }
  }, [socket.current])
  useEffect(()=>{
    arrivalMessage && setMessages((prev) => [...prev, arrivalMessage])
  }, [arrivalMessage])

  useEffect(()=>{
    scrollRef.current?.scrollIntoView({behaviour: "smooth"})
  },[messages])

  const getMessages = async () =>{
      const response = await axios.get(getAllMessagesRoute, {params: {
        from: currentUser._id, 
        to: currentChat._id
      }})
      setMessages(response.data)
  }

  useEffect(()=>{
    if(currentChat){
      getMessages()
    }
  },[currentChat])

  return (
    <>
      {currentChat && (
        <Container>
          <div className="chat-header">
            <div className="user-details">
              <div className="avatar">
                <img
                  src={`data:image/svg+xml;base64,${currentChat.avatarImage}`}
                  alt="avatar"
                />
              </div>
              <div className="username">
                <h3>{currentChat.username}</h3>
              </div>
            </div>
            <Logout />
          </div>
          <div className="chat-messages">
            {
              messages.map((message)=>{
                return(
                  <div ref={scrollRef} key={uuidv4()}>
                    <div className={`message ${message.fromSelf ? "sended" : "received"}`}>
                      <div className="content">
                        <p>
                          {message.message}
                        </p>
                      </div>
                    </div>
                  </div>
                )
              })
            }
          </div>
          {/* <Messages /> */}
          <ChatInput handleSendMsg={handleSendMsg} />
        </Container>
      )}
    </>
  );
};


export default ChatContainer;
