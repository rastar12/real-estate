import { useEffect, useState } from 'react';
import { FaTable, FaChair, FaUtensils } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const ShopLandingPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [furnitures, setFurnitures] = useState([]);
  const [cookingMaterials, setCookingMaterials] = useState([]);
  const [page, setPage] = useState('All');

  const handleSetPage = (page) => {
    setPage(page);
  };

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/Adverts/get`);
        if (!res.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await res.json();
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    const fetchFurniture = async () => {
      setLoading(true);
      try {
        const res = await fetch('/api/Adverts/gett?searchTerm=furniture');
        if (!res.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await res.json();
        setFurnitures(data);
      } catch (error) {
        console.error('Error fetching furniture:', error);
      } finally {
        setLoading(false);
      }
    };

    const fetchCookingMaterials = async () => {
      setLoading(true);
      try {
        const res = await fetch('/api/Adverts/gett?searchTerm=utensils');
        if (!res.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await res.json();
        setCookingMaterials(data);
      } catch (error) {
        console.error('Error fetching cooking materials:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
    fetchCookingMaterials();
    fetchFurniture();
  }, []);

  return (
    <div className="max-w-6xl mx-auto p-6 bg-slate-100 rounded-lg shadow-lg">
      {/* Icons at the Top */}
      <div className="flex justify-center space-x-4 mb-6 fixed top-0 left-0 w-full bg-slate-300 py-3 z-10 shadow-md">
        <div
          onClick={() => handleSetPage('All')}
          className={`p-2 cursor-pointer flex flex-col items-center space-y-1 text-slate-900`}
        >
          <FaTable />
          <span className="text-sm">All</span>
        </div>
        <div
          onClick={() => handleSetPage('Furniture')}
          className={`p-2 cursor-pointer flex flex-col items-center space-y-1 text-slate-900`}
        >
          <FaChair />
          <span className="text-sm">Furniture</span>
        </div>
        <div
          onClick={() => handleSetPage('Utensils')}
          className={`p-2 cursor-pointer flex flex-col items-center space-y-1 text-slate-900`}
        >
          <FaUtensils />
          <span className="text-sm">Utensils</span>
        </div>
      </div>

      {/* Spacer for Fixed Icons */}
      <div className="pt-20"></div>

      {/* Loading Indicator */}
      {loading && <div className="text-center py-4">Loading...</div>}

      {/* Products by Selected Category */}
      <section>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {page === 'All' && products.length > 0 && (
            products.map((product) => (
              <motion.div
                key={product._id}
                className="p-4 bg-slate-100 rounded-lg shadow-md"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <img
                  src={product.imageUrls[0]}
                  alt={product.Title}
                  className="w-full h-48 object-cover rounded-md mb-4"
                />
                <h3 className="text-lg font-semibold text-slate-700">{product.Title}</h3>
                <p className="text-md text-slate-600 mb-2">{product.Price}</p>
                <Link to={`/advert/${product._id}`}>
                  <button className="bg-slate-500 text-white py-2 px-4 rounded-md hover:bg-slate-600">
                    View Details
                  </button>
                </Link>
              </motion.div>
            ))
          )}

          {page === 'Utensils' && cookingMaterials.length > 0 && (
            cookingMaterials.map((cookingMaterial) => (
              <motion.div
                key={cookingMaterial._id}
                className="p-4 bg-slate-100 rounded-lg shadow-md"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <img
                  src={cookingMaterial.imageUrls[0]}
                  alt={cookingMaterial.Title}
                  className="w-full h-48 object-cover rounded-md mb-4"
                />
                <h3 className="text-lg font-semibold text-slate-700">{cookingMaterial.Title}</h3>
                <p className="text-md text-slate-600 mb-2">{cookingMaterial.Price}</p>
                <Link to={`/advert/${cookingMaterial._id}`}>
                  <button className="bg-slate-500 text-white py-2 px-4 rounded-md hover:bg-slate-600">
                    View Details
                  </button>
                </Link>
              </motion.div>
            ))
          )}

          {page === 'Furniture' && furnitures.length > 0 && (
            furnitures.map((furniture) => (
              <motion.div
                key={furniture._id}
                className="p-4 bg-slate-100 rounded-lg shadow-md"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <img
                  src={furniture.imageUrls[0]}
                  alt={furniture.Title}
                  className="w-full h-48 object-cover rounded-md mb-4"
                />
                <h3 className="text-lg font-semibold text-slate-700">{furniture.Title}</h3>
                <p className="text-md text-slate-600 mb-2">{furniture.Price}</p>
                <Link to={`/advert/${furniture._id}`}>
                  <button className="bg-slate-500 text-white py-2 px-4 rounded-md hover:bg-slate-600">
                    View Details
                  </button>
                </Link>
              </motion.div>
            ))
          )}
        </div>

        {products.length === 0 && !loading && (
          <div className="text-center py-4">No products found.</div>
        )}
      </section>
    </div>
  );
};

export default ShopLandingPage;
