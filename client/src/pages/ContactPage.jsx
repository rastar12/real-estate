import React, { useState } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';

// Nairobi coordinates 
const center = { lat: -1.286389, lng: 36.817223 }; 

const ContactPage = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted', formData);
  };

  return (
    <div className="bg-slate-50 min-h-screen p-6">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Contact Form */}
          <div className="bg-white p-6 rounded-lg shadow-md w-full md:w-2/3">
            <h2 className="text-2xl font-bold mb-4 text-slate-800">Contact Us</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="name" className="block text-sm font-medium text-slate-600">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-slate-300 rounded-md shadow-sm focus:ring-slate-500 focus:border-slate-500 sm:text-sm"
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="email" className="block text-sm font-medium text-slate-600">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-slate-300 rounded-md shadow-sm focus:ring-slate-500 focus:border-slate-500 sm:text-sm"
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="message" className="block text-sm font-medium text-slate-600">Message</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-slate-300 rounded-md shadow-sm focus:ring-slate-500 focus:border-slate-500 sm:text-sm"
                  rows="4"
                  required
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full bg-slate-600 text-white py-2 px-4 rounded-md hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-500"
              >
                Send Message
              </button>
            </form>
          </div>

          {/* Contact Information */}
          <div className="bg-white p-6 rounded-lg shadow-md w-full md:w-1/3">
            <h2 className="text-2xl font-bold mb-4 text-slate-800">Contact Information</h2>
            <div className="flex items-center mb-4">
              <FaMapMarkerAlt className="text-slate-600 mr-3" size={20} />
              <p className="text-slate-700">123 Real Estate St, Nairobi, Kenya</p>
            </div>
            <div className="flex items-center mb-4">
              <FaPhone className="text-slate-600 mr-3" size={20} />
              <p className="text-slate-700">+254798148395</p>
            </div>
            <div className="flex items-center mb-4">
              <FaEnvelope className="text-slate-600 mr-3" size={20} />
              <p className="text-slate-700">info@realestate.com</p>
            </div>
            <div className="flex space-x-4 mt-4">
              <a href="https://facebook.com" target='_blank' className="text-slate-600 hover:text-slate-700">
                <FaFacebook size={24} />
              </a>
              <a href="https://twitter.com" target='_blank' className="text-slate-400 hover:text-slate-500">
                <FaTwitter size={24} />
              </a>
              <a href="https://instagram.com" target='_blank' className="text-slate-500 hover:text-slate-600">
                <FaInstagram size={24} />
              </a>
            </div>
          </div>
        </div>

        {/* Google Map */}
        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4 text-slate-800">Our Location</h2>
          <LoadScript googleMapsApiKey="https://maps.googleapis.com/maps/api/staticmap?center=-1.286389,36.817223&zoom=12&size=600x300&key">
            <GoogleMap
               mapContainerStyle={{ height: '400px', width: '100%' }}
               center={center}
               zoom={12}
            >
             <Marker position={center} />
            </GoogleMap>
          </LoadScript>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
