import React from 'react';
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';

const About = () => {
  return (
    <div>
      {/* Hero Section */}
      <div className="hero bg-gradient-to-r from-teal-400 to-teal-600 text-white py-20 px-4 text-center">
        <h1 className="text-4xl font-bold">About House Kenya</h1>
        <p className="mt-4 text-lg max-w-2xl mx-auto">Discover the story behind House Kenya, your trusted partner in finding the perfect place to call home.</p>
      </div>

      {/* Our Story Section */}
      <section className="py-16 px-4 bg-gray-100">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-slate-700">Our Story</h2>
          <p className="mt-4 text-lg max-w-3xl mx-auto">
            House Kenya was founded with a vision to revolutionize the real estate market by providing a seamless experience for home buyers and renters. Our journey started with a passion for helping people find their dream homes, and we’ve grown to become a trusted name in the industry.
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-slate-700">Our Mission</h2>
          <p className="mt-4 text-lg max-w-3xl mx-auto">
            Our mission is to make the process of finding and securing your ideal property as simple and stress-free as possible. We strive to provide exceptional service, transparency, and support throughout every step of the journey.
          </p>
        </div>
      </section>

      {/* Meet the Team Section */}
      <section className="py-16 px-4 bg-gray-100">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-slate-700">Meet the Team</h2>
          <div className="mt-8 flex flex-wrap justify-center gap-6">
            {/* Team Member Example */}
            <div className="w-full sm:w-1/3 md:w-1/4 p-4">
              <div className="bg-white shadow-md rounded-lg p-6">
                <img src="/path/to/team-member.jpg" alt="Team Member" className="w-24 h-24 rounded-full mx-auto" />
                <h3 className="mt-4 text-lg font-semibold">Eugene Chanzu</h3>
                <p className="text-gray-600">Founder & CEO</p>
              </div>
            </div>
            {/* more members */}
          </div>
        </div>
      </section>

      {/* Contact Information Section */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-slate-700">Contact Us</h2>
          <div className="mt-8 flex flex-wrap justify-center gap-6">
            <div className="flex items-center gap-2">
              <FaMapMarkerAlt className="text-teal-600" />
              <p>123 Main Street, Nairobi, Kenya</p>
            </div>
            <div className="flex items-center gap-2">
              <FaEnvelope className="text-teal-600" />
              <p>info@housekenya.com</p>
            </div>
            <div className="flex items-center gap-2">
              <FaPhoneAlt className="text-teal-600" />
              <p>+254 79814-8395</p>
            </div>
          </div>
  
        </div>
      </section>
    </div>
  );
};

export default About;
