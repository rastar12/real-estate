import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { FaPhoneAlt, FaWhatsapp } from 'react-icons/fa'; // Import icons from react-icons

const ProductPage = () => {
  const { id } = useParams(); // Get the product ID from the URL
  const [product, setProduct] = useState(null); // Product details
  const [similarProducts, setSimilarProducts] = useState([]); // Similar products
  const [owner, setOwner] = useState(null); // Owner details
  console.log(product)

  // Fetch product details
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`/api/Adverts/get/${id}`);
        const data = await res.json();
        setProduct(data);
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    };

    fetchProduct();
  }, [id]);

  // Fetch owner details when product.userRef is available
  useEffect(() => {
    if (product?.userRef) {
      const fetchOwner = async () => {
        try {
          const res = await fetch(`/api/user/${product.userRef}`);
          const data = await res.json();
          setOwner(data);
        } catch (error) {
          console.error('Error fetching owner:', error);
        }
      };

      fetchOwner();
    }
  }, [product?.userRef]);

  // Fetch similar products based on userRef when the product is available
  useEffect(() => {
    if (product?.userRef) {
      const fetchSimilarProducts = async () => {
        try {
          const res = await fetch(`/api/Adverts/myadverts/${product.userRef}`);
          const data = await res.json();
          setSimilarProducts(data);
        } catch (error) {
          console.error('Error fetching similar products:', error);
        }
      };

      fetchSimilarProducts();
    }
  }, [product?.userRef]);

  if (!product) return <div>Loading...</div>;

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      {/* Product Details */}
      <div className="product-details">
        <h1 className="text-3xl font-bold text-slate-700 mb-4">{product.Title}</h1>
        <img src={product.imageUrl} alt={product.Title} className="w-full h-96 object-cover rounded-md mb-6" />
        <p className="text-lg text-slate-600 mb-2">Price: kes {product.Price}</p>
        <p className="text-lg text-slate-600 mb-4">Availability: {product.Available}</p>
        <p className="text-md text-slate-500">{product.Description}</p>
      </div>

      {/* Contact Owner */}
      <div className="contact-owner my-6 p-4 bg-slate-100 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-slate-700 mb-4">Contact Owner</h2>
        {owner ? (
          <>
            <p className="text-lg text-slate-600">Name: {owner.username}</p>
            <p className="text-lg text-slate-600">
            </p>
            <p className="text-lg text-slate-600 flex items-center">
              <FaPhoneAlt className="mr-2" />
              Phone: {owner.PhoneNumber}
            </p>
            <a
              href={`https://wa.me/${owner.PhoneNumber}?text=Hi%20I'm%20interested%20in%20the%20${product.Title}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-green-500 hover:underline flex items-center mt-2"
            >
              <FaWhatsapp className="mr-2" />
              Contact via WhatsApp
            </a>
          </>
        ) : (
          <p>Loading owner information...</p>
        )}
      </div>

      {/* Similar Products */}
      <div className="similar-products mt-6">
        <h2 className="text-2xl font-semibold text-slate-700 mb-4">Similar Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {similarProducts.length > 0 ? (
            similarProducts.map((similarProduct) => (
              <div key={similarProduct._id} className="p-4 bg-slate-100 rounded-lg shadow-md">
                <img
                  src={similarProduct.imageUrl}
                  alt={similarProduct.Title}
                  className="w-full h-48 object-cover rounded-md mb-4"
                />
                <h3 className="text-lg font-semibold text-slate-700">{similarProduct.Title}</h3>
                <p className="text-md text-slate-600 mb-2">${similarProduct.Price}</p>
                <Link to={`/advert/${similarProduct._id}`}>
                  <span className="text-blue-500 hover:underline">View Product</span>
                </Link>
              </div>
            ))
          ) : (
            <p>No similar products found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
