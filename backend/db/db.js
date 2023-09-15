import mongoose from "mongoose";
import { configDotenv } from "dotenv";
configDotenv();


const DATABASE_URL=`mongodb+srv://${process.env.DATABASE_USERNAME}:${process.env.DATABASE_PASSWORD}@cluster0.e1qndje.mongodb.net/?retryWrites=true&w=majority`;


 const connectDB = async()=>{
    try{

        const db = await mongoose.connect(DATABASE_URL,{
            useNewUrlParser:true,
            useUnifiedTopology:true,
            // useFindAndModify:true
        });
        console.log("connected to db");
    }catch(err){
console.log(err);
    }
}
export default connectDB;