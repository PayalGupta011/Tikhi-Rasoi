/* eslint-disable no-unused-vars */
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiHome, FiSearch, FiHeart, FiUser } from 'react-icons/fi';
import { FaUtensils } from 'react-icons/fa';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';

const MobileNav = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { setIsSearchOpen } = useCart();
  const { isLoggedIn, openLoginModal } = useAuth();

  const navItems = [
    { name: 'Home', path: '/', icon: FiHome, action: 'link' },
    { name: 'Search', path: '/search-action', icon: FiSearch, action: 'search' },
    { name: 'Menu', path: '/menu', icon: FaUtensils, action: 'link' },
    { name: 'Favorites', path: '/favorites', icon: FiHeart, action: 'link' },
    { name: 'Profile', path: '/profile', icon: FiUser, action: 'profile' },
  ];

  const handleNavClick = (e, item) => {
    if (item.action === 'search') {
      e.preventDefault();
      setIsSearchOpen(true);
    } else if (item.action === 'profile') {
      if (!isLoggedIn) {
        e.preventDefault();
        openLoginModal();
      }
      // If logged in, let the Link naturally navigate to /profile
    }
  };

  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 w-[95%] max-w-[400px] h-16 bg-[#18181b] rounded-full flex justify-between items-center px-2 z-[900] md:hidden shadow-[0_10px_40px_rgba(0,0,0,0.8)] border border-white/5">
      {navItems.map((item) => {
        const isActive = location.pathname === item.path && item.action === 'link' || (item.action === 'profile' && location.pathname === '/profile');
        
        const handleItemClick = (e) => {
          if (item.action === 'search') {
            setIsSearchOpen(true);
          } else if (item.action === 'profile') {
            if (!isLoggedIn) {
              openLoginModal();
            } else {
              navigate('/profile');
            }
          } else {
            navigate(item.path);
          }
        };

        return (
          <button 
            key={item.name} 
            onClick={handleItemClick}
            className="relative w-16 h-full flex flex-col items-center justify-center z-10 focus:outline-none"
          >
            {isActive && (
              <motion.div
                layoutId="activeBubble"
                className="absolute -top-6 w-14 h-14 bg-gradient-to-tr from-gold to-yellow-500 rounded-full border-[5px] border-background shadow-[0_10px_20px_rgba(212,175,55,0.4)] z-0"
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
              />
            )}
            
            <motion.div
              animate={{ y: isActive ? -24 : 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className={`relative z-10 text-[1.4rem] ${isActive ? 'text-black' : 'text-gray-400'}`}
            >
              <item.icon />
            </motion.div>
            
            <motion.span 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: isActive ? 1 : 0, y: isActive ? 8 : 15 }}
              transition={{ duration: 0.2 }}
              className="absolute bottom-2 text-[0.6rem] font-bold text-gold uppercase tracking-widest pointer-events-none"
            >
              {item.name}
            </motion.span>
          </button>
        );
      })}
    </div>
  );
};

export default MobileNav;
