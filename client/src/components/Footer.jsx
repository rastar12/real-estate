import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-slate-300 text-slate-800 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center mb-6">
          <div className="mb-6 md:mb-0">
            <h3 className="text-xl font-bold">HOUSE KENYA</h3>
            <p>&copy; 2024 Real Estate Company. All rights reserved.</p>
          </div>
          <div>
            <ul className="flex space-x-4">
              <li><a href="#" className="text-slate-950 hover:text-slate-700 transition duration-300">Privacy Policy</a></li>
              <li><a href="#" className="text-slate-950 hover:text-slate-700 transition duration-300">Terms of Service</a></li>
              <li><a href="#" className="text-slate-950 hover:text-slate-700 transition duration-300">Contact Us</a></li>
            </ul>
          </div>
        </div>
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0 text-slate-950">
            <p>123 Main Street, Nairobi, Kenya</p>
            <p>Email: info@housekenya.com | Phone: +254 79814-8395</p>
          </div>
          <div className="flex space-x-4">
            <a href="#" className="text-slate-950 hover:text-slate-700 transition duration-300">
              <FaFacebookF />
            </a>
            <a href="#" className="text-slate-950 hover:text-slate-700 transition duration-300">
              <FaTwitter />
            </a>
            <a href="#" className="text-slate-950 hover:text-slate-700 transition duration-300">
              <FaInstagram />
            </a>
            <a href="#" className="text-slate-950 hover:text-slate-700 transition duration-300">
              <FaLinkedinIn />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
