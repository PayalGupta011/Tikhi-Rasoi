import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiSearch, FiX, FiArrowRight } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { menuCategories } from '../../constants/menuData';

const SearchModal = () => {
  const { isSearchOpen, setIsSearchOpen } = useCart();
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const inputRef = useRef(null);
  const navigate = useNavigate();

  // Combine all menu items into one array for searching
  const allItems = menuCategories.flatMap(cat => 
    cat.items.map(item => ({
      ...item,
      categoryName: cat.title,
      image: cat.image
    }))
  );

  useEffect(() => {
    if (isSearchOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
      document.body.style.overflow = 'hidden';
    } else {
      setSearchQuery('');
      setSuggestions([]);
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isSearchOpen]);

  useEffect(() => {
    if (searchQuery.trim().length > 0) {
      const query = searchQuery.toLowerCase();
      const filtered = allItems.filter(item => 
        item.name.toLowerCase().includes(query)
      ).slice(0, 5); // Limit to top 5 suggestions
      setSuggestions(filtered);
    } else {
      setSuggestions([]);
    }
  }, [searchQuery]);

  const handleSelect = (item) => {
    setIsSearchOpen(false);
    // Navigate to menu and perhaps in the future we can pass a query param or highlight it
    navigate('/menu'); 
  };

  return (
    <AnimatePresence>
      {isSearchOpen && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[1000] flex flex-col items-center pt-20 px-4 bg-background/95 backdrop-blur-md"
        >
          <button 
            onClick={() => setIsSearchOpen(false)}
            className="absolute top-6 right-6 p-3 bg-white/10 hover:bg-white/20 text-white rounded-full transition-colors"
          >
            <FiX className="text-2xl" />
          </button>

          <div className="w-full max-w-2xl relative">
            <div className="relative flex items-center">
              <FiSearch className="absolute left-6 text-2xl text-gray-400" />
              <input
                ref={inputRef}
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for paneer, biryani, pizza..."
                className="w-full bg-white/5 border border-white/20 text-white text-xl md:text-2xl rounded-full py-5 pl-16 pr-8 focus:outline-none focus:border-gold transition-colors shadow-2xl"
              />
            </div>

            {searchQuery.trim().length > 0 && (
              <motion.div 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute top-full left-0 w-full mt-4 bg-[#111] border border-white/10 rounded-3xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
              >
                {suggestions.length > 0 ? (
                  <ul>
                    {suggestions.map((item, idx) => (
                      <li key={idx}>
                        <button 
                          onClick={() => handleSelect(item)}
                          className="w-full text-left flex items-center justify-between p-4 px-6 hover:bg-white/5 border-b border-white/5 transition-colors group"
                        >
                          <div className="flex items-center gap-4">
                            <img src={item.image} alt={item.name} className="w-12 h-12 rounded-full object-cover border border-white/10" />
                            <div>
                              <p className="text-white font-bold text-lg group-hover:text-gold transition-colors">{item.name}</p>
                              <p className="text-gray-500 text-sm">{item.categoryName}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-4">
                            <span className="text-white font-bold font-heading">
                              {item.price ? item.price : `Full: ${item.full}`}
                            </span>
                            <FiArrowRight className="text-gray-600 group-hover:text-gold transition-colors" />
                          </div>
                        </button>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div className="p-8 text-center text-gray-500">
                    <p className="text-lg">No dishes found matching "{searchQuery}"</p>
                    <p className="text-sm mt-2">Try searching for something else!</p>
                  </div>
                )}
              </motion.div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SearchModal;
