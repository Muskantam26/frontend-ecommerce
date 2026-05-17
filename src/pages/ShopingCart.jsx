import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCart, updateCartItem, removeCartItem } from '../redux/slice/cartSlice';
import HeaderPage from '../component/headerPage';
import HandpickedElegance from '../component/Hero/HandpickedElegance';

const TrashIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-subtitle hover:text-title transition-colors cursor-pointer">
    <path d="M3 6h18"></path>
    <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
    <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
    <line x1="10" y1="11" x2="10" y2="17"></line>
    <line x1="14" y1="11" x2="14" y2="17"></line>
  </svg>
);

const TruckIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-success">
    <rect x="1" y="3" width="15" height="13"></rect>
    <polygon points="16 8 20 8 23 11 23 16 16 16 16 8"></polygon>
    <circle cx="5.5" cy="18.5" r="2.5"></circle>
    <circle cx="18.5" cy="18.5" r="2.5"></circle>
  </svg>
);


const recommendedProducts = [
  {
    id: 101,
    name: "Solid Wood Plant Stand for Indoor Pot Display",
    price: "₹19.99",
    image: "https://images.unsplash.com/photo-1485955900006-10f4d324d411?auto=format&fit=crop&q=80",
  },
  {
    id: 102,
    name: "Solid Wood Bedside Cabinet with Two Storage Drawers",
    price: "₹19.99",
    image: "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&q=80",
  },
  {
    id: 103,
    name: "Solid Wood Bed Frame with Classic Vintage Design",
    price: "₹19.99",
    image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&q=80",
  }
];

