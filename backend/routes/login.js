import  express  from "express";
import { configDotenv } from "dotenv";
import * as Jwt from "jsonwebtoken";
import bcryptjs from "bcryptjs";
import User from "../models/userModel.js";
import * as ExpressValidator from "express-validator";

const {sign,verify ,decode} = Jwt;
const { hash, compare } = bcryptjs

const router = express.Router();

const loginRouter = express.Router();
configDotenv();

// secret key used for creating jwt tokens always store in .env
const jwtSecret =process.env.PRIVATEKEY; 
// console.log(jwtSecret);
// inbuilt validator
const { body, validationResult,check } = ExpressValidator


loginRouter.post('/login',
body('email',"incorrect email").isEmail(),
body('password',"incorrect password").isLength({min: 8}),
async(req,res) => {

    const errors = validationResult(req);
if(!errors.isEmpty()){
    return res.status(404).json({errors:errors.array()});
}

try{
  let userData = await User.findOne({
        email:req.body.email,
        
    })

    if(!userData){
        console.log("E-mail not found")
        return res.status(400).json({errors:"E-mail not found"})
    }


  
    const pwdCompare = await compare(req.body.password,userData.password)

    if(!pwdCompare){
        console.log("Incorrect password")
        return res.status(400).json({errors:"Incorrect password"})
    }
    const data = {
        user:{
            id:userData.id,
            email:userData.email,
            profile:userData.profile,
            name:userData.name,
            password:userData.password
        }
    }

    
    // const authToken = sign(data,jwtSecret);
    const authToken = {data,jwtSecret}
    res.json({success:true,authToken:authToken});
    
} catch(errors){
    res.json({success:false,errors:errors});
    console.log(errors)
}
})

export default loginRouter;
