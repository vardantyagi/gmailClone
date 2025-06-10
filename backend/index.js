import express from 'express';
import dotenv from 'dotenv';
import connectDB from './connectDB.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import userRouter from './routes/userRoute.js';
import emailRouter from './routes/emailRoute.js';

dotenv.config({});
connectDB();
const port = process.env.PORT || 3000;
const  app = express();

// middleware
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(cookieParser());

const allowedOptions = ['http://localhost:5173','https://gmail-clone-ashy-phi.vercel.app'];
app.use(cors({origin: allowedOptions, credentials:true}));

// routes
app.use('/api/v1/user', userRouter);
app.use('/api/v1/email', emailRouter);

app.get('/',(req,res)=>{
  res.status(200).json({success: true,message: 'api is working...'});
})

app.listen(port,()=>{
  console.log(`server running at port http://localhost:${port}`);
})