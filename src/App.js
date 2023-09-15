import './App.css';
// import { Button, ButtonGroup } from '@chakra-ui/react'
import {Route,Routes,BrowserRouter as Router} from 'react-router-dom';
import Home from './pages/Home';
import Chat from './pages/Chat';
import Login from './pages/Login';
import Signup from './pages/Signup';
import { useEffect, useState } from 'react';


function App() {

  // getting all users if user is logged in
const [user,setUser] = useState();
const [isLoggedIn,setIsLoggedIn] = useState(false);
const [selectedChat,setSelectedChat] = useState();
const [chats,setChats] = useState();


useEffect(()=>{
const userdata = localStorage.getItem("userInfo")
const userd = JSON.parse(userdata);
if(userd){
  setIsLoggedIn(true);
  // console.log(userd.authToken.data.user);
  setUser(userd.authToken?.data.user)
 
}



},[isLoggedIn])
  return (
    <>
  

    <Routes>

      <Route exact path="/" element={<Home User={user} isLoggedIn = {isLoggedIn} setIsLoggedIn={setIsLoggedIn} selectedChat={selectedChat} setSelectedChat={setSelectedChat} chats={chats} setChats={setChats} /> } index/>
      <Route exact path="/chat" element={<Chat User={user} isLoggedIn = {isLoggedIn} setIsLoggedIn={setIsLoggedIn}  selectedChat={selectedChat} setSelectedChat={setSelectedChat} chats={chats} setChats={setChats}  />} />
      <Route exact path="/login" element={<Login User={user} isLoggedIn = {isLoggedIn} setIsLoggedIn={setIsLoggedIn}  selectedChat={selectedChat} setSelectedChat={setSelectedChat} chats={chats} setChats={setChats}  />} />
      <Route exact path="/signup" element={<Signup User={user} isLoggedIn = {isLoggedIn} setIsLoggedIn={setIsLoggedIn}  selectedChat={selectedChat} setSelectedChat={setSelectedChat} chats={chats} setChats={setChats}   />} />

    </Routes>

   
    </>
  );
  
}

export default App;


// {"success":true,"authToken":{"data":{"user":{"id":"64fc146928d90cff01f20721"}},"jwtSecret":"mynameismokamboandiamnothappylol"}}

// {"_id":"64fcb406310e7593f5e00559","name":"ytredsasdfg","email":"yhgfdsasd@schj.jhgfd","password":"$2a$10$fXqj5uPKIDmoLlrtIEtnKu9.3C9Wes5dw4.8ax1dUMYjyK5EdTOWu","token":"myUser"}