import { FaStar, FaQuoteLeft } from 'react-icons/fa';

const reviews = [
  {
    id: 1,
    name: 'Rahul Sharma',
    text: 'Best pure veg restaurant in town! The tandoori dishes are amazing and the ambience is perfect.',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop'
  },
  {
    id: 2,
    name: 'Pooja Verma',
    text: 'Loved the food and service. Tikhi Mirchi is our go-to place for family dinners.',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop'
  },
  {
    id: 3,
    name: 'Amit Patel',
    text: 'Great taste, great quantity and pocket friendly. Highly recommended!',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop'
  }
];

const Testimonials = () => {
  return (
    <div className="bg-primary-dark py-16 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-4 mb-2">
            <div className="h-[1px] w-12 bg-gold-soft"></div>
            <h2 className="text-2xl md:text-3xl font-heading font-bold uppercase tracking-wider text-white">What Our Customers Say</h2>
            <div className="h-[1px] w-12 bg-gold-soft"></div>
          </div>

        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviews.map((review) => (
            <div key={review.id} className="bg-black/20 border border-white/10 rounded-xl p-6 relative">
              <FaQuoteLeft className="absolute top-6 left-6 text-2xl text-white/10" />
              <div className="flex items-center gap-4 mb-4">
                <img src={review.image} alt={review.name} className="w-12 h-12 rounded-full object-cover border-2 border-gold-soft" />
                <div>
                  <h4 className="font-bold text-sm tracking-wider uppercase text-white">{review.name}</h4>
                  <div className="flex gap-1 mt-1">
                    {[...Array(5)].map((_, i) => (
                      <FaStar key={i} className={`text-[0.5rem] ${i < review.rating ? 'text-gold' : 'text-white/20'}`} />
                    ))}
                  </div>
                </div>
              </div>
              <p className="text-sm text-gray-300 leading-relaxed pl-1">
                "{review.text}"
              </p>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default Testimonials;
