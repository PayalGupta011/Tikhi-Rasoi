import { motion } from 'framer-motion';
import { FiCalendar } from 'react-icons/fi';

const Offer = () => {
  return (
    <div className="bg-background min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-white uppercase tracking-wider mb-4 drop-shadow-lg">
            Special Offers
          </h1>
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="h-[2px] w-12 bg-primary"></div>

            <div className="h-[2px] w-12 bg-primary"></div>
          </div>
          <p className="text-gray-text text-sm max-w-2xl mx-auto">
            Enjoy our exclusive deals and make your dining experience even more delightful.
          </p>
        </div>

        {/* Offers Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          
          {/* Offer 1 */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="bg-gradient-to-r from-primary-dark to-primary rounded-2xl p-8 flex flex-col justify-between relative overflow-hidden shadow-2xl text-white group"
          >
            <div className="relative z-10 w-2/3">
              <span className="bg-white text-primary text-[0.6rem] font-bold px-2 py-1 rounded uppercase tracking-wider mb-4 inline-block">Limited Time</span>
              <h3 className="text-5xl font-heading font-bold mb-2 drop-shadow-md">20% <span className="text-3xl">OFF</span></h3>
              <p className="text-sm tracking-wider uppercase font-bold mb-6 text-gold-soft">On Family Combo</p>
              <p className="text-xs text-white/80 mb-8 leading-relaxed">Bring your entire family and enjoy a massive 20% discount on our specially curated family combo meals.</p>
              <button className="bg-white text-primary px-6 py-3 rounded-lg text-xs font-bold uppercase tracking-wider hover:bg-gold hover:text-black transition-colors shadow-lg shadow-black/20">
                Claim Offer
              </button>
            </div>
            <img 
              src="https://images.unsplash.com/photo-1628294895950-9805252327bc?q=80&w=800&auto=format&fit=crop" 
              alt="Family Combo" 
              className="absolute -right-16 -bottom-16 w-80 h-80 object-cover rounded-full shadow-2xl group-hover:scale-105 transition-transform duration-700"
            />
          </motion.div>

          {/* Offer 2 */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-cards rounded-2xl p-8 flex flex-col justify-between relative overflow-hidden shadow-2xl border border-white/5 text-white group"
          >
            <div className="relative z-10 w-2/3">
              <span className="bg-gold text-black text-[0.6rem] font-bold px-2 py-1 rounded uppercase tracking-wider mb-4 inline-block">Sweet Treat</span>
              <h3 className="text-4xl font-heading font-bold mb-2 text-primary drop-shadow-md">FREE <span className="text-2xl text-white">DESSERT</span></h3>
              <p className="text-sm tracking-wider uppercase font-bold mb-6 text-gray-400">On order above ₹999</p>
              <p className="text-xs text-gray-500 mb-8 leading-relaxed">Order your favorite pure veg meals worth ₹999 or more and get a delicious sizzling brownie or ice cream absolutely free!</p>
              <button className="bg-transparent border-2 border-primary text-primary px-6 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider hover:bg-primary hover:text-white transition-colors">
                Order Now
              </button>
            </div>
            <img 
              src="https://images.unsplash.com/photo-1606890737304-57a1ca8a5b62?q=80&w=800&auto=format&fit=crop" 
              alt="Brownie Dessert" 
              className="absolute -right-8 -bottom-8 w-64 h-64 object-cover rounded-full shadow-2xl group-hover:scale-105 transition-transform duration-700 border-4 border-cards"
            />
          </motion.div>

        </div>

      </div>
    </div>
  );
};

export default Offer;
