import React, { useState, useEffect } from "react";
import {Container} from './styles'
import { useNavigate } from "react-router-dom";
import loader from "../../assets/loader.gif";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import { setAvatarRoute, apiAvatar } from "../../utils/APIRoute";
import { Buffer } from "buffer";

const Avatar = () => {
  const navigate = useNavigate();
  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  const [avatars, setAvatars] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedAvatar, setSelectedAvatar] = useState(undefined);
  console.log(selectedAvatar)

  const setProfilePicture = async () => {
    if(selectedAvatar === undefined){
      toast.error("Por favor selecione um avatar", toastOptions)
    } else {
      const user = await JSON.parse(localStorage.getItem("chat-app-user"));
      const {data} = await axios.post(`${setAvatarRoute}/${user._id}`,{
        image: avatars[selectedAvatar],
      });
      if(data.isSet){
        user.isAvatarImageSet = true;
        user.avatarImage = data.image;
        await localStorage.setItem("chat-app-user", JSON.stringify(user));
        navigate('/')
      } else {
        toast.error("Erro ao definir avatar. Por favor tente novamente", toastOptions)
      }
    }
  };

  useEffect(()=>{
    if(!localStorage.getItem('chat-app-user')) navigate('/login')
  }, [])
  
  const imagesFun = async () => {
    const data = [];
    for (let i = 0; i < 4; i++) {
      const image = await axios.get(
        `${apiAvatar}/${Math.round(Math.random() * 1000)}`
      );
      const buffer = new Buffer(image.data);
      data.push(buffer.toString("base64"));
    }
    setAvatars(data);
    setIsLoading(false);
  };

  useEffect(() => {
    imagesFun();
  }, []);

  return (
    <>
      {isLoading ? (
        <Container>
          <img src={loader} alt="loader" />
        </Container>
      ) : (
        <Container>
          <div className="title-container">
            <h1>Clique em um avatar para ser o seu</h1>
          </div>
          <div className="avatars">
            {avatars.map((avatar, index) => {
              return (
                <div
                  className={`avatar ${
                    selectedAvatar === index ? "selected" : ""
                  }`}
                >
                  <img
                    src={`data:image/svg+xml;base64,${avatar}`}
                    alt="avatar"
                    key={avatar}
                    onClick={() => setSelectedAvatar(index)}
                  />
                </div>
              );
            })}
          </div>
          <button onClick={setProfilePicture} className="submit-btn">
            Selecione um avatar
          </button>
        </Container>
      )}
      <ToastContainer />
    </>
  );
};



export default Avatar;
