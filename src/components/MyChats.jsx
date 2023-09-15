import { Box, Button, Stack, Text, useToast } from '@chakra-ui/react'
import axios from 'axios';
import React, { useEffect } from 'react'
import AddIcon from './AddIcon';
import { getsender } from '../config/ChatLogic';
import GroupChatModal from './GroupChatModal';

const MyChats = ({User,isLoggedIn,setIsLoggedIn,chats,setChats,selectedChat,setSelectedChat,setFetchAgain,fetchAgain}) => {


    const toast = useToast();

    const fetchChats =async() => {
        try{
            const config = {
                headers:{
                    "Accept": "*/*",
                    "Content-Type": "application/json"
                },
            }
            console.log(User);

            const {data} = await axios.get("http://localhost:8080/api/chat",{userId:User.id},config);
            setChats(data);

        }catch(err){
            console.log(err);
            toast({
                title: {err},
                position:"left top",
                status: 'warning',
                duration: 9000,
                isClosable: true,
              })
        }
    }

    useEffect(()=>{
        fetchChats();
    },[fetchAgain])


    console.log(chats);


  return (
    <div>
      
      <Box 
      display={{base:selectedChat ?"none":"flex" , md:"flex"}} 
      flexDir="column"
      alignItems="center"
      p={3}
      bg="white"
      w="auto"
      ml={3}
      
      h="100%"
      borderRadius="lg"
      borderWidth="1px"
      >
<Box 
display="flex"
justifyContent="space-between"
alignItems="center"
fontSize={{base:"28px" , md:"30px"}}
px={3}
pb={3}
w="100%"

>
   <p style={{
    "padding":"0px 1em"
   }}>
     My Chats
    </p>

    <GroupChatModal  User={User} chats={chats} setChats={setChats} isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}  >
<Button
display="flex"
fontSize={{base:"17px" , md:"10px" , lg:"17px"}}
rightIcon={<AddIcon/>}
>Create a group chat</Button>
</GroupChatModal>
</Box>

<Box
display="flex"
flexDir="column"
p={3}
bg="#F8F8F8"
w="100%"
h="100%"
borderRadius="lg"
overflowY="hidden"
>
{chats?(
<Stack
overflowY="scroll"
// h="100px"
>
    {
        chats.map((chat)=>(

            <Box
            onClick={()=>setSelectedChat(chat)}
            cursor="pointer"
            bg={selectedChat === chat ? "#38B2AC" : "#E8E8E8"}
            color={selectedChat === chat ? "white" : "black"}
            px={3}
            py={2}
            borderRadius="lg"
            key={chat._id}
            >
            
                
                {
                    chat.isGroupChat === false ? 
                    (<Text>{chat.users[0].name}</Text>)
                    :(<Text>{chat.chatName}</Text>)
                }
                 
            </Box>
        )
        )
    }

</Stack>
):(
    <></>
)
}

</Box>
      </Box>
    </div>
  )


}

export default MyChats
