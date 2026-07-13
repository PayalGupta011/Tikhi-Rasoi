/* eslint-disable no-unused-vars */
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiCalendar } from 'react-icons/fi';
import { FaLeaf, FaUtensils, FaHandsWash, FaUsers, FaArrowRight } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const sideCards = [
  { title: 'TANDOOR', desc: 'SIZZLING & SPICY', img: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=200&auto=format&fit=crop' },
  { title: 'PIZZA', desc: 'CHEESY & HOT', img: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?q=80&w=200&auto=format&fit=crop' },
  { title: 'CHINESE', desc: 'WOK DELICIOUS', img: 'https://images.unsplash.com/photo-1585032226651-759b368d7246?q=80&w=200&auto=format&fit=crop' },
  { title: 'SHAKES', desc: 'COOL & REFRESHING', img: '/shake.jpg' },
];

const heroImages = [
  'https://images.unsplash.com/photo-1585032226651-759b368d7246?auto=format&fit=crop&w=800&q=80', // Noodles
  'https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=800&q=80', // Paneer
  'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=800&q=80', // Pizza
  'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=800&q=80', // Tandoor
  'https://images.unsplash.com/photo-1574484284002-952d92456975?auto=format&fit=crop&w=800&q=80', // Drink
];

const Hero = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % heroImages.length);
    }, 2000); // Change image every 2 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative bg-background overflow-hidden min-h-[100vh] pt-24 pb-12 lg:pt-0 lg:pb-0 flex items-center">
      {/* Background with smoke/dark texture (simulated with CSS gradients) */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--color-primary-dark)_0%,_var(--color-background)_60%)] opacity-30"></div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
        
        {/* Left Content - Text */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          className="text-center lg:text-left z-10 order-1"
        >
          <p className="text-gold font-heading text-2xl md:text-3xl italic mb-4">Swad ka asli Tadka</p>
          <h1 className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold font-heading text-white tracking-wider mb-2 uppercase drop-shadow-lg whitespace-nowrap">
            Tikhi Rasoi
          </h1>
          <h2 className="text-xl md:text-2xl font-body text-gray-text tracking-widest mb-6 uppercase">
            Pure Veg Café & Restro
          </h2>
          
          <div className="flex items-center justify-center lg:justify-start gap-4 mb-10">
            <div className="h-[1px] w-12 bg-gold"></div>
            <p className="text-primary font-bold tracking-widest text-sm uppercase">Powered By Thunders Cafe</p>
            <div className="h-[1px] w-12 bg-gold"></div>
          </div>

          {/* Features Row */}
          <div className="flex flex-wrap justify-center lg:justify-start gap-6 md:gap-8 mb-12">
            {[
              { icon: FaLeaf, text: '100% PURE VEG' },
              { icon: FaUtensils, text: 'FRESH INGREDIENTS' },
              { icon: FaHandsWash, text: 'HYGIENIC KITCHEN' },
              { icon: FaUsers, text: 'FAMILY FRIENDLY' }
            ].map((feature, idx) => (
              <div key={idx} className="flex flex-col items-center gap-2">
                <div className="w-10 h-10 border border-gray-text/30 rounded-full flex items-center justify-center text-gray-text hover:text-primary hover:border-primary transition-colors">
                  <feature.icon className="text-xl" />
                </div>
                <span className="text-[0.6rem] text-gray-text tracking-wider uppercase font-bold">{feature.text}</span>
              </div>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-6 mt-4">
            <Link to="/contact" className="bg-primary hover:bg-primary-dark text-white px-8 py-4 rounded-full text-lg font-bold transition-all shadow-[0_10px_20px_rgba(181,31,31,0.3)] hover:shadow-[0_15px_30px_rgba(181,31,31,0.5)] hover:-translate-y-1">
              Book a Table
            </Link>
            <Link to="/menu" className="w-full sm:w-auto bg-transparent border-2 border-gold text-white hover:bg-gold hover:text-black px-8 py-4 rounded-xl text-sm font-button font-bold uppercase tracking-widest flex items-center justify-center gap-3 transition-all shadow-[0_0_15px_rgba(212,175,55,0.1)] hover:shadow-[0_0_25px_rgba(212,175,55,0.4)] hover:-translate-y-1 group">
              <FaUtensils className="text-xl text-gold group-hover:text-black transition-colors" />
              View Menu
              <FaArrowRight className="opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300" />
            </Link>
          </div>
        </motion.div>

        {/* Right Content - Premium Framed Image */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2 }}
          className="relative z-10 flex justify-center items-center order-2 lg:ml-4 xl:ml-10 mt-10 lg:mt-0"
        >
          {/* Simple Circular Frame with Soft Glow and 3D Animation */}
          <motion.div 
            animate={{ y: [0, -15, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="relative w-full max-w-[280px] sm:max-w-[320px] md:max-w-md lg:max-w-lg xl:max-w-xl aspect-square rounded-full border-[3px] md:border-[4px] border-gold/80 shadow-[0_0_50px_rgba(212,175,55,0.4)] overflow-hidden bg-black z-10"
          >
            <AnimatePresence mode="wait">
              <motion.img 
                key={currentImageIndex}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
                src={heroImages[currentImageIndex]} 
                alt="Premium Dish" 
                className="absolute inset-0 w-full h-full object-cover"
              />
            </AnimatePresence>
            
            {/* Overlay to give a continuous slow spin effect to the frame/shadows if needed, but crossfade handles the dynamic part nicely */}
          </motion.div>
          
          {/* Floating Image Cards */}
          <div className="absolute -right-4 top-1/2 -translate-y-1/2 flex-col gap-3 hidden lg:flex z-20">
            {sideCards.map((card, idx) => (
              <motion.div 
                key={idx} 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + (idx * 0.2) }}
                className="bg-black/60 backdrop-blur-md border border-gold/30 rounded-lg p-2 flex items-center gap-3 w-52 shadow-[0_0_15px_rgba(212,175,55,0.1)] hover:bg-black/80 hover:border-gold transition-all cursor-pointer group"
              >
                <img src={card.img} alt={card.title} className="w-12 h-12 rounded object-cover border border-white/10 group-hover:scale-110 transition-transform" />
                <div>
                  <h4 className="text-white font-heading font-bold text-sm tracking-wider">{card.title}</h4>
                  <p className="text-gray-400 text-[0.55rem] uppercase tracking-widest">{card.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Hero;
