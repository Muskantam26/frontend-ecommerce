import React, { useState, useEffect } from "react";
import { Heart, Eye, ShoppingBag } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import { addToWishlist } from "../../redux/slice/wishlistSlice";

const HandpickedElegance = ({ 
  data = [], 
  itemsPerRow = 5, 
  isSlider = true,
  title = "HANDPICKED ELEGANCE",
  subtitle = "TIMELESS ELEGANCE FOR YOUR HOME"
}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleItems, setVisibleItems] = useState(itemsPerRow);

  const handleAddToWishlist = async (e, productId) => {
    e.stopPropagation();
    try {
      const token = localStorage.getItem("token");

      if (!token || !user) {
        alert("Please login to add products to wishlist");
        navigate("/login");
        return;
      }

      await dispatch(addToWishlist(productId)).unwrap();
      alert("Product added to wishlist");
    } catch (error) {
      console.error("Add to wishlist error:", error);
      alert(error || "Failed to add product to wishlist");
    }
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) setVisibleItems(1);
      else if (window.innerWidth < 768) setVisibleItems(2);
      else if (window.innerWidth < 1024) setVisibleItems(3);
      else setVisibleItems(itemsPerRow);
    };

    handleResize(); 
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [itemsPerRow]);

  const totalPages = Math.ceil(data.length / visibleItems);
  const maxIndex = data.length - visibleItems;

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  };

  const goToPage = (pageIndex) => {
    const newIndex = pageIndex * visibleItems;
    setCurrentIndex(newIndex > maxIndex ? maxIndex : newIndex);
  };

  const currentPage = Math.ceil(currentIndex / visibleItems);

  return (
    <div className="w-full  mx-auto ">
      {/* Header */}
      <div className={`flex flex-wrap md:flex-nowrap items-center ${title || subtitle ? 'justify-between' : 'justify-end'}  `}>
        {(title || subtitle) && (
        <div className="lg:flex md:flex-col-2  sm:flex-col-2 items-center gap-4 flex-grow w-full md:w-auto">
          {title && (
          <h2 className="text-xl md:text-2xl font-bold uppercase text-gray-900 whitespace-nowrap">
            {title}
          </h2>
          )}
          {title && subtitle && <div className="h-px bg-brand-hover w-0  lg:w-40"></div>}
          {subtitle && (
          <span className="text-xs md:text-xs text-gray-400 font-medium uppercase tracking-wider truncate">
            {subtitle}
          </span>
          )}
        </div>
        )}

        {/* Navigation */}
        {isSlider && (
        <div className="flex items-center gap-4 mt-4 md:mt-0 md:justify-center lg:justify-end w-full md:w-auto">
          <motion.button
            whileHover="hover"
            whileTap={{ scale: 0.9 }}
            onClick={prevSlide}
            className="text-gray-500 hover:text-black transition-colors"
          >
            <motion.svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              variants={{ hover: { x: -4 } }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <path d="M19 12H5" />
              <path d="M12 19l-7-7 7-7" />
            </motion.svg>
          </motion.button>
          <div className="flex items-center gap-2">
            {Array.from({ length: totalPages }).map((_, idx) => (
              <button
                key={idx}
                onClick={() => goToPage(idx)}
                className={`w-2 h-2 rounded-full transition-colors ${
                  currentPage === idx
                    ? "bg-brand-hover"
                    : "border border-gray-300 hover:border-black"
                }`}
              ></button>
            ))}
          </div>
          <motion.button
            whileHover="hover"
            whileTap={{ scale: 0.9 }}
            onClick={nextSlide}
            className="text-gray-500 hover:text-black transition-colors"
          >
            <motion.svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              variants={{ hover: { x: 4 } }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <path d="M5 12h14" />
              <path d="m12 5 7 7-7 7" />
            </motion.svg>
          </motion.button>
        </div>
        )}
      </div>

      {/* Product Slider/Grid Container */}
      <div className={isSlider ? "overflow-hidden" : ""}>
        <motion.div
          className={`flex ${!isSlider ? "flex-wrap" : ""} -mx-3`}
          animate={isSlider ? { x: `-${currentIndex * (100 / visibleItems)}%` } : { x: 0 }}
          transition={{ type: "tween", duration: 0.5, ease: "easeInOut" }}
        >
          {data.map((product) => (
            <div
              key={product._id || product.id}
              className={`w-full sm:w-1/2 md:w-1/3 ${itemsPerRow === 3 ? 'lg:w-1/3' : itemsPerRow === 4 ? 'lg:w-1/4' : 'lg:w-1/5'} flex-shrink-0 px-3 ${!isSlider ? 'mb-8' : ''}`}
            >
              <div onClick={() => navigate(`/product/${product._id || product.id}`)} className="group flex flex-col cursor-pointer h-full">
                {/* Image Container */}
                <div className="relative  overflow-hidden flex items-center justify-center ">
                  <img
                    src={(product.images && product.images[0]) || product.image}
                    alt={product.name}
                    className="w-full h-full object-contain mix-blend-multiply transition-transform duration-500 group-hover:scale-110"
                  />

                  {/* Hover Icons (Top Right) */}
                  <div className="absolute top-4 right-4 flex flex-col gap-2 translate-x-12 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300 ease-out z-10">
                    <button 
                      onClick={(e) => handleAddToWishlist(e, product._id || product.id)}
                      className="w-9 h-9 bg-white rounded-full flex items-center justify-center text-black hover:bg-yellow-500 shadow-sm transition-colors"
                      title="Add to wishlist"
                    >
                      <Heart className="w-4 h-4" />
                    </button>
                    <button className="w-9 h-9 bg-white rounded-full flex items-center justify-center text-gray-700 hover:text-black shadow-sm transition-colors">
                      <Eye className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Hover Icon (Bottom Right) */}
                  <div className="absolute bottom-4 right-4 translate-y-12 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 ease-out delay-75 z-10">
                    <button className="w-10 h-10 bg-(--color-button-hover) rounded-full flex items-center justify-center text-white hover:bg-gray-800 shadow-sm transition-colors">
                      <ShoppingBag className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Product Details */}
                <div className="flex flex-col gap-1.5 flex-grow px-1">
                  {/* Stars */}
                  <div className="flex items-center text-[#d1d5db]">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className="w-4 h-4 fill-current"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>

                  {/* Category */}
                  {product.category && product.category.title && (
                    <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wider mt-2 line-clamp-1">
                      {product.category.title}
                    </span>
                  )}

                  {/* Title */}
                  <h3 className="text-sm text-gray-800 font-medium leading-relaxed line-clamp-2 mt-1">
                    {product.name}
                  </h3>

                  {/* Price */}
                  <p className="text-[15px] font-bold text-gray-900 mt-2">
                    ${product.price?.sellingPrice || product.price}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default HandpickedElegance;
