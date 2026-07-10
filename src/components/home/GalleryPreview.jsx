import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const galleryImages = [
  'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=800&q=80', // Fixed broken image
  'https://images.unsplash.com/photo-1544148103-0773bf10d330?auto=format&fit=crop&w=800&q=80',
];

const GalleryPreview = () => {
  return (
    <div className="bg-cream py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex justify-between items-center mb-10">
          <div className="flex-1 flex justify-center items-center gap-4">
            <div className="h-[1px] w-12 md:w-24 bg-gradient-to-r from-transparent to-gold"></div>
            <h2 className="text-3xl md:text-4xl font-heading font-black text-black uppercase tracking-[0.2em]">Gallery</h2>
            <div className="h-[1px] w-12 md:w-24 bg-gradient-to-l from-transparent to-gold"></div>
          </div>
          <Link to="/gallery" className="hidden md:flex border-2 border-primary text-primary hover:bg-primary hover:text-white px-6 py-2 rounded-full text-sm font-bold uppercase tracking-widest transition-all shadow-[0_5px_15px_rgba(181,31,31,0.1)] hover:shadow-[0_8px_20px_rgba(181,31,31,0.3)] hover:-translate-y-1">
            View Full Gallery
          </Link>
        </div>

        {/* Grid */}
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.2 } }
          }}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 md:gap-6"
        >
          {galleryImages.map((img, idx) => (
            <motion.div 
              key={idx}
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
              }}
            >
              <Link to="/gallery" className="relative block h-64 md:h-72 lg:h-80 rounded-2xl overflow-hidden shadow-lg group cursor-pointer border-2 border-white/50">
                <img 
                  src={img} 
                  alt={`Gallery ${idx + 1}`} 
                  className="w-full h-full object-cover group-hover:scale-110 group-hover:rotate-1 transition-all duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center">
                  <div className="translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    <span className="text-white border-2 border-gold text-gold hover:bg-gold hover:text-black px-6 py-2.5 rounded-full text-xs uppercase tracking-[0.2em] font-bold backdrop-blur-sm transition-colors">
                      View
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
        
        <div className="mt-12 text-center md:hidden">
          <Link to="/gallery" className="inline-block border-2 border-primary text-primary hover:bg-primary hover:text-white px-8 py-3 rounded-full text-sm font-bold uppercase tracking-widest transition-all shadow-[0_5px_15px_rgba(181,31,31,0.1)] hover:shadow-[0_8px_20px_rgba(181,31,31,0.3)]">
            View Full Gallery
          </Link>
        </div>

      </div>
    </div>
  );
};

export default GalleryPreview;
