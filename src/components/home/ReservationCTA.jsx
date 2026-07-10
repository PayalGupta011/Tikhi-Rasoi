import { FiCalendar } from 'react-icons/fi';
import { Link } from 'react-router-dom';

const ReservationCTA = () => {
  return (
    <div className="relative bg-background py-20 border-t border-cards overflow-hidden">
      {/* Background Image / Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-20"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=1600&auto=format&fit=crop')" }}
      ></div>
      <div className="absolute inset-0 bg-gradient-to-r from-background via-background/90 to-transparent"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between">
        <div className="mb-8 md:mb-0 text-center md:text-left max-w-xl z-10">
          <p className="text-gold font-heading text-lg italic mb-2 tracking-wider">Make your occasions special</p>
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-white uppercase tracking-wider mb-4">
            Book Your Table Now
          </h2>
          <div className="flex items-center justify-center md:justify-start gap-4 mb-4">
            <div className="h-[2px] w-12 bg-primary"></div>
            <div className="w-2 h-2 rounded-full bg-gold"></div>
            <div className="h-[2px] w-12 bg-primary"></div>
          </div>
          <p className="text-gray-text text-sm">
            Perfect for family dinners, birthday parties and special celebrations.
          </p>
        </div>

        <div className="z-10">
          <Link to="/contact" className="inline-block bg-gold hover:bg-gold-soft text-black px-8 py-4 rounded-lg font-button font-bold uppercase tracking-wider flex items-center justify-center gap-3 transition-all shadow-[0_0_20px_rgba(201,164,76,0.3)]">
            <FiCalendar className="text-xl" />
            Book a Table
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ReservationCTA;
