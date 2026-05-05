import React from "react";
import { ShieldCheck, Wrench, Truck, BadgeDollarSign, Leaf, PencilRuler, Recycle, Lightbulb, MessageSquare, Phone, Store } from "lucide-react";
import { Slider } from "../component/Slider/Slider";
import { Ticker } from "../component/Hero/Ticker";
import CategorySlider from "../component/Hero/CategorySlider";
import HandpickedElegance from "../component/Hero/HandpickedElegance";
import ShoppingGuide from "../component/Hero/ShoppingGuide";
import BrandMarquee from "../component/Hero/BrandMarquee";

import SectionHeading from "../component/heading/SectionHeading";
import StickySections from "../component/Hero/StickySections";
import CustomerReviews from "../component/Hero/CustomerReviews";
import FeaturedProduct from "../component/Hero/FeaturedProduct";
import FollowUS from "../component/Hero/FollowUs";
import ProductGrid from "../component/Hero/ProductGrid";
import CoreFeatures from "../component/Hero/CoreFeatures";
import JournalSection from "../component/Hero/JournalSection";
import Faq from "../component/Hero/Faq";
import { useNavigate } from "react-router-dom";


import { useEffect, useState } from "react";
import { getCategoriesApi } from "../api/category-api"; 
import { getProductsApi } from "../API/product-api";
const slides = [
  {
    id: 1,
    subheading: "NEW ARRIVALS",
    heading: "TIMELESS ELEGANCE\nSCANDINAVIAN FURNITURE",
    image:
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&q=80",
    linkText: "Learn More",
  },
  {
    id: 2,
    subheading: "LIVING ROOM",
    heading: "MODERN MINIMALISM\nFOR YOUR HOME",
    image:
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&q=80",
    linkText: "Shop Collection",
  },
  {
    id: 3,
    subheading: "PREMIUM COLLECTION",
    heading: "PREMIUM COMFORT\nEVERYDAY LIVING",
    image:
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&q=80",
    linkText: "Discover Now",
  },
];

const categorySliderData = [
  {
    title: "Kids & Nursery Furniture",
    image: "https://images.unsplash.com/photo-1519710164239-da123dc03ef4?auto=format&fit=crop&q=80",
  },
  {
    title: "Bar Stools & Chairs",
    image: "https://images.unsplash.com/photo-1592078615290-033ee584e267?auto=format&fit=crop&q=80",
  },
  {
    title: "Decor & Accessories",
    image: "https://images.unsplash.com/photo-1582582621959-48d27397dc69?auto=format&fit=crop&q=80",
  },
  {
    title: "Living Room Furniture",
    image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&q=80",
  },
  {
    title: "Bedroom Furniture",
    image: "https://images.unsplash.com/photo-1505693314120-0d443867891c?auto=format&fit=crop&q=80",
  },
  {
    title: "Office Furniture",
    image: "https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&q=80",
  },
];

const handpickedEleganceData = [
  {
    id: 1,
    name: "Modern Single Sofa Chair For Stylish Living Room",
    price: "$200.00",
    image: "https://nov-minicom.myshopify.com/cdn/shop/files/1-min_bdb6b918-6f94-45a7-b53e-4d9977e4c158.jpg?v=1749111975&width=1120",
  },
  {
    id: 2,
    name: "Decorative Cactus Plant Pot For Indoor Display",
    price: "$37.00",
    image: "//nov-minicom.myshopify.com/cdn/shop/files/1-min_44cdab73-bcb9-483d-ba6c-cbfc32321ed9.jpg?v=1749112427&width=260",
  },
  {
    id: 3,
    name: "Solid Wood TV Stand With Storage Drawers Design",
    price: "$135.00",
    image: "//nov-minicom.myshopify.com/cdn/shop/files/1-min_2ee03dbe-b3f3-4ffe-a2f8-299ecbdfaa06.jpg?v=1749111269&width=260",
  },
  {
    id: 4,
    name: "Modern Wooden Lounge Chair With Wide Fabric Arms",
    price: "$155.00",
    image: "//nov-minicom.myshopify.com/cdn/shop/files/1-min_202fa2e4-302c-481c-aab5-74b98f061838.jpg?v=1749110906&width=260",
  },
  {
    id: 5,
    name: "Modern Low Profile Swivel Sofa With Soft Seat",
    price: "$125.00",
    image: "//nov-minicom.myshopify.com/cdn/shop/files/1-min_be47ec7a-ae18-44a0-ad6b-efeabb425930.jpg?v=1749110719&width=260",
  },
  {
    id: 6,
    name: "Minimalist White Ceramic Vases Set",
    price: "$45.00",
    image: "//nov-minicom.myshopify.com/cdn/shop/files/1-min_0c6275f8-a24e-4702-90d0-bd01e49e1b67.jpg?v=1749111925&width=260",
  },
  {
    id: 7,
    name: "Classic Wooden Dining Chair With Curved Back",
    price: "$89.00",
    image: "//nov-minicom.myshopify.com/cdn/shop/files/1-min_02d0e979-f8f4-49b4-bbc3-c4852675c021.jpg?v=1749111160&width=260",
  },
  {
    id: 8,
    name: "Round Coffee Table With Golden Metal Legs",
    price: "$210.00",
    image: "//nov-minicom.myshopify.com/cdn/shop/files/1-min_dfb1df34-1c68-4ee5-8bfb-ae5b3f5e430b.jpg?v=1749111367&width=260",
  },
];

