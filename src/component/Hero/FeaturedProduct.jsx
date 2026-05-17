import React, { useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  CheckCircle,
  Heart,
  Share2,
  HelpCircle,
  MessageCircle,
  Truck,
  RefreshCcw,
  ListStart,
  Star,
} from "lucide-react";
import { Button1 } from "../Btn/Button1";


const FeaturedProduct = ({
  data = {
    title: "Modern Beige Armchair with Wooden Legs",
    price: "₹150.00",
    description:
      "Donec dapibus tellus sem, quis aliquam libero pharetra non. Nam vitae fermentum leo. Pellentesque bibendum dui eu mi tempor sodales. Integer gravida odio in sem laoreet tempus. Nunc vehicula nibh mauris, id bibendum metus facilisis iaculis. Phasellus suscipit dictum ...",
    stockStatus: "50 Products in stock",
    images: [
      "https://images.unsplash.com/photo-1485955900006-10f4d324d411?auto=format&fit=crop&q=80",
    ],
    bgImage:
      "https://images.unsplash.com/photo-1618220179428-22790b46a013?auto=format&fit=crop&q=80",
    estimatedDelivery: "22 - 23 Jun, 2025",
    freeShipping: "On all order over ₹200.00",
  },
}) => {
  const [quantity, setQuantity] = useState(1);

  return (
    <section className="relative w-full mx-auto flex flex-col lg:flex-row my-10 lg:my-20">
      {/* Background layer for left part */}
      <div className="hidden lg:block absolute left-0 top-0 bottom-0 w-[70%]  overflow-hidden z-0">
        {/* Background dark image */}
        <div className="absolute left-0 top-0 w-2/3 h-full mix-blend-overlay  rounded-r-[40px] ">
          <img
            src={data.bgImage}
            alt="bg"
            className="w-full h-full object-cover  rounded-r-[40px]"
          />
        </div>
      </div>

      {/* Main Content Area */}
      <div className="w-full flex flex-col lg:flex-row relative z-10   lg:p-0 items-center lg:items-stretch">
        {/* Visuals part */}
        <div className="w-full lg:w-[60%] flex items-center justify-center relative min-h-[350px] sm:min-h-[500px] lg:min-h-[600px]">
          {/* Vertical rotated texts */}
          <div className="hidden lg:flex absolute left-8 xl:left-[15%] top-1/2 -translate-y-1/2 flex-col items-center justify-center gap-32 h-full z-10 pointer-events-none">
            <p className="rotate-180" style={{ writingMode: "vertical-rl" }}>
              <span className="text-gray-400 text-xs tracking-[0.2em] font-medium uppercase">
                Crafted for your home
              </span>
            </p>
            <p className="rotate-180" style={{ writingMode: "vertical-rl" }}>
              <span className="text-white text-xl font-bold tracking-[0.2em] whitespace-nowrap uppercase">
                Featured Product
              </span>
            </p>
          </div>

          {/* Overlapping Main Image */}
          <div className="relative w-full sm:w-[450px] lg:w-[500px] h-[350px] sm:h-[450px] lg:h-[550px] bg-[#f5f5f5] xl:ml-[40%] shadow-[0_10px_40px_rgba(0,0,0,0.1)] overflow-hidden group z-20 rounded-sm">
            {/* The Image that zooms on hover */}
            <img
              src={data.images[0]}
              alt={data.title}
              className="w-full h-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-110 rounded-sm"
            />

            {/* Slider Arrows */}
            <button className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 w-8 h-8 sm:w-10 sm:h-10 bg-white rounded-full flex items-center justify-center shadow-md hover:bg-gray-50 transition-colors z-30">
              <ChevronLeft className="text-gray-600 w-4 h-4 sm:w-5 sm:h-5" />
            </button>
            <button className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 w-8 h-8 sm:w-10 sm:h-10 bg-white rounded-full flex items-center justify-center shadow-md hover:bg-gray-50 transition-colors z-30">
              <ChevronRight className="text-gray-600 w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          </div>
        </div>

        {/* Details part */}
        <div className="w-full lg:w-[40%] px-0 sm:px-4 lg:pr-12 xl:pr-20 py-8 lg:py-12 flex flex-col">
          <h2 className="text-2xl sm:text-3xl lg:text-xl xl:text-2xl font-bold text-gray-900 mb-4 sm:mb-6">
            {data.title}
          </h2>
          <div className="text-xl sm:text-2xl lg:text-xl font-bold text-gray-900 mb-4 sm:mb-6">
            {data.price}
          </div>
          <p className="text-gray-500 text-sm sm:text-base leading-relaxed mb-4 sm:mb-6 text-justify">
            {data.description}
          </p>

          <div className="flex items-center gap-2 text-[#2d9a65] text-sm mb-6 border-b border-gray-100 pb-6">
            <CheckCircle size={18} strokeWidth={2} />
            <span>{data.stockStatus}</span>
          </div>

          {/* Quantity & Add to Cart */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mb-4">
            {/* Quantity */}
            <div className="flex items-center border border-gray-200 rounded justify-between w-full sm:w-28 h-12 px-4 shrink-0">
              <button
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="text-gray-400 hover:text-black transition-colors w-6 flex justify-center items-center"
              >
                -
              </button>
              <span className="text-sm font-medium w-8 text-center">
                {quantity}
              </span>
              <button
                onClick={() => setQuantity((q) => q + 1)}
                className="text-gray-400 hover:text-black transition-colors w-6 flex justify-center items-center"
              >
                +
              </button>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-4 flex-grow">
              <Button1
                text="Add To Cart"
                className="h-12 flex-grow bg-[#ffc107] text-black font-bold hover:bg-[#ffb300] rounded-none flex justify-center items-center text-sm transition-colors whitespace-nowrap"
                variant="primary"
              />
              <button className="h-12 w-12 border border-gray-200 bg-gray-50 flex items-center justify-center hover:bg-gray-100 transition-colors shrink-0">
                <Star size={18} className="text-gray-600" />
              </button>
            </div>
          </div>

          {/* Buy it Now */}
          <Button1
            text="Buy It Now →"
            className="w-full h-12 bg-brand-hover text-white  rounded-none !text-sm flex justify-center items-center mt-2 mb-8 uppercase font-bold transition-colors"
            variant="custom"
          />

          {/* Links */}
          <div className="flex flex-wrap items-center gap-4 sm:gap-8 text-xs sm:text-sm text-gray-500 font-medium mb-8 border-b border-gray-100 pb-8">
            <button className="flex items-center gap-2 hover:text-black transition-colors">
              <Share2 size={16} /> Share
            </button>
            <button className="flex items-center gap-2 hover:text-black transition-colors">
              <HelpCircle size={16} /> Ask A Question
            </button>
            <button className="flex items-center gap-2 hover:text-black transition-colors">
              <MessageCircle size={16} /> FAQ
            </button>
          </div>

          {/* Delivery Info */}
          <div className="flex flex-col gap-3 sm:gap-4 text-xs sm:text-sm text-gray-500">
            <div className="flex items-center gap-3">
              <Truck size={20} className="text-gray-400 shrink-0" />
              <p>
                <span className="font-semibold text-gray-900 mr-1">
                  Estimated Delivery :
                </span>{" "}
                {data.estimatedDelivery}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <RefreshCcw size={20} className="text-gray-400 shrink-0" />
              <p>
                <span className="font-semibold text-gray-900 mr-1">
                  Free Shipping & Returns :
                </span>{" "}
                {data.freeShipping}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProduct;
