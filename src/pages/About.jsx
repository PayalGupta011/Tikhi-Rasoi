import { motion } from 'framer-motion';
import { FaLeaf, FaUtensils, FaUsers, FaHeart, FaStar, FaShieldAlt } from 'react-icons/fa';

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1
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

const leafAnimate = {
  hover: { rotate: [0, -15, 15, -10, 10, 0], transition: { duration: 0.5 } }
};

const shieldAnimate = {
  hover: { rotate: [0, -10, 10, -10, 10, 0], scale: 1.1, transition: { duration: 0.5 } }
};

const starAnimate = {
  hover: { rotate: 360, scale: 1.15, transition: { duration: 0.8, ease: "easeOut" } }
};

const usersAnimate = {
  hover: { y: [0, -6, 0, -3, 0], transition: { duration: 0.5 } }
};

const FeatureCard = ({ icon: Icon, title, desc, iconAnimate }) => (
  <motion.div 
    variants={cardVariants}
    whileHover="hover"
    className="bg-[#111] p-6 rounded-2xl border border-white/5 shadow-lg shadow-black/50 hover:border-gold/30 hover:bg-[#161619] transition-all group relative overflow-hidden cursor-pointer"
  >
    <div className="absolute -top-10 -right-10 text-9xl text-white/5 group-hover:text-gold/5 transition-colors rotate-12">
      <Icon />
    </div>
    <div className="relative z-10">
      <div className="w-14 h-14 bg-gradient-to-br from-gold/20 to-gold/5 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
        <motion.div variants={iconAnimate} className="flex items-center justify-center w-full h-full text-gold">
          <Icon className="text-2xl" />
        </motion.div>
      </div>
      <h4 className="text-white font-bold uppercase tracking-widest text-sm mb-2 group-hover:text-gold transition-colors">{title}</h4>
      <p className="text-sm text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors">{desc}</p>
    </div>
  </motion.div>
);