const shoppingGuideData = [
  {
    id: 1,
    title: "Choose Your Furniture",
    content: "Browse our wide selection of stylish and high-quality furniture. Compare designs, colors, and sizes to find the perfect fit for your home.",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&q=80",
  },
  {
    id: 2,
    title: "Secure Checkout",
    content: "Experience a seamless and secure checkout process with multiple payment options tailored for your convenience and safety.",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&q=80",
  },
  {
    id: 3,
    title: "Fast & Safe Delivery",
    content: "Our trusted delivery partners ensure your furniture arrives safely and on time, right to your doorstep with tracking available.",
    image: "https://images.unsplash.com/photo-1586864387967-d02ef85d93e8?auto=format&fit=crop&q=80",
  },
  {
    id: 4,
    title: "Installation & Enjoy",
    content: "Professional installation services available so you can sit back, relax, and enjoy your new furniture immediately without any hassle.",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&q=80",
  },
];

const brandMarqueeData = [
  "//nov-minicom.myshopify.com/cdn/shop/files/brand-1.png?v=1749784954&width=180",
  "//nov-minicom.myshopify.com/cdn/shop/files/brand-2.png?v=1749784954&width=180",
  "//nov-minicom.myshopify.com/cdn/shop/files/brand-3.png?v=1749784953&width=180",
  "//nov-minicom.myshopify.com/cdn/shop/files/brand-4.png?v=1749784954&width=180",
  "//nov-minicom.myshopify.com/cdn/shop/files/brand-5.png?v=1749784954&width=180",
  "//nov-minicom.myshopify.com/cdn/shop/files/brand-6.png?v=1749784954&width=180",
  "//nov-minicom.myshopify.com/cdn/shop/files/brand-7.png?v=1749784954&width=180",
  "//nov-minicom.myshopify.com/cdn/shop/files/brand-8.png?v=1749784954&width=180",
  "//nov-minicom.myshopify.com/cdn/shop/files/brand-9.png?v=1749784954&width=180",
  "//nov-minicom.myshopify.com/cdn/shop/files/brand-10.png?v=1749784954&width=180",
  "//nov-minicom.myshopify.com/cdn/shop/files/brand-11.png?v=1749784954&width=180",
  "//nov-minicom.myshopify.com/cdn/shop/files/brand-12.png?v=1749784954&width=180",
];

const featuredProductData = {
  title: "Modern Beige Armchair with Wooden Legs",
  price: "$150.00",
  description: "Donec dapibus tellus sem, quis aliquam libero pharetra non. Nam vitae fermentum leo. Pellentesque bibendum dui eu mi tempor sodales. Integer gravida odio in sem laoreet tempus. Nunc vehicula nibh mauris, id bibendum metus facilisis iaculis. Phasellus suscipit dictum ...",
  stockStatus: "50 Products in stock",
  images: [
    "//nov-minicom.myshopify.com/cdn/shop/files/1-min_be47ec7a-ae18-44a0-ad6b-efeabb425930.jpg?v=1749110719&width=260",
  ],
  bgImage: "https://nov-minicom.myshopify.com/cdn/shop/files/home1-img-featured.jpg?v=1750143747&width=1296",
  estimatedDelivery: "22 - 23 Jun, 2025",
  freeShipping: "On all order over $200.00",
};

