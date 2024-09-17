import React from 'react';
import { FaHome, FaUser,FaShoppingCart, FaStoreAlt ,FaPlus,FaSearch} from 'react-icons/fa';
import { Link } from 'react-router-dom';

function HeaderDown() {
  return (
    <div className="App">
      {/* Bottom Navigation for small screens */}
      <nav className="fixed inset-x-0 bottom-0 bg-slate-200 text-white sm:hidden">
        <ul className="flex justify-around py-4">
          <Link to={'/'}>
          <li className="text-center cursor-pointer">
            <FaHome className='text-slate-800 size-5' />
          </li>
          </Link>
          <Link to={'/Shop-houseKenya'}>
          <li className="text-center cursor-pointer">
            <FaShoppingCart className='text-slate-800 size-5' />
          </li>
          </Link>
        <Link to={'search'}>
        <li className="text-center cursor-pointer">
            <FaSearch className='text-slate-800 size-5' />
          </li>
        </Link>
        <Link to={'/Add'}>
        <li className="text-center cursor-pointer">
            <FaPlus className='text-slate-800 size-5' />
          </li>
        </Link>
        
        <Link to={'/profile'}>
        <li className="text-center cursor-pointer">
            <FaUser className='text-slate-800 size-5' />
          </li>
        </Link>

        </ul>
      </nav>
    </div>
  );
}

export default HeaderDown;
