import { Button, IconButton, Image, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text, useDisclosure } from '@chakra-ui/react'
import React from 'react'
import EyeIcon from './EyeIcon';

const ProfileModal = ({User,children}) => {

  const { isOpen, onOpen, onClose } = useDisclosure();
// console.log(User);
  return (
    <>
    {
        children?(<span onClick={
            onOpen
        }>{children}</span>):(
          <IconButton
          onClick={
            onOpen } 
          icon={<EyeIcon />}
          
        />
           
        )
    }

<Modal isOpen={isOpen} onClose={onClose} size="lg" isCentered >
        <ModalOverlay />
        <ModalContent fontSize="40px" d="flex" justifyContent="center" alignItems="center">
          <ModalHeader fontSize="40px" d="flex" justifyContent="center" alignItems="center">
            {User.name}
            </ModalHeader>
          <ModalCloseButton />
          <ModalBody display="flex" justifyContent="space-between" alignItems="center" flexDir="column" >

            <Image borderRadius="full" 
            boxSize="150px"
            src={User.profile}
            alt={User.name}
            ></Image>

           <Text
           fontSize={{base:"28px" , md:"30px"}}
           >
           Email : {User.email}

           </Text>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={onClose}>
              Close
            </Button>
            
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default ProfileModal
