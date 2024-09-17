import React from 'react'
import {  useDispatch } from 'react-redux'
import {sigInSuccess } from '../redux/user/userSlice';
import {GoogleAuthProvider,getAuth,signInWithPopup} from 'firebase/auth';
import {app} from '../firebase';
import {useNavigate} from 'react-router-dom'

export default function Google() {
  const dispatch=useDispatch();
  const navigate=useNavigate();

  const handleGoogleclick=async ()=>{
    try {
      const provider= new GoogleAuthProvider()
      const auth= getAuth(app)
  
      const result = await signInWithPopup(auth,provider);
      console.log(result);
      const res = await fetch('/api/auth/google',{
        method: 'POST',
        headers:{
          'Content-Type': 'application/json',
        },

        body:JSON.stringify({
          name:result.user.displayName,
          email:result.user.email,
          photo:result.user.photoURL}),
          accountType:'buying',
      })
      const data= await res.json();
      dispatch(sigInSuccess(data));
      navigate('/');

    } catch (error) {
      console.log('could not sign in with google',error)
    }

  }

  return (
    <div>
          <div class="mt-3 space-y-3">
          <button
            class="relative inline-flex w-full items-center justify-center rounded-md border border-gray-400 bg-white px-3.5 py-2.5 font-semibold text-gray-700 transition-all duration-200 hover:bg-gray-100 hover:text-black focus:bg-gray-100 focus:text-black focus:outline-none"
            type="button"
            onClick={handleGoogleclick}
          >
            <span class="mr-2 inline-block">
              <svg
                fill="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                class="h-6 w-6 text-rose-500"
              >
                <path
                  d="M20.283 10.356h-8.327v3.451h4.792c-.446 2.193-2.313 3.453-4.792 3.453a5.27 5.27 0 0 1-5.279-5.28 5.27 5.27 0 0 1 5.279-5.279c1.259 0 2.397.447 3.29 1.178l2.6-2.599c-1.584-1.381-3.615-2.233-5.89-2.233a8.908 8.908 0 0 0-8.934 8.934 8.907 8.907 0 0 0 8.934 8.934c4.467 0 8.529-3.249 8.529-8.934 0-.528-.081-1.097-.202-1.625z"
                ></path>
              </svg>
            </span>
            Sign in with Google
          </button>
        </div>
      
    </div>
  )
}
