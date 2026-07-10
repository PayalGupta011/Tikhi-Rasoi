import { FaLeaf, FaUtensils, FaHandsWash, FaUsers, FaFire } from 'react-icons/fa';

const features = [
  { icon: FaLeaf, title: '100% PURE VEG', desc: 'We serve only pure vegetarian food.' },
  { icon: FaUtensils, title: 'FRESH INGREDIENTS', desc: 'Handpicked ingredients for best quality.' },
  { icon: FaFire, title: 'LIVE TANDOOR', desc: 'Experience the real tandoori flavour.' },
  { icon: FaUsers, title: 'FAMILY FRIENDLY', desc: 'Perfect place for family dining.' },
  { icon: FaHandsWash, title: 'HYGIENIC KITCHEN', desc: 'Clean & safe kitchen for healthy food.' },
];

const FeaturesRow = () => {
  return (
    <div className="bg-[#050505] py-20 border-t border-b border-white/5 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[300px] bg-primary/5 blur-[120px] rounded-full pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-4 mb-3">
            <div className="h-[1px] w-16 bg-gradient-to-r from-transparent to-gold"></div>
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-white uppercase tracking-wider drop-shadow-md">Why Choose Us</h2>
            <div className="h-[1px] w-16 bg-gradient-to-l from-transparent to-gold"></div>
          </div>
          <p className="text-gray-400 text-sm md:text-base font-bold tracking-widest uppercase">The Tikhi Rasoi Experience</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {features.map((feature, idx) => (
            <div 
              key={idx} 
              className="group flex flex-col items-center text-center p-8 rounded-2xl bg-white/5 border border-white/10 hover:border-gold/30 hover:bg-white/10 transition-all duration-300 shadow-xl backdrop-blur-sm cursor-default hover:-translate-y-2 hover:shadow-[0_0_30px_rgba(212,175,55,0.15)]"
            >
              <div className="w-16 h-16 rounded-full bg-[#111] border border-white/10 flex items-center justify-center text-gold mb-6 group-hover:scale-110 group-hover:bg-primary group-hover:text-white group-hover:border-primary transition-all duration-300">
                <feature.icon className="text-2xl" />
              </div>
              <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-3 group-hover:text-gold transition-colors">{feature.title}</h3>
              <p className="text-xs text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors">{feature.desc}</p>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default FeaturesRow;
