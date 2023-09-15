import  express  from "express";
import { configDotenv } from "dotenv";
import mongoose from 'mongoose'
import User from '../models/userModel.js'
import Chat from '../models/chatModel.js'

configDotenv();
const chatRouter = express.Router();

// create a chat
chatRouter.post('/',async (req,res)=>{

    const {userId} = req.body;

    if(!userId){
        console.log("user id not sent with request");
        res.status(400).json("user id not sent with request")
    }

    var isChat = await Chat.find({
        isGroupChat:false,
        $and:[
            {users:{$elemMatch:{$eq:req.body.user._id}}},
            {users:{$elemMatch:{$eq:userId}}},
        ]
    }).populate("users","-password")
    .populate("latestMessage");

    isChat = await User.populate(isChat,{
        path:'latestMessage.sender',
        select:'name profile email',
    })
    
    if(isChat.length > 0){
        res.send(isChat[0]);
    }else{
        var chatData = {
            chatName:'sender',
            isGroupChat:false,
            users:[req.body.user._id,userId],
        }

        try{

            const createdChat = await Chat.create(chatData);
            const fullChat = await Chat.findOne({
                _id:createdChat._id
            }).populate(
                "users",
                "-password"
            );

            res.send(fullChat)

        }catch(err){
            console.log(err);
        }

    }
})


// get all chats
chatRouter.get('/',async (req,res)=>{

    const {userId }= req.body;
    // req.body.user._id
    try{
        Chat.find({users:{$elemMatch:{$eq:userId}}}).populate("users","-password").populate("groupAdmin","-password").populate("latestMessage").then((result)=>res.send(result))
    }catch(err){
        console.log(err);
    }

})

// create a group
chatRouter.post('/group',async (req,res)=>{

    if(!req.body.users || !req.body.name){
       return res.send("enter all fields");
    }

    var users = JSON.parse(req.body.users);
    // it is a array of _id


    if(users.length <2){
        return res.send("aatleast 2 members")
    }

    users.push(req.body.user);

    try{
        const groupChat = await Chat.create({
            chatName:req.body.name,
            users:users,
            isGroupChat:true,
            groupAdmin:req.body.user,
        })

        const fullChatGroup = await Chat.findOne({
            _id:groupChat.id
        }).populate("users","-password").populate("groupAdmin","-asword");

        res.send(fullChatGroup)
    }catch(err){
        console.log(err);
    }
})

// rename a group
chatRouter.put('/rename',async (req,res)=>{

    const chatName = req.body.chatName;
    const chatId = req.body.chatId;
try{

    let updatedChat = await Chat.findByIdAndUpdate(
        chatId,
        {
            chatName : chatName
        },{
            new:true,
        }
        ).populate("users","-password").populate("groupAdmin","-password");
        res.send(updatedChat)
       
        
    }catch(err){
        console.log(err);
    }

})
// add a group
chatRouter.put('/groupAdd',async (req,res)=>{
const chatId = req.body.chatId;
const userId = req.body.user;

const added = await Chat.findByIdAndUpdate(chatId,{
    $push:{users:userId}},
    {new:true}
).populate("users","-password").populate("groupAdmin","-password");

res.send(added)




})
// remove a group
chatRouter.put('/groupremove',async (req,res)=>{
    const chatId = req.body.chatId;
    const userId = req.body.user;
    
    const removed = await Chat.findByIdAndUpdate(chatId,{
        $pull:{users:userId}},
        {new:true}
    ).populate("users","-password").populate("groupAdmin","-password");
    
    res.send(added)
})



export default chatRouter;