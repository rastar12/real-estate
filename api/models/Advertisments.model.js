import mongoose from "mongoose";

const advertismentSchema=new mongoose.Schema({
  Title:{
    type:String,
    required: true,
  },
  Description:{
    type:String,
    required: true,
  },
  Price:{
    type:Number,
    required: true,
  },
  Available:{
    type:Number,
    required: true,
  },
  imageUrls: {
    type: Array,
    required: true,
  },
  userRef: {
    type: String,
    required: true,
  },
  Location:{
    type: String,
  },
  Category:{
    type:String,
  },
  
},{timestamps: true})

const Advertisment =mongoose.model("Adversiments",advertismentSchema);

export default Advertisment;