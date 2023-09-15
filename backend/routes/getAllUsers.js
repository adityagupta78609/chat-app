import  express  from "express";
import { configDotenv } from "dotenv";
import mongoose from 'mongoose'
import User from '../models/userModel.js'

configDotenv();
const userRouter = express.Router();

userRouter.get('/getusers',async(req,res)=>{
    const keyword = req.query.search ? {
        $or:[
            {name:{$regex:req.query.search ,$options:"i" }},
            {email:{$regex:req.query.search ,$options:"i" }},
        ]
    }:{};
    console.log(keyword);

    const users = await User.find(keyword)
    // .find({_id:{$ne:req.user._id}});
    res.send(users)
})

export default userRouter;