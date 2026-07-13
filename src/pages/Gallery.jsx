/* eslint-disable no-unused-vars */
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  FaThLarge, FaBuilding, FaGlassCheers, FaUtensils, 
  FaUsers, FaCamera, FaHeart, FaBirthdayCake, 
  FaUserTie, FaMugHot, FaTimes
} from 'react-icons/fa';
import { FiPhoneCall } from 'react-icons/fi';

const categories = [
  { id: 'all', name: 'All', icon: FaThLarge },
  { id: 'restaurant', name: 'Restaurant', icon: FaBuilding },
  { id: 'ambience', name: 'Ambience', icon: FaGlassCheers },
  { id: 'customers', name: 'Customers', icon: FaUsers },
  { id: 'bts', name: 'Behind Scenes', icon: FaCamera },
  { id: 'instagram', name: 'Instagram', icon: FaHeart },
];

const SectionHeader = ({ title, subtitle }) => (
  <div className="flex flex-col md:flex-row md:justify-between items-start md:items-end border-b border-white/10 pb-4 mb-8 mt-20 gap-2">
    <div className="flex items-center gap-4">
      <h2 className="text-2xl md:text-3xl font-bold font-heading uppercase tracking-widest text-white drop-shadow-md">{title}</h2>
      <div className="h-[2px] w-12 md:w-20 bg-gradient-to-r from-gold to-transparent"></div>
    </div>
    <p className="text-sm md:text-base text-gray-400 font-medium tracking-wide">{subtitle}</p>
  </div>
);

