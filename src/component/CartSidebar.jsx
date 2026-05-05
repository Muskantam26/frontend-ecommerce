import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "motion/react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCart, updateCartItem, removeCartItem } from "../redux/slice/cartSlice";

const sidebarVariants = {
  open: (height = 1000) => ({
    clipPath: `circle(${height * 2 + 200}px at calc(100% - 52px) 44px)`,
    transition: { type: "spring", stiffness: 20, restDelta: 2 },
  }),
  closed: {
    clipPath: "circle(0px at calc(100% - 52px) 44px)",
    transition: { delay: 0.2, type: "spring", stiffness: 400, damping: 40 },
  },
};

const navVariants = {
  open: { transition: { staggerChildren: 0.07, delayChildren: 0.2 } },
  closed: { transition: { staggerChildren: 0.05, staggerDirection: -1 } },
};

const itemVariants = {
  open: { y: 0, opacity: 1, transition: { y: { stiffness: 1000, velocity: -100 } } },
  closed: { y: 50, opacity: 0, transition: { y: { stiffness: 1000 } } },
};

const CloseIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

const TrashIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400 hover:text-gray-800 transition-colors">
    <path d="M3 6h18"></path>
    <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
    <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
    <line x1="10" y1="11" x2="10" y2="17"></line>
    <line x1="14" y1="11" x2="14" y2="17"></line>
  </svg>
);

const TruckIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-[#3b9f67]">
    <rect x="1" y="3" width="15" height="13"></rect>
    <polygon points="16 8 20 8 23 11 23 16 16 16 16 8"></polygon>
    <circle cx="5.5" cy="18.5" r="2.5"></circle>
    <circle cx="18.5" cy="18.5" r="2.5"></circle>
  </svg>
);

