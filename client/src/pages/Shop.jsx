import { useState } from 'react';
import { FaTable, FaChair, FaUtensils , FaGasPump} from 'react-icons/fa'; // Replaced FaCarpet with FaChair

const categories = [
  { name: 'Tables', icon: <FaTable size={18} /> }, // Reduced icon size
  { name: 'Chairs', icon: <FaChair size={18} /> },
  { name: 'Cooking Materials', icon: <FaUtensils size={18} /> }
];

const ShopLandingPage = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);

  const categoryProducts = {
    Tables: [
      { id: 1, name: 'Elegant Dining Table', price: '$299.99', imageUrl: 'https://via.placeholder.com/300' },
      { id: 2, name: 'Modern Coffee Table', price: '$149.99', imageUrl: 'https://via.placeholder.com/300' }
    ],
    Chairs: [
      { id: 3, name: 'Comfortable Chair', price: '$99.99', imageUrl: 'https://via.placeholder.com/300' },
      { id: 4, name: 'Office Chair', price: '$129.99', imageUrl: 'https://via.placeholder.com/300' }
    ],
    'Cooking Materials': [
      { id: 5, name: 'Non-stick Cookware Set', price: '$149.99', imageUrl: 'https://via.placeholder.com/300' },
      { id: 6, name: 'Stainless Steel Cookware', price: '$199.99', imageUrl: 'https://via.placeholder.com/300' }
    ]
  };

  return (
    <div className="max-w-6xl mx-auto p-6 bg-slate-100 rounded-lg shadow-lg">
      {/* Icons at the Top */}
      <div className="flex justify-center space-x-4 mb-6 fixed top-0 left-0 w-full bg-slate-300 py-3 z-10 shadow-md">
        {categories.map((category) => (
          <div
            key={category.name}
            className={`p-2 cursor-pointer flex flex-col items-center space-y-1 ${
              selectedCategory === category.name ? 'text-slate-900' : 'text-slate-500'
            }`}
            onClick={() => setSelectedCategory(category.name)}
          >
            {category.icon}
            <span className="text-sm">{category.name}</span>
          </div>
        ))}
      </div>

      {/* Spacer for Fixed Icons */}
      <div className="pt-20"></div>

      {/* Products by Selected Category */}
      <section>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {selectedCategory ? (
            categoryProducts[selectedCategory]?.map((product) => (
              <div key={product.id} className="p-4 bg-slate-100 rounded-lg shadow-md">
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="w-full h-48 object-cover rounded-md mb-4"
                />
                <h3 className="text-lg font-semibold text-slate-700">{product.name}</h3>
                <p className="text-md text-slate-600 mb-2">{product.price}</p>
                <button className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600">
                  View Details
                </button>
              </div>
            ))
          ) : (
            <p className="text-center text-slate-600">Please select a category to view products.</p>
          )}
        </div>
      </section>
    </div>
  );
};

export default ShopLandingPage;
