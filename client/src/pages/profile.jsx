import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FaEnvelope, FaUserEdit } from 'react-icons/fa';
import { IoIosAddCircle, IoIosListBox } from 'react-icons/io';
import ListingForm from './listingform';
import MyListings from '../components/MyLIstings';

const Profile = () => {
  const { currentUser } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState('Home');

  useEffect(() => {
    if (!currentUser) {
      navigate('/Login');
    }
  }, [currentUser, navigate]);

  if (!currentUser) {
    return null; // or return a loading spinner/message
  }

  return (
    <div className="bg-gray-100 min-h-screen p-6">
      <div className="max-w-3xl mx-auto bg-white shadow-xl rounded-lg overflow-hidden">
        <div
          className="bg-cover bg-center h-56"
          style={{
            backgroundImage:
              'url(https://img.freepik.com/free-photo/construction-illustration-city-skyline_53876-103044.jpg?size=626&ext=jpg&ga=GA1.1.2116175301.1718928000&semt=ais_user)',
          }}
        ></div>
        <div className="p-6">
          <div className="flex items-center space-x-4">
            <img
              className="w-24 h-24 rounded-full border-4 border-white -mt-12 shadow-lg"
              src={currentUser.avatar}
              alt="Profile"
            />
            <div>
              <h2 className="text-2xl font-bold text-gray-800">{currentUser.username}</h2>
            </div>
          </div>
          <div className="mt-6">
            <p className="text-gray-700 text-lg">
              Welcome to your profile page. Here you can see and edit your account details.
            </p>
            <div className="mt-4">
              <h3 className="text-xl font-semibold text-gray-800">Contact Information</h3>
              <ul className="mt-2 text-gray-700">
                <li className="flex items-center">
                  <FaEnvelope className="h-5 w-5 text-gray-500 mr-2" />
                  <span>{currentUser.email}</span>
                </li>
              </ul>
              <div className="flex justify-between mt-4">
                <button
                  onClick={() => setCurrentPage('AddListing')}
                  className="text-blue-700 flex items-center space-x-2 hover:underline"
                >
                  <IoIosAddCircle className="h-5 w-5" />
                  <span>Add a Listing</span>
                </button>
                <button
                  onClick={() => setCurrentPage('ViewListing')}
                  className="text-blue-700 flex items-center space-x-2 hover:underline"
                >
                  <IoIosListBox className="h-5 w-5" />
                  <span>View My Listings</span>
                </button>
              </div>
            </div>
          </div>
        </div>
        <Link to="/update-profile">
          <button
            className="mt-4 bg-teal-600 text-white rounded-lg p-3 w-full uppercase hover:bg-teal-700 transition duration-300 flex items-center justify-center space-x-2"
          >
            <FaUserEdit className="h-5 w-5" />
            <span>Update Profile</span>
          </button>
        </Link>
      </div>

      <div className="mt-8">
        {currentPage === 'AddListing' && <ListingForm/>}
        {currentPage === 'ViewListing' && <MyListings/>}
      </div>
    </div>
  );
};

export default Profile;
