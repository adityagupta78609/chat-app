import React, { useState } from "react";
import {
    Drawer,
    DrawerBody,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
    useDisclosure,
    Input,
    Button,
    Toast,
    useToast,
    Box,
  } from '@chakra-ui/react'
import axios from "axios";
import UserListItem from "./UserListItem";

function DrawerExample({isOpen,onOpen,onClose,accessChat ,setSearchedUsers,SearchedUsers,User,isLoggedIn,setIsLoggedIn,chats,setChats,selectedChat,setSelectedChat}) {
    // const { isOpen, onOpen, onClose } = useDisclosure()
    // const btnRef = React.useRef()
    const [searchtext,setSearchtext] = useState(""); 
    const [loading,setLoading] = useState(false);
    const toast=useToast();
    const searchQuery = async(e) => {
        if(searchtext === ""){
            toast({
                title: "Please enter something ",
                position:"left top",
                status: 'warning',
                duration: 9000,
                isClosable: true,
              })
        }else{

            
            setLoading(true);
            try{
                
    const config = {
        headers:{
            "Accept": "*/*",
            "Content-Type": "application/json"
        },
    }
    //   url:"http://localhost:8080/api/login",
    
    const {data} = await axios.get(`http://localhost:8080/api/getusers?search=${searchtext}`,config);
    
    // console.log(data);
    setSearchedUsers(data)
    setLoading(false)
}catch(err){
    console.log(err);
}
}
}


    return (
      <>
       
        <Drawer
          isOpen={isOpen}
          placement='left'
          onClose={onClose}
        //   finalFocusRef={btnRef}
        >
          <DrawerOverlay />
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader>Search User</DrawerHeader>
  
            <DrawerBody >
                <div style={{
                    "display":"flex",
                    "justifyContent":"space-between",
                    "alignItems":"center"
                }}>

              <Input placeholder='Type here...' onChange={(e) =>{setSearchtext(e.target.value)}} 
              value={searchtext}
              />
              <Button colorScheme='blue' mr={3} ml={3} onClick={()=> {searchQuery();}}>Go</Button>
                </div>

                <Box  borderRadius='md' borderWidth={4} bg='white' color='black' p={4} display="flex" justifyContent="center" alignItems='baseline' flexDir="column" 
                // _loading={loading}
                >

                    {
                        SearchedUsers?.map((user)=>
                            (
                                // <Box borderRadius='md' borderWidth={2} bg='white' color='black' p={2} >
                                 
                                 //{/* {ele.name} */}
                                 
                                  //{/* </Box> */}

                                  <UserListItem
                                   key={user._id} 
                                   user={user} handleFunction ={accessChat}/>

                            )
                        )
                    }
                   
                </Box>
            </DrawerBody>
  
            {/* <DrawerFooter>
              <Button variant='outline' mr={3} onClick={onClose}>
                Cancel
              </Button>
              <Button colorScheme='blue'>Save</Button>
            </DrawerFooter> */}
          </DrawerContent>
        </Drawer>
      </>
    )
  }

  export default DrawerExample;