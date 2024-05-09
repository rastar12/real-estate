import express from 'express';
import mongoose from 'mongoose'
import userRouter from './routes/user.route.js'

mongoose.connect("mongodb+srv://eugenechanzu:1234554321@cluster0.7uclu7x.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0").then(()=>{
    console.log("connected to mongodb");
}).catch((err)=>{
    console.log(err);
})


const app=express ();
app.listen(3000,()=>{ 
    console.log("connected to port 3000");
}
);

app.use('/api/user',userRouter);


