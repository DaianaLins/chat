import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import axios from 'axios'
import { AllUsersRoute } from "../utils/APIRoute";
import Contact from "../components/Contact";

const Chat = () => {
  const navigate = useNavigate();
  const [contacts, setContacts] = useState([]);
  const [currentUser, setCurrentUser] = useState(undefined);
  const [currentChat, setCurrentChat] = useState(undefined);

  const getContacts = async () =>{
    if(currentUser){
      if(currentUser.isAvatarImageSet){
        const data = await axios.get(`${AllUsersRoute}/${currentUser._id}`)
        setContacts(data.data)
      } else {
        navigate("/setAvatar")
      }
    }
  }
  
    useEffect(()=>{
      getContacts()
    }, [currentUser])
  
  const getCurrentUser = async () =>{
    setCurrentUser(await JSON.parse(localStorage.getItem("chat-app-user")));
  } 

  useEffect(() => {
    if (!localStorage.getItem("chat-app-user")) navigate("/login");
    else getCurrentUser();
  }, []);

  const handleChatChange = (chat) =>{
    setCurrentChat(chat);
  }

  return (
    <Container>
      <div className="container">
        <Contact contacts={contacts} currentUser={currentUser} changeChat={handleChatChange} />
      </div>
    </Container>
  );
};

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-color: #131324;

  .container{
    height: 85vh;
    width: 85vw;
    background-color:#00000076;
    display: grid;
    grid-template-columns: 25% 75%;

    @media screen and (min-width: 720px) and (max-width: 1080px){
      grid-template-columns: 35% 65%;
    }
  }
`;
export default Chat;
