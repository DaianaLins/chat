import React, { useState, useEffect } from "react";
import { FormContainer } from "./styles";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../../assets/logo.svg";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import { registerRoute } from "../../utils/APIRoute";

const Register = () => {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  useEffect(()=>{
    if(localStorage.getItem('chat-app-user')) navigate('/')
  }, [])


  const handleSubmit = async (event) => {
    event.preventDefault();
    if (handleValidation()) {
      const { password, confirmPassword, email, username } = values;
      const { data } = await axios.post(registerRoute, {
        username,
        email,
        password,
      });

      if (data.status === false) toast.error(data.msg, toastOptions);
      if (data.status === true) {
        localStorage.setItem("chat-app-user", JSON.stringify(data.user));
        navigate("/");
      }
    }
  };

  const handleValidation = () => {
    const { password, confirmPassword, email, username } = values;

    if (password !== confirmPassword) {
      toast.error("As senhas não conferem", toastOptions);
      return false;
    } else if (username.length < 3) {
      toast.error("Nome de usuário muito curto", toastOptions);
      return false;
    } else if (email.length < 3) {
      toast.error("Email inválido", toastOptions);
      return false;
    } else if (password.length < 8) {
      toast.error("A senha deve ter ao menos 8 caracteres", toastOptions);
      return false;
    } else if (email === "") {
      toast.error("Email obrigatório", toastOptions);
      return false;
    } else if (username === "") {
      toast.error("Nome de usuário obrigatório", toastOptions);
      return false;
    }
    return true;
  };

  const handleChange = (event) => {
    event.preventDefault();
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  return (
    <>
      <FormContainer>
        <form onSubmit={(event) => handleSubmit(event)}>
          <div className="brand">
            <img src={Logo} alt="" />
            <h1>snappy</h1>
            <input
              type="text"
              placeholder="Nome de usuário"
              name="username"
              onChange={(e) => handleChange(e)}
            />
            <input
              type="email"
              placeholder="Email"
              name="email"
              onChange={(e) => handleChange(e)}
            />
            <input
              type="password"
              placeholder="Senha"
              name="password"
              onChange={(e) => handleChange(e)}
            />
            <input
              type="password"
              placeholder="Confirme senha"
              name="confirmPassword"
              onChange={(e) => handleChange(e)}
            />
            <button type="submit">Registar</button>
            <span>
              Ja tem uma conta? <Link to="/login">Login</Link>
            </span>
          </div>
        </form>
      </FormContainer>

      <ToastContainer />
    </>
  );
};


export default Register;
