import { Trash2, CalendarDays, ShoppingBag } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToCart, openCart } from '../redux/slice/cartSlice';
const WishlistItem = ({ item, onRemove }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleAddToCart = async () => {
    try {
      // Assuming item.id is the product ID
      await dispatch(addToCart({
        product: item.id,
        quantity: 1,
        // For wishlist, we might not have variant info unless we store it
      })).unwrap();
      dispatch(openCart());
    } catch (error) {
      console.error("Add to cart error:", error);
      alert(error || "Failed to add product to cart");
    }
  };

  return (
    <div className="relative flex flex-col md:flex-row md:items-center justify-between p-4 sm:p-6 bg-white border border-gray-200 rounded-md mb-4 hover:shadow-sm transition-shadow gap-4 md:gap-0">
      
      {/* Mobile Trash Button */}
      <button 
        onClick={() => onRemove(item.id)}
        className="md:hidden absolute top-4 right-4 w-8 h-8 flex items-center justify-center bg-gray-100 rounded-full text-gray-500 hover:text-red-500 hover:bg-red-50 transition-colors shrink-0"
        aria-label="Remove from wishlist"
      >
        <Trash2 className="w-4 h-4" />
      </button>

      <div className="flex items-start md:items-center gap-4 sm:gap-6 w-full md:w-auto pr-10 md:pr-0">
        <button 
          onClick={() => onRemove(item.id)}
          className="hidden md:flex w-8 h-8 items-center justify-center bg-gray-100 rounded-full text-gray-500 hover:text-red-500 hover:bg-red-50 transition-colors shrink-0"
          aria-label="Remove from wishlist"
        >
          <Trash2 className="w-4 h-4" />
        </button>
        
        <div className="w-[80px] h-[80px] sm:w-[100px] sm:h-[100px] bg-gray-50 flex items-center justify-center p-2 rounded shrink-0">
          <img 
            src={item.image} 
            alt={item.name} 
            className="w-full h-full object-contain mix-blend-multiply"
          />
        </div>

        <div className="flex flex-col py-1">
          <span onClick={() => navigate(item.slug)} className="text-[13px] sm:text-[14px] font-bold text-gray-900 hover:text-yellow-500 transition-colors cursor-pointer line-clamp-2 md:line-clamp-none">
            {item.name}
          </span>
          <span className="text-[14px] font-bold text-gray-900 mt-1 sm:mt-2">{item.price}</span>
          <div className="flex items-center gap-1.5 text-[10px] sm:text-[11px] text-gray-400 mt-1 sm:mt-2 font-medium uppercase tracking-wider">
            <CalendarDays className="w-3.5 h-3.5" />
            <span>{item.dateAdded}</span>
          </div>
        </div>
      </div>

      <button 
        onClick={handleAddToCart}
        className="w-full md:w-auto bg-[#FFC100] hover:bg-yellow-500 text-black text-[11px] font-bold py-3 sm:py-3.5 px-6 rounded-xs uppercase tracking-wider transition-colors whitespace-nowrap shrink-0 mt-2 md:mt-0 flex items-center justify-center gap-2"
      >
        <ShoppingBag className="w-4 h-4" />
        Add to Bag
      </button>
    </div>
  );
};
export default WishlistItem