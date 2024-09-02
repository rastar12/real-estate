import express from 'express';
import mongoose from 'mongoose'
import userRouter from './routes/user.route.js'
import authRouter from './routes/auth.route.js'
import cookieParser from 'cookie-parser';
import listingRouter from './routes/listing.route.js'
import path from 'path';
import dotenv from "dotenv"

dotenv.config();

mongoose.connect("mongodb+srv://eugenechanzu:1234554321@cluster0.7uclu7x.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0").then(()=>{
    console.log("connected to mongodb");
}).catch((err)=>{
    console.log(err);
})


const __dirname = path.resolve();
const app=express ();
app.use(express.json());
app.use(cookieParser());


app.listen(3000,()=>{ 
    console.log("connected to port 3000");
}
);



app.use('/api/user',userRouter);
app.use('/api/auth',authRouter);
app.use('/api/listing',listingRouter);

app.use(express.static(path.join(__dirname,'/client/dist')));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'));
  });

    

app.use((err, req, res,next)=>{
    const statusCode=err.statuscode || 500;
    const message =err.message || 'internal server error';
    return res.status(statusCode).json({
        Success: false,
        statusCode,
        message,
    })
})



