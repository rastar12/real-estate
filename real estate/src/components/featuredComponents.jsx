import React from 'react';
import { Link } from 'react-router-dom';

const FeaturedComponent = () => {
  const properties = [
    {
      id: 1,
      name: 'vihiga castle',
      image: './src/assets/cambridge university.jpg',
      price: '$200,000'
    },
    {
      id: 2,
      name: 'Kisumu castle',
      image: './src/assets/mainpage2.jpg',
      price: '$250,000'
    },
    // Add more properties as needed
  ];

  return (
    <section className="py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-semibold text-gray-800 mb-6">Featured Properties</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {properties.map(property => (
            <div key={property.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <img src={property.image} alt={property.name} className="w-full h-64 object-cover" />
              <div className="p-4">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">{property.name}</h3>
                <p className="text-gray-600">A prestigious house located on the outskirts of Vihiga County it is one of the bestin the Couty offering a tranquil living.</p>
                <div className="mt-4 flex justify-between items-center">
                  <span className="text-lg font-bold text-blue-500">{property.price}</span>

                  <Link to={"/property/details"}>
                  <button className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-300">View Details</button>
                  </Link>
                 
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedComponent;
