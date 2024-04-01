import express from 'express';
import cors from 'cors';    
import cookieParser from 'cookie-parser';
import { errorHandler } from './middlewares/error.middlewares.js';
import morgan from "morgan"

const app=express();

app.use(cors({
    // origin:'http://localhost:3000',
    origin:process.env.CORS_ORIGIN || process.env.FRONTEND_URL,
    credentials:true,
}));
app.use(express.json({limit:"16kb"}));
app.use(express.urlencoded({extended:true,limit:"16kb"}));
app.use(express.static("public"));
app.use(cookieParser());
app.use(morgan("dev"))

import userRoutes from "../src/routes/user.routes.js"

app.use("/api/v1/users",userRoutes)

app.use(errorHandler)
export {app}