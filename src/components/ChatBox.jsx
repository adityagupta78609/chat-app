import { Box } from '@chakra-ui/react'
import React from 'react'
import SingleChat from './SingleChat'

const ChatBox = ({User,isLoggedIn,setIsLoggedIn,chats,setChats,selectedChat,setSelectedChat,setFetchAgain,fetchAgain}) => {





  return (
    <Box 
    display={{
      base:selectedChat ? "flex" : "none",md:"flex"
    }}
    mx={3}
    style={{
      "width":"100%"
    }}
    p={3} alignItems="center" flexDir="column"
    bg="white"
    borderRadius="lg"
    borderWidth="1px"
    >
      <SingleChat User={User} isLoggedIn = {isLoggedIn} setIsLoggedIn={setIsLoggedIn}  selectedChat={selectedChat} setSelectedChat={setSelectedChat} chats={chats} setChats={setChats} fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
      
    </Box>
  )
}

export default ChatBox
