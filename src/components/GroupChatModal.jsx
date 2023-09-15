import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useRef, useState } from "react";
import UserListItem from "./UserListItem";
import UserBadgeItem from "./UserBadgeItem";

const GroupChatModal = ({
  children,
  User,
  isLoggedIn,
  setIsLoggedIn,
  chats,
  setChats,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [groupChatName, setGroupChatName] = useState();
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [searchResult, setSearchResult] = useState([]);
  const closeRef = useRef();
  const toast = useToast();

  const handleSearch = async (query) => {
    if (!query) {
      return;
    }

    try {
      const config = {
        headers: {
          Accept: "*/*",
          "Content-Type": "application/json",
        },
      };
      //   url:"http://localhost:8080/api/login",

      const { data } = await axios.get(
        `http://localhost:8080/api/getusers?search=${query}`,
        config
      );

      console.log(data);
      // setChats(data);
      setSearchResult(data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleSubmit = async() => {
    if(!groupChatName || !selectedUsers){
        toast({
            title: "please fill all fields",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "top",
        })
    }else{

        try{
            const config = {
                headers: {
                  Accept: "*/*",
                  "Content-Type": "application/json",
                },
              };
            const {data} = await axios.post("http://localhost:8080/api/chat/group",{
                name:groupChatName,
               
                users:JSON.stringify(selectedUsers.map((u)=>u._id)),
        },
        config)
            console.log(data);

            setChats([...chats,data])
            toast({
                title: `group ${groupChatName} is created `,
            status: "success",
            duration: 5000,
            isClosable: true,
            position: "top",
            })
            
            document.querySelector(".closeButton").click();
            // console.log("called");
        } 
        catch(err){
            console.log(err);
        }

    }
  };

  const handleGroup = (userToAdd) => {
    if (selectedUsers.includes(userToAdd)) {
      toast({
        title: "user already selected",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
      return;
    } else {
      setSelectedUsers([...selectedUsers, userToAdd]);
    }
  };

  const handlDelete = (userToDelete) => {
    setSelectedUsers(selectedUsers.filter(sel => sel._id != userToDelete._id))
  };

  return (
    <div>
      <>
        <span onClick={onOpen}>{children}</span>

        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader
              display="flex"
              justifyContent="center"
              alignItems="center"
            >
              Create Group Chat
            </ModalHeader>
            <ModalCloseButton />
            <ModalBody display="flex" flexDir="column" alignItems="center">
              <form
                style={{
                  width: "100%",
                }}
              >
                <FormControl mb={3}>
                  <Input
                    type="text"
                    placeholder="Chat Name"
                    value={groupChatName}
                    onChange={(e) => setGroupChatName(e.target.value)}
                  />
                </FormControl>
                <FormControl mb={3}>
                  <Input
                    type="text"
                    placeholder="Add Users e.g. John"
                    onChange={(e) => handleSearch(e.target.value)}
                  />
                </FormControl>
              </form>

              {/* render searched users */}
              <Box 
                display="flex"
                flexWrap="wrap"

                width="100%"
                
                >
                {selectedUsers?.map((user) => (
                  <UserBadgeItem
                    key={user._id}
                    user={user}
                    handleFunction={() => {
                      handlDelete(user);
                    }}
                  ></UserBadgeItem>
                ))}
              </Box>

              <Box width="100%" overflow="auto" height="40vh">
                {loading ? (
                  <div>loading....</div>
                ) : (
                  searchResult?.map((user) => (
                    <UserListItem
                      key={user?._id}
                      user={user}
                      handleFunction={() => {
                        handleGroup(user);
                      }}
                    >
                      {" "}
                    </UserListItem>
                  ))
                )}
              </Box>
            </ModalBody>

            <ModalFooter
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <Button colorScheme="blue" onClick={handleSubmit}>
                Create Chat
              </Button>
              <Button className="closeButton" colorScheme="blue" onClick={onClose}>
                Close
              </Button>
              {/* <Button variant='ghost'>Secondary Action</Button> */}
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
    </div>
  );
};

export default GroupChatModal;
