/* eslint-disable react-hooks/set-state-in-effect, no-unused-vars */
import { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { FaSearch, FaFilter, FaStar, FaRegHeart, FaHeart, FaLeaf, FaUtensils, FaHandsWash, FaUsers, FaClock, FaMedal, FaFire } from 'react-icons/fa';
import { FiCalendar } from 'react-icons/fi';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, FreeMode, Scrollbar } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/scrollbar';

import { menuCategories } from '../constants/menuData';
import { useAuth } from '../context/AuthContext';
import { useFavorites } from '../context/FavoritesContext';

const fallbackImage = 'https://placehold.co/600x400/2a0808/d4af37?text=Delicious+Food';

// An expanded list of highly reliable, diverse food images
const foodImages = [
  'https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=600&q=80', // 0 Tikka
  'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=600&q=80', // 1 Bowl/Main
  'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=600&q=80', // 2 Biryani
  'https://images.unsplash.com/photo-1585032226651-759b368d7246?auto=format&fit=crop&w=600&q=80', // 3 Noodles
  'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=600&q=80', // 4 Pizza
  'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=600&q=80', // 5 Burger
  'https://images.unsplash.com/photo-1551024506-0bccd828d307?auto=format&fit=crop&w=600&q=80', // 6 Dessert
  'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?auto=format&fit=crop&w=600&q=80', // 7 Kabab
  'https://images.unsplash.com/photo-1626700051175-6818013e1d4f?auto=format&fit=crop&w=600&q=80', // 8 Roll
  '/shake.jpg', // 9 Shake
  'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=600&q=80', // 10 Indian Curry (Reliable URL)
  'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=600&q=80', // 11 Indian Grill
  'https://images.unsplash.com/photo-1628294895950-9805252327bc?auto=format&fit=crop&w=600&q=80', // 12 Platter
  'https://images.unsplash.com/photo-1606890737304-57a1ca8a5b62?auto=format&fit=crop&w=600&q=80', // 13 Cake/Dessert
  'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=600&q=80', // 14 Salad/Veg
  'https://images.unsplash.com/photo-1497935586351-b67a49e012bf?auto=format&fit=crop&w=600&q=80', // 15 Coffee
  'https://images.unsplash.com/photo-1536935338788-846bb9981813?auto=format&fit=crop&w=600&q=80', // 16 Mocktail
  'https://images.unsplash.com/photo-1518013431117-eb1465fa5752?auto=format&fit=crop&w=600&q=80', // 17 Nachos/Bites
  'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?auto=format&fit=crop&w=600&q=80', // 18 Pasta
  'https://images.unsplash.com/photo-1612929633738-8fe44f7ec841?auto=format&fit=crop&w=600&q=80', // 19 Maggie/Ramen
];

const getHash = (str) => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  return Math.abs(hash);
};

const getDishDescription = (name) => {
  const lower = name.toLowerCase();
  if (lower.includes('paneer butter masala')) {
    return "Rich, creamy & buttery delightful gravy.";
  }
  if (lower.includes('tikka') || lower.includes('kabab') || lower.includes('chaap')) {
    return "Smoky, succulent tandoori delights grilled with rich spices.";
  }
  if (lower.includes('pizza')) {
    return "Wood-fired crust with rich tomato sauce & melted cheese.";
  }
  if (lower.includes('noodle') || lower.includes('chinese') || lower.includes('manchurian') || lower.includes('rice')) {
    return "Authentic Chinese flavors tossed with fresh garden vegetables.";
  }
  if (lower.includes('burger')) {
    return "Crispy golden patty topped with fresh cheese & signature sauces.";
  }
  if (lower.includes('shake') || lower.includes('mocktail') || lower.includes('coffee')) {
    return "Refreshing blended beverages made with premium flavors.";
  }
  if (lower.includes('maggie')) {
    return "A perfect bowl of comforting noodles cooked with special spices.";
  }
  if (lower.includes('pasta')) {
    return "Creamy and delicious pasta tossed in authentic Italian sauce.";
  }
  if (lower.includes('brownie') || lower.includes('cake') || lower.includes('dessert')) {
    return "Decadent sweet treats cooked to perfection.";
  }
  return "A signature pure veg delicacy cooked with traditional spices.";
};

