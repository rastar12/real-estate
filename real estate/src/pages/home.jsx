import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import SwiperCore from 'swiper';
import 'swiper/css/bundle';
import ListingItem from '../components/listingCard';

export default function Home() {
  const [offerListings, setOfferListings] = useState([]);
  const [saleListings, setSaleListings] = useState([]);
  const [rentListings, setRentListings] = useState([]);
  const [AllListings, setAllListings] = useState([]);
  const [page,setPage]=useState("All");

  const handleSetPage=(page)=>{
    setPage(page)
  }
  SwiperCore.use([Navigation]);
  
  useEffect(() => {
    const fetchOfferListings = async () => {
      try {
        const res = await fetch('/api/listing/get?offer=true&limit=4');
        const data = await res.json();
        setOfferListings(data);
        fetchRentListings();
      } catch (error) {
        console.log(error);
      }
    };
    const fetchRentListings = async () => {
      try {
        const res = await fetch('/api/listing/get?type=rent&limit=4');
        const data = await res.json();
        setRentListings(data);
        fetchSaleListings();
      } catch (error) {
        console.log(error);
      }
    };

    const fetchSaleListings = async () => {
      try {
        const res = await fetch('/api/listing/get?type=sale&limit=4');
        const data = await res.json();
        setSaleListings(data);
      } catch (error) {
        log(error);
      }
    };
    const fetchAllListings=async ()=>{
      try {
        const res = await fetch('/api/listing/get?&limit=9');
        const data = await res.json();
        setAllListings(data);
  
      } catch (error) {
        log(error);
      }
    }
    fetchAllListings();
    fetchOfferListings();
  }, []);


  return (
    <div>
      {/* top */}
      
      <div className="flex flex-col lg:flex-row gap-6 p-6 md:p-12 lg:p-28 px-3 max-w-6xl mx-auto items-center">
  <div className="flex flex-col lg:w-1/2 gap-4">
    <h1 className="text-slate-700 font-bold text-3xl lg:text-6xl">
      Find your next <span className="text-slate-500">perfect</span>
      <br />
      place with ease
    </h1>
    <p className="text-gray-400 text-xs sm:text-sm lg:text-base">
      House Kenya is the best place to find your next perfect place to live.
      <br />
      We have a wide range of properties for you to choose from.
    </p>
    <Link to={'/signup'} className="mt-4 lg:mt-6">
      <button
        className="px-6 py-3 md:py-4 bg-green-700 text-white font-semibold text-base md:text-lg 
                   rounded-xl hover:bg-green-900 transition ease-in-out duration-500
                   hover:scale-105 transition-transform duration-300 "
      >
        Get Started
      </button>
    </Link>
  </div>
  <div className="flex flex-col lg:w-1/2 gap-4 lg:gap-6">
  <div className="flex space-x-2 md:space-x-4 lg:space-x-6">
    <div className="flex flex-col space-y-2 md:space-y-4 lg:space-y-6">
      <img
        src={"./src/assets/gallery-1.png"}
        alt="image"
        className="transform transition-transform duration-500 hover:scale-105 focus:scale-105"
      />
      <img
        src={"./src/assets/gallery-4.png"}
        alt="image"
        className="transform transition-transform duration-500 hover:scale-105 focus:scale-105"
      />
    </div>
    <div className="flex flex-col space-y-2 md:space-y-4 lg:space-y-6">
      <img
        src={"./src/assets/gallery-2.png"}
        alt="image"
        className="transform transition-transform duration-500 hover:scale-105 focus:scale-105"
      />
      <img
        src={"./src/assets/gallery-5.png"}
        alt="image"
        className="transform transition-transform duration-500 hover:scale-105 focus:scale-105"
      />
      <img
        src={"./src/assets/gallery-6.png"}
        alt="image"
        className="transform transition-transform duration-500 hover:scale-105 focus:scale-105"
      />
    </div>
    <div className="flex flex-col space-y-2 md:space-y-4 lg:space-y-6">
      <img
        src={"./src/assets/gallery-3.png"}
        alt="image"
        className="transform transition-transform duration-500 hover:scale-105 focus:scale-105"
      />
      <img
        src={"./src/assets/gallery-7.png"}
        alt="image"
        className="transform transition-transform duration-500 hover:scale-105 focus:scale-105"
      />
    </div>
  </div>
</div>

</div>




      {/* swiper */}
      <Swiper navigation>
        {offerListings &&
          offerListings.length > 0 &&
          offerListings.map((listing) => (
            <SwiperSlide>
              <div
                style={{
                  background: `url(${listing.imageUrls[0]}) center no-repeat`,
                  backgroundSize: 'cover',
                }}
                className='h-[500px] contain-content hover:scale-105 transition-transform duration-300 rounded-t-lg'
                key={listing._id}
              ></div>
            </SwiperSlide>
          ))}
      </Swiper>

      {/* listing results for offer, sale and rent */}
      
      <div className="container max-w-screen-xl mx-auto px-4 mt-10">
  
      <h1 className="font-semibold text-gray-600 text-4xl text-center mb-10 animate-fadeIn">
        Elevate the chore of buying and selling homes
      </h1>
      <div className="flex flex-wrap items-center justify-center space-x-0 space-y-4 md:space-x-6 md:space-y-0 mb-12">
  <a
    onClick={() => handleSetPage('All')}
    className="px-4 py-2 bg-green-800 cursor-pointer text-white font-semibold text-lg md:text-xl rounded-lg hover:bg-green-600 transition ease-in-out duration-500"
  >
    All
  </a>
  <a
    onClick={() => handleSetPage('on-offer')}
    className="px-4 py-2 text-gray-900 cursor-pointer font-normal text-lg md:text-xl rounded-lg hover:bg-gray-200 hover:text-gray-400 transition ease-in-out duration-500"
  >
    On offer
  </a>
  <a
    onClick={() => handleSetPage('for-rent')}
    className="px-4 py-2 text-gray-900 cursor-pointer font-normal text-lg md:text-xl rounded-lg hover:bg-gray-200 hover:text-gray-400 transition ease-in-out duration-500"
  >
    For rent
  </a>
  <a
    onClick={() => handleSetPage('for-sale')}
    className="px-4 py-2 text-gray-900 cursor-pointer font-normal text-lg md:text-xl rounded-lg hover:bg-gray-200 hover:text-gray-400 transition ease-in-out duration-500"
  >
    For sale
  </a>
</div>

          </div>
      

      <div className='max-w-6xl mx-auto p-3 flex flex-col gap-8 my-10'>
        { page===('on-offer') && offerListings && offerListings.length > 0 && (
          <div className=''>
  <div className='my-3 flex justify-between items-center '>
    <h2 className='text-2xl font-semibold text-slate-600'>properties on offer</h2>
    <Link 
      className='text-sm text-white bg-green-800 py-2 px-4 rounded-lg hover:bg-green-500 transition ease-in-out duration-300'
      to={'/search?offer=true'}
    >
      more offers
    </Link>
  </div>
  <div className='flex flex-wrap gap-4'>
    {offerListings.map((listing) => (
      <ListingItem listing={listing} key={listing._id} />
    ))}
  </div>
</div>

        )}
        { page===('for-rent') && rentListings && rentListings.length > 0 && (
          <div className=''>
  <div className='my-3 flex justify-between items-center'>
    <h2 className='text-2xl font-semibold text-slate-600'>Recent places for rent</h2>
    <Link 
      className='text-sm text-white bg-green-800 py-2 px-4 rounded-lg hover:bg-green-500 transition ease-in-out duration-300'
      to={'/search?type=rent'}
    >
      Show more places for rent
    </Link>
  </div>
  <div className='flex flex-wrap gap-4'>
    {rentListings.map((listing) => (
      <ListingItem listing={listing} key={listing._id} />
    ))}
  </div>
</div>

        )}
        { page ===('for-sale') && saleListings && saleListings.length > 0 && (
          <div className=''>
  <div className='my-3 flex justify-between items-center'>
    <h2 className='text-2xl font-semibold text-slate-600'>Recent places for sale</h2>
    <Link 
      className='text-sm text-white bg-green-800 py-2 px-4 rounded-lg hover:bg-green-500 transition ease-in-out duration-300'
      to={'/search?type=sale'}
    >
      Show more places for sale
    </Link>
  </div>
  <div className='flex flex-wrap gap-4'>
    {saleListings.map((listing) => (
      <ListingItem listing={listing} key={listing._id} />
    ))}
  </div>
</div>

        )}
       { page ===('All') && AllListings && AllListings.length > 0 && (
        <div className=''>
  <div className='my-3 flex justify-between items-center'>
    <h2 className='text-2xl font-semibold text-slate-600'>Properties</h2>
    <Link 
      className='text-sm text-white bg-green-800 py-2 px-4 rounded-lg hover:bg-green-500 transition ease-in-out duration-300'
      to={'/search?type=all'}
    >
      Show more properties
    </Link>
  </div>
  <div className='flex flex-wrap gap-4'>
    {AllListings.map((listing) => (
      <ListingItem listing={listing} key={listing._id} />
    ))}
  </div>
</div>

        )}
      </div>
    </div>
  );
}

