import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FiCalendar, FiMenu, FiUser, FiLogOut, FiX, FiShoppingBag, FiSearch } from 'react-icons/fi';
import { FaPepperHot } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';

const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'Menu', path: '/menu' },
  { name: 'About Us', path: '/about' },
  { name: 'Gallery', path: '/gallery' },
  { name: 'Offers', path: '/offer' },
  { name: 'Contact', path: '/contact' },
];

const Navbar = () => {
  const location = useLocation();
  const { isLoggedIn, user, logout, openLoginModal } = useAuth();
  const { cartCount, setIsCartOpen, setIsSearchOpen } = useCart();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <>
      <nav className="sticky top-0 z-50 bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20 relative">
            
            {/* Logo Section */}
            <div className="md:w-24 lg:w-28 flex-shrink-0 flex items-center justify-start h-full relative z-50">
              <Link to="/" className="flex items-center gap-2 group transition-transform hover:scale-[1.02]">
                <div className="md:absolute md:top-4 lg:top-5 bg-white p-1 rounded-full shadow-lg flex items-center justify-center border-2 border-white relative z-10 w-14 h-14 md:w-20 md:h-20 lg:w-24 lg:h-24">
                  <img src="/logo.jpg" alt="Tikhi Rasoi Logo" className="w-full h-full object-cover rounded-full mix-blend-multiply" />
                </div>
                <div className="flex flex-row md:hidden items-center gap-1.5 ml-1 whitespace-nowrap">
                  <span className="font-heading font-black text-[1.15rem] text-primary uppercase tracking-wider drop-shadow-sm">Tikhi</span>
                  <span className="font-heading font-black text-[1.15rem] text-black uppercase tracking-wider">Rasoi</span>
                </div>
              </Link>
            </div>

            {/* Desktop Navigation Links */}
            <div className="hidden md:flex flex-1 justify-center gap-4 lg:gap-8 xl:gap-10 items-center px-2">
              {navLinks.map((link) => {
                const isActive = location.pathname === link.path;
                return (
                  <Link
                    key={link.name}
                    to={link.path}
                    className={`text-[14px] lg:text-[16px] font-bold font-body transition-colors duration-300 py-2 border-b-[3px] tracking-wide whitespace-nowrap ${
                      isActive
                        ? 'text-primary border-primary'
                        : 'text-black border-transparent hover:text-primary'
                    }`}
                  >
                    {link.name}
                  </Link>
                );
              })}
            </div>

            {/* Right Section (Button + Hamburger) */}
            <div className="flex-shrink-0 flex items-center justify-end gap-3 lg:gap-5">
              
              {/* Always visible on Desktop: Search Button */}
              <button 
                onClick={() => setIsSearchOpen(true)}
                className="hidden md:flex relative text-gray-700 hover:text-primary transition-colors cursor-pointer"
                title="Search Menu"
              >
                <FiSearch className="text-2xl" />
              </button>

              {isLoggedIn ? (
                <div className="hidden md:flex items-center justify-end gap-3 lg:gap-5">
                  <button 
                    onClick={() => setIsCartOpen(true)}
                    className="relative text-gray-700 hover:text-primary transition-colors cursor-pointer"
                  >
                    <FiShoppingBag className="text-2xl" />
                    {cartCount > 0 && (
                      <span className="absolute -top-1 -right-1 bg-primary text-white text-[0.6rem] font-bold w-4 h-4 flex items-center justify-center rounded-full">
                        {cartCount}
                      </span>
                    )}
                  </button>
                  <Link to="/profile" className="flex items-center gap-2 group cursor-pointer border-2 border-transparent hover:border-gold/50 rounded-full transition-all">
                    <img src={user?.profileImage} alt={user?.name} className="w-10 h-10 rounded-full object-cover border border-white/20 shadow-sm group-hover:shadow-md transition-shadow" />
                  </Link>
                  <button 
                    onClick={logout}
                    className="text-gray-500 hover:text-primary transition-colors flex items-center gap-1 text-sm font-semibold border border-gray-200 px-3 py-1.5 rounded-lg hover:border-primary"
                  >
                    <FiLogOut /> Logout
                  </button>
                </div>
              ) : (
                <div className="hidden md:flex items-center justify-end gap-3 lg:gap-5">
                  <button
                    onClick={openLoginModal}
                    className="flex items-center gap-2 bg-primary text-white px-6 py-2.5 rounded-xl text-base font-bold hover:bg-primary-dark transition-colors shadow-lg shadow-primary/30 hover:shadow-primary/50"
                  >
                    <FiUser className="text-xl" />
                    Login
                  </button>
                </div>
              )}
              
              {/* Mobile Menu Button */}
              <button 
                onClick={() => setIsMobileMenuOpen(true)}
                className="md:hidden p-2 text-primary focus:outline-none ml-auto"
              >
                <FiMenu className="text-3xl" />
              </button>
            </div>

          </div>
        </div>
      </nav>

      {/* Full Screen Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[1000] bg-white md:hidden flex flex-col pt-24 pb-8 px-6 overflow-y-auto"
          >
            <button 
              onClick={() => setIsMobileMenuOpen(false)}
              className="absolute top-6 right-6 p-2 text-gray-500 hover:text-primary transition-colors bg-gray-100 rounded-full"
            >
              <FiX className="text-2xl" />
            </button>
            
            <div className="flex flex-col items-center gap-6 mt-8">
              <img src="/logo.jpg" alt="Logo" className="w-24 h-24 rounded-full border-4 border-primary/20 mb-4 shadow-lg" />
              
              {navLinks.map((link) => {
                const isActive = location.pathname === link.path;
                return (
                  <Link
                    key={link.name}
                    to={link.path}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`text-2xl font-heading tracking-widest uppercase transition-colors ${
                      isActive ? 'text-primary' : 'text-gray-800'
                    }`}
                  >
                    {link.name}
                  </Link>
                );
              })}

              <div className="w-full h-[1px] bg-gray-200 my-4"></div>

              {isLoggedIn ? (
                <div className="flex flex-col items-center gap-4 w-full">
                  <div className="text-lg font-semibold flex items-center gap-2 text-gray-800">
                    <FiUser className="text-primary" /> Hi, {user?.name}
                  </div>
                  <button 
                    onClick={() => { logout(); setIsMobileMenuOpen(false); }}
                    className="w-full py-4 text-center text-primary font-bold border border-primary/20 rounded-xl hover:bg-primary/5 transition-colors"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => { openLoginModal(); setIsMobileMenuOpen(false); }}
                  className="w-full bg-primary text-white py-4 rounded-xl text-lg font-bold shadow-lg shadow-primary/30 flex items-center justify-center gap-3"
                >
                  <FiUser className="text-xl" /> Login / Sign Up
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