const getRandomItemDetails = (item, categoryId) => {
  const ratings = ['4.8', '4.7', '4.6', '4.9', '4.5'];
  const reviews = ['(120)', '(98)', '(75)', '(88)', '(110)', '(65)'];
  const spiceLevels = ['Medium', 'Spicy', 'Mild'];
  const prepTimes = ['15-20 Min', '20-25 Min', '25-30 Min', '10-15 Min'];
  
  const hash = getHash(item.name);
  let imgIndex = hash % foodImages.length;
  
  if (categoryId.includes('pizza')) {
    const pizzaImages = [4, 12];
    imgIndex = pizzaImages[hash % pizzaImages.length];
  } else if (categoryId.includes('dessert')) {
    const dessertImages = [6, 13];
    imgIndex = dessertImages[hash % dessertImages.length];
  }

  let imagePath = foodImages[imgIndex];
  if (item.name.toLowerCase() === 'paneer butter masala') {
    imagePath = '/paneerbutter.jpg';
  }

  return {
    image: imagePath,
    rating: ratings[hash % ratings.length],
    reviews: reviews[hash % reviews.length],
    spice: spiceLevels[hash % spiceLevels.length],
    prepTime: prepTimes[hash % prepTimes.length]
  };
};

const subFilters = ['All', 'Bestseller', 'Spicy', 'Most Popular', 'New Arrivals'];

const features = [
  { icon: FaLeaf, text: '100% PURE VEG', desc: 'Only vegetarian food' },
  { icon: FaUtensils, text: 'Fresh Ingredients', desc: 'Handpicked & fresh everyday' },
  { icon: FaHandsWash, text: 'Hygienic Kitchen', desc: 'Clean & safe kitchen' },
  { icon: FaUsers, text: 'Family Friendly', desc: 'Perfect for family & friends' },
  { icon: FaClock, text: 'Fast Service', desc: 'Quick service for you' },
  { icon: FaMedal, text: 'Best Quality', desc: 'Premium taste guaranteed' },
];

import { useCart } from '../context/CartContext';

