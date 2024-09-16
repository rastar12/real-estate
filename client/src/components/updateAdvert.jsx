import React, { useState } from 'react';

const UpdateProductPage = () => {
  // Example product to update (this would usually come from an API or state)
  const existingProduct = {
    title: 'Sample Product',
    description: 'This is an example product description.',
    price: 100,
    availability: 50,
    location: 'Downtown Store',
  };

  const [title, setTitle] = useState(existingProduct.title);
  const [description, setDescription] = useState(existingProduct.description);
  const [price, setPrice] = useState(existingProduct.price);
  const [availability, setAvailability] = useState(existingProduct.availability);
  const [location, setLocation] = useState(existingProduct.location);
  const [image, setImage] = useState(null); // Image state

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = {
      title,
      description,
      price,
      availability,
      location,
      image,
    };
    console.log('Product updated:', formData);
    // Add logic to send formData to your backend or state management
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
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
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
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
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
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
              Price ($)
            </label>
            <input
              type="number"
              id="price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
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
              id="availability"
              value={availability}
              onChange={(e) => setAvailability(e.target.value)}
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
            id="location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="mt-1 block w-full px-4 py-2 bg-slate-50 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-slate-500 focus:border-slate-500"
            placeholder="Enter shop location"
            required
          />
        </div>

        {/* Image Upload */}
        <div>
          <label htmlFor="image" className="block text-slate-600 text-sm font-medium">
            Product Image
          </label>
          <input
            type="file"
            id="image"
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
            type="submit"
            className="w-full bg-slate-700 text-white py-2 px-4 rounded-md shadow-lg hover:bg-slate-600 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2"
          >
            Update Product
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateProductPage;
