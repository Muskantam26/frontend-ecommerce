import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaAngleDown } from "react-icons/fa6";
import { motion, AnimatePresence } from "framer-motion";

export const MegaMenu = ({ isOpen, isHome }) => {
  const navigate = useNavigate();
  const [hoveredMenu, setHoveredMenu] = useState(null);

  const menuItems = [
    { id: 1, name: "HOME", path: "/home" },
    { id: 2, name: "COLLECTIONS", path: "/collection" },
    { id: 3, name: "PRODUCTS", path: "/products" },
    { 
      id: 4, 
      name: "PAGES", 
      path: "/pages",
      hasSubmenu: true,
      submenu: [
        { name: "404 Error", path: "/404" },
        { name: "About Us", path: "/about-Us" },
        { name: "Contact Us", path: "/contact" },
        { name: "FAQS Page", path: "/Frequently-Asked-Questions" },
        { name: "Store Direction Page", path: "/page-store-direction" },
        { name: "Store Location Page", path: "/page-store-location" },
        { name: "Testimonial Page", path: "/page-testimonial" },
      ]
    },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -30 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className={`absolute top-full left-0 w-full flex justify-center text-white z-40 overflow-visible border-t border-gray-800 ${
            isHome ? 'bg-transparent' : 'bg-[#0f2e26]'
          }`}
        >
          <div className="container mx-auto px-8 py-6">
        <ul className="flex flex-wrap gap-8 font-medium text-xs ml-50">
          {menuItems.map((menu) => (
            <li 
              key={menu.id} 
              className="cursor-pointer relative group transition-colors"
              onMouseEnter={() => setHoveredMenu(menu.id)}
              onMouseLeave={() => setHoveredMenu(null)}
            >
              <span onClick={() => navigate(menu.path)} className={`flex items-center gap-1 hover:text-[var(--color-button)] ${hoveredMenu === menu.id ? 'text-[var(--color-button)]' : ''} cursor-pointer`}>
                {menu.name}
                {menu.hasSubmenu && <FaAngleDown size={10} />}
              </span>
              
              {/* Submenu Dropdown */}
              {menu.hasSubmenu && (
                <div 
                  className={`absolute left-0 top-full mt-4 w-56 bg-white shadow-xl rounded-md overflow-hidden transition-all duration-300 transform origin-top ${
                    hoveredMenu === menu.id ? 'opacity-100 scale-y-100 visible' : 'opacity-0 scale-y-95 invisible'
                  }`}
                >
                  <ul className="py-2 text-gray-800 flex flex-col">
                    {menu.submenu.map((sub, idx) => (
                      <li key={idx} className="hover:bg-gray-100 hover:text-black transition-colors px-5 py-2.5">
                        <span onClick={() => navigate(sub.path)} className="block w-full cursor-pointer">{sub.name}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
