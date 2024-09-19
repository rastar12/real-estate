import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';


export default function MyAdverts() {
  const [showListingError, setShowListingError] = useState(false);
  const [userAdverts, setUserAdverts] = useState([]);
  const { currentUser } = useSelector((state) => state.user);
  
  const handleShowListings = async () => {
    try {
      const res = await fetch(`/api/Adverts/myadverts/${currentUser._id}`);
      const data = await res.json();
      
      if (data.Success === false) {
        setShowListingError(true);
      } else {
        setUserAdverts(data); 
      }
    } catch (error) {
      setShowListingError(true);
    }
  };

  // Use useEffect to fetch data only once when the component mounts
  useEffect(() => {
    handleShowListings();
  }, []); 


  const handlelistingDelete=async (advertId)=>{
    try {
      const res=await fetch(`/api/Adverts/delete/${advertId}`,{
        method:'DELETE',
      });
      const data =await res.json();
      if (data.Success===false){
        console.log(data.message)
        return;
      }
     setUserAdverts((prev)=> prev.filter((advert)=> advert._id !== advertId))
    } catch (error) {
      console.log(error.message)
    }
  }
    
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <div>
      {showListingError ? (
        <p className="text-red-600 text-center">Error fetching listings.</p>
      ) : (
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8'>
          {userAdverts.length > 0 &&
            userAdverts.map((advert) => (
              <div key={advert._id} className="bg-white rounded-lg shadow-lg overflow-hidden transition transform hover:-translate-y-2 hover:shadow-2xl">
                <Link to={`/listing/${advert._id}`}>
                  <img src={advert.imageUrls[0]} alt="listing cover" className="w-full h-64 object-cover transition transform hover:scale-105" />
                </Link>
                <div className="p-4">
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">{advert.Title}</h3>
                  <div className="mt-4 flex justify-between items-center">
                    <button
                      className="bg-slate-100 text-red-600 font-semibold py-2 px-4 rounded hover:bg-red-400 hover:text-white transition duration-300"
                      onClick={() => handlelistingDelete(advert._id)}
                    >
                      Delete listing
                    </button>
                    <Link to={`/update-Advert/${advert._id}`}>
                      <button className="bg-slate-100 text-green-600 font-semibold py-2 px-4 rounded hover:bg-green-400 hover:text-white transition duration-300">
                        Edit listing
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
        </div>
      )}
    </div>
  </section>
  
  );
}
