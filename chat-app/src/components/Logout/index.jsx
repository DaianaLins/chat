import React from 'react';
import { Button } from './styles';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {BiPowerOff} from 'react-icons/bi'

const Logout = () => {

  const navigate = useNavigate();

  const handleClick = async  () =>{
    localStorage.clear();
    navigate('/login');
  }

  return(
    <Button onClick={handleClick}>
      <BiPowerOff />
    </Button>
  );
}

export default Logout;