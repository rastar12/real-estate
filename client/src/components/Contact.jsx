import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaWhatsapp, FaEnvelope, FaPhoneAlt } from 'react-icons/fa'; // Import FontAwesome icons

export default function Contact({ listing }) {
    const [landLord, setLandLord] = useState(null);
    const [error, setError] = useState(false);
    const [message, setMessage] = useState('');

    const handleMessage = (e) => {
        setMessage(e.target.value);
    };
  
    useEffect(() => { 
        const fetchLandLord = async () => {
            try {
                const res = await fetch(`/api/user/${listing.userRef}`);
                const data = await res.json();
                setLandLord(data);
            } catch (error) {
                console.log(error);
                setError(true);
            }
        };
        fetchLandLord();
    }, [listing.userRef]);

    return (
        <div>
            {landLord && (
                <div className='flex flex-col gap-4'>
                    {/* Contact via Email */}
                    <p>Contact via Email 
                        <span className='font-semibold'> {landLord.username}</span> 
                        for <span className='font-semibold'>{listing.name.toLowerCase()}</span>
                    </p>
                    <textarea
                        name='message'
                        id='message'
                        rows='2'
                        value={message}
                        onChange={handleMessage}
                        placeholder='Enter your message here'
                        className='w-full border p-3 rounded-lg'
                    />
                    <Link to={`mailto:${landLord.email}?subject=Regarding ${listing.name}&body=${message}`}>
                        <button className='bg-slate-700 text-white text-center p-3 hover:opacity-95 flex items-center justify-center gap-2'>
                            <FaEnvelope /> SEND EMAIL
                        </button>
                    </Link>

                    {/* Contact via WhatsApp */}
                    <p>Contact via WhatsApp    {landLord.phoneNumber}
                        <span className='font-semibold'> {landLord.username}</span> 
                        for <span className='font-semibold'>{listing.name.toLowerCase()}</span>
                    </p>
                    <textarea
                        name='message'
                        id='message'
                        rows='2'
                        value={message}
                        onChange={handleMessage}
                        placeholder='Enter your message here'
                        className='w-full border p-3 rounded-lg'
                    />
                    <a
                        href={`https://wa.me/${landLord.PhoneNumber}?text=${encodeURIComponent(message)}`}
                        target='_blank'
                        rel='noopener noreferrer'
                    >
                        <button className='bg-green-500 text-white text-center p-3 hover:opacity-95 flex items-center justify-center gap-2'>
                            <FaWhatsapp /> SEND VIA WHATSAPP
                        </button>
                    </a>

                    {/* Contact via Phone Call */}
                    <p>Contact via Phone Call 
                        <span className='font-semibold'> {landLord.username}</span> 
                        for <span className='font-semibold'>{listing.name.toLowerCase()}</span>
                    </p>
                    <a href={`tel:${landLord.PhoneNumber}`}>
                        <button className='bg-blue-500 text-white text-center p-3 hover:opacity-95 flex items-center justify-center gap-2'>
                            <FaPhoneAlt /> CALL NOW
                        </button>
                    </a>
                </div>
            )}
        </div>
    );
}
