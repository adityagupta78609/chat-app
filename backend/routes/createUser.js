import  express  from "express";
import { configDotenv } from "dotenv";
import * as Jwt from "jsonwebtoken";
import bcryptjs from "bcryptjs";
import * as ExpressValidator from "express-validator";
import generateToken from './generateToken.js'
import User from "../models/userModel.js";

const {check,validationRes } = ExpressValidator
const {sign,verify ,decode} = Jwt;
const { hash, compare ,genSalt } = bcryptjs
const { body, validationResult } = ExpressValidator
const router = express.Router();

configDotenv();
const registerRouter = express.Router();
const jwtSecret =process.env.PRIVATEKEY; 
// console.log(jwtSecret);



registerRouter.post('/createuser',
body('email',"incorrect email").isEmail(),
body('password',"incorrect password").isLength({min: 8}),
body('name',"incorrect Name").isLength({min: 4}),
async(req,res) => {

const errors = validationResult(req);
if(!errors.isEmpty()){
    return res.status(404).json({errors:errors.array()});
}


// a salt is a string/helper used to hash the given data
const salt = await genSalt(10);
// console.log(salt);
// hashing password to store it  in hashed form
let securePassword = await hash(req.body.password,salt);



try{
    let userData = await User.findOne({
        email:req.body.email,
        
    })
    if(userData){
        res.send("email already exists try other")
    }else{

        const user = await User.create({
            name:req.body.name,
            password:securePassword,
            email:req.body.email,
            profile:req.body.pic,
            
        })
        if(user){
            
            res.json({
                _id:user._id,
                name:user.name,
                email:user.email,
                profile:user.pic,
                password:user.password,
                token:"myUser"
                // unable to call generate token 
                //showing sign is not a function
            }).status(200);
        }else{
            console.error("cant create user");
        }
    }

    
} catch(error){
    console.log(error);
    res.json({success:false}).status(303);
}
})

export default registerRouter;
