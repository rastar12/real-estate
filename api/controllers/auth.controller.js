import bcryptjs from 'bcryptjs';
import User from '../models/user.model.js'
import { errorHandler } from '../utils/error.js';
import jwt from  'jsonwebtoken'


export const Signup=async(req,res,next)=>{
    const {username,email,password }=req.body;
    const hashedPassword= bcryptjs.hashSync(password,10);
    const newUser=new User({username,email,password: hashedPassword});
    try{
        await newUser.save();
        res.status(201).json("User created succesfully");

    } catch (error){
        next(error);
    }


};

 export const signIn= async (req,res,next)=>{
    const {email,password}=req.body;
    try {
        const validUser= await  User.findOne({email});
        if(!validUser) return next(errorHandler (404,'User not found') );
        const validPassword =bcryptjs.compareSync(password,validUser.password);
        if(!validPassword) return next(errorHandler (404,'Wrong credentials') );
        const token = jwt.sign({ id: validUser._id }, 'your_secret_here'); // Use validUser._id instead of _id
        const {password: pass,... rest}=validUser._doc;

        res
        .cookie('access_token',token,{httpOnly:true})
        .status(200)
        .json(rest)
    } catch (error) {
        next(error);
    }

 }

 export const Google =async(req,res,next)=>{
    try {
        const user=await User.findOne({email: req.body.email})
        if (user){
            const token = jwt.sign({ id: user._id }, 'your_secret_here');
            const {password: pass, ...rest}= user._doc;

            res.cookie('access_token', token, {httpOnly:true})
            .status(200)
            .json(rest)

        }else{
            const generatedPassword=Math.random().toString(36).slice(-8);
            const hashedPassword=bcryptjs.hashSync(generatedPassword,10);
            const newUser =new User ({
                username: req.body.name.split(" ").join("").toLowerCase() +Math.random().toString(36).slice(-4) ,
                email: req.body.email, password:hashedPassword ,
                avatar: req.body.photo
            })
            await newUser.save();
            const token = jwt.sign({ id: newUser._id }, 'your_secret_here');
            const {password:pass,...rest}=newUser._doc;
            res.cookie('access_token', token, {httpOnly:true})
            .status(200)
            .json(rest)

        } 
        
    } catch (error) {
        next(error)
    }
 }

 export const signOut=async(req,res,next)=> {
    try {
        res.clearCookie('Access_token');
        res.status(200).json('User has been logged out');
    } catch (error) {
        next(error);
    }

 }