import React,{useEffect} from 'react'
import { useNavigate } from 'react-router-dom';

const Home = ({User,isLoggedIn,setIsLoggedIn}) => {
  const navigate = useNavigate();
  useEffect(()=>{

    if(User){
      navigate("/chat");
    }else{
      navigate('/signup')
    }
  },[])

// console.log(User);
  return (
    <div>
      this is home page my buddy
    </div>
  )
}

export default Home
