import { motion } from 'framer-motion';

const FireLoader = () => {
  return (
    <div className="fixed inset-0 z-[9999] bg-[#050505] flex flex-col items-center justify-center">
      <div className="relative w-32 h-32 flex items-center justify-center mb-8">
        {/* Fire glow */}
        <motion.div 
          animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.8, 0.3] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="absolute inset-0 bg-primary/40 rounded-full blur-2xl"
        ></motion.div>
        
        {/* Flame/Logo animation */}
        <motion.div
          animate={{ y: [0, -15, 0], scale: [1, 1.1, 1] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="relative z-10 filter"
        >
          <img src="/logo.jpg" alt="Tikhi Rasoi Logo" className="w-20 h-20 md:w-24 md:h-24 object-cover rounded-full shadow-[0_0_30px_rgba(212,175,55,0.6)] border-2 border-gold/50" />
        </motion.div>
        
        {/* Sizzling particles / Embers */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ y: 0, x: 0, opacity: 1, scale: 1 }}
            animate={{ 
              y: -80 - Math.random() * 60, 
              x: (Math.random() - 0.5) * 80,
              opacity: 0,
              scale: 0.2
            }}
            transition={{ 
              duration: 1 + Math.random() * 1.5, 
              repeat: Infinity, 
              delay: Math.random(),
              ease: "easeOut"
            }}
            className="absolute w-2 h-2 rounded-full"
            style={{ 
              left: '50%', 
              top: '50%',
              backgroundColor: i % 2 === 0 ? '#d4af37' : '#ff4500', // Gold or Orange
              boxShadow: `0 0 10px ${i % 2 === 0 ? '#d4af37' : '#ff4500'}`
            }}
          />
        ))}
      </div>
      
      <motion.div 
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 1.5, repeat: Infinity }}
        className="flex flex-col items-center gap-3"
      >
        <h2 className="text-3xl font-black font-heading text-white tracking-[0.2em] uppercase drop-shadow-[0_0_10px_rgba(255,255,255,0.2)]">
          Tikhi <span className="text-primary drop-shadow-[0_0_15px_rgba(181,31,31,0.5)]">Rasoi</span>
        </h2>
        <div className="flex items-center gap-3">
          <div className="h-[1px] w-8 bg-gradient-to-r from-transparent to-gold"></div>
          <p className="text-gold text-xs md:text-sm font-bold tracking-[0.3em] uppercase">
            Cooking up something hot...
          </p>
          <div className="h-[1px] w-8 bg-gradient-to-l from-transparent to-gold"></div>
        </div>
      </motion.div>
    </div>
  );
};

export default FireLoader;