const tickerData = [
  {
    text: "100% SECURE PAYMENT SYSTEMS",
    icon: <ShieldCheck className="w-10 h-10 mr-3 hidden sm:block" strokeWidth={1.5} />,
  },
  {
    text: "FREE INSTALLATION",
    icon: <Wrench className="w-10 h-10 mr-3" strokeWidth={1.5} />,
  },
  {
    text: "FREE DELIVERY ON ORDERS OVER $200",
    icon: <Truck className="w-10 h-10 mr-3" strokeWidth={1.5} />,
  },
  {
    text: "30 DAY MONEY BACK GUARANTEE",
    icon: <BadgeDollarSign className="w-10 h-10 mr-3" strokeWidth={1.5} />,
  },
];

const customerReviewsData = [
  {
    id: 1,
    title: "Elegant Designs and Cozy Living Spaces",
    text: "I recently purchased a dining table set from Minicom, and I couldn't be happier with my choice. The craftsmanship is impeccable, and the design adds a touch of elegance to my space. The customer service team was incredibly helpful in assisting me with my order, and the delivery was smooth. I will definitely be coming back for more!",
    name: "David T. Brown",
    location: "FROM USA",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    id: 2,
    title: "Timeless Furniture Built to Impress!",
    text: "I'm absolutely thrilled with my purchase from Minicom! I ordered a dining set and was blown away by the craftsmanship and style. It fits perfectly in my space and adds such a warm, inviting feel. The wood finish is beautiful, and everything feels sturdy and well-made. Shipping was quicker than expected, and the packaging was secure. I'll definitely be coming back for more!",
    name: "Jennifer",
    location: "FROM CHICAGO",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    id: 3,
    title: "Exceptional Quality and Fast Delivery!",
    text: "The delivery was incredibly quick, and the sofa I ordered is even more beautiful than I expected. It perfectly matches the aesthetic of our living room. It's so comfortable and the material feels premium. Our family loves getting together around it!",
    name: "Michael Smith",
    location: "FROM LONDON",
    avatar: "https://randomuser.me/api/portraits/men/22.jpg",
  },
  {
    id: 4,
    title: "Perfect Addition to Our Lounge",
    text: "We bought an armchair and it's the best purchase we've made this year. It fits perfectly and serves as a great reading spot. The fabric is beautiful and durable. The setup process was very easy. We highly recommend this to anyone looking to remodel their home.",
    name: "Sarah Jenkins",
    location: "FROM TORONTO",
    avatar: "https://randomuser.me/api/portraits/women/33.jpg",
  },
  {
    id: 5,
    title: "Beautiful and Functional",
    text: "The TV stand we purchased is exactly what we were looking for. It hides all the cables perfectly while looking sleek. Highly recommend minicom to everyone who loves minimalistic and modern designs. It's a lifesaver.",
    name: "James Lee",
    location: "FROM SYDNEY",
    avatar: "https://randomuser.me/api/portraits/men/82.jpg",
  },
];

const stickySectionsData = [
  {
    title: "OFFICE FURNITURE",
    description:
      "Upgrade your workspace with ergonomic and stylish office furniture. From sleek desks to comfortable chairs, find everything you need for a productive and modern office!",
    buttonText: "SHOP NOW",
    image:
      "https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&q=80",
  },
  {
    title: "LIVING ROOM COMFORT",
    description:
      "Elevate your living space with our luxurious sofas and accent chairs. Designed for both style and relaxation, perfect for gatherings or quiet evenings.",
    buttonText: "EXPLORE COLLECTION",
    image:
      "https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?auto=format&fit=crop&q=80",
  },
  {
    title: "BEDROOM SANCTUARY",
    description:
      "Transform your bedroom into a peaceful retreat. Discover our range of premium beds, nightstands, and wardrobes crafted for ultimate tranquility.",
    buttonText: "DISCOVER MORE",
    image:
      "https://images.unsplash.com/photo-1505693314120-0d443867891c?auto=format&fit=crop&q=80",
  },
];

