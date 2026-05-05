import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import {
  ChevronLeft,
  ChevronRight,
  Star,
  Heart,
  Share2,
  HelpCircle,
  MessageCircle,
  Leaf,
  PencilRuler,
  Recycle,
  Lightbulb,
  Package,
  Truck,
  Check
} from 'lucide-react';

import CoreFeatures from '../component/Hero/CoreFeatures';
import ProductReviews from '../component/ProductReviews';
import HandpickedElegance from '../component/Hero/HandpickedElegance';
import { Button1 } from '../component/Btn/Button1';
import { getProductByIdApi, getProductsApi } from "../API/product-api";
import { addToCart, openCart } from "../redux/slice/cartSlice";
import { addToWishlist } from "../redux/slice/wishlistSlice";
import Pageloader from '../pageloader/Pageloader';

const Products = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();
  
  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState({});
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState("Description");
  const [similarProducts, setSimilarProducts] = useState([]);

  /* ================= FETCH PRODUCT ================= */

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await getProductByIdApi(id);
        console.log("API RESPONSE:", res);
        setProduct(res?.data || res);
      } catch (error) {
        console.error("Fetch Product Error:", error);
      }
    };

    fetchProduct();
  }, [id]);
  
  useEffect(() => {
    const fetchSimilarProducts = async () => {
      if (product?.category?._id) {
        try {
          const res = await getProductsApi({ category: product.category?._id || product.category, limit: 10 });
          // Filter out the current product from similar products
          const productsList = res?.data?.products || res?.products || [];
          const filtered = productsList.filter(p => p._id !== id);
          setSimilarProducts(filtered);
        } catch (error) {
          console.error("Error fetching similar products:", error);
        }
      }
    };

    fetchSimilarProducts();
  }, [product, id]);

  /* ================= HANDLE OPTION SELECTION ================= */

  const handleOptionSelect = (key, value) => {
    setSelectedOptions(prev => ({
      ...prev,
      [key]: value
    }));
  };

  useEffect(() => {
    if (product?.variants?.length > 0) {
   
      const variant = product.variants.find(v => {
       
        const variantAttrs = v.attributes instanceof Map ? Object.fromEntries(v.attributes) : v.attributes;
        
        return Object.entries(selectedOptions).every(([key, value]) => {
          return variantAttrs[key] === value;
        });
      });

    
      const expectedKeys = product.attributes?.map(a => a.key) || [];
      const allSelected = expectedKeys.every(key => selectedOptions[key]);

      if (allSelected) {
        setSelectedVariant(variant || null);
      } else {
        setSelectedVariant(null);
      }
    }
  }, [selectedOptions, product]);

  /* ================= ADD TO CART ================= */

  const { user } = useSelector((state) => state.auth);

  const handleAddToCart = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token || !user) {
        alert("Please login to add products to cart");
        navigate("/login");
        return;
      }

      const expectedKeys = product.attributes?.map(a => a.key) || [];
      const allSelected = expectedKeys.every(key => selectedOptions[key]);

      if (!allSelected && product.attributes?.length > 0) {
        alert(`Please select ${expectedKeys.join(", ")} before adding to cart.`);
        return;
      }

      if (!selectedVariant && product.variants?.length > 0) {
        alert("Selected combination is not available.");
        return;
      }

      await dispatch(addToCart({
        product: id,
        variantId: selectedVariant?._id,
        quantity: quantity,
        attributes: selectedOptions // Optional but good for cart display if not populated from variantId on backend
      })).unwrap();

      dispatch(openCart());

    } catch (error) {
      console.error("Add to cart error:", error);
      alert(error.response?.data?.message || "Failed to add product to cart");
    }
  };

  const handleAddToWishlist = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token || !user) {
        alert("Please login to add products to wishlist");
        navigate("/login");
        return;
      }

      await dispatch(addToWishlist(id)).unwrap();
      alert("Product added to wishlist");
    } catch (error) {
      console.error("Add to wishlist error:", error);
      alert(error || "Failed to add product to wishlist");
    }
  };
  /* ================= IMAGE SLIDER ================= */

  const handlePrevImage = () => {

    if (!product?.images) return;

    setSelectedImage(prev =>
      prev === 0 ? product.images.length - 1 : prev - 1
    );

  };

  const handleNextImage = () => {

    if (!product?.images) return;

    setSelectedImage(prev =>
      prev === product.images.length - 1 ? 0 : prev + 1
    );

  };

  /* ================= QUANTITY ================= */

  const handleDecreaseQuantity = () => {
    setQuantity(prev => prev > 1 ? prev - 1 : 1);
  };

  const handleIncreaseQuantity = () => {
    setQuantity(prev => prev + 1);
  };

  /* ================= LOADING ================= */

  if (!product) {
    return <Pageloader />;
  }

  return (

    <div className="w-full mx-auto p-4">

      {/* Breadcrumb */}

      <div className="text-xs text-title mb-6 font-medium">

        <span
          onClick={() => navigate("/")}
          className="cursor-pointer hover:underline"
        >
          Home
        </span>

        <span className="mx-2">•</span>

        <span className="text-subtitle">{product.name}</span>

      </div>

      <div className="flex flex-col lg:flex-row gap-10">

        {/* ================= LEFT IMAGES ================= */}

        <div className="lg:w-1/2 flex gap-4">

          <div className="flex flex-col gap-3">

            {product.images?.map((img, idx) => (

              <button
                key={idx}
                onClick={() => setSelectedImage(idx)}
                className={`w-20 h-24 border rounded 
                ${selectedImage === idx ? "border-brand" : "border-gray-200"}`}
              >

                <img
                  src={img}
                  alt=""
                  className="w-full h-full object-contain"
                />

              </button>

            ))}

          </div>

          <div className="flex-1 relative">

            <button
              onClick={handlePrevImage}
              className="absolute left-2 top-1/2 bg-white p-2 rounded-full shadow"
            >
              <ChevronLeft size={18}/>
            </button>

            <img
              src={product.images?.[selectedImage]}
              alt={product.name}
              className="w-full object-contain"
            />

            <button
              onClick={handleNextImage}
              className="absolute right-2 top-1/2 bg-white p-2 rounded-full shadow"
            >
              <ChevronRight size={18}/>
            </button>

          </div>

        </div>

        {/* ================= RIGHT DETAILS ================= */}

        <div className="lg:w-1/2">

          <h1 className="text-lg font-semibold mb-3">
            {product.name}
          </h1>

          {/* reviews */}

          <div className="flex gap-2 mb-4">

            {[1,2,3,4,5].map(i => (
              <Star key={i} size={16}/>
            ))}

          </div>

          {/* price */}

          <div className="text-2xl font-bold mb-4">
            ${selectedVariant ? selectedVariant.price?.sellingPrice : product?.price?.sellingPrice}
            {selectedVariant && selectedVariant.price?.mrp > selectedVariant.price?.sellingPrice && (
              <span className="text-sm text-gray-400 line-through ml-2 font-normal">
                ${selectedVariant.price.mrp}
              </span>
            )}
          </div>

          <p className="text-sm text-gray-600 mb-6">
            {product.description}
          </p>

          {/* stock */}

          <div className="mb-4">

            {(selectedVariant ? selectedVariant.stock : product.stock) > 0 ?

              <span className="text-green-600 flex gap-1 items-center font-bold">
                IN STOCK <Check size={14}/>
              </span>

              :

              <span className="text-red-500 font-bold">
                OUT OF STOCK
              </span>

            }

          </div>

          {/* tags */}

          {product.tags?.length > 0 && (
            <div className="text-sm mb-2">
              TAGS: {product.tags?.join(", ")}
            </div>
          )}

          {product.category && (
            <div className="text-sm mb-6">
              CATEGORY: {product.category.title}
            </div>
          )}

          {/* DYNAMIC ATTRIBUTES */}

          {product.attributes?.map((attr) => (
            <div key={attr.key} className="mb-6">
              <div className="text-sm font-bold mb-2 uppercase">
                {attr.key}: <span className="text-gray-500 font-medium">{selectedOptions[attr.key] || "Select"}</span>
              </div>
              
              <div className="flex flex-wrap gap-3">
                {attr.value?.map((val) => {
                  const isColor = attr.key.toLowerCase() === "color" || attr.key.toLowerCase() === "colors";
                  
                  if (isColor) {
                    return (
                      <button
                        key={val}
                        onClick={() => handleOptionSelect(attr.key, val)}
                        title={val}
                        className={`w-10 h-10 rounded-full border-2 transition-all
                        ${selectedOptions[attr.key] === val ? "border-black scale-110 shadow-md" : "border-transparent hover:border-gray-300"}`}
                        style={{ backgroundColor: val.toLowerCase() }}
                      />
                    );
                  }

                  return (
                    <button
                      key={val}
                      onClick={() => handleOptionSelect(attr.key, val)}
                      className={`px-6 py-2 border text-xs font-bold transition-all
                      ${selectedOptions[attr.key] === val ? "bg-black text-white border-black" : "bg-white text-black border-gray-200 hover:border-black"}`}
                    >
                      {val}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}

          {/* quantity */}

          <div className="flex items-center gap-4 mb-4">

            <div className="flex border">

              <button
                onClick={handleDecreaseQuantity}
                className="px-3"
              >
                -
              </button>

              <span className="px-4">
                {quantity}
              </span>

              <button
                onClick={handleIncreaseQuantity}
                className="px-3"
              >
                +
              </button>

            </div>

            <Button1
              text="Add To Bag"
              onClick={handleAddToCart}
              className="flex-1 justify-center"
              variant='primary'
            />

            <button 
              onClick={handleAddToWishlist}
              className="p-3 bg-gray-200 rounded hover:bg-gray-300 transition-colors"
            >
              <Heart size={18}/>
            </button>

          </div>

          <Button1
          text={"Buy It Now"}
          variant='primary'
          className='w-full justify-center'
          />

        </div>

      </div>

      {/* REVIEWS */}

      <div className="mt-16">
        <ProductReviews/>
      </div>

      <div className='mt-5'>
      <h1 className='text-2xl text-black flex text-center justify-center mb-5'>Similar products</h1>
        <HandpickedElegance
          title=''
          subtitle=''
          data={similarProducts}
        />
      </div>

    </div>

  );

};

export default Products;