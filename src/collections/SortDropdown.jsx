import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';

const sortOptions = [
  "Featured",
  "Best selling",
  "Alphabetically, A-Z",
  "Alphabetically, Z-A",
  "Price, low to high",
  "Price, high to low",
  "Date, old to new",
  "Date, new to old"
];

const SortDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedSort, setSelectedSort] = useState("Featured");
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <div
        className={`relative z-20 flex items-center justify-between gap-1 cursor-pointer bg-white px-5 py-4 transition-all duration-200 ${
          isOpen ? 'rounded-t-2xl shadow-[0_-5px_15px_-5px_rgba(0,0,0,0.1)]' : 'rounded-2xl hover:bg-gray-50'
        }`}
        style={isOpen ? { filter: 'drop-shadow(0 -4px 6px rgba(0,0,0,0.05))' } : {}}
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center gap-1.5">
          <span className="text-gray-700 text-[15px]">Sort by</span>
          <span className="font-bold text-black text-[15px]">{selectedSort}</span>
        </div>
        <ChevronDown size={18} strokeWidth={2} className={`ml-2 text-black transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </div>

      {isOpen && (
        <div 
          className="absolute left-0 top-[100%] bg-white w-72 rounded-b-2xl rounded-tr-2xl z-999 pb-4 pt-2 shadow-[0_10px_20px_-5px_rgba(0,0,0,0.1),5px_0_20px_-5px_rgba(0,0,0,0.1)]  border border-t-0 border-gray-50"
        >
          {/* This absolute div covers the border/shadow seam between the top button and the dropdown list */}
          <div className="absolute -top-[1px] left-0 h-[2px] bg-white z-30 w-full max-w-[180px]" />
          
          <div className="flex flex-col">
            {sortOptions.map((option) => (
              <label
                key={option}
                className="flex items-center group px-5 py-2.5 hover:bg-gray-50 cursor-pointer transition-colors"
                onClick={(e) => {
                  e.preventDefault(); // prevent double firing
                  setSelectedSort(option);
                  setIsOpen(false);
                }}
              >
                <div className="relative flex items-center justify-center w-[22px] h-[22px] mr-4 flex-shrink-0">
                  {selectedSort === option ? (
                    <>
                      <div className="absolute inset-0 rounded-full border-[1.5px] border-[#fbbf24]" />
                      <div className="absolute w-[12px] h-[12px] rounded-full bg-[#fbbf24]" />
                    </>
                  ) : (
                    <div className="absolute inset-0 rounded-full border-[1.5px] border-gray-300 group-hover:border-gray-400 transition-colors" />
                  )}
                </div>
                <span className={`text-[15px] ${selectedSort === option ? 'font-bold text-black' : 'text-gray-700 group-hover:text-black hover:font-bold transition-colors'}`}>
                  {option}
                </span>
              </label>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SortDropdown;
