import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container } from "./styles";
import axios from "axios";
import { AllUsersRoute } from "../../utils/APIRoute";
import Contact from "../../components/Contact";
import Welcome from "../../components/Welcome";
import ChatContainer from "../../components/ChatContainer";

const Chat = () => {
  const navigate = useNavigate();
  const [contacts, setContacts] = useState([]);
  const [currentUser, setCurrentUser] = useState(undefined);
  const [currentChat, setCurrentChat] = useState(undefined);
  const [isLoaded, setIsLoaded] = useState(false)

  const getContacts = async () => {
    if (currentUser) {
      if (currentUser.isAvatarImageSet) {
        const data = await axios.get(`${AllUsersRoute}/${currentUser._id}`);
        setContacts(data.data);
      } else {
        navigate("/setAvatar");
      }
    }
  };

  useEffect(() => {
    getContacts();
  }, [currentUser]);

  const getCurrentUser = async () => {
    setCurrentUser(await JSON.parse(localStorage.getItem("chat-app-user")));
    setIsLoaded(true);
  };

  useEffect(() => {
    if (!localStorage.getItem("chat-app-user")) navigate("/login");
    else getCurrentUser();
  }, []);

  const handleChatChange = (chat) => {
    setCurrentChat(chat);
  };

  return (
    <Container>
      <div className="container">
        <Contact
          contacts={contacts}
          currentUser={currentUser}
          changeChat={handleChatChange}
        />
        {isLoaded && currentChat === undefined ? (<Welcome currentUser={currentUser} />) : (
          <ChatContainer currentChat={currentChat} />
        )}
        
      </div>
    </Container>
  );
};


export default Chat;
