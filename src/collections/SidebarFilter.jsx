import { Filter, Menu, Plus, Trash2 } from 'lucide-react'
import React, { useState, useEffect } from 'react'
import { FaAngleUp } from "react-icons/fa6";
import PriceFilter from './PriceFilter';
import { Button1 } from '../component/Btn/Button1';
import { getCategoriesApi } from "../api/category-api";

const SidebarFilter = ({
  
  initialPriceRange = [0, 270],
  // categories = ['Home Decor', 'Bedroom', 'Outdoor', 'Table & Desks', 'Plant Pots', 'Dining Room', 'Living Room'],
  brands = [{ id: 'nov-minicom', label: 'Nov Minicom', count: 28 }],
  colors = [
    { id: 'mixed-1', style: { background: 'linear-gradient(135deg, #000000 50%, #d4a373 50%)' } },
    { id: 'red', style: { backgroundColor: '#a63a3a' } },
    { id: 'teal', style: { backgroundColor: '#5c9e99' } },
    { id: 'orange', style: { backgroundColor: '#fa8a4f' } },
    { id: 'mixed-2', style: { background: 'linear-gradient(135deg, #d8d8d8 50%, #000000 50%)' } },
    { id: 'white', style: { backgroundColor: '#ffffff' }, extraClass: 'border-2' },
  ],
  moreFiltersList = ['Basket', 'Bedroom', 'Cotton', 'Kitchen', 'Knife', 'Living room'],
  productTypesList = ['Armchairs', 'Basket', 'Desks', 'Knife', 'Nightstands', 'Plant Stands'],
  sizesList = ['Small', 'Medium', 'Large'],
  onFilterChange,
  onCategorySelect,
  selectedCategory
}) => {


  const [categories, setCategories] = useState([]);
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await getCategoriesApi();
        const cats = res?.data?.categories || res?.categories || (Array.isArray(res) ? res : []);
        setCategories(cats);
      } catch (error) {
        console.log(error);
      }
    };

   fetchCategories();
  }, []);

  const [priceRange, setPriceRange] = useState(initialPriceRange);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedMoreFilters, setSelectedMoreFilters] = useState([]);
  const [selectedProductTypes, setSelectedProductTypes] = useState([]);
  const [selectedSizes, setSelectedSizes] = useState([]);

  useEffect(() => {
    if (onFilterChange) {
      onFilterChange({
        priceRange,
        selectedBrands,
        selectedColor,
        selectedMoreFilters,
        selectedProductTypes,
        selectedSizes
      });
    }
  }, [priceRange, selectedBrands, selectedColor, selectedMoreFilters, selectedProductTypes, selectedSizes, onFilterChange]);

  const handleBrandToggle = (id) => {
    setSelectedBrands(prev => 
      prev.includes(id) ? prev.filter(b => b !== id) : [...prev, id]
    );
  };

  const handleMoreFilterToggle = (item) => {
    setSelectedMoreFilters(prev => 
      prev.includes(item) ? prev.filter(f => f !== item) : [...prev, item]
    );
  };

  const handleProductTypeToggle = (type) => {
    setSelectedProductTypes(prev => 
      prev.includes(type) ? prev.filter(t => t !== type) : [...prev, type]
    );
  };
    
  const handleSizeToggle = (size) => {
    setSelectedSizes(prev => 
      prev.includes(size) ? prev.filter(s => s !== size) : [...prev, size]
    );
  };

  const handleClearAll = () => {
    setPriceRange(initialPriceRange);
    setSelectedBrands([]);
    setSelectedColor(null);
    setSelectedMoreFilters([]);
    setSelectedProductTypes([]);
    setSelectedSizes([]);
  };

  const handleResetPrice = () => setPriceRange(initialPriceRange);
  const handleResetBrand = () => setSelectedBrands([]);
  const handleResetColor = () => setSelectedColor(null);

  return (
    <aside className="w-full lg:w-72 pr-0  border-r-0 lg:border-r border-gray-100 pb-10">
      <div>
        <div className='flex items-center text-gray-900 mt-2 lg:mt-10 space-x-2 pb-6 border-b border-gray-200'>
          <Menu/> <h1 className='font-bold text-xl'>CATEGORIES</h1>
        </div>
        <ul className="space-y-1 text-sm font-medium text-gray-700 mt-6">
  <li
    onClick={() => onCategorySelect && onCategorySelect(null)}
    className={`p-3 px-5 rounded cursor-pointer transition ${
      !selectedCategory ? 'bg-black text-white' : 'bg-[#f6f6f6] hover:bg-gray-200'
    }`}
  >
    All Categories
  </li>
  {(Array.isArray(categories) ? categories : []).map((cat) => (
    <li
      key={cat._id}
      onClick={() => onCategorySelect && onCategorySelect(cat._id)}
      className={`p-3 px-5 rounded cursor-pointer transition ${
        selectedCategory === cat._id ? 'bg-black text-white' : 'bg-[#f6f6f6] hover:bg-gray-200'
      }`}
    >
      {cat.title}
    </li>
  ))}
</ul>
      </div>
  
      <div className="mt-8 border-t border-gray-200 pt-8">
        <div className='flex items-center space-x-2 text-gray-900'>
          <Filter/><h1 className='font-bold text-xl'>FILTER BY</h1>
        </div>
        
        <div className="mt-6">
          <Button1 
            variant="primary" 
            text="CLEAR ALL" 
            icon={<Trash2 size={16}/>} 
            className="w-full justify-center"
            onClick={handleClearAll}
          />
        </div>
      </div>

      <div className='mt-8 pt-6 border-t border-gray-200'>
        <div className='flex justify-between items-center'>
            <h1 className='flex items-center text-gray-900 text-sm font-bold gap-2 uppercase'><FaAngleUp/>PRICE</h1>
            <button onClick={handleResetPrice} className='text-[10px] text-gray-400 font-bold hover:text-black uppercase tracking-wider'>RESET</button>
        </div>
        <div className="mt-2">
            <PriceFilter priceRange={priceRange} setPriceRange={setPriceRange} />
        </div>
      </div>

      <div className='mt-8 pt-6 border-t border-gray-200'>
        <div className='flex justify-between items-center'>
            <h1 className='flex items-center text-gray-900 text-sm font-bold gap-2 uppercase'><FaAngleUp/>BRAND</h1>
            <button onClick={handleResetBrand} className='text-[10px] text-gray-400 font-bold hover:text-black uppercase tracking-wider'>RESET</button>
        </div>
        <div className='mt-4 flex flex-col space-y-3'>
          {brands.map(brand => (
            <div key={brand.id} className='flex items-center justify-between'>
              <div className='flex items-center space-x-3'>
                <input 
                  type="checkbox" 
                  className='w-4 h-4 rounded border-gray-300 text-yellow-400 focus:ring-yellow-400 cursor-pointer' 
                  checked={selectedBrands.includes(brand.id)}
                  onChange={() => handleBrandToggle(brand.id)}
                  id={`brand-${brand.id}`}
                />
                <label htmlFor={`brand-${brand.id}`} className='text-gray-600 text-sm cursor-pointer'>{brand.label}</label>
              </div>
              <span className='text-xs text-black'>({brand.count})</span>
            </div>
          ))}
        </div>
      </div>

      <div className='mt-8 pt-6 border-t border-gray-200'>
        <div className='flex justify-between items-center'>
            <h1 className='flex items-center text-gray-900 text-sm font-bold gap-2 uppercase'><FaAngleUp/>COLOR</h1>
            <button onClick={handleResetColor} className='text-[10px] text-gray-400 font-bold hover:text-black uppercase tracking-wider'>RESET</button>
        </div>
        <div className='flex flex-wrap gap-3 mt-5 px-1'>
          {colors.map((color) => (
            <button
              key={color.id}
              onClick={() => setSelectedColor(color.id)}
              className={`w-7 h-7 rounded-full cursor-pointer relative overflow-hidden ring-1 ring-gray-200 transition-transform hover:scale-110 ${selectedColor === color.id ? 'ring-2 ring-black ring-offset-2' : ''} ${color.extraClass || ''}`}
              style={color.style}
              aria-label={`Select color ${color.id}`}
            />
          ))}
        </div>
      </div>

      <div className='mt-8 pt-6 border-t border-gray-200'>
        <h1 className='flex items-center text-gray-900 text-sm font-bold gap-2 uppercase'><FaAngleUp/>MORE FILTERS</h1>
        <div className='flex flex-col text-gray-600 space-y-3 mt-4'>
          {moreFiltersList.map((item) => (
            <div key={item} className='flex items-center space-x-3'>
              <input 
                type="checkbox" 
                id={`filter-${item}`} 
                className='w-4 h-4 rounded border-gray-300 text-yellow-400 focus:ring-yellow-400 cursor-pointer' 
                checked={selectedMoreFilters.includes(item)}
                onChange={() => handleMoreFilterToggle(item)}
              />
              <label htmlFor={`filter-${item}`} className="text-sm cursor-pointer">{item}</label>
            </div>
          ))}
        </div>
      </div>

      <div className='mt-8 pt-6 border-t border-gray-200'>
        <h1 className='flex items-center text-gray-900 text-sm font-bold gap-2 uppercase'><FaAngleUp/>PRODUCT TYPE</h1>
        <div className='flex flex-col text-gray-600 space-y-3 mt-4'>
          {productTypesList.map((type) => (
            <div key={type} className='flex items-center space-x-3'>
              <input 
                type="checkbox" 
                id={`type-${type}`} 
                className='w-4 h-4 rounded border-gray-300 text-yellow-400 focus:ring-yellow-400 cursor-pointer' 
                checked={selectedProductTypes.includes(type)}
                onChange={() => handleProductTypeToggle(type)}
              />
              <label htmlFor={`type-${type}`} className="text-sm cursor-pointer">{type}</label>
            </div>
          ))}
        </div>
      </div>

      <div className='mt-8 pt-6 border-t border-gray-200'>
         <h1 className='flex items-center text-gray-900 text-sm font-bold gap-2 uppercase'><FaAngleUp/>SIZE</h1>
         <div className='grid grid-cols-2 gap-3 mt-4 text-[10px] uppercase font-bold tracking-wider'>
          {sizesList.map((s) => (
            <button 
              key={s} 
              onClick={() => handleSizeToggle(s)}
              className={`border py-2.5 rounded transition-colors cursor-pointer ${
                selectedSizes.includes(s) 
                  ? 'bg-black text-white border-black hover:bg-gray-800' 
                  : 'border-gray-300 hover:bg-brand-hover hover:text-brand-text-hover'
              }`}
            >
              {s}
            </button>
          ))}


         </div>
      </div>
    </aside>
  )
}

export default SidebarFilter