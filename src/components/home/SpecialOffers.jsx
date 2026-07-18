import { Link } from 'react-router-dom';

const SpecialOffers = () => {
  return (
    <div className="bg-cream py-16 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Offer 1 */}
          <Link to="/offer" className="bg-gradient-to-r from-primary-dark to-primary rounded-2xl p-6 flex flex-col justify-between relative overflow-hidden shadow-xl text-white group cursor-pointer hover:-translate-y-2 transition-transform">
            <div className="relative z-10 w-2/3">
              <h3 className="text-4xl font-heading font-bold mb-2">20% <span className="text-xl">OFF</span></h3>
              <p className="text-xs tracking-wider uppercase font-bold mb-4 text-gold-soft">On Family Combo</p>
              <button className="border border-white/50 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider hover:bg-white hover:text-primary transition-colors">
                Order Now
              </button>
            </div>
            <img 
              src="https://images.unsplash.com/photo-1628294895950-9805252327bc?q=80&w=800&auto=format&fit=crop" 
              alt="Family Combo" 
              className="absolute -right-12 -bottom-12 w-64 h-64 object-cover rounded-full shadow-2xl group-hover:scale-110 transition-transform duration-500"
            />
          </Link>

          {/* Offer 2 */}
          <Link to="/offer" className="bg-white rounded-2xl p-6 flex flex-col justify-between relative overflow-hidden shadow-xl text-black border border-gray-100 group cursor-pointer hover:-translate-y-2 transition-transform">
            <div className="relative z-10 w-2/3">
              <h3 className="text-3xl font-heading font-bold mb-2 text-primary">FREE <span className="text-xl text-black">DESSERT</span></h3>
              <p className="text-xs tracking-wider uppercase font-bold mb-4 text-gray-500">On order above ₹999</p>
              <button className="border border-primary text-primary px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider hover:bg-primary hover:text-white transition-colors">
                Order Now
              </button>
            </div>
            <img 
              src="https://images.unsplash.com/photo-1606890737304-57a1ca8a5b62?q=80&w=800&auto=format&fit=crop" 
              alt="Brownie Dessert" 
              className="absolute -right-8 -bottom-8 w-48 h-48 object-cover rounded-full shadow-2xl group-hover:scale-110 transition-transform duration-500"
            />
          </Link>

          {/* Offer 3 */}
          <Link to="/menu" className="bg-cards rounded-2xl p-6 flex flex-col justify-between relative overflow-hidden shadow-xl text-white group cursor-pointer hover:-translate-y-2 transition-transform">
            <div className="relative z-10 w-2/3">
              <h3 className="text-3xl font-heading font-bold mb-2 text-gold">TODAY'S <span className="text-xl text-white">SPECIAL</span></h3>
              <p className="text-xs tracking-wider uppercase font-bold mb-4 text-gray-400">Check today's menu</p>
              <button className="border border-white/50 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider hover:bg-gold hover:text-black hover:border-gold transition-colors">
                View Menu
              </button>
            </div>
            <img 
              src="https://images.unsplash.com/photo-1601050690597-df0568f70950?q=80&w=800&auto=format&fit=crop" 
              alt="Today Special" 
              className="absolute -right-8 -bottom-8 w-56 h-56 object-cover rounded-full shadow-2xl group-hover:scale-110 transition-transform duration-500"
            />
          </Link>

        </div>
      </div>
    </div>
  );
};

export default SpecialOffers;
