

import { useSelector } from 'react-redux';
import { useState, useRef, useEffect } from 'react';
import { getStorage, uploadBytesResumable, ref, getDownloadURL } from 'firebase/storage';
import { app } from '../firebase';

import { useDispatch } from 'react-redux';
import { deleteUserFailure, deleteUserStart, deleteUserSuccess, signOutFailure, signOutStart, signOutSuccess, updateUserFailure ,updateUserStart,updateUserSuccess } from '../redux/user/userSlice';
import ListingForm from './listingform';
import MyLIstings from '../components/MyLIstings';
import { FaEnvelope, FaUserEdit } from 'react-icons/fa';
import { IoIosAddCircle, IoIosListBox } from 'react-icons/io';



const Profile = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [update, setUpdate] = useState(true);
  const [file, setFile] = useState(undefined);
  const [uploadErr, setUploadErr] = useState(false);
  const fileRef = useRef(null);
  const [CurrentPage,setCurrentPage] =useState('Home')
  const [filePerc, setFilePerc] = useState(0);
  const [formData, setFormData] = useState({});
  const dispatch=useDispatch();
 console.log(formData);
  function handleUpdateProfile() {
    setUpdate(!update);
  }

  // logic to handle creating listing or viewing your listing
  const handleListingPage=(page)=>{
    setCurrentPage(page)
  }

 const handleChange=(e)=>{
 setFormData({...formData, [e.target.id] : e.target.value});
 }

 // logic to deal with delete users
 const handleDeleteUser=async ()=>{
  try {
    dispatch(deleteUserStart());
    const res = await fetch(`/api/user/delete/${currentUser._id}`,{
      method: 'DELETE',
    });

    const data=await res.json();
    if(data.Success===false){
      dispatch(deleteUserFailure(error.message))
      return;
    }
    dispatch(deleteUserSuccess(data));
  } catch (error) {
    dispatch(deleteUserFailure(error.message));
  }
 }

 // logic to sign out the user
 const handleSignOut=async ()=>{
  try {
    dispatch(signOutStart())
    const res = await fetch ('/api/auth/signOut');
    const data =await res.json();
    if(data.Success=== false){
      dispatch(signOutFailure(data.message));
      return;
    }
    dispatch(signOutSuccess(data));
  } catch (error) {
    dispatch(signOutFailure(data.message))
  }
 }

 // logic to save the updates in the database
 const handleSubmit=async (e)=>{
  e.preventDefault();
  try {
   dispatch(updateUserStart());
    const res =await fetch(`/api/user/update/${currentUser._id}`,
    {
      method:'POST',
      headers:{
        'Content-Type': 'application/json',
      },
      body:JSON.stringify(formData),
    }

    )
    const data=await res.json()
    if (data.Success=== false) {
      dispatch(updateUserFailure(data.message));
      return;
    }
    dispatch(updateUserSuccess(data));
    setUpdate(!update);
    
    
  } catch (error) {
    dispatch(updateUserFailure(error.message ))
  }

 }
  useEffect(() => {
    if (file) {
      handleFileUpload(file);
    }
  }, [file]);

  const handleFileUpload = (file) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setFilePerc(Math.round(progress));
      },
      (error) => {
        setUploadErr(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) =>
          setFormData((prevData) => ({ ...prevData, avatar: downloadURL }))
        );
      }
    );
  };

  return (
  <div>
      {update ?
      (
        <div className="bg-gray-100 min-h-screen p-6">
        <div className="max-w-3xl mx-auto bg-white shadow-xl rounded-lg overflow-hidden">
          <div className="bg-cover bg-center h-56" style={{ backgroundImage: 'url(https://img.freepik.com/free-photo/construction-illustration-city-skyline_53876-103044.jpg?size=626&ext=jpg&ga=GA1.1.2116175301.1718928000&semt=ais_user)' }}></div>
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
                    onClick={() => handleListingPage('AddListing')} 
                    className="text-blue-700 flex items-center space-x-2 hover:underline"
                  >
                    <IoIosAddCircle className="h-5 w-5" />
                    <span>Add a Listing</span>
                  </button>
                  <button 
                    onClick={() => handleListingPage('ViewListing')} 
                    className="text-blue-700 flex items-center space-x-2 hover:underline"
                  >
                    <IoIosListBox className="h-5 w-5" />
                    <span>View My Listings</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
          <button 
            onClick={handleUpdateProfile}
            className="mt-4 bg-teal-600 text-white rounded-lg p-3 w-full uppercase hover:bg-teal-700 transition duration-300 flex items-center justify-center space-x-2"
          >
            <FaUserEdit className="h-5 w-5" />
            <span>Update Profile</span>
          </button>
        </div>
  
        <div className="mt-8">
          {CurrentPage === "AddListing" && <ListingForm />}
          {CurrentPage === "ViewListing" && <MyLIstings />}
        </div>
      </div>
      ):
      (


        <div className="bg-gray-100 min-h-screen p-6">
        <div className="max-w-xl mx-auto bg-white shadow-xl rounded-lg overflow-hidden p-6">
          <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Update Profile</h2>
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="flex flex-col items-center">
              <input
                type="file"
                ref={fileRef}
                hidden
                accept="image/*"
                onChange={(e) => setFile(e.target.files[0])}
              />
              <img
                onClick={() => fileRef.current.click()}
                className="w-24 h-24 rounded-full border-4 border-gray-300 mt-8 mb-4 cursor-pointer hover:border-gray-400 transition duration-300"
                src={currentUser.avatar || formData.avatar}
                alt="Profile"
              />
              <p className="text-sm">
                {uploadErr ? (
                  <span className="text-red-700">
                    Error Image upload (image must be less than 2 mb)
                  </span>
                ) : filePerc > 0 && filePerc < 100 ? (
                  <span className="text-slate-700">{`Uploading ${filePerc}%`}</span>
                ) : filePerc === 100 ? (
                  <span className="text-green-700">Image successfully uploaded!</span>
                ) : (
                  ''
                )}
              </p>
            </div>
            <div>
              <label htmlFor="username" className="block text-gray-700">Username</label>
              <input
                type="text"
                placeholder="Username"
                defaultValue={currentUser.username}
                id="username"
                className="border p-3 rounded-lg w-full focus:ring-2 focus:ring-blue-500"
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-gray-700">Email</label>
              <input
                type="email"
                placeholder="Email"
                id="email"
                defaultValue={currentUser.email}
                className="border p-3 rounded-lg w-full focus:ring-2 focus:ring-blue-500"
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-gray-700">Password</label>
              <input
                type="password"
                placeholder="Password"
                id="password"
                className="border p-3 rounded-lg w-full focus:ring-2 focus:ring-blue-500"
                onChange={handleChange}
              />
            </div>
            <button
              onSubmit={handleSubmit}
              className="bg-slate-800 text-white rounded-lg p-3 w-full uppercase hover:bg-blue-700 transition duration-300 disabled:opacity-80"
            >
              Update
            </button>
          </form>
          <div className="flex justify-between mt-5 text-sm">
            <span
              onClick={handleDeleteUser}
              className="text-red-700 cursor-pointer hover:underline"
            >
              Delete account
            </span>
            <span onClick={handleSignOut} className="text-red-700 cursor-pointer hover:underline">
              Sign out
            </span>
          </div>
          <button
            onClick={handleUpdateProfile}
            className="mt-6 bg-gray-300 text-gray-800 rounded-lg p-3 w-full uppercase hover:bg-gray-400 transition duration-300"
          >
            Back to Profile
          </button>
        </div>
      </div>
      
      )
      }
    </div>
  );
};

export default Profile;



 



