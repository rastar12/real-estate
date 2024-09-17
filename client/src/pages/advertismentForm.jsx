import  { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';



const AddProductPage = () => {
const { currentUser } = useSelector(state => state.user);
const [error, setError] = useState(false);
const [loading, setLoading] = useState(false);
const navigate=useNavigate();
const [selectedType, setSelectedType] = useState('');
const [formData, setFormData] = useState({
    Title: '',
    Description: '',
    Price: '',
    Available: '',
    Location: '',
    imageUrls: ["ecnineicecc"],
    
  });

  console.log(formData)
  console.log(selectedType)
  const [image, setImage] = useState(null);

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
   navigate(`/advert/${data._id}`)
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
          <input
            type="file"
            id="imageUrls"
            onChange={handleImageChange}
            className="mt-1 block w-full text-sm text-slate-500
              file:mr-4 file:py-2 file:px-4
              file:rounded-md file:border-0
              file:text-sm file:font-semibold
              file:bg-slate-700 file:text-white
              hover:file:bg-slate-600"
          />
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


