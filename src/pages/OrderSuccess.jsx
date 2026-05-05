import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchOrderById } from '../redux/slice/orderSlice';
import { CheckCircle, Package, ArrowRight, ShoppingBag } from 'lucide-react';
import HeaderPage from '../component/headerPage';
import { Button1 } from '../component/Btn/Button1';

const OrderSuccess = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const { currentOrder, loading, error } = useSelector((state) => state.order);

  useEffect(() => {
    if (id) {
      dispatch(fetchOrderById(id));
    }
  }, [id, dispatch]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-title"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-background p-4">
        <h2 className="text-2xl font-bold text-red-600 mb-4">Error loading order details</h2>
        <p className="text-body mb-6">{error}</p>
        <Button1
         text={"  Back to Home"}
         variant='primary'
          onClick={() => navigate('/')}
       
      
        
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <HeaderPage breadcrumb="Order Success" title="Thank You For Your Order" />
      
      <div className="max-w-3xl mx-auto px-4 py-16 text-center">
        <div className="flex justify-center mb-6">
          <div className="bg-green-100 p-4 rounded-full">
            <CheckCircle className="w-16 h-16 text-green-600" />
          </div>
        </div>
        
        <h1 className="text-4xl font-bold text-title mb-4">Order Confirmed!</h1>
        <p className="text-lg text-body mb-8">
          Your order <strong>#{id}</strong> has been placed successfully. 
          We'll send you a confirmation email shortly.
        </p>

        <div className="bg-secondary border border-outline rounded-xl p-8 mb-10 text-left">
          <div className="flex items-center gap-3 mb-6 border-b border-outline pb-4">
            <Package className="text-title" />
            <h2 className="text-xl font-bold text-title">Order Summary</h2>
          </div>

          <div className="space-y-4">
            {currentOrder?.orderItems?.map((item) => (
              <div key={item._id} className="flex justify-between items-center">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-white rounded border border-outline flex items-center justify-center p-1">
                    <img src={item.image} alt={item.name} className="max-w-full max-h-full object-contain" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-title">{item.name}</p>
                    <p className="text-xs text-body">Qty: {item.quantity}</p>
                  </div>
                </div>
                <p className="text-sm font-bold text-title">${(item.price * item.quantity).toFixed(2)}</p>
              </div>
            ))}
          </div>

          <div className="mt-6 pt-6 border-t border-outline space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-body">Subtotal</span>
              <span className="text-title">${currentOrder?.itemsPrice?.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-body">Shipping</span>
              <span className="text-title">${currentOrder?.shippingPrice?.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-lg font-bold pt-2">
              <span className="text-title">Total</span>
              <span className="text-title">${currentOrder?.totalPrice?.toFixed(2)}</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-10">
          <Button1
          text={"Continue Shopping"}
          variant='primary'
          icon={<ShoppingBag/>}
            onClick={() => navigate('/collection')}
           
          />
          <Button1
          text={" Go to Home"}
            onClick={() => navigate('/')}
            className="flex items-center justify-center gap-2 bg-black text-yellow border border-outline px-8 py-4 rounded-lg font-bold hover:bg-secondary transition-all"
          
      icon={<ArrowRight/>} 
          />
        </div>
      </div>
    </div>
  );
};

export default OrderSuccess;
