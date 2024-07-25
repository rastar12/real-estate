import { getDownloadURL, getStorage, uploadBytesResumable, ref } from 'firebase/storage';
import React, { useState } from 'react';
import { app } from '../firebase';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const ListingForm = () => {
  const { currentUser } = useSelector(state => state.user);
  const [files, setFiles] = useState([]);
  const [formData, setFormData] = useState({
    imageUrls: [],
    name: '',
    description: '',
    address: '',
    type: 'rent',
    bedrooms: 1,
    bathrooms: 1,
    regularPrice: 0,
    discountPrice: 0,
    offer: false,
    parking: false,
    furnished: false,
  });
  const [imageUploadError, setImageUploadError] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate=useNavigate();
  const handleImageSubmit = async (e) => {
    e.preventDefault();
    if (files.length > 0 && files.length <= 7) {
      setUploading(true);
      setImageUploadError(false);
      const promises = [];
      for (let i = 0; i < files.length; i++) {
        promises.push(storeImage(files[i]));
      }
      try {
        const urls = await Promise.all(promises);
        setFormData({
          ...formData,
          imageUrls: formData.imageUrls.concat(urls),
        });
        setImageUploadError(false);
      } catch (err) {
        setImageUploadError('Image upload failed (4MB per image).');
      } finally {
        setUploading(false);
      }
    } else {
      setImageUploadError('You can only add up to 7 images per listing.');
    }
  };

  const storeImage = async (file) => {
    return new Promise((resolve, reject) => {
      const storage = getStorage(app);
      const fileName = new Date().getTime() + file.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(`Upload is ${progress}% done`);
        },
        (error) => {
          reject(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            resolve(downloadURL);
          });
        }
      );
    });
  };

  const handleRemoveImage = (index) => {
    setFormData({
      ...formData,
      imageUrls: formData.imageUrls.filter((_, i) => i !== index),
    });
  };

  const handleChange=(e)=>{
    if(e.target.id==='sale'|| e.target.id==='rent'){
      setFormData({
        ...formData,
        type:e.target.id
      })
    }
    if (e.target.id==='parking'||e.target.id==='furnished'||e.target.id ==='offer'){
      setFormData({
    ...formData,
    [e.target.id]:e.target.checked
    })
  }
  if(e.target.type==='number'||e.target.type==='text'|| e.target.type=='textarea'){
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    })
  }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
  
      if (formData.imageUrls.length<1)return setError("You must uplaod one image")
      if (+formData.regularPrice<+formData.discountPrice) return setError("discount price must be lower than regular price")
      setLoading(true);
      setError(false);
      const res = await fetch('/api/Listing/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...formData, userRef: currentUser._id }),
      });
      const data = await res.json();
      setLoading(false);
      if (data.Success === false) {
        setError(data.message);
      }
      alert("listing created successfully")
      navigate(`/listing/${data._id}`);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen p-6 flex items-center justify-center">
      <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="p-6 md:p-8">
          <h2 className="text-3xl font-semibold text-gray-800 mb-6 text-center">Create a New Listing</h2>
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="name" className="block text-gray-700">Name</label>
              <input
                type="text"
                id="name"
                className="border p-3 rounded-lg w-full focus:ring-2 focus:ring-blue-500"
                placeholder="Enter the listing name"
                onChange={handleChange}
                required
                value={formData.name}
              />
            </div>
            <div>
              <label htmlFor="description" className="block text-gray-700">Description</label>
              <textarea
                id="description"
                className="border p-3 rounded-lg w-full focus:ring-2 focus:ring-blue-500"
                placeholder="Enter the listing description"
                onChange={handleChange}
                value={formData.description}
                required
              />
            </div>
            <div>
              <label htmlFor="address" className="block text-gray-700">Address</label>
              <input
                type="text"
                id="address"
                className="border p-3 rounded-lg w-full focus:ring-2 focus:ring-blue-500"
                placeholder="Enter the listing address"
                onChange={handleChange}
                value={formData.address}
                required
              />
            </div>
            <div className="md:flex md:space-x-4">
              <div className="flex-1">
                <label htmlFor="regularPrice" className="block text-gray-700">Regular Price</label>
                <input
                  type="number"
                  id="regularPrice"
                  className="border p-3 rounded-lg w-full focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter the regular price"
                  onChange={handleChange}
                  value={formData.regularPrice}
                  required
                />
              </div>
                
            </div>
            <div className="md:flex md:space-x-4">
              <div className="flex-1">
                <label htmlFor="bathrooms" className="block text-gray-700">Bathrooms</label>
                <input
                  type="number"
                  id="bathrooms"
                  className="border p-3 rounded-lg w-full focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter the number of bathrooms"
                  onChange={handleChange}
                  value={formData.bathrooms}
                  required
                />
              </div>
              <div className="flex-1 mt-4 md:mt-0">
                <label htmlFor="bedrooms" className="block text-gray-700">Bedrooms</label>
                <input
                  type="number"
                  id="bedrooms"
                  className="border p-3 rounded-lg w-full focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter the number of bedrooms"
                  onChange={handleChange}
                  value={formData.bedrooms}
                  required
                />
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <input
                type="checkbox"
                id="furnished"
                className="mr-2"
                onChange={handleChange}
                checked={formData.furnished}
              />
              <label htmlFor="furnished" className="text-gray-700">Furnished</label>
            </div>
            <div className="flex items-center space-x-4">
              <input
                type="checkbox"
                id="parking"
                className="mr-2"
                onChange={handleChange}
                checked={formData.parking}
              />
              <label htmlFor="parking" className="text-gray-700">Parking</label>
            </div>
            <div className="flex items-center space-x-4">
              <input
                type="checkbox"
                id="sale"
                className="mr-2"
                onChange={handleChange}
                checked={formData.type === 'sale'}
              />
              <label className="text-gray-700">Sale</label>
            </div>
            <div className="flex items-center space-x-4">
              <input
                type="checkbox"
                id="rent"
                className="mr-2"
                onChange={handleChange}
                checked={formData.type === 'rent'}
              />
              <label className="text-gray-700">Rent</label>
            </div>
            <div className="flex items-center space-x-4">
              <input
                type="checkbox"
                id="offer"
                className="mr-2"
                onChange={handleChange}
                checked={formData.offer}
              />
              <label className="text-gray-700">Offer</label>
            </div>
            {formData.offer && (
                  <div className="flex-1 mt-4 md:mt-0">
                    <label htmlFor="discountPrice" className="block text-gray-700">Discount Price</label>
                <input
                  type="number"
                  id="discountPrice"
                  className="border p-3 rounded-lg w-full focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter the discount price"
                  onChange={handleChange}
                  value={formData.discountPrice}
                  required
                />
              </div>
                )} 
            <div className='flex gap-4'>
              <input
                onChange={(e) => setFiles(Array.from(e.target.files))}
                className='p-3 border border-gray-300 rounded w-full'
                type='file'
                id='images'
                accept='image/*'
                multiple
              />
              <button
                type='button'
                disabled={uploading}
                onClick={handleImageSubmit}
                className='p-3 text-green-700 border border-green-700 rounded uppercase hover:shadow-lg disabled:opacity-80'
              >
                {uploading ? 'Uploading...' : 'Upload'}
              </button>
            </div>
            <p className='text-red-700 rounded-md'>{imageUploadError}</p>
            {formData.imageUrls.map((url, index) => (
              <div key={url} className='flex justify-between p-3 border items-center'>
                <img src={url} alt={`Image ${index}`} className='w-20 h-20 object-contain rounded-lg' />
                <button type='button' className='text-red-700 uppercase hover:opacity-95' onClick={() => handleRemoveImage(index)}>Delete</button>
              </div>
            ))}
            <button
              type="submit"
              className="bg-green-500 text-white rounded-lg p-3 w-full uppercase hover:bg-green-600 transition duration-300"
            >
              {loading ? 'Creating...' : 'Create Listing'}
            </button>
            <p className='text-red-700'>{error}</p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ListingForm;