const GalleryImage = ({ src, alt, title }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <>
      {!isLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-[#111] animate-pulse z-10 rounded-xl">
          <div className="w-10 h-10 border-2 border-gold/30 border-t-gold rounded-full animate-spin"></div>
        </div>
      )}
      <img 
        src={src} 
        alt={alt} 
        loading="lazy"
        onLoad={() => setIsLoaded(true)}
        className={`w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500"></div>
      
      {/* Decorative Border on Hover */}
      <div className="absolute inset-4 border border-gold/0 group-hover:border-gold/30 transition-colors duration-500 rounded-lg pointer-events-none scale-105 group-hover:scale-100 ease-out"></div>
      
      {title && isLoaded && (
        <div className="absolute bottom-6 left-6 text-white font-bold text-sm md:text-base tracking-widest uppercase drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] opacity-0 group-hover:opacity-100 transition-opacity duration-500 translate-y-2 group-hover:translate-y-0">
          {title}
        </div>
      )}
    </>
  );
};

const ImageSection = ({ title, subtitle, images, onOpenModal }) => {
  const displayImages = images.slice(0, 5);
  const hasMore = images.length > 5;

  return (
    <div className="mb-20">
      <SectionHeader title={title} subtitle={subtitle} />
      
      {/* 200px Uniform Grid */}
      <div className="flex flex-wrap gap-4 md:gap-6">
        {displayImages.map((src, idx) => {
          const isLast = idx === 4 && hasMore;
          
          return (
            <div 
              key={idx} 
              className="relative w-[150px] h-[150px] md:w-[200px] md:h-[200px] rounded-xl overflow-hidden group cursor-pointer shadow-lg shadow-black/50 shrink-0" 
              onClick={isLast ? () => onOpenModal(images, title) : undefined}
            >
              <GalleryImage src={src} alt={`${title} ${idx}`} title={!isLast ? `View ${title}` : ''} />
              
              {isLast && (
                <div className="absolute inset-0 bg-black/70 backdrop-blur-md flex flex-col items-center justify-center cursor-pointer rounded-xl hover:bg-black/80 transition-colors z-20 group border border-white/5">
                  <span className="text-white text-3xl font-light mb-1">+{images.length - 4}</span>
                  <span className="text-gold text-xs font-bold uppercase tracking-[0.2em] group-hover:scale-105 transition-transform duration-500">View All</span>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

const Gallery = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [modalData, setModalData] = useState({ isOpen: false, images: [], title: '' });

  const sectionsData = [
    {
      id: 'restaurant',
      title: "Our Restaurant",
      subtitle: "Step inside and feel the vibe",
      images: [
        'https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&w=1000&q=80',
        'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1544148103-0773bf10d330?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1000&q=80',
        'https://images.unsplash.com/photo-1537047902294-62a40c20a6ae?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1525648199074-bee30ba3d027?auto=format&fit=crop&w=800&q=80'
      ]
    },
    {
      id: 'ambience',
      title: "Ambience & Interior",
      subtitle: "Where every corner tells a story",
      images: [
        'https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=1000&q=80',
        'https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1563298723-dcfebaa392e3?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1600565193348-f74bd3c7ccdf?auto=format&fit=crop&w=1000&q=80',
        'https://images.unsplash.com/photo-1572490122747-3968b75bf699?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&w=800&q=80'
      ]
    },
    {
      id: 'customers',
      title: "Customer Moments",
      subtitle: "Loved by you, cherished by us",
      images: [
        'https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&w=1000&q=80',
        'https://images.unsplash.com/photo-1573164713988-8665fc963095?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1528605248644-14dd04022da1?auto=format&fit=crop&w=1000&q=80',
        'https://images.unsplash.com/photo-1511988617509-a57c8a288659?auto=format&fit=crop&w=800&q=80'
      ]
    },
    {
      id: 'bts',
      title: "Behind The Scene",
      subtitle: "Passion. Preparation. Perfection.",
      images: [
        'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&w=1000&q=80',
        'https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1600565193348-f74bd3c7ccdf?auto=format&fit=crop&w=1000&q=80',
        'https://images.unsplash.com/photo-1563298723-dcfebaa392e3?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1572490122747-3968b75bf699?auto=format&fit=crop&w=800&q=80'
      ]
    },
    {
      id: 'instagram',
      title: "Instagram Feed",
      subtitle: <a href="https://www.instagram.com/tikhi_rasoi_/?hl=en" target="_blank" rel="noopener noreferrer" className="hover:text-gold transition-colors">Follow us @tikhi_rasoi_ to get featured!</a>,
      images: [
        'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1606890737304-57a1ca8a5b62?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1497935586351-b67a49e012bf?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80'
      ]
    }
  ];

  const filteredSections = activeTab === 'all' 
    ? sectionsData 
    : sectionsData.filter(section => section.id === activeTab);

  return (
    <div className="bg-[#050505] min-h-screen font-body text-white pb-20 selection:bg-gold selection:text-black">
      
      {/* Immersive Hero Section */}
      <div className="relative h-[60vh] md:h-[70vh] bg-black overflow-hidden flex items-center justify-center">
        {/* Deep parallax background */}
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=2000&q=80" 
            alt="Tikhi Rasoi Ambient Background" 
            className="w-full h-full object-cover opacity-40 scale-105"
            style={{ filter: 'brightness(0.6) contrast(1.2)' }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-[#050505]"></div>
          {/* Subtle noise/texture overlay could go here */}
        </div>
        
        <div className="relative z-10 text-center px-4 w-full max-w-4xl mx-auto flex flex-col items-center">
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="flex items-center gap-4 mb-4"
          >
            <div className="h-[1px] w-8 md:w-16 bg-gold"></div>
            <h3 className="text-gold font-bold tracking-[0.3em] uppercase text-xs md:text-sm">Explore Our World</h3>
            <div className="h-[1px] w-8 md:w-16 bg-gold"></div>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="text-5xl md:text-8xl font-black font-heading uppercase tracking-widest mb-6 leading-none drop-shadow-[0_0_30px_rgba(181,31,31,0.4)] text-white"
          >
            The <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-red-500 to-gold">Gallery</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="text-gray-300 font-light text-sm md:text-lg max-w-2xl mx-auto tracking-wide leading-relaxed"
          >
            Immerse yourself in the extraordinary moments, culinary perfection, and the luxurious ambience of Tikhi Rasoi.
          </motion.p>
        </div>
      </div>

      {/* Glassmorphism Categories Nav */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20 -mt-10">
        <div className="bg-[#111111]/80 backdrop-blur-xl rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] p-2 md:p-3 flex overflow-x-auto no-scrollbar gap-2 md:gap-4 items-center justify-between border border-white/10 relative overflow-hidden">
          {/* Subtle gradient glow behind nav */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-full bg-gold/5 blur-3xl rounded-full"></div>
          
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveTab(cat.id)}
              className={`flex flex-col items-center justify-center min-w-[75px] md:min-w-[100px] p-3 md:p-4 rounded-xl transition-all duration-300 relative z-10 ${
                activeTab === cat.id 
                  ? 'bg-gradient-to-br from-gold to-yellow-600 text-black shadow-[0_0_20px_rgba(201,164,76,0.4)]' 
                  : 'text-gray-400 hover:text-gold hover:bg-white/5'
              }`}
            >
              <cat.icon className="text-xl md:text-2xl mb-2 drop-shadow-md" />
              <span className="text-[10px] md:text-xs font-bold text-center uppercase tracking-widest">{cat.name}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 md:mt-24">
        
        {filteredSections.map((section, idx) => (
          <ImageSection 
            key={idx} 
            title={section.title} 
            subtitle={section.subtitle} 
            images={section.images} 
            onOpenModal={(imgs, title) => setModalData({ isOpen: true, images: imgs, title })} 
          />
        ))}

        {/* PREMIUM BOTTOM CTA */}
        <div className="mt-32 relative rounded-3xl overflow-hidden shadow-2xl border border-white/10 group">
          <div className="absolute inset-0">
            <img 
              src="https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=1500&q=80" 
              alt="Visit us" 
              className="w-full h-full object-cover opacity-30 group-hover:scale-105 transition-transform duration-1000 ease-out"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#050505] via-[#050505]/90 to-transparent"></div>
          </div>
          
          <div className="relative z-10 p-10 md:p-16 flex flex-col md:flex-row items-center justify-between gap-10">
            <div className="text-center md:text-left">
              <h2 className="text-3xl md:text-5xl font-black font-heading text-white uppercase tracking-widest mb-4 drop-shadow-lg">
                Experience <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-gold to-yellow-500">The Magic</span>
              </h2>
              <p className="text-gray-300 font-light tracking-wide max-w-sm text-sm md:text-base">
                Join us for an unforgettable dining experience where every detail is crafted with passion.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 md:gap-6 w-full md:w-auto">
              <Link to="/contact" className="bg-gradient-to-r from-gold to-yellow-600 hover:from-yellow-500 hover:to-yellow-400 text-black px-8 py-4 md:py-5 rounded-xl text-sm font-bold uppercase tracking-widest flex items-center justify-center gap-3 transition-all shadow-[0_0_30px_rgba(201,164,76,0.3)] hover:shadow-[0_0_40px_rgba(201,164,76,0.5)] transform hover:-translate-y-1">
                <FaBuilding /> Reserve a Table
              </Link>
              <Link to="/contact" className="bg-transparent border border-gold/50 hover:border-gold hover:bg-gold/10 text-white px-8 py-4 md:py-5 rounded-xl text-sm font-bold uppercase tracking-widest flex items-center justify-center gap-3 transition-all backdrop-blur-md cursor-pointer">
                <FiPhoneCall /> Contact Us
              </Link>
            </div>
          </div>
        </div>

      </div>

      {/* Modal Popup (Dark Premium) */}
      <AnimatePresence>
        {modalData.isOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-[#050505]/95 backdrop-blur-xl p-4 md:p-10 overflow-y-auto"
          >
            <div className="relative w-full max-w-7xl mx-auto my-auto min-h-[50vh] bg-[#0a0a0a] rounded-2xl border border-white/5 p-6 md:p-10 shadow-[0_0_100px_rgba(0,0,0,1)]">
              
              <button 
                onClick={() => setModalData({ isOpen: false, images: [], title: '' })}
                className="absolute top-4 right-4 md:top-8 md:right-8 text-gray-400 hover:text-gold transition-colors bg-white/5 hover:bg-white/10 p-3 rounded-full z-20 border border-white/10"
              >
                <FaTimes className="text-2xl" />
              </button>

              <div className="mb-10 text-center">
                <h2 className="text-2xl md:text-4xl font-heading font-black text-white uppercase tracking-[0.2em]">{modalData.title}</h2>
                <div className="h-[2px] w-24 bg-gradient-to-r from-transparent via-gold to-transparent mx-auto mt-4"></div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                {modalData.images.map((src, idx) => (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: idx * 0.05, duration: 0.4 }}
                    key={idx}
                    className="h-[250px] md:h-[300px] rounded-xl overflow-hidden shadow-lg shadow-black/50"
                  >
                    <GalleryImage src={src} alt={`${modalData.title} Image ${idx + 1}`} />
                  </motion.div>
                ))}
              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
};

export default Gallery;
