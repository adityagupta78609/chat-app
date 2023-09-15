import React, { useContext, useEffect, useState ,createContext} from 'react'

import { useNavigate } from 'react-router-dom';

const ChatContext = createContext();



const ChatProvider = ({children}) => {

    // const navigate = useNavigate();
    const [user,setUser] = useState();
    
    useEffect(()=>{
        const userInfo = localStorage.getItem("userInfo");
        // let userInfo2 = userInfo
        // console.log(userInfo2);
        setUser(userInfo);

        if(!userInfo){
            // navigate("/login");
            // history.pushState('/')
        }

    },[])

  return (
    
    <ChatContext.Provider value = {{user,setUser,
        // selectedChat,setSelectedChat,chats,setChats
    }}>
        {children}
    </ChatContext.Provider>
   
    
  )
}

export const ChatState = () => {
    return useContext(ChatContext);
} 

export default ChatProvider
