import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from"cookie-parser";
import userRouter from './routes/user.routes.js'
import todoRouter from './routes/todo.routes.js'


const app=express();
app.use(cors());
dotenv.config({
    path: './.env'
});
app.use(express.json({limit:"16kb"}))
app.use(express.urlencoded({extended:true,limit:"16kb"}))
app.use(express.static("public"))
app.use(cookieParser())



// routes declaration

app.use("/api/v1/users",userRouter);
app.use("/api/v1/todo",todoRouter);



export {app};