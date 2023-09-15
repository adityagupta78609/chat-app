import { Box, IconButton, Text } from "@chakra-ui/react";
import React from "react";
import ArrowLeft from "./ArrowLeft";
import ArrowRight from "./ArrowRight";
import { getsender } from "../config/ChatLogic";
import EyeIcon from "./EyeIcon";
import ProfileModal from "./ProfileModal";

const SingleChat = ({
  User,
  isLoggedIn,
  setIsLoggedIn,
  chats,
  setChats,
  selectedChat,
  setSelectedChat,
  setFetchAgain,
  fetchAgain,
}) => {
  const ShowProfileModal = () => {};

  return (
    <>
      {!selectedChat ? (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          width="100%"
          height="100%"
        >
          <Text
            fontSize={{
              base: "6xl",
              md: "3xl",
            }}
            color="gray"
          >
            click on a User to start chatting
          </Text>
        </Box>
      ) : (
        <>
        {/* header component of chat start */}
          <Text
            fontSize={{
              base: "20px",
              md: "30px",
            }}
            pb={3}
            px={3}
            w="100%"
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <IconButton
              display={{
                base: "flex",
                md: "none",
              }}
              icon={<ArrowLeft />}
              onClick={() => setSelectedChat("")}
            />
            <Text>
              {console.log(selectedChat)}
              {selectedChat?.isGroupChat ? (
                selectedChat.chatName.toUpperCase()
              ) : (
                <>
                  {/* {getsender(User,selectedChat.users)} */}
                  {selectedChat.users[0].name.toUpperCase()}
                </>
              )}
            </Text>
            {selectedChat?.isGroupChat ? (
              <IconButton
                display={{
                  base: "flex",
                  md: "none",
                }}
                icon={<ArrowRight />}
                onClick={() => setSelectedChat("")}
              />
            ) : (
                <ProfileModal User={selectedChat.users[0]} >
                     <IconButton
                display={{
                  base: "flex",
                  md: "none",
                }}
                icon={<EyeIcon />}
                
              />
                </ProfileModal>
            )}
          </Text>
          {/* header component of chat end */}

                
        </>

      )}
      

    </>
  );
};

export default SingleChat;
