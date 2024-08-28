import React, { useEffect, useState } from 'react'
import {FaSearch} from 'react-icons/fa';
import { Link ,useNavigate} from 'react-router-dom';
import {  useSelector } from 'react-redux';
import Logo from "../assets/logo.png"
import { FaBars, FaTimes } from 'react-icons/fa';

export default function Header() {
  const navigate =useNavigate();
  const {currentUser}=useSelector(state=> state.user);
  const [searchTerm,setSearchTerm]=useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleMenuItemClick = () => {
    setIsMenuOpen(false);
  };

  const handleSubmit=(e)=>{
    e.preventDefault();
    const urlParams=new URLSearchParams(window.location.search);
    urlParams.set('searchTerm',searchTerm);
    const searchQuery=urlParams.toString();
    navigate(`/search?${searchQuery}`);
  }
  useEffect(()=>{
    const urlParams= new URLSearchParams(location.search);
    const searchTermFromUrl= urlParams.get('searchTerm');
      if(searchTermFromUrl){
        setSearchTerm(searchTermFromUrl);

      }


  },[location.search]);
  return (
    <header className='bg-white shadow-md '>
      <div className=' flex items-center justify-between max-w-6xl mx-auto p-4'>
        <div className='flex items-center'>
          <Link to='/'>
            <img 
              src={Logo} 
              alt='Company Logo' 
              className='h-10 w-10 mr-3 object-contain' 
            />
          </Link>
          <Link to='/'>
            <h1 className=' hidden sm:font-bold text-lg sm:text-xl sm:flex'>
              <span  className='  text-slate-500'>House</span>
              <span className=' text-slate-700'>Kenya</span>
            </h1>
          </Link>
        </div>

        <form
          onSubmit={handleSubmit}
          className='flex items-center border border-slate-300 rounded-full px-2 py-1'
        >
          <input
            type='text'
            placeholder='Search...'
            className='bg-transparent w-40 sm:w-60 py-1 px-2 outline-none text-sm'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button type='submit' aria-label='Search' className='p-1'>
            <FaSearch className='text-slate-600 text-lg' />
          </button>
        </form>

        <button
          className='block sm:hidden p-2 text-slate-600'
          onClick={handleMenuToggle}
          aria-label='Toggle menu'
        >
          {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>

        <nav
         className={`fixed top-0 right-0 bg-white shadow-md sm:static sm:bg-transparent sm:shadow-none transition-transform transform ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'} sm:translate-x-0 w-64 h-full sm:h-auto`}>
          <ul className='flex flex-col sm:flex-row items-center gap-4 p-4 sm:p-0'>
            <li className='text-slate-700 hover:underline'>
              <Link to='/' onClick={handleMenuItemClick}>Home</Link>
            </li>
            <li className='text-slate-700 hover:underline'>
              <Link to='/about' onClick={handleMenuItemClick}>About</Link>
            </li>
            <li className='text-slate-700 hover:underline'>
              <Link to='/contact' onClick={handleMenuItemClick}>Contact</Link>
            </li>
            <li>
              <Link to='/profile'>
                {currentUser ? (
                <>
                  <img
                    className='rounded-full h-7 w-7 object-cover'
                    src={currentUser.avatar}
                    alt='Profile'
                    onClick={handleMenuItemClick}
                  />
                
                  </>
                ) : (
                  <span 
                    className='text-slate-700 hover:underline'
                    onClick={handleMenuItemClick}
                  >
                    Sign in
                  </span>
                )}
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}


{
  /**
<form
onSubmit={handleSubmit}
className='bg-slate-100 p-3 rounded-lg flex items-center'
>
<input
  type='text'
  placeholder='Search...'
  className='bg-transparent focus:outline-none w-24 sm:w-64'
  value={searchTerm}
  onChange={(e) => setSearchTerm(e.target.value)}
/>
<button>
  <FaSearch className='text-slate-600' />
</button>
</form>
   */
}

