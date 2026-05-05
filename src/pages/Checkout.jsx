import { Search, CreditCard, AlertCircle, Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { createOrder, resetOrderState } from '../redux/slice/orderSlice';
import { useEffect } from 'react';
import { fetchCart } from '../redux/slice/cartSlice';
import { useState } from 'react';
import Pageloader from '../pageloader/Pageloader';
import { Button1 } from '../component/Btn/Button1';
import { fetchAddresses, addAddress, resetAddressStatus } from '../redux/slice/addressSlice';
import { MapPin, Plus } from 'lucide-react';
import { Axios } from '../constant/MainContent';

const Checkout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { cart, loading: cartLoading } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.auth);
  const { loading: orderLoading, success, currentOrder } = useSelector((state) => state.order);
  const { addresses, loading: addressLoading } = useSelector((state) => state.address);

  const [shippingAddress, setShippingAddress] = useState(null);
  const [showAddressForm, setShowAddressForm] = useState(false);

  const [formData, setFormData] = useState({
    email: user?.email || '',
    firstName: user?.name?.split(' ')[0] || '',
    lastName: user?.name?.split(' ')[1] || '',
    country: 'United States',
    address: '',
    apartment: '',
    city: '',
    state: '',
    zip: '',
    phone: '',
    saveInfo: true,
    addressType: 'Home',
    houseNo: '',
    area: '',
    landmark: '',
    postalCode: '',
    paymentMethod: 'COD'
  });

  const cartItems = cart?.items || [];

  useEffect(() => {
    if (!user) {
      navigate('/login');
    } else {
      if (!cart) dispatch(fetchCart());
      dispatch(fetchAddresses());
    }
  }, [user, cart, dispatch, navigate]);

  useEffect(() => {
    if (addresses.length > 0) {
      const defaultAddr = addresses.find(addr => addr.isDefault) || addresses[0];
      setShippingAddress(defaultAddr);
      setShowAddressForm(false);
    } else {
      setShowAddressForm(true);
    }
  }, [addresses]);

  useEffect(() => {
    if (success && currentOrder) {
      const orderId = currentOrder._id;
      dispatch(resetOrderState());
      dispatch(fetchCart()); // Refresh cart (should be empty now)
      navigate(`/order-success/${orderId}`);
    }
  }, [success, currentOrder, dispatch, navigate]);

  const subtotal = cartItems.reduce((acc, item) => {
    const price = typeof item.product?.price === 'object' 
      ? (item.product.price.sellingPrice || 0) 
      : (item.product?.price || 0);
    return acc + price * item.quantity;
  }, 0);
  const shippingPrice = subtotal > 500 ? 0 : 50;
  const total = subtotal + shippingPrice;

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    if (cartItems.length === 0) {
      alert("Your cart is empty");
      return;
    }

    let finalShippingAddress = shippingAddress;

    if (showAddressForm) {
      // Validate form
      // if (!formData.address || !formData.city || !formData.state || !formData.zip || !formData.phone || !formData.firstName || !formData.lastName) {
      //   alert("Please fill all required delivery fields");
      //   return;
      // }

      const newAddressData = {
        fullName: `${formData.firstName} ${formData.lastName}`,
        phone: formData.phone,
        addressType: formData.addressType,
        houseNo: formData.houseNo || formData.address,
        area: formData.area || formData.address,
        landmark: formData.landmark,
        city: formData.city,
        state: formData.state,
        postalCode: formData.zip,
        country: formData.country,
        isDefault: addresses.length === 0 ? true : false
      };

      if (formData.saveInfo) {
        const resultAction = await dispatch(addAddress(newAddressData));
        if (addAddress.fulfilled.match(resultAction)) {
          finalShippingAddress = resultAction.payload;
        } else {
          alert("Failed to save address. Proceeding with order anyway.");
        }
      }
      
      finalShippingAddress = {
        address: `${formData.houseNo} ${formData.area} ${formData.address}`,
        city: formData.city,
        state: formData.state,
        postalCode: formData.zip,
        country: formData.country,
        apartment: formData.apartment
      };
    }

    const orderData = {
      contactDetails: {
        firstName: formData.firstName || user?.name?.split(' ')[0],
        lastName: formData.lastName || user?.name?.split(' ')[1],
        email: formData.email,
        phone: formData.phone || finalShippingAddress?.phone
      },
      shippingAddress: showAddressForm ? finalShippingAddress : {
        address: `${finalShippingAddress.houseNo}, ${finalShippingAddress.area}, ${finalShippingAddress.landmark || ''}`,
        city: finalShippingAddress.city,
        state: finalShippingAddress.state,
        postalCode: finalShippingAddress.postalCode,
        country: finalShippingAddress.country,
        apartment: ""
      },
      paymentMethod: formData.paymentMethod
    };

    if (formData.paymentMethod === 'COD') {
      dispatch(createOrder(orderData));
    } else {
      // Razorpay Payment
      try {
        const res = await loadRazorpayScript();
        if (!res) {
          alert("Razorpay SDK failed to load. Are you online?");
          return;
        }

        // 1. Create order on our backend first
        const resultAction = await dispatch(createOrder(orderData));
        if (createOrder.fulfilled.match(resultAction)) {
          const newOrder = resultAction.payload;
          
          // 2. Create Razorpay order
          const { data: { order: razorpayOrder } } = await Axios.post('/payment/create-order', {
            amount: total,
            currency: "INR",
            receipt: newOrder._id
          });

          // 3. Open Razorpay Checkout
          const options = {
            key: import.meta.env.VITE_RAZORPAY_KEY_ID || "rzp_test_placeholder", 
            amount: razorpayOrder.amount,
            currency: razorpayOrder.currency,
            name: "Minicom Ecommerce",
            description: "Order Payment",
            order_id: razorpayOrder.id,
            handler: async (response) => {
              // 4. Verify payment on backend
              try {
                const verifyRes = await Axios.post('/payment/verify', {
                  razorpay_order_id: response.razorpay_order_id,
                  razorpay_payment_id: response.razorpay_payment_id,
                  razorpay_signature: response.razorpay_signature,
                  orderId: newOrder._id
                });

                if (verifyRes.data.success) {
                  navigate(`/order-success/${newOrder._id}`);
                } else {
                  alert("Payment verification failed");
                }
              } catch (err) {
                console.error(err);
                alert("Error verifying payment");
              }
            },
            prefill: {
              name: `${orderData.contactDetails.firstName} ${orderData.contactDetails.lastName}`,
              email: orderData.contactDetails.email,
              contact: orderData.contactDetails.phone
            },
            theme: { color: "#000000" }
          };

          const paymentObject = new window.Razorpay(options);
          paymentObject.open();
        }
      } catch (error) {
        console.error("Payment Error:", error);
        alert("Something went wrong with the payment process");
      }
    }
  };

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.async = true;
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  return (
    <div className="min-h-screen bg-background text-title">
      {/* Container */}
      <div className="mx-auto flex flex-col lg:flex-row ">
        
        {/* Left Column - Form */}
        <div className="w-full  p-6 lg:py-12 lg:pr-12 xl:pr-16 order-2 lg:order-1">
          
          <div className="space-y-10 lg:pl-10">
            {/* Contact Section */}
            <section>
              <div className="flex justify-between items-end mb-4">
                <h2>Contact</h2>
                <span onClick={() => navigate("/login")} className="text-sm text-link hover:text-link-hover underline underline-offset-2 cursor-pointer">Sign in</span>
              </div>
              <div className="relative">
                <input 
                  type="text" 
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Email or mobile phone number" 
                  className="w-full px-3 py-3 border border-outline rounded focus:outline-none focus:ring-1 focus:ring-brand focus:border-brand transition-colors text-sm"
                />
              </div>
            </section>

            {/* Delivery Section */}
            <section>
              <div className="flex justify-between items-center mb-4">
                <h2>Delivery</h2>
                {addresses.length > 0 && !showAddressForm && (
                  <button 
                    onClick={() => setShowAddressForm(true)}
                    className="text-sm text-link font-medium flex items-center gap-1 hover:underline cursor-pointer"
                  >
                    <Plus size={16} /> Add New
                  </button>
                )}
                {showAddressForm && addresses.length > 0 && (
                  <button 
                    onClick={() => setShowAddressForm(false)}
                    className="text-sm text-link font-medium hover:underline cursor-pointer"
                  >
                    Use saved address
                  </button>
                )}
              </div>

              {!showAddressForm && addresses.length > 0 ? (
                <div className="space-y-3">
                  {addresses.map((addr) => (
                    <div 
                      key={addr._id}
                      onClick={() => setShippingAddress(addr)}
                      className={`p-4 border rounded-lg cursor-pointer transition-all ${
                        shippingAddress?._id === addr._id 
                          ? 'border-brand bg-brand/5 ring-1 ring-brand' 
                          : 'border-outline hover:border-brand/50'
                      }`}
                    >
                      <div className="flex justify-between items-start">
                        <div className="flex gap-3">
                          <MapPin size={18} className={shippingAddress?._id === addr._id ? 'text-brand' : 'text-subtitle'} />
                          <div>
                            <div className="flex items-center gap-2">
                              <p className="font-medium text-title">{addr.fullName}</p>
                              <span className="px-1.5 py-0.5 bg-secondary text-[10px] text-subtitle rounded uppercase tracking-wider font-semibold">{addr.addressType}</span>
                            </div>
                            <p className="text-sm text-body mt-1">
                              {addr.houseNo}, {addr.area}
                            </p>
                            {addr.landmark && <p className="text-sm text-body">Landmark: {addr.landmark}</p>}
                            <p className="text-sm text-body">
                              {addr.city}, {addr.state} - {addr.postalCode}
                            </p>
                            <p className="text-sm text-body mt-1">{addr.phone}</p>
                          </div>
                        </div>
                        {addr.isDefault && <span className="text-[10px] bg-brand text-white px-2 py-0.5 rounded font-bold uppercase tracking-tight">Default</span>}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="space-y-3 animate-in fade-in duration-300">
                  {/* Country Selection */}
                  <div className="relative border border-outline rounded focus-within:border-brand focus-within:ring-1 focus-within:ring-brand transition-colors bg-background">
                    <label className="absolute text-[11px] text-body top-1.5 left-3">Country/Region</label>
                    <select 
                      name="country"
                      value={formData.country}
                      onChange={handleInputChange}
                      className="w-full pl-3 pr-10 pt-5 pb-1 appearance-none bg-transparent focus:outline-none text-sm cursor-pointer"
                    >
                      <option value="India">India</option>
                      <option value="United States">United States</option>
                      <option value="Canada">Canada</option>
                      <option value="United Kingdom">United Kingdom</option>
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-body">
                      <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
                    </div>
                  </div>

                  {/* Name Row */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div className="relative border border-outline rounded focus-within:border-brand focus-within:ring-1 focus-within:ring-brand transition-colors">
                      <input 
                        type="text" 
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        placeholder="First name" 
                        className="w-full px-3 py-3 bg-transparent focus:outline-none text-sm placeholder-body"
                      />
                    </div>
                    <div className="relative border border-outline rounded focus-within:border-brand focus-within:ring-1 focus-within:ring-brand transition-colors">
                      <input 
                        type="text" 
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        placeholder="Last name" 
                        className="w-full px-3 py-3 bg-transparent focus:outline-none text-sm placeholder-body"
                      />
                    </div>
                  </div>

                  {/* House No / Apartment */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div className="relative border border-outline rounded focus-within:border-brand focus-within:ring-1 focus-within:ring-brand transition-colors">
                      <input 
                        type="text" 
                        name="houseNo"
                        value={formData.houseNo}
                        onChange={handleInputChange}
                        placeholder="House No., Building Name" 
                        className="w-full px-3 py-3 bg-transparent focus:outline-none text-sm placeholder-body"
                      />
                    </div>
                    <div className="relative border border-outline rounded focus-within:border-brand focus-within:ring-1 focus-within:ring-brand transition-colors">
                      <input 
                        type="text" 
                        name="area"
                        value={formData.area}
                        onChange={handleInputChange}
                        placeholder="Area, Street, Sector, Village" 
                        className="w-full px-3 py-3 bg-transparent focus:outline-none text-sm placeholder-body"
                      />
                    </div>
                  </div>

                  {/* Landmark */}
                  <div className="relative border border-outline rounded focus-within:border-brand focus-within:ring-1 focus-within:ring-brand transition-colors">
                    <input 
                      type="text" 
                      name="landmark"
                      value={formData.landmark}
                      onChange={handleInputChange}
                      placeholder="Landmark (Optional)" 
                      className="w-full px-3 py-3 bg-transparent focus:outline-none text-sm placeholder-body"
                    />
                  </div>

                  {/* City, State, Zip Row */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <div className="relative border border-outline rounded focus-within:border-brand focus-within:ring-1 focus-within:ring-brand transition-colors">
                      <input 
                        type="text" 
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        placeholder="City" 
                        className="w-full px-3 py-3 bg-transparent focus:outline-none text-sm placeholder-body"
                      />
                    </div>
                    
                    {/* State Input (Changed to text for flexibility or kept as select) */}
                    <div className="relative border border-outline rounded focus-within:border-brand focus-within:ring-1 focus-within:ring-brand transition-colors bg-background">
                      <label className="absolute text-[11px] text-body top-1.5 left-3 z-10">State</label>
                      <select 
                        name="state"
                        value={formData.state}
                        onChange={handleInputChange}
                        className="w-full pl-3 pr-10 pt-5 pb-1 appearance-none bg-transparent focus:outline-none text-sm relative z-20 cursor-pointer"
                      >
                        <option value="" disabled>Select State</option>
                        <option value="Andhra Pradesh">Andhra Pradesh</option>
                    
                        <option value=" Madhya radesh">Madhya Pradesh</option>
                        <option value="Delhi">Delhi</option>
                        <option value="Gujarat">Gujarat</option>
                        <option value="Haryana">Haryana</option>
                        <option value="Himachal Pradesh">Himachal Pradesh</option>
                        <option value="Karnataka">Karnataka</option>
                        <option value="Maharashtra">Maharashtra</option>
                        <option value="Punjab">Punjab</option>
                        <option value="Rajasthan">Rajasthan</option>
                        <option value="Tamil Nadu">Tamil Nadu</option>
                        <option value="Uttar Pradesh">Uttar Pradesh</option>
                        <option value="West Bengal">West Bengal</option>
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-body z-10">
                        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
                      </div>
                    </div>

                    <div className="relative border border-outline rounded focus-within:border-brand focus-within:ring-1 focus-within:ring-brand transition-colors">
                      <input 
                        type="text" 
                        name="zip"
                        value={formData.zip}
                        onChange={handleInputChange}
                        placeholder="Pincode" 
                        className="w-full px-3 py-3 bg-transparent focus:outline-none text-sm placeholder-body"
                      />
                    </div>
                  </div>

                  {/* Address Type & Save info checkbox */}
                  <div className="flex flex-col gap-3 pt-2">
                    <div className="flex gap-4">
                      {['Home', 'Office', 'Other'].map(type => (
                        <label key={type} className="flex items-center gap-2 cursor-pointer">
                          <input 
                            type="radio" 
                            name="addressType" 
                            value={type}
                            checked={formData.addressType === type}
                            onChange={handleInputChange}
                            className="text-brand focus:ring-brand cursor-pointer"
                          />
                          <span className="text-sm text-body">{type}</span>
                        </label>
                      ))}
                    </div>
                    
                    <div className="flex items-center">
                      <input 
                        type="checkbox" 
                        id="saveInfo"
                        name="saveInfo"
                        checked={formData.saveInfo}
                        onChange={handleInputChange}
                        className="h-4 w-4 text-link focus:ring-brand border-outline rounded cursor-pointer accent-brand"
                      />
                      <label htmlFor="saveInfo" className="ml-2 block text-sm text-body cursor-pointer">
                        Save this address for future checkouts
                      </label>
                    </div>
                  </div>
                </div>
              )}
            </section>

            {/* Shipping Method Section */}
            <section className="pt-2">
              <h2 className="mb-4">Shipping method</h2>
              <div className="bg-secondary text-subtitle text-sm py-4 px-4 rounded flex items-center justify-between border border-outline">
                <span>Standard Shipping</span>
                <span className="font-bold">{shippingPrice === 0 ? 'FREE' : `$${shippingPrice.toFixed(2)}`}</span>
              </div>
            </section>

            {/* Phone Section (Added as it's required by payload) */}
            <section className="pt-2">
              <h2 className="mb-4">Phone Number</h2>
              <div className="relative border border-outline rounded focus-within:border-brand focus-within:ring-1 focus-within:ring-brand transition-colors">
                <input 
                  type="text" 
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="Phone number" 
                  className="w-full px-3 py-3 bg-transparent focus:outline-none text-sm placeholder-body"
                />
              </div>
            </section>

            {/* Payment Section */}
            <section className="pt-2">
              <h2>Payment</h2>
              <p className="text-body mb-4 mt-1">All transactions are secure and encrypted.</p>
              
              <div className="space-y-3">
                <div 
                  onClick={() => setFormData(prev => ({ ...prev, paymentMethod: 'COD' }))}
                  className={`p-4 border rounded-lg cursor-pointer transition-all flex items-center justify-between ${
                    formData.paymentMethod === 'COD' 
                      ? 'border-brand bg-brand/5 ring-1 ring-brand' 
                      : 'border-outline hover:border-brand/50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <input 
                      type="radio" 
                      checked={formData.paymentMethod === 'COD'}
                      readOnly
                      className="text-brand focus:ring-brand"
                    />
                    <div>
                      <p className="font-medium text-title">Cash on Delivery (COD)</p>
                      <p className="text-xs text-body">Pay when your order is delivered</p>
                    </div>
                  </div>
                </div>

                <div 
                  onClick={() => setFormData(prev => ({ ...prev, paymentMethod: 'Online' }))}
                  className={`p-4 border rounded-lg cursor-pointer transition-all flex items-center justify-between ${
                    formData.paymentMethod === 'Online' 
                      ? 'border-brand bg-brand/5 ring-1 ring-brand' 
                      : 'border-outline hover:border-brand/50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <input 
                      type="radio" 
                      checked={formData.paymentMethod === 'Online'}
                      readOnly
                      className="text-brand focus:ring-brand"
                    />
                    <div>
                      <p className="font-medium text-title">Online Payment (Razorpay)</p>
                      <p className="text-xs text-body">Pay securely via Cards, UPI, or NetBanking</p>
                    </div>
                  </div>
                  <div className="flex gap-1">
                    <CreditCard size={20} className="text-subtitle" />
                  </div>
                </div>
              </div>
            </section>

            {/* Pay Now Button */}
            <Button1
            text={"Buy now"}
            variant='primary'
              onClick={handlePlaceOrder}
              disabled={orderLoading || cartItems.length === 0}
              className={`w-full bg-title text-white font-medium py-4 px-4 rounded border border-title transition duration-150 ease-in-out flex items-center justify-center gap-2 ${orderLoading || cartItems.length === 0 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-title/90 cursor-pointer'}`}
              
            />
            
            {/* Footer Links */}
            <div className="mt-8 pt-6 border-t border-outline">
              <span onClick={() => navigate("/privacy-policy")} className="text-[13px] text-link hover:text-link-hover hover:underline cursor-pointer">Privacy policy</span>
            </div>
          </div>
        </div>

        {/* Right Column - Order Summary Base bg: #fafafa, border-l desktop only */}
        <div className="w-full lg:w-[45%] xl:w-[40%] bg-secondary lg:border-l border-outline p-6 lg:py-12 lg:pl-10 xl:pl-12 order-1 lg:order-2">
          <div className="sticky top-10 space-y-6">
            
            {/* Cart Items */}
            <div className="space-y-4">
              {cartItems.map((item) => (
                <div key={item._id} className="flex items-center justify-between group">
                  <div className="flex items-center gap-4 relative">
                    {/* Image Box */}
                    <div className="relative h-16 w-16 bg-background border border-outline rounded-lg flex items-center justify-center">
                      <img 
                        src={item.product?.images?.[0]} 
                        alt={item.product?.name} 
                        className="object-cover h-14 w-14 rounded-md"
                      />
                      {/* Quantity Badge */}
                      <span className="absolute -top-2 -right-2 bg-title/90 text-background text-xs font-semibold rounded-full flex items-center justify-center min-w-[20px] h-5 px-1.5 ring-1 ring-background">
                        {item.quantity}
                      </span>
                    </div>
                    {/* Title */}
                    <span className="text-sm text-title font-medium max-w-[200px] leading-tight">
                      {item.product?.name}
                    </span>
                  </div>
                  {/* Price */}
                  <span className="text-sm text-title">
                    ${(typeof item.product?.price === 'object' ? (item.product?.price?.sellingPrice || 0) : (item.product?.price || 0)).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>

            {/* Subtotals */}
            <div className="pt-4 space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-subtitle">Subtotal</span>
                <span className="text-title font-medium">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-subtitle">Shipping</span>
                <span className="text-title font-medium">{shippingPrice === 0 ? 'FREE' : `$${shippingPrice.toFixed(2)}`}</span>
              </div>
            </div>

            {/* Total */}
            <div className="pt-4">
              <div className="flex justify-between items-center">
                <span className="text-base font-semibold text-title">Total</span>
                <div className="flex items-center gap-2">
                  <span className="text-[11px] text-body uppercase font-medium">USD</span>
                  <span className="text-xl font-semibold text-title">${total.toFixed(2)}</span>
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};

export default Checkout;