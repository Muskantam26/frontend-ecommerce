import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { MainContent } from "../constant/MainContent";
import { Button1 } from "./Btn/Button1";
import { Input1 } from "./inputs/input1";
import { MegaMenu } from "./MegaMenu";
import { AccountSidebar } from "./AccountSidebar";
import { CartSidebar } from "./CartSidebar";
import MobileSidebar from "./sidebars.jsx/MobileSidebar";
import { useDispatch, useSelector } from "react-redux";
import { toggleCart, openCart, fetchCart } from "../redux/slice/cartSlice";
import { useEffect } from "react";

const CloseIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

const MenuIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="4" x2="20" y1="12" y2="12" />
    <line x1="4" x2="20" y1="6" y2="6" />
    <line x1="4" x2="20" y1="18" y2="18" />
  </svg>
);

const SearchIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="11" cy="11" r="8" />
    <path d="m21 21-4.3-4.3" />
  </svg>
);

const UserIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

const StarIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
);

const BagIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
    <path d="M3 6h18" />
    <path d="M16 10a4 4 0 0 1-8 0" />
  </svg>
);

const Header1 = ({ isAccountOpen, setIsAccountOpen }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const { cart, isOpen: isCartOpen } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (user) {
      dispatch(fetchCart());
    }
  }, [user, dispatch]);

  const itemsCount = cart?.items?.reduce((acc, item) => acc + item.quantity, 0) || 0;
  const totalPrice = cart?.items?.reduce((acc, item) => acc + (item.product?.price?.sellingPrice || 0) * item.quantity, 0) || 0;
  const isHome = location.pathname === '/home';

  return (
    
    <div className={`${isHome ? 'absolute top-0 left-0 bg-transparent' : 'relative bg-[#0f2e26] '} w-full z-50`}>
      {/* Desktop Header */}
      <div className="hidden lg:flex w-full py-3 px-8 items-center justify-between text-white font-primary gap-6 z-50 relative">
        {/* Logo Section */}
        <div className="cursor-pointer" onClick={() => navigate('/')}>
          <img src={MainContent.appLogo} alt="Logo" className="w-50" />
        </div>

        {/* Search Bar */}
        <div className="flex gap-2 w-full ml-6">
          <Button1 
            variant="outline" 
            text="Menu" 
            icon={
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={isMenuOpen ? "close" : "menu"}
                  initial={{ opacity: 0, rotate: -90, scale: 0.5 }}
                  animate={{ opacity: 1, rotate: 0, scale: 1 }}
                  exit={{ opacity: 0, rotate: 90, scale: 0.5 }}
                  transition={{ duration: 0.2 }}
                  className="flex items-center justify-center"
                >
                  {isMenuOpen ? <CloseIcon /> : <MenuIcon />}
                </motion.div>
              </AnimatePresence>
            } 
            onClick={() => setIsMenuOpen(!isMenuOpen)} 
            isActive={isMenuOpen}
          />
          <div className="flex items-center flex-1 h-13 bg-white rounded">
            <Input1 />
          </div>
          <Button1
            variant="primary"
            text="Search"
            icon={<SearchIcon />}
            iconPosition="right"
          />
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-8 shrink-0">
          {/* Account */}
          <Button1 variant="transparent" text="Account" icon={<UserIcon />} onClick={() => setIsAccountOpen(true)} />

          {/* Wishlist */}
          <span onClick={() => navigate("/wishlist")} className="cursor-pointer inline-flex">
          <Button1
            variant="transparent"
            text="Wishlist"
            icon={<StarIcon />}
            badge="1"
          />
          </span>

          <Button1 variant="cart" icon={<BagIcon />} badge={itemsCount.toString()} price={`$${totalPrice.toFixed(2)}`} onClick={() => dispatch(openCart())} />
        </div>
      </div>

      {/* Mobile Header */}
      <div className="flex lg:hidden w-full py-4 px-4 items-center justify-between text-white font-primary z-50 relative">
        <div className="flex items-center gap-3">
          <button onClick={() => setIsMenuOpen(true)}>
            <MenuIcon />
          </button>
          <button>
            <SearchIcon />
          </button>
        </div>

        <div className="flex-1 flex justify-center cursor-pointer" onClick={() => navigate('/')}>
          <img src={MainContent.appLogo} alt="Logo" className="h-8 " />
        </div>

        <div className="flex items-center gap-4">
          <button className="relative" onClick={() => dispatch(openCart())}>
            <BagIcon />
            {itemsCount > 0 && (
              <span className="absolute -top-1 -right-2 bg-yellow-400 text-black text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                {itemsCount}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Mega Menu Overlay */}
      <div className="hidden lg:block">
        <MegaMenu isOpen={isMenuOpen} isHome={isHome} />
      </div>
      
      {/* Mobile Sidebar */}
      <MobileSidebar isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />

      {/* Account Sidebar */}
      <AccountSidebar isOpen={isAccountOpen} onClose={() => setIsAccountOpen(false)} />

      {/* Cart Sidebar */}
      <CartSidebar isOpen={isCartOpen} onClose={() => dispatch(toggleCart())} />
    </div>
  );
};

export default Header1;
