import React, { useState, useCallback } from 'react'
import HeaderPage from '../component/headerPage'
import SidebarFilter from '../collections/SidebarFilter'
import HandpickedElegance from '../component/Hero/HandpickedElegance'
import CoreFeatures from '../component/Hero/CoreFeatures'
import { Leaf, Lightbulb, PencilRuler, Recycle, X, SlidersHorizontal, ChevronDown } from 'lucide-react'
import Tags from '../collections/Tags'
import CollectionProduct from '../collections/CollectionProduct'
import { IoGrid } from "react-icons/io5";
import SortDropdown from '../collections/SortDropdown';
import { Button1 } from '../component/Btn/Button1'
import { getProductsApi } from '../API/product-api'
import { getCategoriesApi } from '../api/category-api'
import { useNavigate, useLocation } from "react-router-dom";



const Collection = () => {
  const navigate = useNavigate();
  const location = useLocation();
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [products, setProducts] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [selectedCategoryId, setSelectedCategoryId] = useState(location.state?.categoryId || null);
    const [loading, setLoading] = useState(false);
    const [filters, setFilters] = useState({
      priceRange: [0, 5000],
      brands: [],
      colors: [],
    });

    const fetchProducts = async (currentPage, categoryId, currentFilters = filters, append = false) => {
      try {
        setLoading(true);
        const res = await getProductsApi({
          page: currentPage,
          category: categoryId,
          minPrice: currentFilters.priceRange[0],
          maxPrice: currentFilters.priceRange[1],
          limit: 9
        });
        
        const productsList = res?.data?.products || res?.products || [];
        const totalPagesCount = res?.data?.pagination?.totalPages || res?.pages || 1;

        const transformedProducts = productsList.map(p => ({
          id: p._id,
          name: p.name,
          price: typeof p.price === 'object' ? `$${(p.price?.sellingPrice || 0).toFixed(2)}` : `$${(p.price || 0).toFixed(2)}`,
          image: p.images && p.images.length > 0 ? p.images[0] : "https://via.placeholder.com/300"
        }));

        if (append) {
          setProducts(prev => [...prev, ...transformedProducts]);
        } else {
          setProducts(transformedProducts);
        }
        setTotalPages(totalPagesCount);
      } catch (error) {
        console.error("Fetch Products Error:", error);
      } finally {
        setLoading(false);
      }
    };

    React.useEffect(() => {
      fetchProducts(1, selectedCategoryId, filters);
      setPage(1);
    }, [selectedCategoryId, filters]);

    const handleLoadMore = () => {
      const nextPage = page + 1;
      if (nextPage <= totalPages) {
        fetchProducts(nextPage, selectedCategoryId, filters, true);
        setPage(nextPage);
      }
    };

    const handleFilterChange = useCallback((newFilters) => {
      setFilters(prev => {
        if (JSON.stringify(prev) === JSON.stringify(newFilters)) return prev;
        return newFilters;
      });
    }, []);

    const handleCategorySelect = (id) => {
      setSelectedCategoryId(id);
    };

    const handleProductClick = (id) => {
  navigate(`/product/${id}`);
};

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
];

const coreFeaturesData = {
 
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


  return (
    <div>
    
        <HeaderPage/>

        <div className="p-4 w-full mx-auto">
        <div className='relative z-20 mx-auto'>
          <CollectionProduct 
             onCategorySelect={handleCategorySelect} 
             selectedCategory={selectedCategoryId} 
          />
        </div>

    <div className='flex flex-col lg:flex-row mt-5 relative'>
         
         {/* Mobile Filter Button */}
         <div className='lg:hidden  flex justify-start p-4'>
           <button onClick={() => setIsFilterOpen(true)} className='flex items-center gap-2 font-bold text-lg cursor-pointer hover:text-subtitle transition-colors'>
             <SlidersHorizontal className='w-6 h-6' /> FILTER <ChevronDown className='w-5 h-5' />
           </button>
         </div>

         {/* Mobile Sidebar Overlay */}
         <div 
           className={`fixed inset-0 z-[60] bg-title/50 transition-opacity lg:hidden ${isFilterOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} 
           onClick={() => setIsFilterOpen(false)} 
         />

         {/* Mobile Sidebar Drawer */}
         <div className={`fixed inset-y-0 left-0 z-[70] w-80 max-w-[85vw] bg-white overflow-y-auto transform transition-transform duration-300 ease-in-out lg:hidden ${isFilterOpen ? 'translate-x-0' : '-translate-x-full'} shadow-xl`}>
           <div className="flex justify-between items-center  sticky top-0 bg-white z-999">
            
            
           </div>
           <div className="p-4">
             <SidebarFilter 
               onCategorySelect={handleCategorySelect} 
               selectedCategory={selectedCategoryId}
               onFilterChange={handleFilterChange}
             />
           </div>
         </div>

          <div className='hidden lg:block w-72 shrink-0'>
             <SidebarFilter 
               onCategorySelect={handleCategorySelect} 
               selectedCategory={selectedCategoryId}
               onFilterChange={handleFilterChange}
             />
          </div>
         
         <div className='flex-1 overflow-hidden lg:pl-5'>
          <div className='w-full relative  flex justify-between items-center pl-0 lg:pl-4 mb-6 lg:mb-0'>
            <SortDropdown />
            <div className='flex gap-3 items-center text-subtitle pr-5 lg:pr-5'>
               <button className="bg-black text-background p-2.5 rounded hover:bg-title/90 transition-colors">
                 <IoGrid size={20} className="cursor-pointer" />
               </button>
               {/* <button className="bg-secondary text-body p-2.5 rounded hover:bg-outline transition-colors">
                 <CiBoxList size={22} className="cursor-pointer" />
               </button> */}
            </div>
          </div>
        <HandpickedElegance data={products} itemsPerRow={3} isSlider={false}

        title=''
        subtitle=''
          onProductClick={handleProductClick}

        />
        
         {page < totalPages && (
           <div className="flex justify-center mt-8">
             <Button1 
               variant="primary" 
               text={loading ? "Loading..." : "Load more items"} 
               className="justify-center"
               onClick={handleLoadMore}
               disabled={loading}
             />
           </div>
         )}
         </div>
       </div>

<div className='mt-5'><Tags/></div>
     

       <div className=''>
    
        <CoreFeatures  data={coreFeaturesData}/>
 
       </div>
         <div className=''>
          <h1 className='item-center justify-center text-center text-title'>RECENTLY VIEWED PRODUCTS</h1>
        <HandpickedElegance data={handpickedEleganceData} 
        title=''
        subtitle=''
        />
       </div>
       </div>
    </div>
  )
}

export default Collection