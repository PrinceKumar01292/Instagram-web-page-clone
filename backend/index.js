import express, { urlencoded } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import connectDB from "./utils/db.js";
import userRoute from "./routes/user.route.js";
import postRoute from "./routes/post.route.js";
import messageRoute from "./routes/message.route.js";

dotenv.config({});
console.log("MONGO_URI from env:", process.env.MONGO_URI);
const PORT=process.env.PORT || 3000;

const app=express();
app.get("/",(_,res)=>{
    return res.status(200).json({
        message:"I m comeing from backend",
        success:true,
    })
})
//middlewear
app.use(express.json());
app.use(cookieParser());
app.use(urlencoded({extended:true}));

const corsOption={
    origin:'http://localhost:5173',
    credentials:true,
}
app.use(cors(corsOption));

//yah par api ayengi
app.use("/api/v1/user",userRoute);
app.use("/api/v1/post",postRoute);
app.use("/api/v1/message",messageRoute);
// "http://localhost:8000/api/v1/user/register"




app.listen(PORT,()=>{
    connectDB();
    console.log(`Server listen at port ${PORT}`);

})