const followUsData = {
  profileImage: "https://nov-minicom.myshopify.com/cdn/shop/files/icon-rbb.png?crop=center&height=380&v=1750222821&width=380",
  handle: "@Risingbamboo",
  followers: "13K FOLLOWERS",
  title: "FOLLOW US ON INSTAGRAM",
  description: "Stay inspired with our latest furniture trends, design ideas, and exclusive offers! Follow @Minicom on Instagram for daily home inspiration and special deals.",
  buttonText: "FOLLOW US",
  buttonLink: "#",
  images: [
    [
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&q=80",
    ],
    [
      "https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1505693314120-0d443867891c?auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1538688525198-9b88f6f53126?auto=format&fit=crop&q=80",
    ],
    [
      "https://images.unsplash.com/photo-1540518614846-7eded433c457?auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&q=80",
    ]
  ]
};

const productGridData = [
  {
    category: "Living Room",
    items: [
      {
        id: 1,
        title: "Modern Beige Armchair With Wooden Legs",
        price: "$150.00",
        image: "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?auto=format&fit=crop&q=80",
        hoverImage: "https://images.unsplash.com/photo-1506898667547-42e22a46e125?auto=format&fit=crop&q=80",
      },
      {
        id: 2,
        title: "Solid Wood TV Stand With Storage Drawers Design",
        price: "$135.00",
        image: "https://images.unsplash.com/photo-1595514535215-ab1496a7dd76?auto=format&fit=crop&q=80",
        hoverImage: "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?auto=format&fit=crop&q=80",
      },
      {
        id: 3,
        title: "Wooden Frame Sofa Chair With Plush Cushion Seat",
        price: "$270.00",
        originalPrice: "$280.00",
        discount: "-3%",
        image: "https://images.unsplash.com/photo-1540574163026-643ea20d25b5?auto=format&fit=crop&q=80",
        hoverImage: "https://images.unsplash.com/photo-1505693314120-0d443867891c?auto=format&fit=crop&q=80",
      },
      {
        id: 4,
        title: "Premium Solid Wood Chair With Comfortable Design",
        price: "$79.00",
        image: "https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&q=80",
        hoverImage: "https://images.unsplash.com/photo-1595514535215-ab1496a7dd76?auto=format&fit=crop&q=80",
      }
    ]
  },
  {
    category: "Plant Pots",
    items: [
      {
        id: 5,
        title: "Compact Mini Plant Pot For Desk Or Shelf Display",
        price: "$37.00",
        image: "https://images.unsplash.com/photo-1485955900006-10f4d324d411?auto=format&fit=crop&q=80",
        hoverImage: "https://images.unsplash.com/photo-1416879598555-46aa1a3f6834?auto=format&fit=crop&q=80",
      },
      {
        id: 6,
        title: "Decorative Cactus Plant Pot For Indoor Display",
        price: "$37.00",
        image: "https://images.unsplash.com/photo-1459156212016-c812468e2115?auto=format&fit=crop&q=80",
        hoverImage: "https://images.unsplash.com/photo-1485955900006-10f4d324d411?auto=format&fit=crop&q=80",
      },
      {
        id: 7,
        title: "Durable Plastic Fiber Plant Pot For Indoor Decor",
        price: "$78.00",
        image: "https://images.unsplash.com/photo-1416879598555-46aa1a3f6834?auto=format&fit=crop&q=80",
        hoverImage: "https://images.unsplash.com/photo-1459156212016-c812468e2115?auto=format&fit=crop&q=80",
      },
      {
        id: 8,
        title: "Mini Ceramic Flower Pot For Desk And Home Decor",
        price: "$15.00",
        image: "https://images.unsplash.com/photo-1485955900006-10f4d324d411?auto=format&fit=crop&q=80",
        hoverImage: "https://images.unsplash.com/photo-1416879598555-46aa1a3f6834?auto=format&fit=crop&q=80",
      }
    ]
  },
  {
    category: "Tables & Desks",
    items: [
      {
        id: 9,
        title: "Wooden Office Desk With Drawers Open Storage",
        price: "$140.00",
        originalPrice: "$145.00",
        discount: "-3%",
        image: "https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?auto=format&fit=crop&q=80",
        hoverImage: "https://images.unsplash.com/photo-1595514535215-ab1496a7dd76?auto=format&fit=crop&q=80",
      },
      {
        id: 10,
        title: "Premium Solid Wood Chair With Comfortable Design",
        price: "$79.00",
        image: "https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&q=80",
        hoverImage: "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?auto=format&fit=crop&q=80",
      },
      {
        id: 11,
        title: "Classic Wooden Nightstand With Dual Storage Drawers",
        price: "$99.00",
        image: "https://images.unsplash.com/photo-1533090161767-e6ffed986c88?auto=format&fit=crop&q=80",
        hoverImage: "https://images.unsplash.com/photo-1505693314120-0d443867891c?auto=format&fit=crop&q=80",
      },
      {
        id: 12,
        title: "Modern Beige Armchair With Wooden Legs",
        price: "$150.00",
        image: "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?auto=format&fit=crop&q=80",
        hoverImage: "https://images.unsplash.com/photo-1506898667547-42e22a46e125?auto=format&fit=crop&q=80",
      }
    ]
  },
  {
    category: "Bedroom",
    items: [
      {
        id: 13,
        title: "Solid Wood Bed Frame With Classic Vintage Design",
        price: "$300.00",
        image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&q=80",
        hoverImage: "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?auto=format&fit=crop&q=80",
      },
      {
        id: 14,
        title: "Wooden Base Table Lamp With Fabric Shade Design",
        price: "$35.00",
        image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&q=80",
        hoverImage: "https://images.unsplash.com/photo-1540932239986-30128078f3c5?auto=format&fit=crop&q=80",
      },
      {
        id: 15,
        title: "Solid Wood Bedside Cabinet With Two Storage Drawers",
        price: "$265.00",
        image: "https://images.unsplash.com/photo-1533090161767-e6ffed986c88?auto=format&fit=crop&q=80",
        hoverImage: "https://images.unsplash.com/photo-1505693314120-0d443867891c?auto=format&fit=crop&q=80",
      },
      {
        id: 16,
        title: "Classic Wooden Nightstand With Dual Storage Drawers",
        price: "$99.00",
        image: "https://images.unsplash.com/photo-1533090161767-e6ffed986c88?auto=format&fit=crop&q=80",
        hoverImage: "https://images.unsplash.com/photo-1505693314120-0d443867891c?auto=format&fit=crop&q=80",
      }
    ]
  }
];

