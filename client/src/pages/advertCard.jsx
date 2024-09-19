import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { FaPhoneAlt, FaWhatsapp } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/swiper-bundle.css';
import Loading from '../components/loading';
import { MdLocationOn } from 'react-icons/md';

const ProductPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [similarProducts, setSimilarProducts] = useState([]);
  const [owner, setOwner] = useState(null);

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

  if (!product) return <div><Loading/></div>;

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      {/* Product Details */}
      <motion.div 
        className="product-details" 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold text-slate-700 mb-4">{product.Title}</h1>
        <Swiper
          spaceBetween={10}
          pagination={{ clickable: true }}
          navigation
          modules={[Navigation, Pagination]}  // Register the modules
        >
        {product.imageUrls.map((url) => (
          <SwiperSlide key={url}>
          <div className="relative h-[550px] w-full rounded-r-lg">
          <img
          src={url}
          alt="Product"
          className="absolute inset-0 w-full h-full object-cover"
        />
           <div className="absolute inset-0 bg-black opacity-30"></div>
           </div>
      </SwiperSlide>
        ))}
     </Swiper>

        <p className="text-lg text-slate-600 mb-2 font-bold">Price: kes {product.Price}</p>
        <p className="text-lg text-slate-600 mb-4 font-bold">Availability: {product.Available}</p>
        <p className="text-md text-slate-500 font-bold">{product.Description}</p>'
        <p className="text-lg text-slate-500 mb-4 flex gap-3 font-bold"> <MdLocationOn className='text-slate-800'/>{product.Location}</p>'
      </motion.div>

      {/* Contact Owner */}
      <div className="contact-owner my-6 p-4 bg-slate-100 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-slate-700 mb-4">Contact Owner</h2>
        {owner ? (
          <>
            <p className="text-lg text-slate-600">Name: {owner.username}</p>
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
                  src={similarProduct.imageUrls[0]}
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
