import React, { useEffect, useState } from 'react';
import { FaSearch, FaBars, FaTimes } from 'react-icons/fa';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Logo from "../assets/logo.png";

export default function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const { currentUser } = useSelector(state => state.user);
  const [searchTerm, setSearchTerm] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth <= 640);

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleMenuItemClick = () => {
    setIsMenuOpen(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set('searchTerm', searchTerm);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get('searchTerm');
    if (searchTermFromUrl) {
      setSearchTerm(searchTermFromUrl);
    }

    const handleResize = () => {
      setIsSmallScreen(window.innerWidth <= 640);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [location.search]);

  return (
    <header className='bg-white shadow-md'>
      <div className='flex items-center justify-between max-w-6xl mx-auto p-4'>
        <div className='flex items-center'>
          <Link to='/'>
            <img 
              src={Logo} 
              alt='Company Logo' 
              className='h-10 w-10 mr-3 object-contain' 
            />
          </Link>
          <Link to='/'>
            <h1 className='font-bold text-lg sm:text-xl'>
              <span className='text-slate-500'>House</span>
              <span className='text-slate-700'>Kenya</span>
            </h1>
          </Link>
        </div>

        {!isSmallScreen && (
          <button
            className='block sm:hidden p-2 text-slate-600'
            onClick={handleMenuToggle}
            aria-label='Toggle menu'
          >
            {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        )}

        <nav
          className={`sm:flex ${isMenuOpen ? '' : 'hidden'} sm:static sm:bg-transparent sm:shadow-none transition-transform transform sm:translate-x-0 w-full sm:w-auto`}>
          <ul className='flex flex-col sm:flex-row items-center gap-4 p-4 sm:p-0'>
            <li className='text-slate-700 hover:underline font-bold'>
              <Link to='/' onClick={handleMenuItemClick}>Home</Link>
            </li>
            <li className='text-slate-700 hover:underline font-bold'>
              <Link to='search' onClick={handleMenuItemClick}>Search</Link>
            </li>
            <li className='text-slate-700 hover:underline font-bold'>
              <Link to='/Shop-houseKenya' onClick={handleMenuItemClick}>Shop</Link>
            </li>
            <li className='text-slate-700 hover:underline font-bold'>
              <Link to='/about' onClick={handleMenuItemClick}>About</Link>
            </li>

            <li className='text-slate-700 hover:underline font-bold'>
              <Link to='/contact' onClick={handleMenuItemClick}>Contact</Link>
            </li>
            {currentUser ? (
              <li className='text-slate-700 hover:underline font-bold'>
                <Link to='/profile'>Profile</Link>
              </li>

            ) : (
              <li className='text-slate-700 hover:underline font-bold'>
                <Link to='/Login'>SignIn</Link>
              </li>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
}
