import { getDownloadURL, getStorage, uploadBytesResumable, ref } from 'firebase/storage';
import React, { useEffect, useState } from 'react';
import { app } from '../firebase';
import { useSelector } from 'react-redux';
import { useNavigate ,useParams } from 'react-router-dom';

const UpdateProductPage = () => {

  const { currentUser } = useSelector(state => state.user);
  const [files, setFiles] = useState([]);
  const [formData, setFormData] = useState({
    Title: '',
    Description: '',
    Price: '',
    Available: '',
    Location: '',
    imageUrls: [],
  });
  const [imageUploadError, setImageUploadError] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate=useNavigate();
  const params=useParams();
  
  useEffect(() => {
    const fetchAdvert = async () => {
      const advertId = params.advertId;
      const res = await fetch(`/api/Adverts/get/${advertId}`);
      const data = await res.json();
  
      if (data.Success === false) {
        console.log(data.message);
      } else {
        setFormData(prevFormData => ({
          ...prevFormData,
          Title: data.Title || '',
          Description: data.Description || '',
          Price: data.Price || '',
          Available: data.Available || '',
          Location: data.Location || '',
          imageUrls: data.imageUrls || [],
        }));
      }
    };
  
    fetchAdvert();
  }, [params.advertId]);
  

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
        setImageUploadError('Image upload failed (2MB per image).');
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

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData(prevFormData => ({
      ...prevFormData,
      [id]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
  
      if (formData.imageUrls.length<1)return setError("You must uplaod one image")
      setLoading(true);
      setError(false);
      const res = await fetch(`/api/Adverts/update/${params.advertId}`, {
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
      alert("Advert updated successfully")
      navigate(`/advert/${data._id}`);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-slate-100 rounded-lg shadow-lg">
      <h1 className="text-2xl font-semibold text-slate-700 mb-6">Update Product</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Title */}
        <div>
          <label htmlFor="title" className="block text-slate-600 text-sm font-medium">
            Title
          </label>
          <input
            type="text"
            id="Title"
            value={formData.Title}
            onChange={handleChange}
            className="mt-1 block w-full px-4 py-2 bg-slate-50 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-slate-500 focus:border-slate-500"
            placeholder="Enter product title"
            required
          />
        </div>

        {/* Description */}
        <div>
          <label htmlFor="description" className="block text-slate-600 text-sm font-medium">
            Description
          </label>
          <textarea
            id="Description"
            value={formData.Description}
            onChange={handleChange}
            className="mt-1 block w-full px-4 py-2 bg-slate-50 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-slate-500 focus:border-slate-500"
            placeholder="Enter product description"
            rows="4"
            required
          />
        </div>

        {/* Price */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label htmlFor="price" className="block text-slate-600 text-sm font-medium">
              Price (kes)
            </label>
            <input
              type="number"
              id="Price"
              value={formData.Price}
              onChange={handleChange}
              className="mt-1 block w-full px-4 py-2 bg-slate-50 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-slate-500 focus:border-slate-500"
              placeholder="Enter price"
              required
            />
          </div>

          {/* Availability */}
          <div>
            <label htmlFor="availability" className="block text-slate-600 text-sm font-medium">
              Availability
            </label>
            <input
              type="number"
              id="Available"
              value={formData.Available}
              onChange={handleChange}
              className="mt-1 block w-full px-4 py-2 bg-slate-50 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-slate-500 focus:border-slate-500"
              placeholder="How many available?"
              required
            />
          </div>
        </div>

        {/* Location */}
        <div>
          <label htmlFor="location" className="block text-slate-600 text-sm font-medium">
            Shop Location
          </label>
          <input
            type="text"
            id="Location"
            value={formData.Location}
            onChange={handleChange}
            className="mt-1 block w-full px-4 py-2 bg-slate-50 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-slate-500 focus:border-slate-500"
            placeholder="Enter shop location"
            required
          />
        </div>

        {/* Image Upload */}
        <div>
          <label htmlFor="image" className=" text-slate-600 text-sm font-medium flex gap-4">
            Product Image
          </label>
          <input
                onChange={(e) => setFiles(Array.from(e.target.files))}
                type='file'
                id='images'
                accept='image/*'
                multiple
            className="mt-1 block w-full text-sm text-slate-500
              file:mr-4 file:py-2 file:px-4
              file:rounded-md file:border-0
              file:text-sm file:font-semibold
              file:bg-slate-700 file:text-white
              hover:file:bg-slate-600"
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

        <div>
          <button
            type="submit"
            className="w-full bg-slate-700 text-white py-2 px-4 rounded-md shadow-lg hover:bg-slate-600 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2"
          >
               {loading ? 'updating..' : 'update Product'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateProductPage;
