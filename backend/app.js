import express from "express";
import dotenv from 'dotenv';
import cors from 'cors';
import conn from './conn/conn.js';
import cookieParser from "cookie-parser";
import userApi from './routes/user.js';
import CatApi from './routes/categories.js';
import PodcastApi from './routes/podcast.js';

const app = express();
dotenv.config();
conn();
app.use(cors({
    origin: [
        process.env.FRONTEND_URL, 
        'https://podpulse-39t5-git-main-abhaylodhi24s-projects.vercel.app'
    ],
    credentials: true,
}));

app.use(express.json());
app.use(cookieParser());
app.use("/uploads", express.static("uploads"));

// All routes
app.use("/api/v1",userApi);
app.use("/api/v1",CatApi);
app.use("/api/v1",PodcastApi);
     
app.listen(process.env.PORT   , ()=>{
    console.log(`Server is running on port ${process.env.PORT}`);
});   