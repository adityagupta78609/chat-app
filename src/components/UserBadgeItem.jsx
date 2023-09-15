import { Avatar, Box, Button, Text } from '@chakra-ui/react'
import React from 'react'

const UserBadgeItem = ({handleFunction,user}) => {
  return (
    <div style={{
        "display":"inline-block"
    }}>
   <Box
    px={2}
    py={1}
    m={1}
    mb={2}
    variant="solid"
    fontSize={12}
    bg="green"
    cursor="pointer"
    onClick={handleFunction}
    color='white'
    borderRadius="lg"
    display="flex" 
    _hover={{
        background:"#3882AC",
        color:"white"
    }}
    justifyContent="space-around"
    alignItems="center"

   >
    {user.name}
    
    <Text ml={1} onClick={handleFunction}>x</Text>

    </Box>
    </div>
  )
}

export default UserBadgeItem
