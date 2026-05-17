import React, { useEffect } from 'react';
import HeaderPage from '../component/headerPage';
import { Trash2, CalendarDays } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchWishlist, removeFromWishlist } from '../redux/slice/wishlistSlice';
import WishlistItem from '../component/WishlistItem';
import Pageloader from '../pageloader/Pageloader';





const Wishlist = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { wishlist, loading } = useSelector((state) => state.wishlist);

  useEffect(() => {
    dispatch(fetchWishlist());
  }, [dispatch]);

  const handleRemove = (id) => {
    dispatch(removeFromWishlist(id));
  };

  const wishlistItems = wishlist?.products?.map(product => ({
    id: product._id,
    name: product.name,
    price: `₹${product.price?.sellingPrice}`,
    dateAdded: new Date(product.createdAt).toLocaleDateString('en-US', {
      month: 'short',
      day: '2-digit',
      year: 'numeric'
    }).toUpperCase(),
    image: product.images?.[0] || 'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&q=80',
    slug: `/product/${product._id}`
  })) || [];

  return (
    <div className="bg-background min-h-screen">
      <HeaderPage title="Page Wishlist" />
      
      <div className=" w-full mx-auto px-4 lg:px-8 py-8 mt-8 md:mt-12">
        {loading ? (
         <Pageloader/>
        ) : wishlistItems.length > 0 ? (
          <div className="flex flex-col">
            {wishlistItems.map((item) => (
              <WishlistItem
                key={item.id} 
                item={item} 
                onRemove={handleRemove}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 md:py-16 bg-secondary rounded-md border border-outline px-4">
            <h2 className="text-title mb-2">Your wishlist is empty</h2>
            <p className="text-body mb-6">Browse our collection and add items you love!</p>
            <button onClick={() => navigate("/")} className="inline-block bg-brand-hover text-background text-[12px] md:text-[13px] font-bold py-3 md:py-3.5 px-6 md:px-8 rounded-sm uppercase tracking-wider hover:bg-title transition-colors">
              Continue Shopping
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Wishlist;