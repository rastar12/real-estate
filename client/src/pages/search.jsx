import React, { useEffect, useState } from 'react'
import {useNavigate} from 'react-router-dom'
import ListingCard from '../components/listingCard';
import Loading from '../components/loading';

export default function Search() {

    const navigate = useNavigate();
    const [sidebardata, setSidebardata] = useState({
      searchTerm: '',
      type: 'all',
      parking: false,
      furnished: false,
      offer: false,
      sort: 'created_at',
      order: 'desc',
    });
  
    const [loading, setLoading] = useState(false);
    const [listings, setListings] = useState([]);
    const [showMore, setShowMore] = useState(false);
  
    useEffect(() => {
      const urlParams = new URLSearchParams(location.search);
      const searchTermFromUrl = urlParams.get('searchTerm');
      const typeFromUrl = urlParams.get('type');
      const parkingFromUrl = urlParams.get('parking');
      const furnishedFromUrl = urlParams.get('furnished');
      const offerFromUrl = urlParams.get('offer');
      const sortFromUrl = urlParams.get('sort');
      const orderFromUrl = urlParams.get('order');
  
      if (
        searchTermFromUrl ||
        typeFromUrl ||
        parkingFromUrl ||
        furnishedFromUrl ||
        offerFromUrl ||
        sortFromUrl ||
        orderFromUrl
      ) {
        setSidebardata({
          searchTerm: searchTermFromUrl || '',
          type: typeFromUrl || 'all',
          parking: parkingFromUrl === 'true' ? true : false,
          furnished: furnishedFromUrl === 'true' ? true : false,
          offer: offerFromUrl === 'true' ? true : false,
          sort: sortFromUrl || 'created_at',
          order: orderFromUrl || 'desc',
        });
      }
  
      const fetchListings = async () => {
        setLoading(true);
        setShowMore(false);
        const searchQuery = urlParams.toString();
        const res = await fetch(`/api/listing/get?${searchQuery}`);
        const data = await res.json();
        if (data.length > 8) {
          setShowMore(true);
        } else {
          setShowMore(false);
        }
        setListings(data);
        setLoading(false);
      };
  
      fetchListings();
    }, [location.search]);
  
    const handleChange = (e) => {
      if (
        e.target.id === 'all' ||
        e.target.id === 'rent' ||
        e.target.id === 'sale'
      ) {
        setSidebardata({ ...sidebardata, type: e.target.id });
      }
  
      if (e.target.id === 'searchTerm') {
        setSidebardata({ ...sidebardata, searchTerm: e.target.value });
      }
  
      if (
        e.target.id === 'parking' ||
        e.target.id === 'furnished' ||
        e.target.id === 'offer'
      ) {
        setSidebardata({
          ...sidebardata,
          [e.target.id]:
            e.target.checked || e.target.checked === 'true' ? true : false,
        });
      }
  
      if (e.target.id === 'sort_order') {
        const sort = e.target.value.split('_')[0] || 'created_at';
  
        const order = e.target.value.split('_')[1] || 'desc';
  
        setSidebardata({ ...sidebardata, sort, order });
      }
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
      const urlParams = new URLSearchParams();
      urlParams.set('searchTerm', sidebardata.searchTerm);
      urlParams.set('type', sidebardata.type);
      urlParams.set('parking', sidebardata.parking);
      urlParams.set('furnished', sidebardata.furnished);
      urlParams.set('offer', sidebardata.offer);
      urlParams.set('sort', sidebardata.sort);
      urlParams.set('order', sidebardata.order);
      const searchQuery = urlParams.toString();
      navigate(`/search?${searchQuery}`);
    };
  
    const onShowMoreClick = async () => {
      const numberOfListings = listings.length;
      const startIndex = numberOfListings;
      const urlParams = new URLSearchParams(location.search);
      urlParams.set('startIndex', startIndex);
      const searchQuery = urlParams.toString();
      const res = await fetch(`/api/listing/get?${searchQuery}`);
      const data = await res.json();
      if (data.length < 9) {
        setShowMore(false);
      }
      setListings([...listings, ...data]);
    };
    if(loading){
      return <Loading/>;
    }
  return (
    <div className='flex flex-col md:flex-row'>
<div className='p-7 border-b-2 md:border-r-2 md:min-h-screen bg-slate-100'>
    <form className='space-y-6' onSubmit={handleSubmit}>
        <div className='flex items-center gap-2'>
            <input type='text' id='searchTerm' placeholder='search...'
            value={sidebardata.searchTerm}
            onChange={handleChange} 
            className='border rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-slate-400'/>
        </div>
        <div>
            <label className='text-slate-700 font-bold'>Type:</label>
            <div className='gap-2 flex-wrap flex'>
                <div className='flex items-center gap-2'>
                    <input type='checkbox' id='all'
                    onChange={handleChange}
                    value={sidebardata.type==='alt'}
                    className='w-5 h-5 text-slate-600 focus:ring-2 focus:ring-slate-400'/>
                    <span className='text-slate-700'>rent & sale</span>
                </div>
                <div className='flex items-center gap-2'>
                    <input type='checkbox' 
                    onChange={handleChange}
                    value={sidebardata.type==='rent'}
                    id='rent' className='w-5 h-5 text-slate-600 focus:ring-2 focus:ring-slate-400'/>
                    <span className='text-slate-700'>rent</span>
                </div>
                <div className='flex items-center gap-2'>
                    <input type='checkbox' id='sale'
                    onChange={handleChange}
                    value={sidebardata.type==='sale'}                    
                    className='w-5 h-5 text-slate-600 focus:ring-2 focus:ring-slate-400'/>
                    <span className='text-slate-700'>sale</span>
                </div>
                <div className='flex items-center gap-2'>
                    <input type='checkbox' id='offer' 
                    onChange={handleChange}
                    value={sidebardata.offer}
                    className='w-5 h-5 text-slate-600 focus:ring-2 focus:ring-slate-400'/>
                    <span className='text-slate-700'>offer</span>
                </div>
            </div>
        </div>
        <div>
            <label className='text-slate-700 font-bold'>Amenities:</label>
            <div className='gap-2 flex-wrap flex'>
                <div className='flex items-center gap-2'>
                    <input type='checkbox' id='parking'
                    onChange={handleChange}
                    value={sidebardata.parking}
                    className='w-5 h-5 text-slate-600 focus:ring-2 focus:ring-slate-400'/>
                    <span className='text-slate-700'>Parking</span>
                </div>
                <div className='flex items-center gap-2'>
                    <input type='checkbox' id='furnished' 
                    onChange={handleChange}
                    value={sidebardata.furnished}
                    className='w-5 h-5 text-slate-600 focus:ring-2 focus:ring-slate-400'/>
                    <span className='text-slate-700'>Furnished</span>
                </div>
            </div>
        </div>
        <div>
            <label className='text-slate-700 font-bold'>Sort:</label>
            <select onChange={handleChange}
            defaultValue={'created_at_desc'}
            id='sort_order' className='border rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-slate-400'>
                <option value="regularPrice_desc">price high to low</option>
                <option value="regularPrice_asc">price low to high</option>
                <option value="createdAt_desc">latest</option>
                <option value="createdAt_asc">oldest</option>
            </select>
        </div>
        <button className='bg-slate-700 p-3 rounded-lg text-white hover:bg-slate-600 transition-colors'>
            Search
        </button>
    </form>
</div>


        <div className=''>
            <h1>results</h1>
            <div className='p-7 flex flex-wrap gap-2'>
                {!loading && listings.length===0 &&(
                    <p className='text-xl text-slate-700 '>No listing found</p>
                )}
                {loading && (
                    <p className='text-xl text-slate-700 w-full'>Loading...</p>
                )}
                {
                    !loading && listings && listings.map((listing)=>(
                        <ListingCard key={listing._id} listing={listing}/>

                    ))
                }

            </div>
            {showMore && (
                    <button
                    onClick={()=>{onShowMoreClick()}}
                    className='text-green-700 hover:text-green-500 text-xl font-semibold p-3 ml-7'
                    >
                      Show more
                    </button>
                )}

        </div>
    </div>
  )
}
