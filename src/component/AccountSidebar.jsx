import React, { useState, useRef, useEffect } from "react";
import { MainContent } from "../constant/MainContent";
import { useNavigate } from "react-router-dom";
import { motion } from "motion/react";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux/slice/authSlice";

const sidebarVariants = {
  open: (height = 1000) => ({
    clipPath: `circle(${height * 2 + 200}px at calc(100% - 52px) 44px)`,
    transition: {
      type: "spring",
      stiffness: 20,
      restDelta: 2,
    },
  }),
  closed: {
    clipPath: "circle(0px at calc(100% - 52px) 44px)",
    transition: {
      delay: 0.2, // wait for items to animate out
      type: "spring",
      stiffness: 400,
      damping: 40,
    },
  },
};

const navVariants = {
  open: {
    transition: { staggerChildren: 0.07, delayChildren: 0.2 },
  },
  closed: {
    transition: { staggerChildren: 0.05, staggerDirection: -1 },
  },
};

const itemVariants = {
  open: {
    y: 0,
    opacity: 1,
    transition: {
      y: { stiffness: 1000, velocity: -100 },
    },
  },
  closed: {
    y: 50,
    opacity: 0,
    transition: {
      y: { stiffness: 1000 },
    },
  },
};


const CloseIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

const CustomSelect = ({ options, value, onChange }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const selectedOption = options.find((opt) => opt.value === value) || options[0];

  return (
    <div className="relative " ref={dropdownRef}>
      {/* Dropdown Menu (Opens Upwards) */}
      {isDropdownOpen && (
        <div className="absolute left-0 bottom-full w-full bg-white border border-gray-100 shadow-[0_-5px_15px_rgba(0,0,0,0.05)] z-10 flex flex-col">
          {options.map((opt) => (
            <div
              key={opt.value}
              className={`px-4 py-3.5 cursor-pointer text-sm font-medium flex items-center gap-2 border-b border-gray-100 last:border-b-0 transition-colors ${
                opt.value === value ? "bg-[#f6f6f6]" : "bg-white hover:bg-gray-50"
              }`}
              onClick={() => {
                onChange(opt.value);
                setIsDropdownOpen(false);
              }}
            >
              <span className="text-base leading-none">{opt.flag}</span>
              <span className="text-gray-800 uppercase">{opt.label}</span>
            </div>
          ))}
        </div>
      )}

      {/* Trigger */}
      <div
        className="w-full bg-[#f6f6f6] border-none text-sm font-medium text-gray-800 rounded-sm px-4  py-3.5 cursor-pointer flex justify-between items-center"
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
      >
        <div className="flex items-center gap-2">
          <span className="text-base leading-none">{selectedOption.flag}</span>
          <span className="uppercase">{selectedOption.label}</span>
        </div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="12"
          height="12"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={`transition-transform duration-200 ${isDropdownOpen ? "rotate-180" : ""}`}
        >
          <path d="m6 9 6 6 6-6" />
        </svg>
      </div>
    </div>
  );
};

