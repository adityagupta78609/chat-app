import { configDotenv } from "dotenv";
import  express  from "express";
import connectDB from "./db/db.js"
import loginRouter from './routes/login.js'
import registerRouter from './routes/createUser.js'
import getAllUsers from './routes/getAllUsers.js'
import chatRouter from './routes/chatRoutes.js'

const app= express();
configDotenv();
const port =process.env.PORT||5000;

connectDB();

app.use((req,res,next)=>{
    res.setHeader("Access-Control-Allow-Origin",
    // "http://localhost:3000"
    "*"
    );
    
    res.header(
        "Access-Control-Allow-Headers",
        "Origin , X-Requested-With,Content-Type,Accept"
    );
    
    next();
    })
app.get('/' , (req,res) => {
    res.status(200).send("hello")
        
})


app.use(express.json())
app.use('/api',registerRouter)
app.use('/api',loginRouter)
app.use('/api',getAllUsers)
app.use('/api/chat',chatRouter)




app.listen(port,()=>{
console.log("listening on port : ", port);
})