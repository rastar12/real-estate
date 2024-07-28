import React from 'react'

export default function customerProfile() {
  return (

        <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="bg-cover bg-center h-56" style={{ backgroundImage: 'url(https://img.freepik.com/free-photo/construction-illustration-city-skyline_53876-103044.jpg?size=626&ext=jpg&ga=GA1.1.2116175301.1718928000&semt=ais_user)' }}></div>
        <div className="p-6">
          <div className="flex items-center space-x-4">
            <img
              className="w-24 h-24 rounded-full border-4 border-white -mt-12"
              src={currentUser.avatar}
              alt="Profile"
            />
            <div>
              <h2 className="text-2xl font-semibold text-gray-800">{currentUser.username}</h2>
              
            </div>
          </div>
          <div className="mt-6">
            <p className="text-gray-700 text-lg">
              Welcome to your profile page. Here you can see and edit your account details.
            </p>
            <div className="mt-4">
              <h3 className="text-xl font-medium text-gray-800">Contact Information</h3>
              <ul className="mt-2 text-gray-700">
                <li className="flex items-center">
                  <svg className="h-5 w-5 text-gray-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2.003 5.884l7.385-4.198a1.993 1.993 0 011.824 0l7.385 4.198A2 2 0 0119 7.618v8.764a2 2 0 01-1.003 1.734l-7.385 4.198a1.993 1.993 0 01-1.824 0l-7.385-4.198A2 2 0 011 16.382V7.618a2 2 0 011.003-1.734z" />
                  </svg>
                  <span>{currentUser.email}</span>
                </li>
                <li className="flex items-center mt-2">
                  <svg className="h-5 w-5 text-gray-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v3a1 1 0 001 1h2a1 1 0 100-2h-1V5zm-2 8a1 1 0 112 0v1a1 1 0 11-2 0v-1z" clipRule="evenodd" />
                  </svg>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <button onClick={handleUpdateProfile}
        className="mt-4 bg-gray-300 text-gray-800 rounded-lg p-3 w-full uppercase hover:bg-gray-400"
        >
        Update profile</button>
      </div>
  )

}