const MenuItemCard = ({ item }) => {
  const { isLoggedIn, openLoginModal } = useAuth();
  const { cartItems, addToCart, updateQuantity } = useCart();
  const { toggleFavorite, isFavorite } = useFavorites();
  const details = item.details;
  
  // Create a unique id for the cart if not exists
  const productId = item.id || item.name.replace(/\s+/g, '-').toLowerCase();
  
  const cartItem = cartItems.find(i => i.id === productId);
  const quantity = cartItem ? cartItem.quantity : 0;
  const isFav = isFavorite(productId);

  const priceValue = item.price ? parseInt(item.price.replace(/[^0-9]/g, '')) || 0 : (item.full ? parseInt(item.full.replace(/[^0-9]/g, '')) || 0 : 0);

  const handleAdd = () => {
    if (!isLoggedIn) {
      openLoginModal();
      return;
    }
    addToCart({
      id: productId,
      name: item.name,
      price: priceValue,
      image: details.image
    });
  };

  const handleIncrease = () => {
    updateQuantity(productId, quantity + 1);
  };

  const handleDecrease = () => {
    updateQuantity(productId, quantity - 1);
  };

  const handleToggleFav = () => {
    toggleFavorite({
      id: productId,
      name: item.name,
      price: priceValue,
      image: details.image,
      rating: details.rating,
      reviews: details.reviews,
      spice: details.spice,
      categoryId: item.categoryId
    });
  };

  const getBadge = () => {
    if (parseFloat(details.rating) >= 4.8) {
      return { text: 'BESTSELLER', bg: 'bg-[#f2e2cf]', textClass: 'text-[#8c5a2b]' };
    } else if (details.spice === 'Spicy') {
      return { text: 'HOT & SPICY', bg: 'bg-red-100', textClass: 'text-red-700' };
    } else {
      return { text: 'POPULAR', bg: 'bg-blue-100', textClass: 'text-blue-700' };
    }
  };
  const badge = getBadge();

  return (
    <div className="bg-gradient-to-br from-[#ffffff] to-[#f5f6f9] border border-[#e2e2e8] rounded-[2.2rem] p-5 pt-6 flex flex-col group hover:shadow-[0_15px_35px_rgba(0,0,0,0.12)] hover:-translate-y-1 transition-all duration-300 relative overflow-visible mt-6 w-full">
      {/* Absolute Overlapping Image */}
      <div className="absolute -top-6 -left-3 sm:-left-5 w-28 h-28 sm:w-32 sm:h-32 md:w-36 md:h-36 rounded-full overflow-hidden border-4 border-white shadow-[0_8px_25px_rgba(0,0,0,0.12)] z-20 bg-white">
        <img 
          src={details.image} 
          alt={item.name} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          onError={(e) => { e.target.src = fallbackImage; }}
        />
      </div>

      {/* Heart Button */}
      <button 
        onClick={handleToggleFav}
        className={`absolute top-4 right-4 w-9 h-9 sm:w-10 sm:h-10 rounded-full border flex items-center justify-center transition-all cursor-pointer z-30 shadow-sm ${
          isFav 
            ? 'bg-red-50 border-red-200 text-red-500 shadow-[0_0_10px_rgba(239,68,68,0.15)] hover:bg-red-100' 
            : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-50'
        }`}
        title={isFav ? "Remove from favorites" : "Add to favorites"}
      >
        {isFav ? <FaHeart className="text-sm sm:text-base" /> : <FaRegHeart className="text-sm sm:text-base" />}
      </button>

      {/* Top Half Layout */}
      <div className="flex gap-4 min-h-[90px] sm:min-h-[110px] md:min-h-[125px] mb-2">
        {/* Left spacer to clear the overlapping image */}
        <div className="w-[95px] sm:w-[115px] md:w-[130px] flex-shrink-0" />
        
        {/* Right Content */}
        <div className="flex-1 flex flex-col items-start pt-1 sm:pt-2">
          {/* Badge */}
          <div className={`${badge.bg} ${badge.textClass} text-[8px] sm:text-[9px] font-black px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-md uppercase tracking-wider mb-1.5 flex items-center gap-1 w-max`}>
            <span className="text-[6px] sm:text-[7px]">◆</span> {badge.text}
          </div>
          
          {/* Title */}
          <h3 className="font-heading font-black text-gray-900 text-base sm:text-lg md:text-xl leading-tight group-hover:text-primary transition-colors duration-300">
            {item.name}
          </h3>
        </div>
      </div>

      {/* Description */}
      <p className="text-gray-600 text-xs sm:text-sm leading-relaxed mb-4 mt-2 min-h-[36px] line-clamp-2">
        {getDishDescription(item.name)}
      </p>

      {/* Rating & Prep Time Info */}
      <div className="flex items-center gap-3 text-[11px] sm:text-xs text-gray-500 mb-5 border-t border-b border-gray-100 py-3 w-full justify-between">
        <div className="flex items-center gap-1.5">
          <span className="text-[#f5a623] text-sm sm:text-base">★</span>
          <span className="text-gray-800 font-extrabold">{details.rating}</span>
          <span className="text-gray-400 font-normal">{details.reviews}</span>
        </div>
        <span className="text-gray-200">|</span>
        <div className="flex items-center gap-1.5 text-gray-600 font-medium">
          <FaClock className="text-gray-400 text-[11px] sm:text-xs" />
          <span>{details.prepTime || '20-25 Min'}</span>
        </div>
      </div>

      {/* Price & Add Button */}
      <div className="flex justify-between items-center mt-auto pt-1">
        <div className="flex flex-col">
          {item.price ? (
            <span className="text-[#9c1c1c] font-heading font-black text-2xl sm:text-3xl">{item.price}</span>
          ) : (
            <div className="flex gap-3">
              <span className="text-gray-500 text-[9px] flex flex-col font-bold uppercase tracking-wider leading-none">Full <span className="text-[#9c1c1c] font-black text-base sm:text-lg mt-0.5">{item.full}</span></span>
              {item.half && <span className="text-gray-500 text-[9px] flex flex-col font-bold uppercase tracking-wider leading-none">Half <span className="text-gray-700 font-black text-base sm:text-lg mt-0.5">{item.half}</span></span>}
            </div>
          )}
        </div>
        
        {quantity === 0 ? (
          <button 
            onClick={handleAdd}
            className="bg-[#9c1c1c] hover:bg-[#801616] text-white px-5 py-2.5 sm:px-6 sm:py-3 rounded-full text-xs sm:text-sm font-extrabold uppercase tracking-wider transition-all shadow-md shadow-red-900/10 hover:shadow-lg hover:scale-[1.02] cursor-pointer"
          >
            Add +
          </button>
        ) : (
          <div className="flex items-center gap-3 bg-[#9c1c1c] text-white px-3 py-1.5 rounded-full text-sm sm:text-base font-extrabold shadow-md">
            <button onClick={handleDecrease} className="w-6 h-6 sm:w-7 sm:h-7 flex items-center justify-center hover:bg-black/10 rounded-full transition-colors cursor-pointer">-</button>
            <span className="w-4 sm:w-5 text-center">{quantity}</span>
            <button onClick={handleIncrease} className="w-6 h-6 sm:w-7 sm:h-7 flex items-center justify-center hover:bg-black/10 rounded-full transition-colors cursor-pointer">+</button>
          </div>
        )}
      </div>
    </div>
  );
};

