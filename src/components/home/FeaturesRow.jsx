import { FaLeaf, FaUtensils, FaHandsWash, FaUsers, FaFire } from 'react-icons/fa';
import { motion } from 'framer-motion';

const features = [
  { 
    icon: FaLeaf, 
    title: '100% PURE VEG', 
    desc: 'We serve only pure vegetarian food.',
    iconAnimate: { 
      hover: { 
        rotate: [0, -15, 15, -10, 10, 0], 
        transition: { duration: 0.5, ease: "easeInOut" } 
      } 
    } 
  },
  { 
    icon: FaUtensils, 
    title: 'FRESH INGREDIENTS', 
    desc: 'Handpicked ingredients for best quality.',
    iconAnimate: { 
      hover: { 
        y: [0, -6, 0, -3, 0], 
        transition: { duration: 0.5, ease: "easeInOut" } 
      } 
    } 
  },
  { 
    icon: FaFire, 
    title: 'LIVE TANDOOR', 
    desc: 'Experience the real tandoori flavour.',
    iconAnimate: { 
      hover: { 
        scale: [1, 1.25, 0.95, 1.15, 1], 
        transition: { duration: 0.6, ease: "easeInOut" } 
      } 
    } 
  },
  { 
    icon: FaUsers, 
    title: 'FAMILY FRIENDLY', 
    desc: 'Perfect place for family dining.',
    iconAnimate: { 
      hover: { 
        scale: 1.15, 
        rotate: 5,
        transition: { type: "spring", stiffness: 300, damping: 10 } 
      } 
    } 
  },
  { 
    icon: FaHandsWash, 
    title: 'HYGIENIC KITCHEN', 
    desc: 'Clean & safe kitchen for healthy food.',
    iconAnimate: { 
      hover: { 
        rotate: [0, -10, 10, -10, 10, 0], 
        x: [0, -3, 3, -2, 2, 0], 
        transition: { duration: 0.5, ease: "easeInOut" } 
      } 
    } 
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2
    }
  }
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  show: { 
    opacity: 1, 
    y: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15
    }
  }
};

const FeaturesRow = () => {
  return (
    <div className="bg-[#050505] py-20 border-t border-b border-white/5 relative overflow-hidden">
      {/* Background Glow */}
      <motion.div 
        animate={{ 
          scale: [1, 1.1, 1],
          opacity: [0.4, 0.6, 0.4]
        }}
        transition={{ 
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[300px] bg-primary/5 blur-[120px] rounded-full pointer-events-none"
      ></motion.div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-4 mb-3">
            <div className="h-[1px] w-16 bg-gradient-to-r from-transparent to-gold"></div>
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-white uppercase tracking-wider drop-shadow-md">Why Choose Us</h2>
            <div className="h-[1px] w-16 bg-gradient-to-l from-transparent to-gold"></div>
          </div>
          <p className="text-primary text-sm font-bold tracking-widest uppercase">The Tikhi Rasoi Experience</p>
        </motion.div>

        {/* Staggered Cards */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6"
        >
          {features.map((feature, idx) => (
            <motion.div 
              key={idx}
              variants={cardVariants}
              whileHover={{ 
                y: -10, 
                scale: 1.03,
                borderColor: "rgba(212,175,55,0.4)",
                backgroundColor: "rgba(255, 255, 255, 0.08)",
                boxShadow: "0 15px 35px rgba(212,175,55,0.12)"
              }}
              className="group flex flex-col items-center text-center p-8 rounded-2xl bg-white/5 border border-white/10 transition-all duration-300 shadow-xl backdrop-blur-sm cursor-pointer"
            >
              {/* Icon Container */}
              <motion.div 
                className="w-16 h-16 rounded-full bg-[#111] border border-white/10 flex items-center justify-center text-gold mb-6 group-hover:scale-110 group-hover:bg-primary group-hover:text-white group-hover:border-primary transition-all duration-300"
              >
                <motion.div variants={feature.iconAnimate} className="flex items-center justify-center w-full h-full">
                  <feature.icon className="text-2xl" />
                </motion.div>
              </motion.div>
              
              <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-3 group-hover:text-gold transition-colors">{feature.title}</h3>
              <p className="text-xs text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors">{feature.desc}</p>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </div>
  );
};

export default FeaturesRow;