export const AccountSidebar = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const [currency, setCurrency] = useState("INR");
  const [language, setLanguage] = useState("EN");

  const handleLogout = () => {
    dispatch(logout());
    onClose();
    navigate("/");
  };

  const currencyOptions = [
    { value: "EUR_FR", label: "EUR €", flag: "🇫🇷" },
    { value: "EUR_DE", label: "EUR €", flag: "🇩🇪" },
    { value: "GBP", label: "GBP £", flag: "🇬🇧" },
    { value: "INR", label: "INR ₹", flag: "🇺🇸" },
  ];

  const languageOptions = [
    { value: "EN", label: "ENGLISH", flag: "🇬🇧" },
    { value: "DE", label: "DEUTSCH", flag: "🇩🇪" },
    { value: "FR", label: "FRANÇAIS", flag: "🇫🇷" },
  ];

  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0  bg-brand-hover/50 transition-opacity duration-300 z-[60] ${
          isOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={onClose}
      />

      {/* Sidebar Panel */}
      <motion.div
        initial={false}
        animate={isOpen ? "open" : "closed"}
        variants={sidebarVariants}
        style={{ pointerEvents: isOpen ? "auto" : "none" }}
        className="fixed top-0 right-0 h-full  bg-white shadow-2xl z-[70] flex flex-col"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-8 py-6 pb-4">
          <img src="https://nov-minicom.myshopify.com/cdn/shop/files/logo-dark.png?v=1749032549&width=380" alt="Logo" className="w-40" />
          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full border border-gray-100 flex items-center justify-center cursor-pointer hover:bg-gray-50 transition-colors shadow-sm"
          >
            <CloseIcon />
          </button>
        </div>

        <div className="px-8 pb-4">
            <hr className="border-gray-200" />
        </div>

        {/* Scrollable Content */}
        <motion.div variants={navVariants} className="flex-1 overflow-y-auto px-8 pb-8 flex flex-col gap-8">
          
          {/* Customer Account Section */}
          <motion.div variants={itemVariants} className="flex flex-col gap-4">
            <h3 className="font-bold text-xs text-[#3f5364]  tracking-wider mb-2">CUSTOMER ACCOUNT</h3>
            
            {!user ? (
              <>
                <span onClick={() => { navigate("/login"); onClose(); }} className="text-gray-800 text-xs hover:text-[var(--color-button)] font-medium transition-colors cursor-pointer">Login</span>
                <span onClick={() => { navigate("/register"); onClose(); }} className="text-gray-800 text-xs hover:text-[var(--color-button)] font-medium transition-colors cursor-pointer">Register</span>
              </>
            ) : (
              <>
                <div className="flex flex-col gap-1 mb-2">
                  <span className="text-gray-500 text-[10px] tracking-wider uppercase">Logged in as</span>
                  <span className="text-gray-800 text-sm font-semibold truncate">
                    {user?.name || user?.email}
                  </span>

                </div>
                <span onClick={() => { navigate("/order-history"); onClose(); }} className="text-gray-800 text-xs hover:text-[var(--color-button)] font-medium transition-colors cursor-pointer">Order History</span>
                <span onClick={handleLogout} className="text-red-600 text-xs hover:text-red-700 font-medium transition-colors cursor-pointer">Logout</span>
              </>
            )}

            <span onClick={() => { navigate("/wishlist"); onClose(); }} className="text-gray-800 text-xs hover:text-[var(--color-button)] font-medium transition-colors cursor-pointer">Wishlist</span>
            <span onClick={() => { navigate("/checkout"); onClose(); }} className="text-gray-800 text-xs hover:text-[var(--color-button)] font-medium transition-colors cursor-pointer">Check out</span>
            <div className="pt-2"><hr className="border-gray-200" /></div>
          </motion.div>

          {/* Customer Care Section */}
          <motion.div variants={itemVariants} className="flex flex-col gap-4">
            <h3 className="font-bold text-xs text-[#3f5364] tracking-wider mb-2">CUSTOMER CARE</h3>
            <span onClick={() => { navigate("/Frequently-Asked-Questions"); onClose(); }} className="text-gray-600 hover:text-[var(--color-button)] transition-colors text-xs cursor-pointer">FAQs</span>
            <span onClick={() => { navigate("/terms-of-service"); onClose(); }} className="text-gray-600 text-xs hover:text-[var(--color-button)] transition-colors cursor-pointer">Terms of Service</span>
            <span onClick={() => { navigate("/privacy-policy"); onClose(); }} className="text-gray-600 text-xs hover:text-[var(--color-button)] transition-colors cursor-pointer">Privacy Policy</span>
            <span onClick={() => { navigate("/contact"); onClose(); }} className="text-gray-600 text-xs hover:text-[var(--color-button)] transition-colors cursor-pointer">Contact Us</span>
            <span onClick={() => { navigate("/gift-card"); onClose(); }} className="text-gray-600 text-xs hover:text-[var(--color-button)] transition-colors cursor-pointer">Gift Card</span>
            <div className="pt-2"><hr className="border-gray-200" /></div>
          </motion.div>

          {/* Currency Section */}
          <motion.div variants={itemVariants} className="flex flex-col gap-3">
            <h3 className="font-bold text-xs text-[#3f5364] tracking-wider mb-1">CURRENCY</h3>
            <CustomSelect options={currencyOptions} value={currency} onChange={setCurrency} />
          </motion.div>

          {/* Language Section */}
          <motion.div variants={itemVariants} className="flex flex-col gap-3 mb-8">
            <h3 className="font-semibold text-xs text-[#3f5364] tracking-wider mb-1">LANGUAGE</h3>
            <CustomSelect options={languageOptions} value={language} onChange={setLanguage} />
          </motion.div>
          
        </motion.div>
      </motion.div>
    </>
  );
};
