import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserOrders } from "../redux/slice/orderSlice";
import HeaderPage from "../component/headerPage";
import Pageloader from "../pageloader/Pageloader";

const OrderHistory = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const { orders, loading, error } = useSelector((state) => state.order);

  useEffect(() => {
    dispatch(fetchUserOrders());
  }, [dispatch]);

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "pending": return "text-orange-500 bg-orange-50";
      case "processing": return "text-blue-500 bg-blue-50";
      case "shipped": return "text-purple-500 bg-purple-50";
      case "delivered": return "text-green-500 bg-green-50";
      case "cancelled": return "text-red-500 bg-red-50";
      default: return "text-gray-500 bg-gray-50";
    }
  };

  if (loading) return <Pageloader />;

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <HeaderPage title="My Order History" />

      <div className="max-w-6xl mx-auto px-4 py-10">
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-6">
            {error}
          </div>
        )}

        {orders.length === 0 ? (
          <div className="bg-white rounded-lg shadow-sm p-10 text-center border border-gray-100">
            <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400">
                <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
                <path d="M3 6h18" />
                <path d="M16 10a4 4 0 0 1-8 0" />
              </svg>
            </div>
            <h2 className="text-xl font-bold text-gray-900 mb-2">No orders found</h2>
            <p className="text-gray-500 mb-8 max-w-md mx-auto">Looks like you haven't placed any orders yet. Start shopping and discover our latest collections!</p>
            <button 
              onClick={() => navigate("/collection")}
              className="bg-black text-white px-8 py-3 rounded-sm font-bold text-xs tracking-widest hover:bg-gray-800 transition-all uppercase"
            >
              Start Shopping
            </button>
          </div>
        ) : (
          <div className="flex flex-col gap-6">
            {orders.map((order) => (
              <div key={order._id} className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
                {/* Order Header */}
                <div className="bg-gray-50 px-6 py-4 border-b border-gray-100 flex flex-wrap justify-between items-center gap-4">
                  <div className="flex flex-wrap gap-x-8 gap-y-2">
                    <div>
                      <div className="text-[10px] text-gray-500 font-bold uppercase tracking-wider mb-1">Order Placed</div>
                      <div className="text-sm font-medium text-gray-900">{new Date(order.createdAt).toLocaleDateString()}</div>
                    </div>
                    <div>
                      <div className="text-[10px] text-gray-500 font-bold uppercase tracking-wider mb-1">Total Amount</div>
                      <div className="text-sm font-bold text-gray-900">${order.totalPrice?.toFixed(2)}</div>
                    </div>
                    <div>
                      <div className="text-[10px] text-gray-500 font-bold uppercase tracking-wider mb-1">Order ID</div>
                      <div className="text-sm font-medium text-gray-900 uppercase">#{order._id?.slice(-8)}</div>
                    </div>
                  </div>
                  <div className={`px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wide ${getStatusColor(order.orderStatus)}`}>
                    {order.orderStatus}
                  </div>
                </div>

                {/* Order Items */}
                <div className="p-6">
                  <div className="flex flex-col gap-6">
                    {order.orderItems?.map((item, idx) => (
                      <div key={idx} className="flex gap-4 md:gap-6">
                        <div className="w-20 h-24 md:w-24 md:h-28 bg-gray-50 rounded p-2 flex items-center justify-center shrink-0">
                          <img 
                            src={item.image || 'https://via.placeholder.com/150'} 
                            alt={item.name} 
                            className="max-w-full max-h-full object-contain mix-blend-multiply"
                          />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-sm md:text-base font-bold text-gray-900 mb-1 leading-tight">
                            {item.name || "Product Name"}
                          </h3>
                          
                          {/* Variant Info */}
                          <div className="flex flex-wrap gap-2 mb-2">
                            {item.attributes && Object.entries(item.attributes).map(([key, value]) => (
                              <div key={key} className="text-[10px] md:text-[11px] bg-gray-100 px-2 py-0.5 rounded text-gray-600 uppercase">
                                {key}: <span className="text-gray-900 font-bold">{value}</span>
                              </div>
                            ))}
                          </div>

                          <div className="flex items-center justify-between mt-auto">
                            <div className="text-xs md:text-sm text-gray-500">
                              Qty: <span className="font-bold text-gray-900">{item.quantity}</span>
                            </div>
                            <div className="text-sm font-bold text-gray-900">
                              ${(item.price * item.quantity).toFixed(2)}
                            </div>
                          </div>
                          
                          <div className="mt-4 flex gap-4">
                            <button 
                              onClick={() => navigate(`/product/${item.product}`)}
                              className="text-[11px] font-bold text-black border-b border-black hover:pb-0.5 transition-all uppercase tracking-wider"
                            >
                              Buy it again
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Order Footer */}
                <div className="bg-gray-50/50 px-6 py-4 border-t border-gray-100 flex justify-end">
                  <button 
                    onClick={() => navigate(`/order-success/${order._id}`)}
                    className="text-xs font-bold text-gray-600 hover:text-black transition-colors uppercase tracking-widest"
                  >
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderHistory;