const coreFeaturesData = {
  subtitle: "SUSTAINABLE LIVING",
  title: "BEYOND FURNITURE\nCREATING A GREENER TOMORROW",
  features: [
    {
      icon: <Leaf className="w-6 h-6 text-title" strokeWidth={1.5} />,
      title: "Eco-Friendly Materials",
      description: "We craft our furniture using responsibly sourced, environmentally friendly materials.",
    },
    {
      icon: <PencilRuler className="w-6 h-6 text-title" strokeWidth={1.5} />,
      title: "Effortless Assembly",
      description: "Thoughtfully designed for quick setup, requiring minimal effort and no extra tools.",
    },
    {
      icon: <Recycle className="w-6 h-6 text-title" strokeWidth={1.5} />,
      title: "Giving Back to Nature",
      description: "Every purchase contributes to reforestation efforts, helping restore green spaces.",
    },
    {
      icon: <Lightbulb className="w-6 h-6 text-title" strokeWidth={1.5} />,
      title: "Sustainable Production",
      description: "Dedicated to reducing waste and promoting eco-conscious manufacturing practices.",
    },
  ],
};

const journalData = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&q=80",
    badge: "NEWS",
    author: "VINOVA THEME",
    date: "19JUN2025",
    title: "A Guide to Mixing Wood Tones in Your Living Space",
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&q=80",
    badge: "NEWS",
    author: "VINOVA THEME",
    date: "19JUN2025",
    title: "Revamping Your Living Room with Vintage Decor",
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1540518614846-7eded433c457?auto=format&fit=crop&q=80",
    badge: "NEWS",
    author: "VINOVA THEME",
    date: "19JUN2025",
    title: "Simple Ways to Add Character to Minimalist Interiors",
  },
  {
    id: 4,
    image: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&q=80",
    badge: "NEWS",
    author: "VINOVA THEME",
    date: "20JUN2025",
    title: "Modern Design Inspirations for Small Spaces",
  },
  {
    id: 5,
    image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&q=80",
    badge: "NEWS",
    author: "VINOVA THEME",
    date: "21JUN2025",
    title: "Creating a Cohesive Color Palette for Your Home",
  }
];