const ShopingCart = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { cart, loading } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.auth);

  const items = cart?.items || [];

  useEffect(() => {
    if (user) {
      dispatch(fetchCart());
    }
  }, [user, dispatch]);

  const total = items.reduce((acc, item) => acc + (item.product?.price?.sellingPrice || 0) * item.quantity, 0);
  const freeShippingThreshold = 1000;
  const progress = Math.min((total / freeShippingThreshold) * 100, 100);
  const remainingForFreeShipping = Math.max(freeShippingThreshold - total, 0);

  const handleUpdateQuantity = (productId, variantId, delta, currentQuantity) => {
    const newQuantity = currentQuantity + delta;
    if (newQuantity >= 1) {
      dispatch(updateCartItem({ productId, variantId, quantity: newQuantity }));
    }
  };

  const handleRemoveItem = (productId, variantId) => {
    dispatch(removeCartItem({ productId, variantId }));
  };

  return (
    <div>
      <HeaderPage title={"Shopping Cart"}/>
      
      <div className=" w-full mx-auto px-4 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Left Column: Cart Table */}
          <div className="w-full lg:w-[65%]">
            {/* Table Header */}
            <div className="hidden md:grid grid-cols-12 bg-secondary py-4 px-6 text-[11px] font-bold tracking-widest text-title uppercase">
              <div className="col-span-6">PRODUCT</div>
              <div className="col-span-2 text-center">PRICE</div>
              <div className="col-span-2 text-center">QTY</div>
              <div className="col-span-2 text-right">TOTAL</div>
            </div>

            {/* Table Body */}
            <div className="border border-outline mb-6">
              {loading && items.length === 0 ? (
                <div className="py-12 text-center text-body font-medium">Loading your cart...</div>
              ) : items.length > 0 ? items.map(item => (
                <div key={item._id} className="flex flex-col md:grid md:grid-cols-12 md:items-center py-6 px-4 md:px-6 border-b border-outline last:border-b-0 gap-4 md:gap-0">
                  <div className="col-span-12 md:col-span-6 flex items-start md:items-center gap-4 md:gap-6">
                    <button onClick={() => handleRemoveItem(item.product?._id, item.variantId)} className="hidden md:block cursor-pointer">
                      <TrashIcon />
                    </button>
                    <div className="w-[80px] h-[100px] bg-secondary flex items-center justify-center p-2 shrink-0">
                      <img src={item.product?.images?.[0]} alt={item.product?.name} className="max-w-full max-h-full object-contain mix-blend-multiply" />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <div className="text-[14px] text-title font-medium md:max-w-[250px] leading-relaxed pr-4 md:pr-0">
                          {item.product?.name}
                        </div>
                        <button onClick={() => handleRemoveItem(item.product?._id, item.variantId)} className="md:hidden mt-1 shrink-0 cursor-pointer">
                          <TrashIcon />
                        </button>
                      </div>
                      
                      {/* Variant Info */}
                      <div className="flex flex-wrap gap-2 mt-1 mb-2">
                        {item.attributes && Object.entries(item.attributes).map(([key, value]) => (
                          <div key={key} className="text-[11px] bg-gray-100 px-2 py-0.5 rounded text-gray-600 uppercase">
                            {key}: <span className="text-gray-900 font-bold">{value}</span>
                          </div>
                        ))}
                      </div>

                      <div className="md:hidden text-[14px] font-bold text-title mt-2">
                        ${item.product?.price?.sellingPrice?.toFixed(2)}
                      </div>
                    </div>
                  </div>
                  
                  <div className="hidden md:block col-span-2 text-center text-[14px] font-bold text-title">
                    ${item.product?.price?.sellingPrice?.toFixed(2)}
                  </div>
                  
                  <div className="col-span-12 md:col-span-2 flex items-center justify-between md:justify-center w-full mt-2 md:mt-0">
                    <span className="md:hidden text-[13px] font-bold text-title uppercase">Quantity</span>
                    <div className="flex border border-outline items-center w-[90px] h-10 bg-background">
                      <button onClick={() => handleUpdateQuantity(item.product?._id, item.variantId, -1, item.quantity)} className="w-8 h-full flex items-center justify-center text-subtitle hover:text-title transition-colors cursor-pointer">-</button>
                      <span className="flex-1 text-center font-bold text-[13px] text-title">{item.quantity}</span>
                      <button onClick={() => handleUpdateQuantity(item.product?._id, item.variantId, 1, item.quantity)} className="w-8 h-full flex items-center justify-center text-subtitle hover:text-title transition-colors cursor-pointer">+</button>
                    </div>
                  </div>

                  <div className="col-span-12 md:col-span-2 flex justify-between md:block text-right text-[14px] font-medium text-body mt-2 md:mt-0">
                    <span className="md:hidden text-[13px] font-bold text-title uppercase">Total</span>
                    <span className="text-title md:text-body font-bold md:font-medium">${((item.product?.price?.sellingPrice || 0) * item.quantity).toFixed(2)}</span>
                  </div>
                </div>
              )) : (
                <div className="py-12 text-center text-body font-medium">Your cart is empty.</div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mb-4">
              <button className="flex-1 bg-secondary hover:bg-outline text-title font-bold text-[11px] tracking-widest py-4 transition-colors uppercase cursor-pointer" onClick={()=>navigate("/checkout")}>
                PROCEED TO CHECKOUT
              </button>
              <div onClick={() => navigate("/products")} className="flex-1 flex cursor-pointer">
                <button className="w-full bg-brand hover:bg-brand-hover text-black font-bold text-[11px] tracking-widest py-4 transition-colors uppercase pointer-events-none">
                  CONTINUE SHOPPING
                </button>
              </div>
            </div>
          </div>

          {/* Right Column: Order Summary */}
          <div className="w-full lg:w-[35%]">
            <div className="bg-secondary border border-outline p-6 md:p-8">
              <div className="text-[11px]  font-bold tracking-widest text-title uppercase pb-6 border-b border-background mb-6">
                THERE ARE {items.reduce((acc, item) => acc + item.quantity, 0)} ITEMS IN YOUR CART
              </div>
              
              <div className="flex justify-between items-center mb-6">
                <span className="text-[13px] font-bold text-title uppercase tracking-widest">TOTAL:</span>
                <span className="text-[24px] font-bold text-title">${total.toFixed(2)}</span>
              </div>

              <div className="flex justify-between items-start mb-10 text-[13px] w-full">
                <span className="font-bold text-title uppercase tracking-widest ">SHIPPING:</span>
                <span className="text-body text-right leading-relaxed">
                  Shipping & taxes calculated at checkout
                </span>
              </div>  

              <div className="mb-4">
                <div className="text-success text-[13px] font-bold mb-4 uppercase tracking-wide">
                  {remainingForFreeShipping > 0 
                    ? `SPEND ₹${remainingForFreeShipping.toFixed(2)} FOR FREE SHIPPING` 
                    : "CONGRATULATIONS! YOU'VE GOT FREE SHIPPING"}
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="shrink-0 w-8 h-8 flex items-center justify-center rounded-full border border-success bg-background text-success">
                    <TruckIcon />
                  </div>
                  <div className="flex-1 h-2 bg-outline">
                    <div 
                      className="h-full bg-success transition-all duration-300" 
                      style={{ width: `${progress}%` }}
                    ></div>
                  </div>
                </div>
              </div>
              <div className="text-[13px] text-body mt-6">
                Free shipping for any orders above ₹1,000.00
              </div>
            </div>
          </div>

        </div>

        {/*You may also like these products */}

        <div className="mt-20">
          <h1 className='text-title'>You may also like these products</h1>
          <HandpickedElegance 
            data={recommendedProducts} 
            itemsPerRow={4} 
            isSlider={false}
            title="" 
            subtitle=""
         />  
        </div>
      </div>
    </div>
  );
};

export default ShopingCart;