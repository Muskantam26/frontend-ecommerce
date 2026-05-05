import React from "react";
import { ArrowUpRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const CategorySlider = ({ data = [] }) => {
  const navigate = useNavigate();
  const categoryData = Array.isArray(data) ? data : [];
  const extendedCategories = [...categoryData, ...categoryData];
  return (
    <div className="w-full bg-white overflow-hidden z-10 relative flex">
     
      <div className="flex animate-ticker whitespace-nowrap gap-6 pl-6">
      
        {[...Array(2)].map((_, i) => (
          <div key={i} className="flex gap-6 min-w-max">
            {extendedCategories.map((cat, index) => (
              <div
                key={index}
                onClick={() => navigate('/collection', { state: { categoryId: cat._id } })}
                className="group w-[250px] md:w-[300px] flex flex-col rounded-[24px] cursor-pointer bg-[#f7f7f7] p-2"
              >
                {/* Image Section */}
                <div className="w-full h-[280px] rounded-[16px] overflow-hidden bg-gray-200">
                  <img
                    src={cat.image}
                    alt={cat.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>

                {/* Content Section with Hover Effect */}
                <div className="relative w-full p-4 flex justify-between items-center overflow-hidden rounded-[16px] mt-2 group-hover:text-white transition-colors duration-300">
                  {/* Left-to-right black background slide */}
                  <div className="absolute inset-0 bg-black -translate-x-[101%] group-hover:translate-x-0 transition-transform duration-500 ease-in-out z-[0]"></div>

                  {/* Text Container */}
                  <span className="font-semibold text-xs  whitespace-normal leading-tight w-[70%] z-10 transition-colors duration-300">
                    {cat.title}
                  </span>

                  {/* Circular Button */}
                  <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-black flex-shrink-0 z-10 transition-transform duration-300 group-hover:rotate-45 hover:bg-yellow-400 shadow-sm">
                    <ArrowUpRight className="w-5 h-5" strokeWidth={2} />
                  </div>
                </div>
              </div>
            ))} 
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategorySlider;
