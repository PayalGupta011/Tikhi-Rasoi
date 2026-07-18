import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { FaHeart, FaRegHeart, FaStar, FaFileAlt, FaUsers, FaLeaf, FaPepperHot, FaClock } from 'react-icons/fa';
import { FiArrowLeft, FiShoppingCart, FiX } from 'react-icons/fi';
import { useFavorites } from '../context/FavoritesContext';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

const fallbackImage = 'https://placehold.co/600x400/2a0808/d4af37?text=Delicious+Food';

// Vector food illustrations for floating elements
const ChiliVector = () => (
  <svg viewBox="0 0 100 100" className="w-10 h-10 drop-shadow-[0_8px_16px_rgba(239,68,68,0.5)]">
    <path 
      d="M75,15 C65,15 50,30 40,45 C30,60 15,70 20,80 C25,90 40,85 55,75 C70,65 80,45 80,25 Z" 
      fill="url(#chili-grad-fav-new-3)" 
    />
    <path d="M72,18 C64,22 53,35 44,48" fill="none" stroke="#ff8585" strokeWidth="2" strokeLinecap="round" opacity="0.6" />
    <path d="M75,15 C78,10 82,8 85,5" fill="none" stroke="#2b6b2a" strokeWidth="4" strokeLinecap="round" />
    <defs>
      <linearGradient id="chili-grad-fav-new-3" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#ff4d4d" />
        <stop offset="100%" stopColor="#b30000" />
      </linearGradient>
    </defs>
  </svg>
);

const BasilVector = () => (
  <svg viewBox="0 0 100 100" className="w-8 h-8 drop-shadow-[0_8px_16px_rgba(34,197,94,0.4)]">
    <path 
      d="M50,15 C20,35 25,75 50,85 C75,75 80,35 50,15 Z" 
      fill="url(#basil-grad-fav-new-3)" 
    />
    <path d="M50,15 L50,85" fill="none" stroke="#1d4d1d" strokeWidth="2" opacity="0.5" />
    <defs>
      <linearGradient id="basil-grad-fav-new-3" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#4ade80" />
        <stop offset="100%" stopColor="#15803d" />
      </linearGradient>
    </defs>
  </svg>
);

const OnionVector = () => (
  <svg viewBox="0 0 100 100" className="w-8 h-8 drop-shadow-[0_8px_16px_rgba(216,180,254,0.4)]">
    <ellipse cx="50" cy="50" rx="40" ry="22" fill="none" stroke="#a855f7" strokeWidth="8" />
    <ellipse cx="50" cy="50" rx="35" ry="17" fill="none" stroke="#f3e8ff" strokeWidth="2" opacity="0.7" />
  </svg>
);

const TomatoVector = () => (
  <svg viewBox="0 0 100 100" className="w-10 h-10 drop-shadow-[0_8px_16px_rgba(239,68,68,0.4)]">
    <circle cx="50" cy="50" r="45" fill="#ef4444" stroke="#991b1b" strokeWidth="3" />
    <circle cx="50" cy="50" r="38" fill="#fca5a5" opacity="0.4" />
    <circle cx="50" cy="50" r="32" fill="#ef4444" />
    <circle cx="38" cy="38" r="8" fill="#b91c1c" />
  </svg>
);

