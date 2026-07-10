import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaMapMarkerAlt, FaPhoneAlt, FaWhatsapp, FaClock, FaEnvelope, FaPaperPlane, FaUser, FaTag, FaLeaf, FaUtensils, FaUsers, FaConciergeBell, FaGlassCheers, FaGift, FaArrowRight } from 'react-icons/fa';

const Contact = () => {
  const [selectedInterest, setSelectedInterest] = useState('Table Booking');

  return (
    <div className="bg-[#0a0a0a] min-h-screen text-white font-body pb-20">
      
      {/* Hero Section */}
      <div className="relative w-full h-auto lg:h-[70vh] flex flex-col lg:flex-row items-center border-b border-white/10 overflow-hidden bg-[#050505]">
        
        {/* Left Content (Solid Background) */}
        <div className="relative z-20 w-full lg:w-1/2 px-4 sm:px-6 lg:pl-16 xl:pl-24 py-16 lg:py-0 flex flex-col justify-center h-full">
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-heading italic text-gold text-2xl md:text-3xl lg:text-4xl mb-2"
          >
            We'd Love to <span className="text-primary text-3xl">♡</span>
          </motion.p>
          <motion.h1 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-6xl lg:text-7xl font-black font-heading tracking-widest uppercase leading-none drop-shadow-2xl text-white mb-2"
          >
            Connect
          </motion.h1>
          <motion.h1 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="text-5xl md:text-6xl lg:text-7xl font-black font-heading tracking-widest uppercase drop-shadow-2xl mb-6 text-primary"
          >
            With You!
          </motion.h1>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="flex justify-start mb-6"
          >
            <span className="text-gold text-2xl animate-pulse">✧</span>
          </motion.div>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-gray-300 max-w-md text-sm md:text-base leading-relaxed"
          >
            Have a question, suggestion, or want to book a table?
            We're here to make your experience deliciously memorable!
          </motion.p>
        </div>

        {/* Right Content / Background Image */}
        <div className="relative w-full lg:w-1/2 h-[50vh] lg:h-full z-10">
          <div className="absolute inset-0 bg-gradient-to-r from-[#050505] via-transparent to-transparent z-10 hidden lg:block"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent z-10 lg:hidden"></div>
          <img 
            src="/cafe.jpg" 
            alt="Tikhi Rasoi Cafe" 
            className="w-full h-full object-cover"
            onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1552566626-52f8b828add9?q=80&w=1000&auto=format&fit=crop'; }}
          />
          {/* Decorative Elements */}
          <motion.div 
            animate={{ y: [0, -15, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute bottom-4 lg:bottom-10 right-4 lg:right-10 z-20 w-28 h-28 border border-gold rounded-full flex flex-col items-center justify-center p-2 backdrop-blur-md bg-black/60 shadow-[0_0_30px_rgba(212,175,55,0.4)] hover:shadow-[0_0_40px_rgba(212,175,55,0.6)] hover:scale-105 transition-all cursor-pointer"
          >
            <p className="text-[10px] font-bold text-gold uppercase tracking-[0.2em] text-center mb-1">Good Food</p>
            <FaLeaf className="text-gold text-xl mb-1" />
            <p className="text-[10px] font-bold text-gold uppercase tracking-[0.2em] text-center">Pure Veg</p>
          </motion.div>
        </div>
      </div>

      {/* 4 Info Cards Row */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-12 relative z-30 mb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          
          <div className="bg-[#111] border border-white/10 rounded-xl p-5 flex items-center gap-4 hover:border-primary transition-colors">
            <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center text-primary flex-shrink-0">
              <FaMapMarkerAlt className="text-xl" />
            </div>
            <div>
              <h4 className="text-white font-bold text-sm mb-1">Our Location</h4>
              <p className="text-gray-400 text-xs">Beside Sumit Bazar,<br/>Gondia Road, Balaghat</p>
            </div>
          </div>

          <div className="bg-[#111] border border-white/10 rounded-xl p-5 flex items-center gap-4 hover:border-primary transition-colors">
            <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center text-primary flex-shrink-0">
              <FaPhoneAlt className="text-xl" />
            </div>
            <div>
              <h4 className="text-white font-bold text-sm mb-1">Call Us</h4>
              <p className="text-gray-400 text-xs">9359823934</p>
              <p className="text-gray-400 text-xs">8319681932</p>
            </div>
          </div>

          <div className="bg-[#111] border border-white/10 rounded-xl p-5 flex items-center gap-4 hover:border-green-500 transition-colors">
            <div className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center text-green-500 flex-shrink-0">
              <FaWhatsapp className="text-2xl" />
            </div>
            <div>
              <h4 className="text-white font-bold text-sm mb-1">WhatsApp</h4>
              <p className="text-gray-400 text-xs">9359823934</p>
            </div>
          </div>

          <div className="bg-[#111] border border-white/10 rounded-xl p-5 flex items-center gap-4 hover:border-gold transition-colors">
            <div className="w-12 h-12 bg-gold/20 rounded-full flex items-center justify-center text-gold flex-shrink-0">
              <FaClock className="text-xl" />
            </div>
            <div>
              <h4 className="text-white font-bold text-sm mb-1">Opening Hours</h4>
              <p className="text-gray-400 text-xs">11:00 AM - 11:00 PM<br/>(Everyday Open)</p>
            </div>
          </div>

        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Send Us A Message Form */}
          <div className="border border-gold/30 rounded-2xl p-6 md:p-8 bg-black/40">
            <div className="flex items-center gap-2 mb-2">
              <h2 className="text-xl md:text-2xl font-heading font-bold uppercase tracking-wider text-gold">Send Us A Message</h2>

            </div>
            <div className="flex justify-center mb-6">
              <span className="text-gold text-lg">✧</span>
            </div>

            <form className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="relative">
                  <input type="text" placeholder="Your Name" className="w-full bg-transparent border border-gold/30 rounded px-4 py-3 text-sm text-white focus:outline-none focus:border-gold transition-colors" />
                  <FaUser className="absolute right-4 top-1/2 -translate-y-1/2 text-gold/50" />
                </div>
                <div className="relative">
                  <input type="text" placeholder="Phone Number" className="w-full bg-transparent border border-gold/30 rounded px-4 py-3 text-sm text-white focus:outline-none focus:border-gold transition-colors" />
                  <FaPhoneAlt className="absolute right-4 top-1/2 -translate-y-1/2 text-gold/50" />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="relative">
                  <input type="email" placeholder="Email Address" className="w-full bg-transparent border border-gold/30 rounded px-4 py-3 text-sm text-white focus:outline-none focus:border-gold transition-colors" />
                  <FaEnvelope className="absolute right-4 top-1/2 -translate-y-1/2 text-gold/50" />
                </div>
                <div className="relative">
                  <input type="text" placeholder="Subject" className="w-full bg-transparent border border-gold/30 rounded px-4 py-3 text-sm text-white focus:outline-none focus:border-gold transition-colors" />
                  <FaTag className="absolute right-4 top-1/2 -translate-y-1/2 text-gold/50" />
                </div>
              </div>
              <div>
                <textarea rows="4" placeholder="Your Message" className="w-full bg-transparent border border-gold/30 rounded px-4 py-3 text-sm text-white focus:outline-none focus:border-gold transition-colors resize-none"></textarea>
              </div>

              {/* Interested In */}
              <div className="pt-2">
                <p className="text-center text-xs font-bold text-gold uppercase tracking-widest mb-4 flex items-center justify-center gap-4">
                  <span className="h-[1px] w-8 bg-gold/30"></span>
                  I'm Interested In
                  <span className="h-[1px] w-8 bg-gold/30"></span>
                </p>
                <div className="flex flex-wrap justify-center gap-3 mb-6">
                  {['General Inquiry', 'Table Booking', 'Birthday Party', 'Corporate Event'].map((tag) => (
                    <button 
                      type="button" 
                      key={tag} 
                      onClick={() => setSelectedInterest(tag)}
                      className={`px-4 py-2 rounded text-xs font-medium border transition-all duration-300 flex items-center gap-2 cursor-pointer
                        ${selectedInterest === tag 
                          ? 'border-primary bg-primary/20 text-white shadow-[0_0_10px_rgba(181,31,31,0.3)] scale-105' 
                          : 'border-gold/30 text-gray-400 hover:border-gold hover:text-gold hover:bg-gold/5'
                        }`}
                    >
                      {tag === 'Table Booking' ? <FaClock /> : <FaEnvelope />} {tag}
                    </button>
                  ))}
                </div>
              </div>

              <button type="submit" className="w-full bg-primary hover:bg-primary-dark text-white font-bold uppercase tracking-wider py-4 rounded transition-colors flex items-center justify-center gap-2 shadow-[0_0_15px_rgba(181,31,31,0.3)]">
                Send Message <FaPaperPlane />
              </button>
              
              <div className="text-center mt-6">
                <p className="font-heading italic text-gold text-sm">→ We will get back to you soon! ♡</p>
              </div>
            </form>
          </div>

          {/* Right Column - Map & WhatsApp */}
          <div className="flex flex-col gap-6">
            
            {/* Map Section */}
            <div className="border border-gold/30 rounded-2xl p-6 bg-black/40 flex-1 flex flex-col">
              <div className="flex items-center gap-2 mb-6">
                <h2 className="text-xl md:text-2xl font-heading font-bold uppercase tracking-wider text-gold">Find Us Here</h2>

              </div>
              
              <div className="relative w-full flex-1 min-h-[250px] rounded-xl overflow-hidden border border-white/10 group">
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14872.2385474776!2d80.18342415!3d21.81595185!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a2ba3003058a979%3A0x6e6e2467d3e09dc8!2sBalaghat%2C%20Madhya%20Pradesh!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin" 
                  width="100%" 
                  height="100%" 
                  style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg)' }} 
                  allowFullScreen="" 
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade"
                  className="absolute inset-0"
                ></iframe>
                
                <div className="absolute inset-0 pointer-events-none flex items-center justify-center bg-black/20 group-hover:bg-transparent transition-colors">
                  <button className="pointer-events-auto bg-black/80 border border-gold text-gold px-6 py-2 rounded font-bold text-sm tracking-wider flex items-center gap-2 hover:bg-gold hover:text-black transition-colors backdrop-blur-md">
                    Get Directions <FaArrowRight />
                  </button>
                </div>
              </div>
            </div>

            {/* WhatsApp CTA */}
            <div className="border border-gold/30 rounded-2xl p-6 bg-black/40 flex items-center justify-between">
              <div>
                <h3 className="text-green-500 font-bold uppercase tracking-wider mb-2 flex items-center gap-2">
                  <FaWhatsapp className="text-xl" /> Reach Us On WhatsApp
                </h3>
                <p className="text-gray-400 text-sm max-w-xs">Click the button to chat with us instantly on WhatsApp for quick inquiries.</p>
              </div>
              <a 
                href="https://wa.me/919359823934" 
                target="_blank" 
                rel="noreferrer"
                className="bg-green-600 hover:bg-green-700 text-white p-4 rounded-xl shadow-[0_0_15px_rgba(22,163,74,0.4)] transition-all flex items-center justify-center flex-shrink-0"
              >
                <FaWhatsapp className="text-3xl" />
              </a>
            </div>

          </div>
        </div>
      </div>

      {/* Why Choose Us & Bottom CTA */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Why Choose Us */}
        <div className="mb-16 border-t border-b border-white/10 py-12">
          <h2 className="text-center text-xl md:text-2xl font-heading font-bold uppercase tracking-widest text-gold mb-12">
            Why Choose Tikhi Rasoi?
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-y-10 gap-x-4">
              <div className="flex flex-col items-center text-center">
                <FaLeaf className="text-green-500 text-3xl mb-3" />
                <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-2">100% Pure Veg</h4>
                <p className="text-gray-400 text-xs">Pure vegetarian delicacies</p>
              </div>
              <div className="flex flex-col items-center text-center">
                <FaUtensils className="text-gold text-3xl mb-3" />
                <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-2">Hygienic Kitchen</h4>
                <p className="text-gray-400 text-xs">Clean & hygienic kitchen</p>
              </div>
              <div className="flex flex-col items-center text-center">
                <FaUsers className="text-gold text-3xl mb-3" />
                <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-2">Family Friendly</h4>
                <p className="text-gray-400 text-xs">Perfect place for family & friends</p>
              </div>
              <div className="flex flex-col items-center text-center md:col-start-1 md:col-end-2 md:ml-12">
                <FaConciergeBell className="text-gold text-3xl mb-3" />
                <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-2">Fast Service</h4>
                <p className="text-gray-400 text-xs">Quick service for you</p>
              </div>
              <div className="flex flex-col items-center text-center md:col-start-2 md:col-end-4 md:mr-12">
                <FaGlassCheers className="text-gold text-3xl mb-3" />
                <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-2">Great Ambience</h4>
                <p className="text-gray-400 text-xs">Warm ambience and cozy vibes</p>
              </div>
            </div>

            <div className="flex justify-center relative">
              {/* Glowing background behind the plate */}
              <motion.div 
                animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.6, 0.3] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute inset-0 bg-gold/20 rounded-full blur-3xl"
              ></motion.div>
              
              <motion.div 
                animate={{ y: [0, -15, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="w-64 h-64 md:w-80 md:h-80 rounded-full border-4 border-gold/30 overflow-hidden shadow-[0_0_50px_rgba(212,175,55,0.2)] relative z-10"
              >
                <motion.img 
                  animate={{ rotate: 360 }}
                  transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                  src="https://images.unsplash.com/photo-1612929633738-8fe44f7ec841?auto=format&fit=crop&w=800&q=80" 
                  alt="Delicious Noodles" 
                  className="w-full h-full object-cover scale-110"
                />
              </motion.div>
            </div>
          </div>
        </div>

        {/* Plan Your Special Moments */}
        <div className="bg-gradient-to-r from-black via-primary/20 to-black border border-primary/30 rounded-2xl p-6 md:p-10 flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden">
          {/* Subtle bg glow */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--color-primary)_0%,_transparent_70%)] opacity-10"></div>
          
          <div className="relative z-10 w-full md:w-2/3">
            <h2 className="text-xl md:text-2xl font-heading font-bold uppercase tracking-widest text-gold mb-6 text-center md:text-left">
              Plan Your Special Moments With Us
            </h2>
            <div className="flex flex-wrap justify-center md:justify-start gap-4 md:gap-8">
              <div className="flex items-center gap-2">
                <FaGift className="text-gold text-xl" />
                <span className="text-white text-xs md:text-sm font-medium uppercase tracking-wider">Birthday Parties</span>
              </div>
              <div className="flex items-center gap-2">
                <FaUsers className="text-gold text-xl" />
                <span className="text-white text-xs md:text-sm font-medium uppercase tracking-wider">Family Dinners</span>
              </div>
              <div className="flex items-center gap-2">
                <FaGlassCheers className="text-gold text-xl" />
                <span className="text-white text-xs md:text-sm font-medium uppercase tracking-wider">Kitty Parties</span>
              </div>
            </div>
          </div>

          <div className="relative z-10 w-full md:w-auto">
            <button className="w-full md:w-auto border border-gold hover:bg-gold hover:text-black text-white px-8 py-4 rounded-xl font-bold transition-colors flex items-center justify-between md:justify-center gap-4 group">
              <div className="text-left">
                <div className="uppercase tracking-wider">Book Your Table Now</div>
                <div className="text-xs font-normal opacity-80 capitalize">Make every moment memorable!</div>
              </div>
              <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Contact;
