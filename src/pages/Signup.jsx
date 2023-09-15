import React , {useState} from "react";
import { useToast } from '@chakra-ui/react'
import axios from 'axios'
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Input,
  Button,Form
} from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";


const Signup = ({User,isLoggedIn,setIsLoggedIn}) => {
    const [loading,setLoading] = useState(false);
    const [name,setName] = useState("");
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [picUrl,setPicUrl] = useState("");
    const [pic,setPic] = useState();
    const toast =useToast();
    const navigate = useNavigate();
  const divStyle={
    "width":"60vw",
    "minWidth":"400px",
    "backgroundColor":"#FED7D7",
    // "opacity":"0.5",
    "borderRadius":"5%",
    "padding":"3rem",
    
  }

  const handleSubmit = async(e) =>{
    e.preventDefault();
setLoading(true);
if(!name || !email ||!password){
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
  url:"http://localhost:8080/api/createuser",
  config,
  data:{
    name:name,
    email:email,
    password:password,
    pic:picUrl},
    
  });
toast({
  title: "registration successful",
  position:"bottom",
  status: 'success',
  duration: 9000,
  isClosable: true,
})
localStorage.setItem("userInfo",JSON.stringify(data));
setLoading(false);

navigate("/chat");


}catch(err){
  console.log(err);
}

  }

  const setPics=(picture)=>{
    // https://api.cloudinary.com/v1_1/dc9c20w2o
    setLoading(true);
    if(picture===undefined){
      toast({
        title: "please select an image",
        position:"bottom",
        status: 'warning',
        duration: 9000,
        isClosable: true,
      })
    }

    if(picture.type === "image/jpeg" || picture.type === 'image/png'){
      const data = new FormData();
      data.append("file",picture);
      data.append("upload_preset","gdsc-chat-app");
      data.append("cloud_name","dc9c20w2o");
      fetch(`https://api.cloudinary.com/v1_1/dc9c20w2o/image/upload`,{
        method:"post",
        body:data,
      }).then((res)=>res.json()).then((data)=>{
        const stringUrl = data.url.toString();
        // console.log(stringUrl);
        setPicUrl(()=>stringUrl);
        // console.log(data.url);
        // console.log(picUrl);
        setLoading(false);
      }).catch((err)=>{
        console.log(err);
        setLoading(false);
      });
      
    }
  else{
    toast({
      title: "please select .jpeg or .png file",
      position:"bottom",
      status: 'warning',
      duration: 9000,
      isClosable: true,
    })
    setLoading(false);
  }}

  
  
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
        <FormLabel>Name</FormLabel>
        <Input type="text" required onChange={(e) => {
            setName(e.target.value)
        }} value={name}/>
      </FormControl>
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

      <FormControl>
        <FormLabel>upload Profile Picture</FormLabel>
        <Input type="file" onChange={(e) => {
            setPics(e.target.files[0])
        }} value={pic} />
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
        SignUp
      </Button>
      <div style={{
        "display":"flex",
        "alignItems":"center",
        "justifyContent":"center"

     }}>
        
      <FormLabel style={{"marginTop":"15px"}}>Already an user?</FormLabel>
      <Link to="/login">
      <Button mt={4} colorScheme="teal" type="submit"
      // isLoading={props.isSubmitting}
      >

        Login
      </Button>
        </Link>
      </div>
     </div>
      
        </form>
    </div>
    
        </div>
  );
};

export default Signup;
