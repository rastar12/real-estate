import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    PhoneNumber:{
        type:Number,
        default:0, 
    },
    password:{
        type:String,
        required:true,
    },
    avatar:{
        type:String,
        default:"https://media.istockphoto.com/id/1337144146/vector/default-avatar-profile-icon-vector.jpg?s=612x612&w=0&k=20&c=BIbFwuv7FxTWvh5S3vB6bkT0Qv8Vn8N5Ffseq84ClGI="
    },
    accountType:{
        type:String,
        required:true,
    }
  /*  lastLoginDate:{
        type: Date,
        default:Date.now
    },
    isVerified:{
        type:Boolean,
        default:false,
    },
    resetPasswordToken:String,
    resetPasswordExpiresAt:Date,
    verificationToken:String,
    verificationTokenExpiresAt:Date,
    */ 
}, {timestamps: true}
);

const User=mongoose.model("Users",userSchema);

export default User