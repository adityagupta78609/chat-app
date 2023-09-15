import { Avatar, Box, Text } from '@chakra-ui/react'
import React from 'react'

const UserListItem = ({handleFunction,user}) => {
  return (
    <Box
    onClick={()=>handleFunction(user)}
    cursor="pointer"
    bg="#E8E8E8"
    _hover={{
        background:"#3882AC",
        color:"white"
    }}
    w="100%"
    display="flex"
    alignItems="center"
    color="black"
    px={3}
    py={2}
    mb={2}
    borderRadius="lg"
    >

<Avatar mr={2} size="sm" cursor="pointer" name={user.name} 
src={user.profile}
/>
<Box>
    <Text>{user.name}</Text>
    <Text fontSize="xs">
        <b>
            email:
        </b>
            {user.email}
    </Text>
</Box>

    </Box>
  )
}

export default UserListItem;
