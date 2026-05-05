import React, { useState } from 'react'
import Header1 from '../component/Header1'
import { Route, Routes } from 'react-router-dom'
import Hero from '../pages/Hero'
import Collection from '../pages/Collection'
import Products from '../pages/Products'
import AboutUs from '../Page/AboutUs'
import Error from '../Page/Error'
import ContactUS from '../Page/ContactUS'
import Faqs from '../Page/Faqspage'
import PageStoreDirection from '../Page/PageStoreDirection'
import PageStoreLocation from '../Page/PageStoreLocation'
import PageTestimonial from '../Page/PageTestimonial'
import Wishlist from '../pages/Wishlist'
import ShopingCart from '../pages/ShopingCart'
import Login from '../component/auth/Login'
import Register from '../component/auth/Register'
import Checkout from '../pages/Checkout'
import MobileBottomNav from '../component/MobileBottomNav'
import Footer from '../component/Footer'
import OrderSuccess from '../pages/OrderSuccess'
import OrderHistory from '../pages/OrderHistory'

const Approutes = () => {
     const [isAccountOpen, setIsAccountOpen] = useState(false);

  return (
    <div className="flex flex-col min-h-screen overflow-x-clip">
      <Header1 isAccountOpen={isAccountOpen} setIsAccountOpen={setIsAccountOpen} />
      <main className="flex-grow w-full">
        <Routes>
          <Route path="/" element={<Hero />} />
          <Route path="/collection" element={<Collection />} />
           <Route path="/products" element={<Products />} />
          <Route path="/product/:id" element={<Products />} />
          <Route path="/about-Us" element={<AboutUs/>}/>
          <Route path="/home" element={<Hero />} />
          <Route path="/404" element={<Error/>}/>
          <Route path="/contact" element={<ContactUS/>}/>
          <Route path="/Frequently-Asked-Questions" element={<Faqs/>}/>
          <Route path="/page-store-direction" element={<PageStoreDirection/>}/>
          <Route path="/page-store-location" element={<PageStoreLocation/>}/>
          <Route path="/page-testimonial" element={<PageTestimonial/>}/>
          <Route path="/wishlist" element={<Wishlist/>}/>
          <Route path="/cart" element={<ShopingCart/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/register" element={<Register/>}/>
          <Route path="/checkout" element={<Checkout/>}/>
          <Route path="/order-success/:id" element={<OrderSuccess/>}/>
          <Route path="/order-history" element={<OrderHistory />} />
          
       
        </Routes>
      </main>
      <Footer />
      <MobileBottomNav setIsAccountOpen={setIsAccountOpen} />
    </div>
  )
}

export default Approutes