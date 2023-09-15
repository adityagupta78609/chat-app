import React, { useState } from "react";
import { Avatar, Box, Button, Menu, MenuButton, MenuDivider, MenuItem, MenuList, Text, Tooltip, useDisclosure } from "@chakra-ui/react";
import BellIcon from "./BellIcon";
import ChevronDown from "./ChevronDown";
import { ChatState } from "../context/ChatProvider";
import ProfileModal from "./ProfileModal";
import { useNavigate } from "react-router-dom";

import DrawerExample from "./Drawer";
import axios from "axios";

const SideDrawer = ({User,isLoggedIn,setIsLoggedIn,chats,setChats,selectedChat,setSelectedChat}) => {
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingChat, setLoadingChat] = useState(false);
  const [SearchedUsers,setSearchedUsers] = useState([]);


  // const {user
    // ,setSelectedChat,selectedChat,chats,setChats
  // } = ChatState();

  const navigate = useNavigate();
      const { isOpen, onOpen, onClose } = useDisclosure()

  const logOutHandler = () =>{
    localStorage.removeItem("userInfo");
    setIsLoggedIn(false);
    navigate('/login');
  }
// console.log(SearchedUsers);
  const accessChat = async(user) => {
try{
  setLoadingChat(true);

  const config = {
    headers:{
        "Accept": "*/*",
        "Content-Type": "application/json"
    },
}
//   url:"http://localhost:8080",

const {data} = await axios.post(`http://localhost:8080/api/chat`,{user:User,userId:user._id},config);
// console.log(User);
// console.log(user._id);
// console.log(data);
setSelectedChat(data)
// setSearchedUsers(response)
setLoading(false)


}catch(err){
  console.log(err);
}
  }
  return (
    <div>
      
      <Box style={{
          "display":"flex",
          "justifyContent":"space-between",

          "alignItems":"center",
          "bg":"white",
          "w":"100%",
          "p":"5px 10px 5px 10px",
          "borderWidth":"5px"
        }}
      >
        <Tooltip label="search Users to chat" hasArrow placement="bottom">
          <Button variant="ghost" onClick={onOpen}>
                <i class="fas fa-search"/>
                <Text px="4" d={{base:"none",md:"flex"}}>
                    Search User
                </Text>
          </Button>
        </Tooltip>
        <Text>
            Chat-App
        </Text>
        <div>
            <Menu>
                <MenuButton p={1}>
                <BellIcon/>
                </MenuButton>
            </Menu>
            <Menu>
                <MenuButton as ={Button} rightIcon = {
                    <ChevronDown/>
                }>
                    <Avatar size="sm" cursor="pointer" name={User.name} src={User.profile}></Avatar>

                </MenuButton>
                <MenuList>
                    <ProfileModal User={User} >

                    <MenuItem >
                    My Profile
                    </MenuItem>
                    </ProfileModal>
                    <MenuDivider/>
                    <MenuItem onClick={()=>{
                        logOutHandler();
                    }} >
                    LogOut
                    </MenuItem>
                </MenuList>
            </Menu>
        </div>
      </Box>

      <DrawerExample isOpen={isOpen} onOpen={onOpen} onClose={onClose} accessChat={accessChat} 
      SearchedUsers={SearchedUsers} setSearchedUsers={setSearchedUsers} User={User} isLoggedIn = {isLoggedIn} setIsLoggedIn={setIsLoggedIn}  selectedChat={selectedChat} setSelectedChat={setSelectedChat} chats={chats} setChats={setChats} 
      />
    </div>
  );
};

export default SideDrawer;
