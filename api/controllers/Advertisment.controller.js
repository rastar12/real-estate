import Advertisment from '../models/Advertisments.model.js'
import { errorHandler } from "../utils/error.js";

export const createAdvert = async (req,res,next)=>{
  try {
    const advert= await Advertisment.create(req.body);
    return res.status(201).json(advert);
  } catch (error) {
    next(error);
  }

}
// to delete the advert
export const deleteAdvert=async (req,res,next)=>{
  
    const advert=await Advertisment.findById(req.params.id);

    if(!Advertisment) {
      return next (errorHandler(404,'Advertisment Not found'));
    }
    if(req.user.id !== advert.userRef){
      return next (errorHandler(404,"You can only delete your advert"))
    }
    try {
      await Advertisment.findByIdAndDelete(req.params.id);
      res.status(200).json("Succesfully deleted advertisment");

    } catch (error) {
      next(error);
    }
}

// To update the advert
export const updateAdvert=async (req,res,next)=>{
  const advert=await Advertisment.findById(req.params.id);

  if(!Advertisment){
    return next(errorHandler(401,'Advert not found'));
  }
  if(req.user.id !==advert.userRef){
    return next (errorHandler(404,'You can only update your advert'))
  };
  try {
    const updatedAdvert=await Advertisment.findByIdAndUpdate(
      req.params.id,
      req.body,
      {new:true}
    );
    res.status(200).json(updatedAdvert)
  } catch (error) {
    next(error);
  }
};



export const getUserAdverts=async(req,res,next)=>{

    try {
      const userAdvert =await Advertisment.find({userRef: req.params.id});
      res.status(200).json(userAdvert)
    } catch (error) {
      next(error);
    }
}

export const getAdvert= async (req,res,next)=>{
  try {
    const advert =await Advertisment.findById(req.params.id);

    if(!advert){
      return next (errorHandler(404,'Listing not found !'))
    }
    res.status(200).json(advert);
  } catch (error) {
    next(error);
  }

}
export const getSpecific = async (req, res, next) => {
  try {
    const searchTerm = req.query.searchTerm || '';

    const adverts = await Advertisment.find({
      Category: { $regex: searchTerm, $options: 'i' },
      });
    return res.status(200).json(adverts);
  } catch (error) {
    next(error);
  }
};

export const getAdverts = async (req, res, next) => {
  try {
    const adverts = await Advertisment.find();
    return res.status(200).json(adverts);
  } catch (error) {
    console.error('Error fetching all adverts:', error);
    next(error);
  }
};
