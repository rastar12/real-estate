import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';


export default function Contact({listing}) {

    const [landLord,setLandLord]=useState(null);
    const [error,setError]=useState(false);
    const [message,setMessage] =useState([]);

    const handleMessage=(e)=>{
        setMessage(e.target.value);
    }

    useEffect(()=>{
        const fetchLandLord= async()=>{

            try {
                const res = await fetch(`/api/user/${listing.userRef}`);
                const data= await res.json();
                setLandLord(data);
                
            } catch (error) {
                console.log(error);
                setError(true);
            }
        }
        fetchLandLord();

    },[listing.userRef]);
  return (
    <div>
        {landLord&&(
            <div className='flex flex-col gap-2'>
                <p>contact
                    <span className='font-semibold'>{landLord.username}</span> 
                    for <span className='font-semibold'>{listing.name.toLowerCase()}</span>
                    </p>
                    <textarea name='message' id='message' rows="2" value={message}
                    onChange={handleMessage}
                    placeholder='Enter your message here'
                    className='w-full border p-3 rounded-lg'
                    >

                    </textarea>
                    <Link to={`mailto:${landLord.email}?subject=regarding ${listing.name} &body=${message}`}>
                    <button className='bg-slate-700 text-white text-center p-3 hover:opacity-95'>SEND MESSAGE</button>

                    </Link>

            </div>
        )} 

    </div>

    
  )
}