const NoteIcon = ({ className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={`transition-colors ${className}`}>
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
    <polyline points="14 2 14 8 20 8"></polyline>
    <path d="M10.42 12.61a2.1 2.1 0 1 1 2.97 2.97L7.95 21 4 22l.99-3.95 5.43-5.44Z"></path>
  </svg>
);

const ShippingIcon = ({ className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={`transition-colors ${className}`}>
    <rect x="1" y="3" width="15" height="13"></rect>
    <polygon points="16 8 20 8 23 11 23 16 16 16 16 8"></polygon>
    <circle cx="5.5" cy="18.5" r="2.5"></circle>
    <circle cx="18.5" cy="18.5" r="2.5"></circle>
    <line x1="1" y1="10" x2="6" y2="10"></line>
    <line x1="1" y1="14" x2="4" y2="14"></line>
  </svg>
);

const CouponIcon = ({ className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M22 10v-3.5c0-1.1-.9-2-2-2h-16c-1.1 0-2 .9-2 2v3.5c1.1 0 2 .9 2 2s-.9 2-2 2v3.5c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2v-3.5c-1.1 0-2-.9-2-2s.9-2 2-2z"/>
    <text x="12" y="16.5" fill="white" fontSize="13" fontWeight="bold" textAnchor="middle">%</text>
  </svg>
);

const ToolButton = ({ icon, tooltip, isActive, onClick }) => (
  <div className="relative group flex items-center justify-end">
    <button 
      onClick={onClick}
      className={`w-[52px] h-[52px] border border-gray-100 border-r-0 rounded-l-md shadow-[-4px_4px_10px_rgba(0,0,0,0.08)] flex items-center justify-center transition-colors focus:outline-none z-10 relative cursor-pointer
      ${isActive ? 'bg-[#f9f9f9] text-black' : 'bg-white text-gray-500 hover:text-black group-hover:text-black'}`}
    >
      {icon}
      <div className={`absolute right-0 top-0 w-[2px] h-full translate-x-[1px] ${isActive ? 'bg-[#f9f9f9]' : 'bg-white'}`}></div>
    </button>
    <div className="absolute right-full mr-2 w-max bg-gray-900 text-white text-[12px] font-bold px-3 py-2 rounded-sm opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-20 shadow-lg pointer-events-none">
      {tooltip}
      <div className="absolute -right-[4px] top-1/2 -translate-y-1/2 w-0 h-0 border-t-[4px] border-t-transparent border-b-[4px] border-b-transparent border-l-[4px] border-l-gray-900" />
    </div>
  </div>
);

// Form Panels - Now with flex-1 and overflow-y-auto for proper scrolling
const DiscountPanel = ({ onCancel }) => (
  <div className="flex flex-col h-full bg-white w-full">
    <div className="flex items-center gap-3 px-6 py-5 border-b border-gray-100 bg-[#f9f9f9] shrink-0">
      <CouponIcon className="text-black" />
      <h2 className="font-bold text-gray-900 tracking-wide text-[14px]">ADD A DISCOUNT CODE</h2>
    </div>
    <div className="p-6 flex flex-col gap-4 flex-1 overflow-y-auto">
      <p className="text-gray-600 text-[14px]">Discount will be calculated and applied at checkout *</p>
      <input type="text" placeholder="Enter discount code" className="border border-gray-200 p-3 rounded-sm focus:outline-none focus:border-gray-400 w-full text-[14px]" />
      <button className="w-full bg-[#ffc107] text-gray-900 font-bold py-3.5 rounded-sm hover:bg-[#e0a800] transition-colors text-[12px] tracking-widest mt-2 cursor-pointer">
        SAVE
      </button>
      <button onClick={onCancel} className="w-full text-white bg-black sm:hidden text-center font-bold text-[12px] tracking-widest text-gray-900 mt-1 py-3.5 hover:bg-gray-50 rounded-sm transition-colors cursor-pointer shrink-0">
        CANCEL
      </button>
    </div>
  </div>
);

const ShippingPanel = ({ onCancel }) => (
  <div className="flex flex-col h-full bg-white w-full">
    <div className="flex items-center gap-3 px-6 py-5 border-b border-gray-100 bg-[#f9f9f9] shrink-0">
      <ShippingIcon className="text-black" />
      <h2 className="font-bold text-gray-900 tracking-wide text-[14px]">ESTIMATE SHIPPING RATES</h2>
    </div>
    <div className="p-6 flex flex-col gap-4 flex-1 overflow-y-auto">
      <div className="flex flex-col gap-2">
        <label className="text-[13px] font-medium text-gray-700">Country/region</label>
        <select className="border border-gray-200 p-3 rounded-sm focus:outline-none focus:border-gray-400 w-full text-[14px] bg-white cursor-pointer">
          <option>United States</option>
          <option>Canada</option>
          <option>United Kingdom</option>
        </select>
      </div>
      <div className="flex flex-col gap-2">
        <label className="text-[13px] font-medium text-gray-700">State</label>
        <select className="border border-gray-200 p-3 rounded-sm focus:outline-none focus:border-gray-400 w-full text-[14px] bg-white cursor-pointer">
          <option>Alabama</option>
          <option>Alaska</option>
          <option>California</option>
        </select>
      </div>
      <div className="flex flex-col gap-2">
        <label className="text-[13px] font-medium text-gray-700">Zip/Postal Code</label>
        <input type="text" className="border border-gray-200 p-3 rounded-sm focus:outline-none focus:border-gray-400 w-full text-[14px]" />
      </div>
      <button className="w-full bg-[#ffc107] text-gray-900 font-bold py-3.5 rounded-sm hover:bg-[#e0a800] transition-colors text-[12px] tracking-widest mt-2 cursor-pointer">
        CALCULATE SHIPPING
      </button>
      <button onClick={onCancel} className="w-full text-white bg-black sm:hidden text-center font-bold text-[12px] tracking-widest text-gray-900 mt-1 py-3.5 hover:bg-gray-50 rounded-sm transition-colors cursor-pointer shrink-0">
        CANCEL
      </button>
    </div>
  </div>
);

const NotePanel = ({ onCancel }) => (
  <div className="flex flex-col h-full bg-white w-full">
    <div className="flex items-center gap-3 px-6 py-5 border-b border-gray-100 bg-[#f9f9f9] shrink-0">
      <NoteIcon className="text-black" />
      <h2 className="font-bold text-gray-900 tracking-wide text-[14px]">ADD ORDER NOTE</h2>
    </div>
    <div className="p-6 flex flex-col gap-4 flex-1 overflow-y-auto">
      <textarea 
        placeholder="How can we help you?" 
        className="border border-gray-200 p-3 rounded-sm focus:outline-none focus:border-gray-400 w-full min-h-[150px] resize-none text-[14px]"
      ></textarea>
      <button className="w-full bg-[#ffc107] text-gray-900 font-bold py-3.5 rounded-sm hover:bg-[#e0a800] transition-colors text-[12px] tracking-widest mt-2 cursor-pointer">
        SAVE
      </button>
      <button onClick={onCancel} className="w-full sm:hidden text-white bg-black text-center font-bold text-[12px] tracking-widest text-gray-900 mt-1 py-3.5 hover:bg-gray-50 rounded-sm transition-colors cursor-pointer shrink-0">
        CANCEL
      </button>
    </div>
  </div>
);

export const CartSidebar = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [agreed, setAgreed] = useState(false);
  const [activePanel, setActivePanel] = useState(null); 

  const { cart, loading } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.auth);

  const items = cart?.items || [];

  useEffect(() => {
    if (isOpen && user) {
      dispatch(fetchCart());
    }
  }, [isOpen, user, dispatch]);

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

  const handleRemoveItem = async (productId, variantId) => {
  await dispatch(removeCartItem({ productId, variantId }));
  dispatch(fetchCart());
};
  
  const handleClose = () => {
    setActivePanel(null);
    onClose();
  };

  const togglePanel = (panel) => setActivePanel(activePanel === panel ? null : panel);

  return (
    <>
      <div
        className={`fixed inset-0 bg-black/50 transition-opacity duration-300 z-[60] ${isOpen ? "opacity-70 visible" : "opacity-0 invisible"}`}
        onClick={handleClose}
      />

      <motion.div
        initial={false}
        animate={isOpen ? "open" : "closed"}
        variants={sidebarVariants}
        style={{ pointerEvents: isOpen ? "auto" : "none" }}
        className="fixed top-0 right-0 h-full w-[calc(100vw-45px)] sm:w-[400px] z-[70] flex flex-col"
      >
        
        {/* Main Cart Area */}
        <div className="w-full h-full bg-white shadow-2xl flex flex-col relative z-20 overflow-hidden">
          
          <div 
            className={`absolute inset-0 bg-white/70 backdrop-blur-[1px] z-[40] sm:hidden transition-opacity duration-300 ${activePanel ? 'opacity-100 visible' : 'opacity-0 invisible'}`}
            onClick={() => setActivePanel(null)}
          />

          <div className="flex items-center justify-between px-4 sm:px-6 py-4 sm:py-5 border-b border-gray-100 bg-white relative z-50 shrink-0">
            <div className="flex items-center gap-2 sm:gap-3">
              <h2 className="font-bold text-gray-900 tracking-wide text-[14px] sm:text-[16px]">MY CART</h2>
              <div className="bg-[#ffc107] text-gray-900 text-[11px] font-bold px-2 py-1 rounded-sm relative">
                <span className="absolute -left-1 top-1/2 -translate-y-1/2 border-r-4 border-r-[#ffc107] border-y-4 border-y-transparent w-0 h-0"></span>
                {items.length} items
              </div>
            </div>
            <button onClick={handleClose} className="w-10 h-10 rounded-full border border-gray-100 flex items-center justify-center cursor-pointer hover:bg-gray-50 transition-colors shadow-sm">
              <CloseIcon />
            </button>
          </div>

          <motion.div variants={navVariants} className="flex-1 flex flex-col bg-white overflow-hidden min-h-0">
            <div className="flex-1 px-4 sm:px-6 py-4 sm:py-6 flex flex-col gap-4 sm:gap-6 overflow-y-auto min-h-0">
              {loading && items.length === 0 ? (
                <div className="flex justify-center py-10 text-gray-400">Loading cart...</div>
              ) : items.length === 0 ? (
                <div className="flex justify-center py-10 text-gray-400 font-medium">Your cart is empty.</div>
              ) : items.map(item => (
                <motion.div variants={itemVariants} key={item._id} className="flex gap-3 sm:gap-5 shrink-0">
                 <div className="w-[80px] sm:w-[100px] h-[100px] sm:h-[120px] bg-[#f8f8f8] flex items-center justify-center shrink-0 p-2">
                   <img src={item.product?.images?.[0]} alt={item.product?.name} className="max-w-full max-h-full object-contain mix-blend-multiply" />
                 </div>
                 <div className="flex flex-col flex-1">
                    <div className="text-[13px] sm:text-[14px] font-bold text-gray-900 mb-1 leading-[1.3] pr-2">{item.product?.name}</div>

            
                    {/* Variant Info */}
                    <div className="flex flex-wrap gap-2 mb-2 text-[12px] text-gray-500">
                       {item.attributes && Object.entries(item.attributes).map(([key, value]) => (
                        <div key={key} className="bg-gray-100 px-2 py-0.5 rounded uppercase">
                          {key}: <span className="text-gray-900 font-medium">{value}</span>
                        </div>
                      ))}
                    </div>

                   <div className="text-[13px] sm:text-[14px] font-bold text-gray-900 mb-2 sm:mb-4">${item.product?.price?.sellingPrice?.toFixed(2)}</div>
                   <div className="flex items-center gap-2 sm:gap-4 mt-auto">
                     <div className="flex items-center text-gray-500 text-[14px]">
                       <button className="w-6 h-6 flex items-center justify-center hover:text-gray-900 transition-colors cursor-pointer" onClick={() => handleUpdateQuantity(item.product?._id, item.variantId, -1, item.quantity)}>-</button>
                       <span className="w-6 text-center text-gray-900">{item.quantity}</span>
                       <button className="w-6 h-6 flex items-center justify-center hover:text-gray-900 transition-colors cursor-pointer" onClick={() => handleUpdateQuantity(item.product?._id, item.variantId, 1, item.quantity)}>+</button>
                     </div>
                     <button className="w-8 h-8 flex items-center justify-center bg-[#f6f6f6] rounded-full hover:bg-gray-200 transition-colors ml-auto sm:ml-2 cursor-pointer" onClick={() => handleRemoveItem(item.product?._id, item.variantId)}>
                       <TrashIcon />
                       
                     </button>
                   </div>
                 </div>
                </motion.div>
              ))}
            </div>

            <motion.div variants={itemVariants} className="shrink-0 px-4 sm:px-6 py-4 sm:py-6 border-t border-gray-100 bg-white z-10 shadow-[0_-4px_10px_rgba(0,0,0,0.02)]">
              <div className="flex items-center justify-between mb-4 sm:mb-5">
                <span className="font-bold text-gray-900 tracking-wide text-[14px]">TOTAL</span>
                <span className="font-bold text-gray-900 text-[18px] sm:text-[20px]">${total.toFixed(2)}</span>
              </div>

              <div className="flex sm:hidden items-center justify-center gap-6 bg-[#f9f9f9] py-2 mb-5 rounded-sm border border-gray-100">
                <button 
                  className={`p-2 transition-colors flex-1 flex justify-center border-r border-gray-200 last:border-r-0 ${activePanel === 'note' ? 'text-black bg-gray-100' : 'text-gray-400 hover:text-black'}`} 
                  onClick={() => togglePanel('note')}
                >
                  <NoteIcon />
                </button>
                <button 
                  className={`p-2 transition-colors flex-1 flex justify-center border-r border-gray-200 last:border-r-0 ${activePanel === 'shipping' ? 'text-black bg-gray-100' : 'text-gray-400 hover:text-black'}`} 
                  onClick={() => togglePanel('shipping')}
                >
                  <ShippingIcon />
                </button>
                <button 
                  className={`p-2 transition-colors flex-1 flex justify-center ${activePanel === 'discount' ? 'text-black bg-gray-100' : 'text-gray-400 hover:text-black'}`} 
                  onClick={() => togglePanel('discount')}
                >
                  <CouponIcon />
                </button>
              </div>

              <div className="mb-6">
                <div className="text-gray-600 text-[14px] font-medium mb-3">
                  {remainingForFreeShipping > 0 
                    ? `Spend $${remainingForFreeShipping.toFixed(2)} for free shipping` 
                    : "Congratulations! You've got free shipping"}
                </div>
                <div className="flex items-center gap-4">
                  <div className="shrink-0 w-8 h-8 flex items-center justify-center rounded-full border border-[#3b9f67] bg-white text-[#3b9f67]">
                    <TruckIcon />
                  </div>
                  <div className="flex-1 h-2.5 bg-[#f5f5f5] rounded-full overflow-hidden">
                    <div className="h-full bg-[#3b9f67] transition-all duration-300 rounded-full" style={{ width: `${progress}%` }}></div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-2 sm:gap-3 mb-4 sm:mb-5">
                <button onClick={() => { navigate("/order-history"); handleClose(); }} className="w-full border border-gray-200 py-3 sm:py-3.5 text-center font-bold text-[12px] tracking-widest text-gray-800 hover:border-gray-900 hover:bg-gray-50 transition-all rounded-sm cursor-pointer">
                  MY ORDERS
                </button>
                  <button onClick={() => { navigate("/cart"); handleClose(); }} className="w-full border border-gray-200 py-3 sm:py-3.5 text-center font-bold text-[12px] tracking-widest text-gray-800 hover:border-gray-900 hover:bg-gray-50 transition-all rounded-sm cursor-pointer">
                    VIEW CART
                  </button>
                <button className={`w-full py-3 sm:py-3.5 text-center font-bold text-[12px] tracking-widest rounded-sm transition-all ${agreed ? "bg-gray-900 text-white hover:bg-gray-800 cursor-pointer" : "bg-[#f5f5f5] text-[#b6b6b6] cursor-not-allowed"}`}>
                  CHECK OUT
                </button>
              </div>

              <div className="flex items-center gap-3">
                <input type="checkbox" id="terms" className="w-[18px] h-[18px] border-gray-300 rounded-sm cursor-pointer accent-black" checked={agreed} onChange={(e) => setAgreed(e.target.checked)} />
                <label htmlFor="terms" className="text-gray-600 text-[14px] cursor-pointer">I agree with the <span className="font-bold text-gray-900">Terms & conditions</span></label>
              </div>
            </motion.div>
          </motion.div>
        </div>


        <div
          className={`absolute bg-white transition-all duration-300 ease-in-out flex flex-col
          /* Mobile constraints */
          bottom-0 left-0 w-full shadow-[0_-15px_30px_rgba(0,0,0,0.15)]
          /* Desktop constraints fixed: 'sm:left-auto' added to prevent 0 width crush */
          sm:bottom-auto sm:top-0 sm:left-auto sm:right-full sm:h-full sm:w-[350px] sm:shadow-[-10px_0_20px_rgba(0,0,0,0.05)] sm:border-r sm:border-gray-100

          ${activePanel 
            ? 'translate-y-0 sm:translate-x-0 opacity-100 z-[60] sm:z-10' 
            : 'translate-y-[100%] sm:translate-y-0 sm:translate-x-full opacity-0 pointer-events-none'}`}
        >
          {activePanel === 'note' && <NotePanel onCancel={() => setActivePanel(null)} />}
          {activePanel === 'shipping' && <ShippingPanel onCancel={() => setActivePanel(null)} />}
          {activePanel === 'discount' && <DiscountPanel onCancel={() => setActivePanel(null)} />}
        </div>

        <motion.div 
          variants={navVariants} 
          className={`hidden sm:flex absolute top-[120px] -left-[40px] w-[40px] flex-col gap-[10px] z-40 transition-transform duration-300 ease-in-out ${activePanel ? 'sm:-translate-x-[350px]' : 'translate-x-0'}`}
        >
          <motion.div variants={itemVariants} className="flex justify-end">
            <ToolButton icon={<NoteIcon />} tooltip="Add Order Note" isActive={activePanel === 'note'} onClick={() => togglePanel('note')} />
          </motion.div>
          <motion.div variants={itemVariants} className="flex justify-end">
            <ToolButton icon={<ShippingIcon />} tooltip="Estimate Shipping" isActive={activePanel === 'shipping'} onClick={() => togglePanel('shipping')} />
          </motion.div>
          <motion.div variants={itemVariants} className="flex justify-end">
            <ToolButton icon={<CouponIcon className={activePanel === 'discount' ? 'text-black' : ''} />} tooltip="Add A Discount Code" isActive={activePanel === 'discount'} onClick={() => togglePanel('discount')} />
          </motion.div>
        </motion.div>
        
      </motion.div>
    </>
  );
};