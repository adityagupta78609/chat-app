import React,{useState} from "react";
import { useNavigate,Link } from "react-router-dom";
import { useToast } from '@chakra-ui/react';
import axios from 'axios';
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Input,
  Button,Form
} from "@chakra-ui/react";



const Login = ({User,isLoggedIn,setIsLoggedIn}) => {
  const [loading,setLoading] = useState(false);
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const toast =useToast();
  const navigate = useNavigate();
  setIsLoggedIn(false);

  const divStyle={
    "width":"60vw",
    
    "backgroundColor":"#FED7D7",
    // "opacity":"0.5",
    "borderRadius":"5%",
    "minWidth":"400px",
    "padding":"3rem",
    
  }

  const handleSubmit = async(e) =>{
    e.preventDefault();
setLoading(true);
if(!email ||!password){
  toast({
    title: "enter all details",
    position:"bottom",
    status: 'warning',
    duration: 9000,
    isClosable: true,
  })
}

try{
const config = {
  headers:{
    "Accept": "*/*",
    "Content-Type": "application/json"
  },
};

const {data} = await axios({
  method:"post",
  url:"http://localhost:8080/api/login",
  headers:{
    "Accept": "*/*",
    "Content-Type": "application/json"
  },
  data:{
    
    email:email,
    password:password,
    },
    
  });
toast({
  title: "login successful",
  position:"bottom",
  status: 'success',
  duration: 9000,
  isClosable: true,
})
localStorage.setItem("userInfo",JSON.stringify(data));
setIsLoggedIn(true);
setLoading(false);

navigate("/chat");


}catch(err){
  console.log(err);
  
}
setLoading(false);
  }

  console.log(email,password)
  return (
    <div style={{
      "display":"flex",
      "backgroundColor":"white",
      "justifyContent":"center",
      "alignItems":"center",
      "height":"100vh"
    }}>

    <div style={divStyle}>

      <form>

    
      <FormControl>
        <FormLabel>Email address</FormLabel>
        <Input type="email" required onChange={(e) => {
            setEmail(e.target.value)
        }} value={email}/>
        {/* <FormHelperText>We'll never share your email.</FormHelperText> */}
      </FormControl>
      <FormControl>
        <FormLabel>Password</FormLabel>
        <Input type="password" required minLength={8} onChange={(e) => {
            setPassword(e.target.value)
        }} value={password}/>
      </FormControl>
      
      <div style={{
        "display":"flex",
        "alignItems":"center",
        "justifyContent":"space-between"

     }}>
     <Button mt={4} colorScheme="teal" type="submit"
      isLoading={loading}
      onClick={(e)=>{handleSubmit(e)}}
      >
        Login
      </Button>
      <div style={{
        "display":"flex",
        "alignItems":"center",
        "justifyContent":"center"

     }}>
        
      <FormLabel style={{"marginTop":"15px"}}>New user?</FormLabel>
      <Link to="/signup">
      <Button mt={4} colorScheme="teal" type="submit"
      // isLoading={props.isSubmitting}
      >

        Signup
      </Button>
        </Link>
      </div>
     </div>
        </form>
    </div>
        </div>
  );
};

export default Login;
