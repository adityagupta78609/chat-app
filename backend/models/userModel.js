import mongoose from "mongoose";
// import avatar from ""

const userSchema = mongoose.Schema({
    name:{
        type:String,
        trim:true,
        required:true

    },
    email:{
        type:String,
        reuired:true,
        trim:true
    },
    password:{
        type:String,
        required:true,
        trim:true
    },
    profile:{
        type:String,
        required:true,
        default:"../utils/avatar.png"
    }
});
const User = mongoose.model("User",userSchema);
export default User 