const faqData = {
  title: "FREQUENTLY ASKED QUESTIONS",
  description: "Explore our Frequently Asked Questions to find helpful answers and solutions to common inquiries. We've gathered the information you need to assist you quickly and efficiently.",
  buttons: [
    { id: 1, text: "VIEW ALL FAQS", icon: <MessageSquare className="w-5 h-5 text-background" strokeWidth={1.5} />, link: "#" },
    { id: 2, text: "CONTACT US", icon: <Phone className="w-5 h-5 text-background" strokeWidth={1.5} />, link: "#" },
    { id: 3, text: "STORE LOCATIONS", icon: <Store className="w-5 h-5 text-background" strokeWidth={1.5} />, link: "#" }
  ],
  questions: [
    {
      id: 1,
      question: "WHAT SHIPPING METHODS ARE AVAILBALE?",
      answer: "We offer standard, expedited, and express shipping options. The availability of these methods depends on your location and the items you are purchasing."
    },
    {
      id: 2,
      question: "HOW LONG WILL IT TAKE TO GET MY PACKAGE?",
      answer: "Standard shipping typically takes 3-5 business days. Expedited shipping takes 1-2 business days. Express shipping is delivered the next business day."
    },
    {
      id: 3,
      question: "WHERE ARE YOUR PRODUCTS SENT FROM?",
      answer: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque sit amet augue sit amet magna vestibulum pharetra. Vivamus ut est orci. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas."
    },
    {
      id: 4,
      question: "WHY CAN'T I LOG INTO MY ACCOUNT?",
      answer: "If you are having trouble logging in, please ensure that you are using the correct email address and password. You can also try resetting your password using the 'Forgot Password' link."
    }
  ]
};

const Hero = () => {
  const [categories, setCategories] = useState([]);
  const [latestProducts, setLatestProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [categoriesRes, productsRes] = await Promise.all([
          getCategoriesApi(),
          getProductsApi({ limit: 8 })
        ]);

        // Access categories from .data.categories
        setCategories(categoriesRes?.data?.categories || categoriesRes?.categories || []);

        // Access products from .data.products
        const productsList = productsRes?.data?.products || productsRes?.products || [];
        
        const transformedProducts = productsList.map(p => ({
          id: p._id,
          name: p.name,
          price: typeof p.price === 'object' ? `$${(p.price?.sellingPrice || 0).toFixed(2)}` : `$${(p.price || 0).toFixed(2)}`,
          category: p.category,
          image: p.images && p.images.length > 0 ? p.images[0] : "https://via.placeholder.com/300"
        }));
        setLatestProducts(transformedProducts);

      } catch (error) {
        console.log("Fetch Data Error:", error);
      }
    };

    fetchData();
  }, []);
  return (
    <>
   
      <div className="relative w-full md:h-60 lg:h-[90vh] bg-brand-hover overflow-hidden group">
        {/* Background Slider */}
        <Slider slides={slides} slideDuration={3000} />
      </div>
       <div className="p-4">
      <div className=" w-full mt-5 ">
        <Ticker data={tickerData} />
      </div>

     <div className="mt-5">
      <CategorySlider data={categories} />
      </div> 

      <div className="mt-5">
        <HandpickedElegance data={latestProducts.length > 0 ? latestProducts : handpickedEleganceData} />
      </div>
      <div className="mt-5 ">
        <ShoppingGuide data={shoppingGuideData} />
      </div>

      <div className="mt-5">
        <BrandMarquee data={brandMarqueeData} />
      </div>

      <div className="mt-5">
        <FeaturedProduct data={featuredProductData} />
      </div>

      <div className="mt-5">
        <SectionHeading
          subtitle="THE ULTIMATE FURNITURE EDIT"
          title="EXCLUSIVE PICKS ELEVATE YOUR SPACE"
          description="Discover a curated selection of premium furniture designed to transform your home. From timeless elegance to modern sophistication, these exclusive picks bring style, comfort, and functionality to every corner of your space. Upgrade your living with the finest craftsmanship and trendsetting designs!"
        />
      </div>

    

      <div className="mt-5">
        <StickySections data={stickySectionsData} />
      </div>

      <div className="mt-5 ">
        <CustomerReviews data={customerReviewsData} />
      </div>
      <div className="mt-5">
        <FollowUS data={followUsData} />
      </div>
      <div className="mt-5">
        <ProductGrid data={productGridData}/>
      </div>
      
      <div className="mt-5">
        <CoreFeatures data={coreFeaturesData} />
      </div>
      
      <div className="mt-5 ">
        <JournalSection data={journalData} />
      </div>
        <div className="mt-5">
        <Faq data={faqData} />
      </div>
      </div>
    </>
  );
};

export default Hero;


