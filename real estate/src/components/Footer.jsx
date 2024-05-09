import React, { useState } from 'react';

const Footer = () => {

  let newDate;

  const handleYear=(i)=>{
    newDate=Date().getUTCFullYear();
    return newDate;
    
  }
  return (
    <footer className="bg-gray-900 text-white py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
        <div>
          <p>&copy; {()=>handleYear()}  Real Estate Company. All rights reserved.</p>
        </div>
        <div>
          <ul className="flex space-x-4">
            <li><a href="#" className="text-gray-300 hover:text-white transition duration-300">Privacy Policy</a></li>
            <li><a href="#" className="text-gray-300 hover:text-white transition duration-300">Terms of Service</a></li>
            <li><a href="#" className="text-gray-300 hover:text-white transition duration-300">Contact Us</a></li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
