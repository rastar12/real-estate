import React from 'react';
import { Link } from 'react-router-dom';

const PropertyDetailsPage = () => {
  const property = {
    id: 1,
    name: 'Property 1',
    description: 'Serene garden Apartments offer modern, spacious living apartments  in the hearts of Nairobi bustling city. with stunning views of the Nairobi Skyline',
    price: '$200,000',
    bedrooms: 3,
    bathrooms: 2,
    area: '1500 sqft',
    location: '1234 Main Street, City, Country',
    image: "./src/assets/profilepic.jpeg",
  };

  return (
    <section className="py-10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <img src="./src/assets/profilepic.jpeg" alt={property.name} className="w-full h-96 object-cover" />
          <div className="p-6">
            <h2 className="text-3xl font-semibold text-gray-800 mb-4">{property.name}</h2>
            <p className="text-gray-600 mb-4">{property.description}</p>
            <div className="flex justify-between mb-4">
              <span className="text-lg font-bold text-blue-500">{property.price}</span>
              <div>
                <span className="mr-4"><strong>Bedrooms:</strong> {property.bedrooms}</span>
                <span className="mr-4"><strong>Bathrooms:</strong> {property.bathrooms}</span>
                <span className="mr-4"><strong>Area:</strong> {property.area}</span>
              </div>
            </div>
            <p className="text-gray-700 mb-4"><strong>Location:</strong> {property.location}</p>
            <Link to={"/bookNow"}>
            <button className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-300">Book Viewing</button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PropertyDetailsPage;
