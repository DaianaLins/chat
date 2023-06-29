import React, {useState, useEffect} from 'react';

import { Container } from './styles';
import Picker from 'emoji-picker-react'
import {IoMdSend} from 'react-icons/io'
import {BsEmojiSmileFill} from 'react-icons/bs'

const ChatInput = ({handleSendMsg}) => {

  const [showEmosjiPicker, setShowEmojiPicker] = useState(false);
  const [msg, setMsg] = useState("");

  const handleEmojiPickerHideShow = () =>{
    setShowEmojiPicker(!showEmosjiPicker)
  }

  const handleEmojiClick = (event, emoji)=>{
    let message = msg;
    message += event.emoji;
    setMsg(message);
  }

  const sendChat = (event) =>{
    event.preventDefault()
    if(msg.length > 0){
      handleSendMsg(msg);
      setMsg('')
    }
  }

  return (
    <Container>
      <div className="button-container">
        <div className='emoji'>
            <BsEmojiSmileFill onClick={handleEmojiPickerHideShow} />
            {
              showEmosjiPicker && <Picker onEmojiClick={handleEmojiClick} />
            }
        </div>
      </div>
      <form className='input-container' onSubmit={(e)=> sendChat(e)} >
        <input type="text" placeholder='Escreva sua mensagem' value={msg} onChange={(e)=> setMsg(e.target.value)} />
        <button className='submit'>
          <IoMdSend />
        </button>
      </form>
    </Container>
  );
}

export default ChatInput;