const About = () => {
  return (
    <div className="bg-[#050505] min-h-screen selection:bg-gold selection:text-black">
      
      {/* Immersive Hero Section */}
      <div className="relative h-[85vh] md:h-[90vh] flex items-center justify-center overflow-hidden">
        {/* Infinite slow zoom background */}
        <motion.div 
          className="absolute inset-0"
          initial={{ scale: 1 }}
          animate={{ scale: 1.1 }}
          transition={{ duration: 20, repeat: Infinity, repeatType: 'reverse', ease: 'linear' }}
        >
          <img 
            src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=2000&q=80" 
            alt="Tikhi Rasoi Interior" 
            className="w-full h-full object-cover opacity-60"
            style={{ filter: 'brightness(0.5) contrast(1.2)' }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-[#050505]"></div>
        </motion.div>
        
        {/* Floating Decorative Elements */}
        <motion.div 
          animate={{ y: [0, -15, 0], rotate: [0, 5, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-32 left-10 md:left-32 opacity-20 hidden md:block"
        >
          <FaStar className="text-6xl text-gold" />
        </motion.div>
        
        <motion.div 
          animate={{ y: [0, 20, 0], rotate: [0, -10, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute bottom-40 right-10 md:right-32 opacity-20 hidden md:block"
        >
          <FaUtensils className="text-7xl text-primary" />
        </motion.div>

        <div className="relative z-10 text-center px-4 w-full max-w-4xl mx-auto flex flex-col items-center mt-10">
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, type: 'spring' }}
            className="flex items-center gap-4 mb-6"
          >
            <div className="h-[2px] w-12 md:w-20 bg-gradient-to-r from-transparent to-gold"></div>
            <p className="text-gold font-bold tracking-[0.4em] uppercase text-xs md:text-sm border border-gold/30 px-4 py-1 rounded-full bg-gold/10 backdrop-blur-sm">Our Story</p>
            <div className="h-[2px] w-12 md:w-20 bg-gradient-to-l from-transparent to-gold"></div>
          </motion.div>
          
          <div className="overflow-hidden mb-6 py-2">
            <motion.h1
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
              className="text-6xl md:text-9xl font-black font-heading uppercase tracking-widest leading-none drop-shadow-[0_0_40px_rgba(181,31,31,0.5)] text-white"
            >
              About <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-red-500 to-gold">Us</span>
            </motion.h1>
          </div>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="text-gray-300 font-light text-sm md:text-xl max-w-2xl mx-auto tracking-wide leading-relaxed"
          >
            Discover the passion, the flavours, and the journey that makes Tikhi Rasoi the ultimate dining destination in Balaghat.
          </motion.p>
        </div>

        {/* Bouncing Scroll Indicator */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="absolute bottom-4 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 cursor-pointer z-20"
          onClick={() => window.scrollBy({ top: window.innerHeight * 0.7, behavior: 'smooth' })}
        >
          <span className="text-gold text-xs uppercase tracking-[0.3em] font-bold">Discover</span>
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            className="w-6 h-10 border-2 border-gold/50 rounded-full flex justify-center p-1"
          >
            <motion.div className="w-1 h-2 bg-gold rounded-full" />
          </motion.div>
        </motion.div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        
        {/* Story Section */}
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 items-center mb-32">
          
          {/* Left Text */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="w-full lg:w-1/2"
          >
            <h2 className="text-3xl md:text-5xl font-heading font-black text-white uppercase tracking-widest mb-8 leading-tight">
              Welcome To <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold to-yellow-500">Tikhi Rasoi</span>
            </h2>
            
            <div className="space-y-6 text-gray-400 font-light tracking-wide text-sm md:text-base leading-relaxed">
              <p>
                <strong className="text-white font-medium">Tikhi Rasoi Café & Restro</strong> (powered by Thunders Cafe) is the ultimate destination for pure vegetarian food lovers in Balaghat. Located perfectly beside Sumit Bazar on Gondia Road, we offer a cozy, family-friendly atmosphere combined with an unforgettable culinary experience.
              </p>
              <p>
                Whether you're craving authentic Tandoori items, spicy Chinese, a hearty Paneer main course, or just a quick bite of pizza and shakes, our massive menu has something special for everyone.
              </p>
              <p className="pl-4 border-l-2 border-primary italic">
                Every dish is crafted with fresh ingredients, utmost hygiene, and lots of love to bring you the true "Swad Ka Asli Tadka".
              </p>
            </div>
          </motion.div>
          
          {/* Right Staggered Collage */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="w-full lg:w-1/2"
          >
            <div className="grid grid-cols-2 gap-4 md:gap-6 relative">
              <div className="space-y-4 md:space-y-6 pt-10">
                <img 
                  src="https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=600&q=80" 
                  alt="Delicious Food" 
                  className="w-full h-48 md:h-64 object-cover rounded-2xl shadow-[0_10px_30px_rgba(0,0,0,0.8)] border border-white/5" 
                />
                <img 
                  src="https://images.unsplash.com/photo-1544148103-0773bf10d330?auto=format&fit=crop&w=600&q=80" 
                  alt="Ambience" 
                  className="w-full h-56 md:h-72 object-cover rounded-2xl shadow-[0_10px_30px_rgba(0,0,0,0.8)] border border-white/5" 
                />
              </div>
              <div className="space-y-4 md:space-y-6">
                <img 
                  src="https://images.unsplash.com/photo-1628294895950-9805252327bc?auto=format&fit=crop&w=600&q=80" 
                  alt="Special Dish" 
                  className="w-full h-56 md:h-72 object-cover rounded-2xl shadow-[0_10px_30px_rgba(0,0,0,0.8)] border border-white/5" 
                />
                <img 
                  src="https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=600&q=80" 
                  alt="Restaurant View" 
                  className="w-full h-48 md:h-64 object-cover rounded-2xl shadow-[0_10px_30px_rgba(0,0,0,0.8)] border border-white/5" 
                />
              </div>
              
              {/* Decorative Blur */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-primary/20 blur-[100px] rounded-full -z-10"></div>
            </div>
          </motion.div>

        </div>

        {/* Features Section */}
        <div className="mb-32">
          <div className="text-center mb-16">
            <h3 className="text-gold font-bold tracking-[0.3em] uppercase text-xs md:text-sm mb-4">Why Choose Us</h3>
            <h2 className="text-3xl md:text-4xl font-heading font-black text-white uppercase tracking-widest">Our Specialties</h2>
          </div>
          
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            <FeatureCard 
              icon={FaLeaf} 
              title="100% Pure Veg" 
              desc="A completely vegetarian kitchen ensuring purity and authentic taste in every bite." 
              iconAnimate={leafAnimate}
            />
            <FeatureCard 
              icon={FaShieldAlt} 
              title="Hygiene First" 
              desc="Strict cleanliness and hygiene protocols followed to prepare your food safely." 
              iconAnimate={shieldAnimate}
            />
            <FeatureCard 
              icon={FaStar} 
              title="Authentic Taste" 
              desc="Expert chefs crafting dishes with traditional recipes and premium spices." 
              iconAnimate={starAnimate}
            />
            <FeatureCard 
              icon={FaUsers} 
              title="Family Friendly" 
              desc="A warm, cozy environment perfectly suited for family dinners and celebrations." 
              iconAnimate={usersAnimate}
            />
          </motion.div>
        </div>

        {/* Vision Section */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative rounded-3xl overflow-hidden border border-white/10 p-10 md:p-20 text-center shadow-[0_0_50px_rgba(201,164,76,0.1)] group"
        >
          {/* Background image & gradient */}
          <div className="absolute inset-0">
            <img 
              src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=2000&q=80" 
              alt="Philosophy Background" 
              className="w-full h-full object-cover opacity-20 group-hover:scale-105 transition-transform duration-1000"
            />
            <div className="absolute inset-0 bg-[#050505]/80 backdrop-blur-[2px]"></div>
          </div>
          
          <div className="relative z-10 flex flex-col items-center">
            <div className="w-20 h-20 bg-gradient-to-br from-primary to-red-600 rounded-full flex items-center justify-center mb-8 shadow-[0_0_30px_rgba(181,31,31,0.5)]">
              <FaHeart className="text-3xl text-white" />
            </div>
            
            <h3 className="text-3xl md:text-5xl font-heading font-black text-white uppercase tracking-widest mb-8">Our Philosophy</h3>
            
            <p className="text-gray-300 max-w-4xl mx-auto font-light tracking-wide leading-relaxed text-base md:text-xl md:leading-loose">
              <span className="text-gold text-2xl font-serif">"</span>
              <span className="text-white font-medium">Swad Ka Asli Tadka</span> isn't just our tagline; it's a promise. We believe that vegetarian food can be incredibly diverse, rich, and deeply satisfying. We strive to provide a clean, premium dining experience that brings joy to every family and friend group that walks through our doors.
              <span className="text-gold text-2xl font-serif">"</span>
            </p>
            
            <div className="mt-12 h-[1px] w-32 bg-gradient-to-r from-transparent via-gold to-transparent mx-auto"></div>
          </div>
        </motion.div>

      </div>
    </div>
  );
};

export default About;
