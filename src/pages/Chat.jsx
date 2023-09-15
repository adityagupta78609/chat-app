import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { ChatState } from '../context/ChatProvider';
import SideDrawer from '../components/SideDrawer';
import { Box } from '@chakra-ui/react';
import MyChats from '../components/MyChats';
import ChatBox from '../components/ChatBox';

const Chat = ({User,isLoggedIn,setIsLoggedIn,chats,setChats,selectedChat,setSelectedChat}) => {
 
const [fetchAgain , setFetchAgain] = useState(false);
// const {user} = ChatState();




  return (
    <Box style={{
      "width":"100%"
  }} 
    >
      
    {User && <SideDrawer User={User} isLoggedIn = {isLoggedIn} setIsLoggedIn={setIsLoggedIn}  selectedChat={selectedChat} setSelectedChat={setSelectedChat} chats={chats} setChats={setChats} />}
    <Box 
    display="flex" justifyContent="center"
      pt={3}  
      pb={3}
    w="100%" 
    h="91.5vh" 
    bg="gray"
    >
      {User && <MyChats User={User} isLoggedIn = {isLoggedIn} setIsLoggedIn={setIsLoggedIn}  selectedChat={selectedChat} setSelectedChat={setSelectedChat} chats={chats} setChats={setChats} fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />}

      {User && <ChatBox User={User} isLoggedIn = {isLoggedIn} setIsLoggedIn={setIsLoggedIn}  selectedChat={selectedChat} setSelectedChat={setSelectedChat} chats={chats} setChats={setChats} fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />}
    </Box>
    </Box>
  )
}

export default Chat
