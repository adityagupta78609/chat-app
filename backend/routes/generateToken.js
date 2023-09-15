import { configDotenv } from "dotenv";
import * as Jwt from "jsonwebtoken";

configDotenv();
const {sign} = Jwt;
const jwtSecret =process.env.PRIVATEKEY; 

 const generateToken = (id)=>{
    const token = sign({"_id": `${id}` },jwtSecret,{
        expiresIn:"30d"
    });
    console.log(token);
    return token;
}
export default generateToken;