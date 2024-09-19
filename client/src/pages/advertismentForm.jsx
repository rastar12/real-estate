import  { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { app } from '../firebase';
import { getDownloadURL, getStorage, uploadBytesResumable, ref } from 'firebase/storage';



const AddProductPage = () => {
  const { currentUser } = useSelector(state => state.user);
  const [uploading, setUploading] = useState(false);
  const [imageUploadError, setImageUploadError] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [selectedType, setSelectedType] = useState('');
  const [formData, setFormData] = useState({
    Title: '',
    Description: '',
    Price: '',
    Available: '',
    Location: '',
    imageUrls: [],
  });

  const [files, setFiles] = useState([]);
  console.log(formData.imageUrls);

  if(!currentUser){
    navigate('/Login')
  }

  
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

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleRadioChange = (e) => {
    setSelectedType(e.target.value);
  };



  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError(false);
 
      const res = await fetch('/api/adverts/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...formData, userRef: currentUser._id , Category: selectedType}),
      });
      const data = await res.json();
      setLoading(false);
      if (data.Success === false) {
        setError(data.message);
      }
      console.log("Data",data);
      navigate(`/advert/${data._id}`);
    } catch (error) {
      setError(error.message);
      setLoading(false);
  
    }
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData(prevFormData => ({
      ...prevFormData,
      [id]: value
    }));
  };
  return (
    <div className="max-w-4xl mx-auto p-6 bg-slate-100 rounded-lg shadow-lg">
      <h1 className="text-2xl font-semibold text-slate-700 mb-6">Add New Product</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Title */}
        <div>
          <label htmlFor="title" className="block text-slate-600 text-sm font-medium">
            Name
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
              Price ('kes')
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
        <div>
          <h2 className='text-slate-700 font-bold mb-3'>Category</h2>
        <div className="flex items-center">
                <input
                  type="radio"
                  id="furniture"
                  name="Category"
                  value="furniture"
                  checked={selectedType === 'furniture'}
                  onChange={handleRadioChange}
                  className="h-4 w-4 text-slate-700 focus:ring-slate-500 border-slate-300 rounded"
                />
                <label htmlFor="selling" className="ml-2 text-slate-600 text-sm font-medium">
                  Furniture
                </label>
              </div>
              {/* Radio Button for Advertising */}
              <div className="flex items-center">
                <input
                  type="radio"
                  id="utensils"
                  name="Category"
                  value="utensils"
                  checked={selectedType === 'utensils'}
                  onChange={handleRadioChange}
                  className="h-4 w-4 text-slate-700 focus:ring-slate-500 border-slate-300 rounded"
                />
                <label htmlFor="advertising" className="ml-2 text-slate-600 text-sm font-medium">
                  kitchen Items
                </label>
              </div>
        </div>

        {/* Image Upload */}
        <div>
          <label htmlFor="image" className="block text-slate-600 text-sm font-medium">
            Product Image
          </label>

          <div className='flex gap-4'>
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
                className='p-3 text-slate-700 border border-slate-700 rounded uppercase hover:shadow-lg disabled:opacity-80'
              >
                {uploading ? 'Uploading....' : 'Upload'}
              </button>

          </div>
          {formData.imageUrls.map((url, index) => (
              <div key={url} className='flex justify-between p-3 border items-center'>
                <img src={url} alt={`Image ${index}`} className='w-20 h-20 object-contain rounded-lg' />
                <button type='button' className='text-red-700 uppercase hover:opacity-95' onClick={() => handleRemoveImage(index)}>Delete</button>
              </div>
            ))}
          
        </div>

        {/* Submit Button */}
        <div>
          <button
          onClick={handleSubmit}
            type="submit"
            className="w-full bg-slate-700 text-white py-2 px-4 rounded-md shadow-lg hover:bg-slate-600 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2"
          >
            Add Product
          </button>
        </div>
      </form>

      <p className='text-red-600'>{error}</p>
    </div>
  );
};

export default AddProductPage;


