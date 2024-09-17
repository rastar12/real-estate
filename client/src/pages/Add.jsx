import  { React,useEffect } from 'react'
import { useSelector } from 'react-redux'
import {useNavigate} from 'react-router-dom'
import Loading from '../components/loading';

export default function Add() {

  const {currentUser} =useSelector((state)=> state.user);
  const navigate=useNavigate();

  useEffect(() => {
    if(!currentUser){
      navigate('/signup')
    }
    else if(currentUser.AddccountType==="selling"){
      navigate("/AddListing")
  
    }else if(currentUser.accountType==="advertising"){
      navigate('/AddAdvert')
    }else if(currentUser.accountType==="buying"){
      navigate('/profile')
    }else{
      navigate('/')
    }

  }, [currentUser])
  
  

  return (
   <Loading/>
  )
}