const Menu = () => {
  const [activeCategory, setActiveCategory] = useState(menuCategories[0].id);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeSubFilter, setActiveSubFilter] = useState('All');
  const [sortBy, setSortBy] = useState('Popularity');

  const { isLoggedIn, openLoginModal } = useAuth();
  const location = useLocation();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const categoryParam = queryParams.get('category');
    const filterParam = queryParams.get('filter');

    if (categoryParam) {
      setActiveCategory(categoryParam);
      setSearchQuery('');
      setActiveSubFilter('All');
    } else if (location.state && location.state.category) {
      setActiveCategory(location.state.category);
      setSearchQuery('');
      setActiveSubFilter('All');
    }

    if (filterParam) {
      setActiveSubFilter(filterParam);
      setSearchQuery('');
    }
  }, [location.search, location.state]);

  const handleOrderNow = () => {
    if (!isLoggedIn) {
      openLoginModal();
    }
  };

  const currentCategoryData = menuCategories.find(c => c.id === activeCategory);

  const getPriceValue = (item) => {
    if (item.price) return parseInt(item.price.replace(/[^0-9]/g, '')) || 0;
    if (item.full) return parseInt(item.full.replace(/[^0-9]/g, '')) || 0;
    return 0;
  };

  const processedItems = useMemo(() => {
    let itemsToProcess = [];
    
    if (!searchQuery) {
      itemsToProcess = currentCategoryData.items.map((item) => ({
        ...item,
        categoryId: currentCategoryData.id,
        details: getRandomItemDetails(item, currentCategoryData.id)
      }));
    } else {
      const query = searchQuery.toLowerCase();
      menuCategories.forEach(cat => {
        cat.items.forEach((item) => {
          if (item.name.toLowerCase().includes(query)) {
            itemsToProcess.push({
              ...item,
              categoryId: cat.id,
              details: getRandomItemDetails(item, cat.id)
            });
          }
        });
      });
    }

    if (activeSubFilter === 'Spicy') {
      itemsToProcess = itemsToProcess.filter(item => item.details.spice === 'Spicy');
    } else if (activeSubFilter === 'Bestseller' || activeSubFilter === 'Most Popular') {
      itemsToProcess = itemsToProcess.filter(item => parseFloat(item.details.rating) >= 4.7);
    } else if (activeSubFilter === 'New Arrivals') {
      itemsToProcess = itemsToProcess.filter((item) => getHash(item.name) % 2 === 0);
    }

    if (sortBy === 'Price: Low to High') {
      itemsToProcess.sort((a, b) => getPriceValue(a) - getPriceValue(b));
    } else if (sortBy === 'Price: High to Low') {
      itemsToProcess.sort((a, b) => getPriceValue(b) - getPriceValue(a));
    } else if (sortBy === 'Popularity') {
      itemsToProcess.sort((a, b) => parseFloat(b.details.rating) - parseFloat(a.details.rating));
    }

    return itemsToProcess;
  }, [currentCategoryData, searchQuery, activeSubFilter, sortBy]);

  const categoryImages = {
    'tandoor-specials': foodImages[0],
    'soya-chaap': foodImages[11],
    'veg-kabab': foodImages[7],
    'paneer-main-course': foodImages[10],
    'veg-main-course': foodImages[14],
    'chinese': foodImages[3],
    'wood-fire-pizza': foodImages[4],
    'burgers': foodImages[5],
    'wraps-rolls': foodImages[8],
    'quick-bites': foodImages[17],
    'pasta': foodImages[18],
    'maggie': foodImages[19],
    'shakes': foodImages[9],
    'coffee': foodImages[15],
    'mocktails': foodImages[16],
    'rice-biryani': foodImages[2],
    'desserts': foodImages[13],
  };

  return (
    <div className="bg-[#0f0f0f] min-h-screen pb-20 font-body text-white">
      
      {/* Vibrant & Attractive Hero Section */}
      <div className="relative w-full min-h-[calc(100vh-80px)] bg-[#050505] overflow-hidden border-b border-white/10 flex items-center">
        {/* Dynamic Glowing Backgrounds */}
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[radial-gradient(ellipse_at_center,_var(--color-primary)_0%,_transparent_60%)] opacity-20 blur-[80px] rounded-full translate-x-1/4 -translate-y-1/4 pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-gold/10 blur-[100px] rounded-full -translate-x-1/3 translate-y-1/3 pointer-events-none"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full flex flex-col lg:flex-row items-center justify-between gap-10 py-10">
          
          {/* Left: Text & Search */}
          <div className="w-full lg:w-1/2 flex flex-col items-center lg:items-start text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-2 rounded-full mb-6 backdrop-blur-md"
            >
              <span className="text-gold text-lg">✨</span>
              <span className="text-xs font-bold uppercase tracking-widest text-gray-300">Taste the Perfection</span>
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="text-5xl md:text-6xl lg:text-7xl font-heading font-black text-white uppercase tracking-wider mb-3 leading-tight"
            >
              Explore Our <br />
              <span className="text-primary drop-shadow-[0_0_20px_rgba(181,31,31,0.5)]">Menu</span>
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="text-gray-400 text-sm md:text-base mb-8 max-w-lg leading-relaxed"
            >
              Dive into a world of 100% pure vegetarian culinary masterpieces. From sizzling starters to decadent desserts, find your next favorite dish.
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="w-full max-w-md relative group flex gap-3"
            >
              <div className="absolute -inset-1 bg-gradient-to-r from-primary to-gold rounded-full blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
              <div className="relative flex-1 bg-[#111] border-2 border-white/10 rounded-full flex items-center shadow-2xl">
                <FaSearch className="text-gray-500 ml-5 md:ml-6 text-xl flex-shrink-0" />
                <input 
                  type="text" 
                  placeholder="What are you craving today?" 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-transparent border-none py-4 px-4 text-white focus:outline-none placeholder-gray-500 text-sm md:text-base font-medium"
                />
              </div>
            </motion.div>
          </div>

          {/* Right: Floating Food Composition */}
          <div className="w-full lg:w-1/2 flex items-center justify-center mt-12 lg:mt-0">
            {/* Tightly packed composition container */}
            <div className="relative w-[300px] h-[300px] md:w-[380px] md:h-[380px] lg:w-[420px] lg:h-[420px]">
              
              {/* Floating Side Dish 1 (Top Left - Behind) */}
              <motion.div 
                animate={{ y: [-8, 8, -8] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-0 left-0 z-20 w-32 h-32 md:w-40 md:h-40 lg:w-[180px] lg:h-[180px] rounded-full border-[3px] md:border-[4px] border-primary/80 shadow-[0_0_30px_rgba(181,31,31,0.5)] overflow-hidden bg-black"
              >
                <img src={foodImages[4]} alt="Pizza" className="w-full h-full object-cover" />
              </motion.div>

              {/* Center Main Dish (Middle Layer) */}
              <motion.div 
                initial={{ scale: 0, rotate: -20, opacity: 0 }}
                animate={{ scale: 1, rotate: 0, opacity: 1, y: [-5, 5, -5] }}
                transition={{ 
                  default: { duration: 1.2, ease: "easeOut" },
                  y: { duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }
                }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 w-44 h-44 md:w-56 md:h-56 lg:w-[280px] lg:h-[280px] rounded-full border-[4px] md:border-[5px] border-gold/80 shadow-[0_0_50px_rgba(212,175,55,0.5)] overflow-hidden bg-black"
              >
                <img src={foodImages[9]} alt="Shake" className="w-full h-full object-cover" />
                <div className="absolute inset-0 rounded-full shadow-[inset_0_0_40px_rgba(0,0,0,0.6)] pointer-events-none"></div>
              </motion.div>

              {/* Floating Side Dish 2 (Bottom Right - Front) */}
              <motion.div 
                animate={{ y: [8, -8, 8] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute bottom-0 right-0 z-40 w-36 h-36 md:w-48 md:h-48 lg:w-[200px] lg:h-[200px] rounded-full border-[3px] md:border-[4px] border-gold/60 shadow-[0_0_30px_rgba(212,175,55,0.5)] overflow-hidden bg-black"
              >
                <img src={foodImages[3]} alt="Noodles" className="w-full h-full object-cover" />
              </motion.div>

              {/* Floating Badges */}
              <motion.div 
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-10 -right-4 md:right-0 lg:-right-10 z-50 bg-green-500/20 backdrop-blur-md border border-green-500/50 text-white font-bold text-xs md:text-sm lg:text-base uppercase px-4 py-2 md:px-5 md:py-2.5 rounded-full shadow-[0_0_25px_rgba(34,197,94,0.5)] flex items-center gap-2"
              >
                <FaLeaf className="text-green-500 text-sm lg:text-lg" /> Pure Veg
              </motion.div>
              
              <motion.div 
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
                className="absolute bottom-10 -left-4 md:left-0 lg:-left-10 z-50 bg-gold/20 backdrop-blur-md border border-gold/50 text-white font-bold text-xs md:text-sm lg:text-base uppercase px-4 py-2 md:px-5 md:py-2.5 rounded-full shadow-[0_0_25px_rgba(212,175,55,0.5)] flex items-center gap-2"
              >
                <FaStar className="text-gold text-sm lg:text-lg" /> Best Taste
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-8 mt-8 relative z-20">
        
        <style>{`
          .continuous-swiper .swiper-wrapper {
            transition-timing-function: linear !important;
          }
          .swiper-scrollbar {
            background: rgba(255,255,255,0.1) !important;
            bottom: 0px !important;
            height: 4px !important;
            border-radius: 10px;
          }
          .swiper-scrollbar-drag {
            background: #b51f1f !important;
          }
        `}</style>
        <div className="bg-[#151515] border border-white/10 rounded-2xl p-4 shadow-2xl mb-10 relative pb-8">
          <Swiper
            modules={[Autoplay, FreeMode, Scrollbar]}
            slidesPerView={'auto'}
            spaceBetween={20}
            freeMode={true}
            loop={true}
            speed={4000}
            grabCursor={true}
            scrollbar={{ draggable: true, hide: false, dragSize: 80 }}
            autoplay={{
              delay: 0,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            className="continuous-swiper"
            style={{ paddingBottom: '20px' }}
          >
            {menuCategories.map((cat) => (
              <SwiperSlide key={cat.id} style={{ width: 'auto' }}>
                <button
                  onClick={() => { setActiveCategory(cat.id); setSearchQuery(''); setActiveSubFilter('All'); }}
                  className={`flex flex-col items-center min-w-[100px] gap-3 p-3 rounded-2xl transition-all ${
                    activeCategory === cat.id && !searchQuery
                      ? 'bg-primary/10 border border-primary text-white shadow-[0_0_15px_rgba(181,31,31,0.2)] scale-105' 
                      : 'border border-transparent hover:bg-white/5 text-gray-400 hover:text-white'
                  }`}
                >
                  <div className={`w-20 h-20 rounded-full overflow-hidden border-2 bg-[#2a2a2a] flex items-center justify-center ${activeCategory === cat.id && !searchQuery ? 'border-primary' : 'border-transparent'}`}>
                    <img 
                      src={categoryImages[cat.id] || fallbackImage} 
                      alt={cat.title} 
                      className="w-full h-full object-cover"
                      onError={(e) => { e.target.src = fallbackImage; }}
                    />
                  </div>
                  <span className="text-xs font-bold uppercase tracking-wider text-center leading-tight max-w-[90px]">
                    {cat.title}
                  </span>
                </button>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-10">
          
          <div className="lg:col-span-3">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-5 mb-8">
              <div className="flex flex-wrap gap-3">
                {subFilters.map(filter => (
                  <button 
                    key={filter}
                    onClick={() => setActiveSubFilter(filter)}
                    className={`px-5 py-2 rounded-full text-sm font-bold tracking-wider transition-colors border ${
                      activeSubFilter === filter 
                        ? 'bg-primary border-primary text-white shadow-lg shadow-primary/20' 
                        : 'bg-transparent border-white/20 text-gray-400 hover:border-white/50 hover:text-white'
                    }`}
                  >
                    {filter}
                  </button>
                ))}
              </div>
              <div className="flex items-center gap-3 text-sm font-bold text-gray-400 tracking-wider">
                Sort By: 
                <select 
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-[#151515] border border-white/20 rounded-full px-4 py-1.5 text-white focus:outline-none focus:border-gold cursor-pointer hover:border-white/50 transition-colors"
                >
                  <option value="Popularity">Popularity</option>
                  <option value="Price: Low to High">Price: Low to High</option>
                  <option value="Price: High to Low">Price: High to Low</option>
                </select>
              </div>
            </div>

            <div className="flex items-center gap-4 mb-8">
              <h2 className="text-3xl font-heading font-bold text-white flex items-center gap-3">
                {searchQuery ? (
                  <>🔍 Search Results</>
                ) : (
                  <>
                    {currentCategoryData.icon}{' '}
                    {activeSubFilter === 'All' 
                      ? currentCategoryData.title 
                      : `${activeSubFilter} in ${currentCategoryData.title}`}
                  </>
                )}
              </h2>
              <div className="h-[1px] flex-1 bg-gradient-to-r from-gold/50 to-transparent"></div>
              {!searchQuery && <p className="text-xs text-gray-500 uppercase tracking-widest font-bold hidden md:block">Authentic flavors from our kitchen</p>}
            </div>

            <AnimatePresence mode="wait">
              <motion.div 
                key={searchQuery ? 'search' : activeCategory + activeSubFilter + sortBy}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-1 md:grid-cols-2 gap-6"
              >
                {processedItems.length > 0 ? processedItems.map((item, idx) => (
                  <MenuItemCard key={`${item.name}-${idx}`} item={item} />
                )) : (
                  <div className="col-span-2 text-center py-24 text-gray-500 bg-[#151515] rounded-3xl border border-white/5">
                    <FaUtensils className="text-5xl text-gray-600 mx-auto mb-5" />
                    <p className="text-lg">No dishes found matching your criteria.</p>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
            
          </div>

          <div className="lg:col-span-1 space-y-8">
            <div className="sticky top-24 space-y-6">
              
              <div className="bg-gradient-to-br from-[#3a0a0a] to-[#1a0505] rounded-3xl border border-primary/30 p-6 relative overflow-hidden shadow-[0_0_30px_rgba(181,31,31,0.15)] group cursor-pointer">
                <div className="absolute top-0 right-0 w-40 h-40 bg-primary/20 blur-3xl rounded-full"></div>
                
                <p className="text-gold font-heading italic text-sm mb-3 flex items-center gap-2">
                  ✨ Today's Special ✨
                </p>
                <h3 className="text-3xl font-heading font-bold text-white mb-3 leading-tight">Malai Paneer Tikka</h3>
                <div className="flex items-center gap-1.5 text-gold text-sm font-bold mb-4">
                  <FaStar /> 4.9 <span className="text-gray-400 font-normal">(150+)</span>
                </div>
                
                <span className="bg-black/50 text-gold font-bold px-4 py-1.5 rounded-lg text-xl inline-block mb-4 border border-gold/20">₹239</span>
                
                <p className="text-sm text-gray-400 leading-relaxed mb-6 max-w-[200px]">
                  Soft & creamy paneer tikka marinated with rich malai and aromatic spices.
                </p>
                
                <button 
                  onClick={handleOrderNow}
                  className="bg-primary hover:bg-primary-dark text-white px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-colors flex items-center gap-2 w-max shadow-lg shadow-primary/30"
                >
                  Order Now &rarr;
                </button>

                <img 
                  src={foodImages[0]} 
                  alt="Special" 
                  className="absolute -right-12 bottom-8 w-48 h-48 object-cover rounded-full shadow-2xl border-[5px] border-[#2a0808] group-hover:scale-110 transition-transform duration-700 bg-black"
                />
                
                <div className="absolute bottom-4 right-4 bg-green-600/90 text-white text-[0.6rem] font-bold px-2.5 py-1.5 rounded-full flex items-center gap-1.5 uppercase tracking-wider shadow-lg">
                  <span className="w-2 h-2 rounded-full bg-white"></span> Pure Veg
                </div>
              </div>

              <Link to="/contact" className="block bg-[#151515] border border-white/10 rounded-3xl p-6 text-center hover:border-gold/50 transition-colors group">
                <FiCalendar className="text-4xl text-gold mx-auto mb-3 group-hover:scale-110 transition-transform" />
                <h3 className="text-xl font-heading font-bold text-white mb-2">Book Your Table</h3>
                <p className="text-sm text-gray-400 mb-4">Perfect for family dinners & special celebrations.</p>
                <div className="flex justify-center gap-3 text-[0.65rem] text-gray-500 font-bold uppercase tracking-wider mb-6">
                  <span>🍽️ Dine In</span>
                  <span>🎉 Party</span>
                  <span>🛍️ Takeaway</span>
                </div>
                <button className="w-full bg-primary hover:bg-primary-dark text-white px-4 py-3 rounded-xl text-sm font-bold uppercase tracking-wider transition-colors">
                  Reserve Now &rarr;
                </button>
              </Link>

              <Link to="/offer" className="block bg-white rounded-3xl p-6 relative overflow-hidden text-black border border-gray-200 group cursor-pointer hover:shadow-xl">
                <div className="relative z-10">
                  <h3 className="text-4xl font-heading font-bold text-primary mb-2">20% OFF</h3>
                  <p className="text-xs font-bold uppercase tracking-wider mb-3">On Family Combo</p>
                  <span className="bg-primary text-white text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wider mb-4 inline-block">Limited Time!</span>
                  <br/>
                  <button className="bg-black text-white px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider group-hover:bg-gold group-hover:text-black transition-colors mt-2 shadow-lg">
                    View Offers &rarr;
                  </button>
                </div>
                <img 
                  src={foodImages[5]} 
                  alt="Combo" 
                  className="absolute -right-8 -bottom-8 w-36 h-36 object-cover rounded-full shadow-2xl border-[5px] border-white group-hover:scale-110 transition-transform duration-500 bg-gray-200"
                />
              </Link>

            </div>
          </div>

        </div>
      </div>

      <div className="border-t border-white/10 mt-20 pt-16 pb-12 bg-[#0a0a0a]">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
            {features.map((feature, idx) => (
              <div key={idx} className="flex flex-col items-center text-center group">
                <div className="w-14 h-14 rounded-full border border-gray-800 flex items-center justify-center text-gold mb-4 group-hover:border-primary group-hover:text-primary transition-colors">
                  <feature.icon className="text-2xl" />
                </div>
                <h4 className="text-[0.7rem] font-bold text-white uppercase tracking-wider mb-2">{feature.text}</h4>
                <p className="text-xs text-gray-500 max-w-[120px]">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

    </div>
  );
};

export default Menu;