const Favorites = () => {
  const navigate = useNavigate();
  const { favorites, toggleFavorite, isFavorite } = useFavorites();
  const { cartItems, addToCart, updateQuantity, setIsCartOpen } = useCart();
  const { isLoggedIn, openLoginModal } = useAuth();

  const [searchQuery, setSearchQuery] = useState('');
  const [isHovered, setIsHovered] = useState(false);
  const [selectedDish, setSelectedDish] = useState(null);
  const [modalQuantity, setModalQuantity] = useState(1);
  const [selectedSpice, setSelectedSpice] = useState('Medium');
  
  const favoritesCount = favorites.length;

  const handleCardClick = (dish) => {
    setSelectedDish(dish);
    setModalQuantity(1);
    setSelectedSpice('Medium');
  };

  const getDishDescription = (name) => {
    if (name.toLowerCase().includes('pizza')) {
      return "Authentic wood-fired sourdough crust topped with rich San Marzano tomato sauce, melted mozzarella, roasted capsicum, and premium spiced paneer tikka cubes.";
    }
    if (name.toLowerCase().includes('noodle')) {
      return "Wok-tossed hand-pulled noodles stir-fried with garden-fresh spring vegetables, garlic, ginger, and a savory blend of house special sauces.";
    }
    if (name.toLowerCase().includes('bowl') || name.toLowerCase().includes('salad')) {
      return "A high-protein wholesome blend of organic garden greens, spiced chickpeas, fresh avocado slices, cottage cheese, and olive oil dressing.";
    }
    return "A signature vegetarian masterpiece prepared with handpicked local ingredients, cooked to perfection with traditional Indian spices and herbs.";
  };

  const handleAddToCartAndOrder = () => {
    if (!isLoggedIn) {
      openLoginModal();
      return;
    }
    addToCart({
      id: selectedDish.id,
      name: selectedDish.name,
      price: selectedDish.price,
      image: selectedDish.image
    });
    if (modalQuantity > 1) {
      updateQuantity(selectedDish.id, modalQuantity);
    }
    setSelectedDish(null);
    setIsCartOpen(true); // Automatically slide open the cart drawer!
  };

  const recommendations = [
    {
      id: 'paneer-tikka-pizza-rec',
      name: 'Paneer Tikka Pizza',
      image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?q=80&w=300&auto=format&fit=crop',
      price: 279,
      rating: 5,
      reviews: '120',
      spice: 'Spicy'
    },
    {
      id: 'veg-delight-bowl-rec',
      name: 'Veg Delight Bowl',
      image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=300&auto=format&fit=crop',
      price: 199,
      rating: 5,
      reviews: '95',
      spice: 'Medium'
    },
    {
      id: 'hakka-noodles-rec',
      name: 'Hakka Noodles',
      image: 'https://images.unsplash.com/photo-1585032226651-759b368d7246?q=80&w=300&auto=format&fit=crop',
      price: 189,
      rating: 5,
      reviews: '110',
      spice: 'Spicy'
    }
  ];

  // Dynamic content mapping for the 3 fanning cards
  const cardData = [
    {
      id: favorites.length > 1 ? favorites[1].id : 'rec-card-1',
      name: favorites.length > 1 ? favorites[1].name : 'Veg Delight Bowl',
      image: favorites.length > 1 ? favorites[1].image : 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=400&auto=format&fit=crop',
      price: favorites.length > 1 ? favorites[1].price : 199,
      rating: favorites.length > 1 ? (favorites[1].rating || 4.9) : 5,
      isReal: favorites.length > 1
    },
    {
      id: favorites.length > 2 ? favorites[2].id : 'rec-card-2',
      name: favorites.length > 2 ? favorites[2].name : 'Hakka Noodles',
      image: favorites.length > 2 ? favorites[2].image : 'https://images.unsplash.com/photo-1585032226651-759b368d7246?q=80&w=400&auto=format&fit=crop',
      price: favorites.length > 2 ? favorites[2].price : 189,
      rating: favorites.length > 2 ? (favorites[2].rating || 4.8) : 5,
      isReal: favorites.length > 2
    },
    {
      id: favorites.length > 0 ? favorites[0].id : 'rec-card-main',
      name: favorites.length > 0 ? favorites[0].name : 'Paneer Tikka Pizza',
      image: favorites.length > 0 ? favorites[0].image : 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?q=80&w=600&auto=format&fit=crop',
      price: favorites.length > 0 ? favorites[0].price : 279,
      rating: favorites.length > 0 ? (favorites[0].rating || 4.9) : 5,
      isReal: favorites.length > 0
    }
  ];

  // Filter actual favorites based on search query
  const filteredFavorites = favorites.filter(item => 
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="bg-[#0f0f0f] min-h-screen pb-20 font-body text-white relative overflow-hidden">
      
      {/* VIBRANT HERO SECTION (Matching Home & Menu page styles) */}
      <div className="relative w-full min-h-[calc(100vh-80px)] bg-[#050505] overflow-hidden border-b border-white/10 flex items-center pt-24 lg:pt-0">
        
        {/* Dynamic Glowing Backgrounds */}
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[radial-gradient(ellipse_at_center,_var(--color-primary)_0%,_transparent_60%)] opacity-20 blur-[80px] rounded-full translate-x-1/4 -translate-y-1/4 pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-gold/10 blur-[100px] rounded-full -translate-x-1/3 translate-y-1/3 pointer-events-none"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full flex flex-col lg:flex-row items-center justify-between gap-10 py-10">
          
          {/* Left Column: Text & Search */}
          <div className="w-full lg:w-1/2 flex flex-col items-center lg:items-start text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-gold/15 via-gold/5 to-transparent border-l-2 border-gold pl-4 py-1.5 mb-6"
            >
              <span className="text-red-500 text-xs">❤️</span>
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-gold-soft">Your Handpicked Selection</span>
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-5xl lg:text-6xl font-heading text-white tracking-wide mb-6 leading-tight flex flex-col items-center lg:items-start"
            >
              <span className="font-light tracking-widest text-gray-400 text-3xl md:text-4xl uppercase">Collection of</span>
              <span className="font-serif italic font-normal text-gold text-5xl md:text-6xl lg:text-7xl lowercase my-1">my favorite</span>
              <span className="font-black uppercase tracking-wider text-primary text-5xl md:text-6xl lg:text-7xl drop-shadow-[0_0_25px_rgba(230,57,70,0.45)]">Dishes</span>
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="text-gray-300 font-light text-sm md:text-base mb-8 max-w-md leading-relaxed border-l-2 border-white/5 pl-4 text-justify lg:text-left"
            >
              A curated selection of 100% pure vegetarian culinary masterpieces, saved with love. Easily search through your favorites, add them directly to your cart, or continue exploring the rich flavors of our kitchen.
            </motion.p>
            
            {/* Search or Explore Buttons */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="w-full max-w-md flex flex-col sm:flex-row gap-4"
            >
              {favoritesCount > 0 ? (
                <div className="relative w-full group">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-gold to-primary rounded-xl blur opacity-20 group-focus-within:opacity-50 transition duration-300"></div>
                  <div className="relative bg-[#141416]/95 border border-white/10 rounded-xl flex items-center transition-all p-1.5 focus-within:border-gold/60 w-full">
                    <span className="text-gray-500 ml-3 text-lg">🔍</span>
                    <input 
                      type="text" 
                      placeholder="Search saved dishes..." 
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full bg-transparent border-none py-2 px-3 text-white focus:outline-none placeholder-gray-500 text-sm font-medium"
                    />
                    <button className="bg-gradient-to-r from-gold to-gold-soft text-black text-[10px] font-black px-4 py-2 rounded-lg uppercase tracking-wider transition-colors hover:bg-white cursor-default flex-shrink-0">
                      Filter
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex flex-wrap gap-4 justify-center lg:justify-start w-full">
                  <button 
                    onClick={() => navigate('/menu')}
                    className="bg-primary hover:bg-red-700 text-white px-8 py-3.5 rounded-xl text-xs font-bold uppercase tracking-widest transition-all shadow-[0_8px_25px_rgba(230,57,70,0.3)] hover:-translate-y-0.5 cursor-pointer"
                  >
                    Explore Menu
                  </button>
                  <Link 
                    to="/menu" 
                    className="border-2 border-white/10 hover:border-gold/60 hover:text-gold text-white px-8 py-3.5 rounded-xl text-xs font-bold uppercase tracking-widest transition-all flex items-center gap-2 hover:-translate-y-0.5"
                  >
                    <FiArrowLeft className="text-base" /> Back to Menu
                  </Link>
                </div>
              )}
            </motion.div>
          </div>

          {/* Right Column: Unique 3D Stacked Recipe Cards (Interactive Fan-out) */}
          <div className="w-full lg:w-1/2 flex items-center justify-center mt-16 lg:mt-0">
            <div 
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              className="relative w-full h-[400px] flex items-center justify-center cursor-pointer select-none"
            >
              
              {/* Backglow behind the stack */}
              <div className="absolute w-72 h-72 bg-gradient-to-r from-primary/10 to-gold/10 rounded-full filter blur-3xl opacity-60"></div>

              {/* CARD 1 (Fanning Out to Left) */}
              <motion.div 
                animate={
                  isHovered 
                    ? { x: -130, y: 15, rotate: -20, scale: 0.95, opacity: 1 } 
                    : { x: -35, y: 10, rotate: -8, scale: 0.9, opacity: 0.85 }
                }
                transition={{ type: "spring", stiffness: 180, damping: 20 }}
                onClick={() => handleCardClick(cardData[0])}
                className="absolute w-48 h-64 bg-[#141416]/95 border border-white/10 rounded-2xl p-3 shadow-2xl backdrop-blur-md z-10 flex flex-col hover:border-gold/50 transition-colors"
              >
                <div className="relative w-full h-40 rounded-xl overflow-hidden mb-3 bg-black/40">
                  <img src={cardData[0].image} alt={cardData[0].name} className="w-full h-full object-cover" />
                </div>
                <h4 className="text-white font-bold text-[13px] truncate leading-tight">{cardData[0].name}</h4>
                <div className="flex justify-between items-center mt-auto">
                  <span className="text-gold font-bold text-xs">₹{cardData[0].price}</span>
                  <div className="flex gap-0.5 text-gold text-[8px]">
                    {[...Array(5)].map((_, i) => <FaStar key={i} />)}
                  </div>
                </div>
              </motion.div>

              {/* CARD 2 (Fanning Out to Right) */}
              <motion.div 
                animate={
                  isHovered 
                    ? { x: 130, y: 15, rotate: 20, scale: 0.95, opacity: 1 } 
                    : { x: 35, y: 10, rotate: 8, scale: 0.9, opacity: 0.85 }
                }
                transition={{ type: "spring", stiffness: 180, damping: 20 }}
                onClick={() => handleCardClick(cardData[1])}
                className="absolute w-48 h-64 bg-[#141416]/95 border border-white/10 rounded-2xl p-3 shadow-2xl backdrop-blur-md z-20 flex flex-col hover:border-gold/50 transition-colors"
              >
                <div className="relative w-full h-40 rounded-xl overflow-hidden mb-3 bg-black/40">
                  <img src={cardData[1].image} alt={cardData[1].name} className="w-full h-full object-cover" />
                </div>
                <h4 className="text-white font-bold text-[13px] truncate leading-tight">{cardData[1].name}</h4>
                <div className="flex justify-between items-center mt-auto">
                  <span className="text-gold font-bold text-xs">₹{cardData[1].price}</span>
                  <div className="flex gap-0.5 text-gold text-[8px]">
                    {[...Array(5)].map((_, i) => <FaStar key={i} />)}
                  </div>
                </div>
              </motion.div>

              {/* CARD 3 (Center Main Card - Top of stack) */}
              <motion.div 
                animate={
                  isHovered 
                    ? { x: 0, y: -25, rotate: 0, scale: 1.05 } 
                    : { x: 0, y: 0, rotate: -2, scale: 1 }
                }
                transition={{ type: "spring", stiffness: 180, damping: 20 }}
                onClick={() => handleCardClick(cardData[2])}
                className="absolute w-52 h-72 bg-[#18181c] border-2 border-gold rounded-2xl p-3.5 shadow-[0_20px_50px_rgba(212,175,55,0.25)] z-30 flex flex-col hover:scale-105 transition-transform"
              >
                <div className="relative w-full h-44 rounded-xl overflow-hidden mb-3 bg-black/40">
                  <img src={cardData[2].image} alt={cardData[2].name} className="w-full h-full object-cover" />
                  <div className="absolute top-2 right-2 bg-black/60 rounded-full p-1.5 border border-red-500/20 text-red-500 animate-pulse">
                    <FaHeart className="text-xs" />
                  </div>
                </div>
                <h4 className="text-white font-bold text-[14px] truncate leading-tight">{cardData[2].name}</h4>
                <div className="flex justify-between items-center mt-auto">
                  <span className="text-gold font-bold text-sm">₹{cardData[2].price}</span>
                  <div className="flex gap-0.5 text-gold text-[9px]">
                    {[...Array(5)].map((_, i) => <FaStar key={i} />)}
                  </div>
                </div>
              </motion.div>

              {/* Interactive Badges with offset positions */}
              <motion.div 
                animate={{ y: [-5, 5, -5] }}
                transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-4 -right-2 z-40 bg-red-500/20 backdrop-blur-md border border-red-500/50 text-white font-bold text-[10px] sm:text-xs uppercase px-3 py-1.5 rounded-full shadow-[0_0_20px_rgba(239,68,68,0.4)] flex items-center gap-1.5"
              >
                <FaHeart className="text-red-500 animate-pulse" /> My List
              </motion.div>
              
              <motion.div 
                animate={{ y: [5, -5, 5] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute bottom-6 -left-2 z-40 bg-gold/20 backdrop-blur-md border border-gold/50 text-white font-bold text-[10px] sm:text-xs uppercase px-3 py-1.5 rounded-full shadow-[0_0_20px_rgba(212,175,55,0.4)] flex items-center gap-1.5"
              >
                <FaLeaf className="text-green-500" /> 100% Veg
              </motion.div>

              {/* Floating vector embellishments orbiting the cards stack */}
              <div className="absolute top-2 left-1/4 z-40 pointer-events-none animate-bounce"><ChiliVector /></div>
              <div className="absolute bottom-4 left-1/3 z-40 pointer-events-none"><BasilVector /></div>
              <div className="absolute top-1/2 -right-6 z-40 pointer-events-none"><OnionVector /></div>
              <div className="absolute bottom-12 -left-8 z-40 pointer-events-none"><TomatoVector /></div>
            </div>
          </div>
        </div>
      </div>

      {/* SECTION: FAVORITES GRID OR EMPTY STATE */}
      <div className="max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-8 mt-12 relative z-20">
        
        {favoritesCount > 0 ? (
          // Display Saved Favorites list
          <div className="space-y-8">
            <div className="flex items-center gap-4">
              <h2 className="text-3xl font-heading font-bold text-white flex items-center gap-3">
                ❤️ Saved Culinary Delights
              </h2>
              <div className="h-[1px] flex-1 bg-gradient-to-r from-gold/50 to-transparent"></div>
              <p className="text-xs text-gray-500 uppercase tracking-widest font-bold hidden md:block">Your personal recipe book</p>
            </div>

            <AnimatePresence mode="popLayout">
              {filteredFavorites.length > 0 ? (
                <motion.div 
                  layout
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                >
                  {filteredFavorites.map((item) => {
                    const productId = item.id;
                    const cartItem = cartItems.find(c => c.id === productId);
                    const quantity = cartItem ? cartItem.quantity : 0;

                    return (
                      <motion.div 
                        layout
                        key={item.id}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8, y: 30 }}
                        transition={{ type: "spring", stiffness: 500, damping: 30 }}
                        className="bg-gradient-to-br from-[#ffffff] to-[#f5f6f9] border border-[#e2e2e8] rounded-[2.2rem] p-5 pt-6 flex flex-col group hover:shadow-[0_15px_35px_rgba(0,0,0,0.12)] hover:-translate-y-1 transition-all duration-300 relative overflow-visible mt-6 w-full"
                      >
                        {/* Absolute Overlapping Image */}
                        <div 
                          onClick={() => handleCardClick(item)}
                          className="absolute -top-6 -left-3 sm:-left-5 w-28 h-28 sm:w-32 sm:h-32 md:w-36 md:h-36 rounded-full overflow-hidden border-4 border-white shadow-[0_8px_25px_rgba(0,0,0,0.12)] z-20 bg-white cursor-pointer"
                        >
                          <img 
                            src={item.image || fallbackImage} 
                            alt={item.name} 
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            onError={(e) => { e.target.src = fallbackImage; }}
                          />
                        </div>

                        {/* Heart Button */}
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleFavorite(item);
                          }}
                          className="absolute top-4 right-4 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white border border-gray-200 text-red-500 shadow-[0_0_10px_rgba(239,68,68,0.15)] hover:bg-red-50 flex items-center justify-center transition-all cursor-pointer z-30"
                          title="Remove from favorites"
                        >
                          <FaHeart className="text-sm sm:text-base" />
                        </button>

                        {/* Top Half Layout */}
                        <div className="flex gap-4 min-h-[90px] sm:min-h-[110px] md:min-h-[125px] mb-2">
                          {/* Left spacer to clear the overlapping image */}
                          <div className="w-[95px] sm:w-[115px] md:w-[130px] flex-shrink-0" />
                          
                          {/* Right Content */}
                          <div className="flex-1 flex flex-col items-start pt-1 sm:pt-2">
                            {/* Badge */}
                            {(() => {
                              const ratingVal = parseFloat(item.rating || '4.8');
                              const isSpicy = item.spice === 'Spicy';
                              const badgeText = ratingVal >= 4.8 ? 'BESTSELLER' : (isSpicy ? 'HOT & SPICY' : 'POPULAR');
                              const badgeBg = ratingVal >= 4.8 ? 'bg-[#f2e2cf]' : (isSpicy ? 'bg-red-100' : 'bg-blue-100');
                              const badgeTextClass = ratingVal >= 4.8 ? 'text-[#8c5a2b]' : (isSpicy ? 'text-red-700' : 'text-blue-700');
                              
                              return (
                                <div className={`${badgeBg} ${badgeTextClass} text-[8px] sm:text-[9px] font-black px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-md uppercase tracking-wider mb-1.5 flex items-center gap-1 w-max`}>
                                  <span className="text-[6px] sm:text-[7px]">◆</span> {badgeText}
                                </div>
                              );
                            })()}
                            
                            {/* Title */}
                            <h3 
                              onClick={() => handleCardClick(item)}
                              className="font-heading font-black text-gray-900 text-base sm:text-lg md:text-xl leading-tight group-hover:text-primary transition-colors duration-300 cursor-pointer"
                            >
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
                            <span className="text-gray-800 font-extrabold">{item.rating || '4.8'}</span>
                            <span className="text-gray-400 font-normal">{item.reviews || '(120)'}</span>
                          </div>
                          <span className="text-gray-200">|</span>
                          <div className="flex items-center gap-1.5 text-gray-600 font-medium">
                            <FaClock className="text-gray-400 text-[11px] sm:text-xs" />
                            <span>{item.prepTime || '20-25 Min'}</span>
                          </div>
                        </div>

                        {/* Price & Add Button */}
                        <div className="flex justify-between items-center mt-auto pt-1">
                          <div className="flex flex-col">
                            <span className="text-[#9c1c1c] font-heading font-black text-2xl sm:text-3xl">₹{item.price}</span>
                          </div>
                          
                          {quantity === 0 ? (
                            <button 
                              onClick={() => handleCardClick(item)}
                              className="bg-[#9c1c1c] hover:bg-[#801616] text-white px-5 py-2.5 sm:px-6 sm:py-3 rounded-full text-xs sm:text-sm font-extrabold uppercase tracking-wider transition-all shadow-md shadow-red-900/10 hover:shadow-lg hover:scale-[1.02] cursor-pointer flex items-center gap-1.5"
                            >
                              <FiShoppingCart className="text-xs sm:text-sm" /> Add +
                            </button>
                          ) : (
                            <div className="flex items-center gap-3 bg-[#9c1c1c] text-white px-3 py-1.5 rounded-full text-sm sm:text-base font-extrabold shadow-md">
                              <button onClick={() => updateQuantity(productId, quantity - 1)} className="w-6 h-6 sm:w-7 sm:h-7 flex items-center justify-center hover:bg-black/10 rounded-full transition-colors cursor-pointer">-</button>
                              <span className="w-4 sm:w-5 text-center">{quantity}</span>
                              <button onClick={() => updateQuantity(productId, quantity + 1)} className="w-6 h-6 sm:w-7 sm:h-7 flex items-center justify-center hover:bg-black/10 rounded-full transition-colors cursor-pointer">+</button>
                            </div>
                          )}
                        </div>
                      </motion.div>
                    );
                  })}
                </motion.div>
              ) : (
                <div className="text-center py-20 bg-[#151515] rounded-3xl border border-white/5">
                  <p className="text-lg text-gray-500">No saved dishes matching "{searchQuery}" found.</p>
                </div>
              )}
            </AnimatePresence>
          </div>
        ) : (
          // Display Mockup-Matched Empty State Recommendations & Bottom Stats Panel
          <div className="space-y-16">
            
            {/* Recommendations Grid */}
            <div>
              <div className="flex items-center justify-center gap-4 mb-10">
                <div className="h-[1px] w-12 bg-gradient-to-r from-transparent to-gold"></div>
                <h2 className="text-xs font-bold uppercase tracking-[0.25em] text-white flex items-center gap-2">
                  <span>➤</span> YOU MIGHT LOVE THESE <span>⮞</span>
                </h2>
                <div className="h-[1px] w-12 bg-gradient-to-l from-transparent to-gold"></div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {recommendations.map((item) => {
                  const isFav = isFavorite(item.id);
                  const cartItem = cartItems.find(c => c.id === item.id);
                  const quantity = cartItem ? cartItem.quantity : 0;

                  return (
                    <div 
                      key={item.id} 
                      onClick={() => handleCardClick(item)}
                      className="bg-[#121214] border border-white/5 rounded-2xl p-4 flex gap-4 items-center relative overflow-hidden transition-all shadow-lg hover:border-gold/30 hover:shadow-[0_0_20px_rgba(212,175,55,0.08)] group cursor-pointer"
                    >
                      {/* Heart Top-Right */}
                      <button 
                        onClick={(e) => {
                          e.stopPropagation(); // Stop parent click
                          toggleFavorite(item);
                        }}
                        className={`absolute top-3.5 right-3.5 w-8 h-8 rounded-full flex items-center justify-center transition-colors cursor-pointer z-10 ${
                          isFav ? 'text-red-500 bg-red-500/10' : 'text-gray-500 hover:text-white bg-black/40'
                        }`}
                      >
                        <FaHeart className="text-sm" />
                      </button>

                      {/* Image */}
                      <div className="w-24 h-24 rounded-xl overflow-hidden bg-black/50 flex-shrink-0">
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                      </div>

                      {/* Content Info */}
                      <div className="flex-1 min-w-0">
                        <h4 className="text-white font-bold text-sm mb-1 truncate">{item.name}</h4>
                        
                        {/* 5 Stars */}
                        <div className="flex gap-0.5 text-gold text-[10px] mb-3">
                          {[...Array(5)].map((_, idx) => (
                            <FaStar key={idx} />
                          ))}
                        </div>

                        <div className="flex justify-between items-center">
                          <span className="text-gold font-bold text-base">₹{item.price}</span>
                          
                          {quantity === 0 ? (
                            <button 
                              onClick={(e) => {
                                e.stopPropagation(); // Stop parent click
                                handleCardClick(item);
                              }}
                              className="bg-primary/10 border border-primary/50 hover:bg-primary text-white text-[9px] font-bold px-3 py-1.5 rounded-lg uppercase tracking-wider transition-colors flex items-center gap-1 cursor-pointer"
                            >
                              <FiShoppingCart /> Add
                            </button>
                          ) : (
                            <div className="flex items-center gap-2 bg-primary text-white px-2 py-1 rounded text-[10px] font-bold" onClick={(e) => e.stopPropagation()}>
                              <button onClick={() => updateQuantity(item.id, quantity - 1)} className="w-4 h-4 flex items-center justify-center hover:bg-black/20 rounded-full transition-colors cursor-pointer">-</button>
                              <span className="w-3 text-center">{quantity}</span>
                              <button onClick={() => updateQuantity(item.id, quantity + 1)} className="w-4 h-4 flex items-center justify-center hover:bg-black/20 rounded-full transition-colors cursor-pointer">+</button>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Bottom Metrics Bar */}
            <div className="bg-[#121214]/80 backdrop-blur-md border border-white/5 rounded-3xl p-5 md:p-6 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
              
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-4 justify-between items-center">
                
                {/* Metric 1: Favorites */}
                <div className="flex items-center gap-4 border-r border-white/5 last:border-0 pl-2 lg:pl-6">
                  <div className="w-12 h-12 rounded-2xl bg-red-600/10 border border-red-500/30 flex items-center justify-center text-red-500 shadow-[0_0_15px_rgba(239,68,68,0.25)] flex-shrink-0">
                    <FaHeart className="text-xl" />
                  </div>
                  <div>
                    <span className="block text-2xl font-black text-white leading-none mb-1 font-heading">{favoritesCount}</span>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-gray-500 block">Favorites Saved</span>
                  </div>
                </div>

                {/* Metric 2: Menu Items */}
                <div className="flex items-center gap-4 border-r border-white/5 last:border-0 pl-2 lg:pl-6">
                  <div className="w-12 h-12 rounded-2xl bg-gold/10 border border-gold/30 flex items-center justify-center text-gold shadow-[0_0_15px_rgba(212,175,55,0.25)] flex-shrink-0">
                    <FaFileAlt className="text-xl" />
                  </div>
                  <div>
                    <span className="block text-2xl font-black text-white leading-none mb-1 font-heading">120+</span>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-gray-500 block">Menu Items</span>
                  </div>
                </div>

                {/* Metric 3: Rating */}
                <div className="flex items-center gap-4 border-r border-white/5 last:border-0 pl-2 lg:pl-6">
                  <div className="w-12 h-12 rounded-2xl bg-gold/10 border border-gold/30 flex items-center justify-center text-gold shadow-[0_0_15px_rgba(212,175,55,0.25)] flex-shrink-0">
                    <FaStar className="text-xl" />
                  </div>
                  <div>
                    <span className="block text-2xl font-black text-white leading-none mb-1 font-heading">4.9</span>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-gray-500 block">Customer Rating</span>
                  </div>
                </div>

                {/* Metric 4: Happy Customers */}
                <div className="flex items-center gap-4 last:border-0 pl-2 lg:pl-6">
                  <div className="w-12 h-12 rounded-2xl bg-red-600/10 border border-red-500/30 flex items-center justify-center text-red-500 shadow-[0_0_15px_rgba(239,68,68,0.25)] flex-shrink-0">
                    <FaUsers className="text-xl" />
                  </div>
                  <div>
                    <span className="block text-2xl font-black text-white leading-none mb-1 font-heading">500+</span>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-gray-500 block">Happy Customers</span>
                  </div>
                </div>

              </div>
            </div>

          </div>
        )}

      </div>

      {/* FOOD DETAILS MODAL */}
      <AnimatePresence>
        {selectedDish && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedDish(null)}
              className="absolute inset-0 bg-black/80 backdrop-blur-md"
            ></motion.div>

            {/* Modal Content Box */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 30 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="relative bg-[#141416] border border-white/10 rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl z-10"
            >
              {/* Close Button */}
              <button 
                onClick={() => setSelectedDish(null)}
                className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/60 border border-white/10 hover:border-gold hover:text-gold text-white flex items-center justify-center transition-all cursor-pointer z-50"
              >
                <FiX className="text-xl" />
              </button>

              <div className="grid grid-cols-1 md:grid-cols-2">
                {/* Left Side: Image */}
                <div className="relative h-64 md:h-full bg-black">
                  <img 
                    src={selectedDish.image || fallbackImage} 
                    alt={selectedDish.name} 
                    className="w-full h-full object-cover"
                    onError={(e) => { e.target.src = fallbackImage; }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                  
                  {/* Veg tag */}
                  <div className="absolute top-4 left-4 bg-green-600/90 backdrop-blur-sm text-white text-[10px] font-bold px-3 py-1.5 rounded flex items-center gap-1.5 uppercase tracking-wider">
                    <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse"></span>
                    Pure Veg
                  </div>

                  {/* Spice Badge */}
                  <div className="absolute bottom-4 left-4 bg-red-600/90 backdrop-blur-sm text-white text-[10px] font-bold px-3 py-1.5 rounded flex items-center gap-1 uppercase tracking-wider">
                    <FaPepperHot /> {selectedSpice}
                  </div>
                </div>

                {/* Right Side: Details & Actions */}
                <div className="p-6 md:p-8 flex flex-col justify-between">
                  <div>
                    <h3 className="font-heading font-black text-white text-2xl md:text-3xl uppercase tracking-wider mb-2 leading-tight">
                      {selectedDish.name}
                    </h3>
                    
                    {/* Stars Rating */}
                    <div className="flex items-center gap-1 text-gold text-sm mb-4">
                      {[...Array(5)].map((_, i) => <FaStar key={i} />)}
                      <span className="text-gray-400 text-xs ml-2">(4.9 customer rating)</span>
                    </div>

                    <p className="text-gray-400 font-light text-xs md:text-sm leading-relaxed mb-6">
                      {getDishDescription(selectedDish.name)}
                    </p>

                    {/* Customize Spice Level */}
                    <div className="mb-6">
                      <span className="block text-[10px] font-black uppercase tracking-wider text-gray-500 mb-2">Adjust Spice Level</span>
                      <div className="flex gap-2">
                        {['Mild', 'Medium', 'Spicy'].map((level) => (
                          <button
                            key={level}
                            onClick={() => setSelectedSpice(level)}
                            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer border ${
                              selectedSpice === level 
                                ? 'bg-gold text-black border-gold shadow-[0_0_15px_rgba(212,175,55,0.3)]' 
                                : 'bg-[#1e1e21] text-gray-400 border-white/5 hover:text-white hover:border-white/20'
                            }`}
                          >
                            {level}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Quantity Selector */}
                    <div className="mb-8">
                      <span className="block text-[10px] font-black uppercase tracking-wider text-gray-500 mb-2">Select Quantity</span>
                      <div className="flex items-center gap-4 bg-[#1e1e21] border border-white/5 rounded-xl px-4 py-2 w-max">
                        <button 
                          onClick={() => setModalQuantity(Math.max(1, modalQuantity - 1))}
                          className="w-8 h-8 rounded-lg hover:bg-black/20 flex items-center justify-center font-bold text-gray-400 hover:text-white transition-colors cursor-pointer text-lg"
                        >
                          -
                        </button>
                        <span className="font-bold text-white w-6 text-center text-sm">{modalQuantity}</span>
                        <button 
                          onClick={() => setModalQuantity(modalQuantity + 1)}
                          className="w-8 h-8 rounded-lg hover:bg-black/20 flex items-center justify-center font-bold text-gray-400 hover:text-white transition-colors cursor-pointer text-lg"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Pricing and Main CTA */}
                  <div className="pt-4 border-t border-white/5 flex items-center justify-between gap-4">
                    <div>
                      <span className="block text-[10px] font-bold uppercase tracking-wider text-gray-500">Total Price</span>
                      <span className="text-gold font-bold text-2xl">₹{selectedDish.price * modalQuantity}</span>
                    </div>
                    
                    <button
                      onClick={handleAddToCartAndOrder}
                      className="flex-1 bg-gradient-to-r from-primary to-red-700 hover:from-red-700 hover:to-primary text-white font-bold text-xs uppercase tracking-widest py-4 px-6 rounded-2xl transition-all shadow-[0_8px_25px_rgba(230,57,70,0.35)] hover:scale-[1.02] cursor-pointer flex items-center justify-center gap-2"
                    >
                      <FiShoppingCart className="text-base" /> Add & Order
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Favorites;
