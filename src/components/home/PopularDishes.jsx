import { FaStar, FaRegHeart } from 'react-icons/fa';

const dishes = [
  {
    id: 1,
    name: 'Paneer Tikka Pizza',
    image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?q=80&w=800&auto=format&fit=crop',
    price: '299',
    rating: 5,
    reviews: 120,
    isVeg: true,
  },
  {
    id: 2,
    name: 'Paneer Butter Masala',
    image: '/paneerbutter.jpg',
    price: '270',
    rating: 5,
    reviews: 98,
    isVeg: true,
  },
  {
    id: 3,
    name: 'Veg Biryani',
    image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?q=80&w=800&auto=format&fit=crop',
    price: '250',
    rating: 4,
    reviews: 76,
    isVeg: true,
  },
  {
    id: 4,
    name: 'Manchurian Gravy',
    image: 'https://images.unsplash.com/photo-1585032226651-759b368d7246?q=80&w=800&auto=format&fit=crop',
    price: '220',
    rating: 5,
    reviews: 88,
    isVeg: true,
  },
  {
    id: 5,
    name: 'Tandoori Platter',
    image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=800&auto=format&fit=crop',
    price: '499',
    rating: 5,
    reviews: 65,
    isVeg: true,
  }
];

const PopularDishes = () => {
  return (
    <div className="bg-secondary py-16 border-t border-cards">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex justify-between items-end mb-10">
          <div>
            <h2 className="text-3xl font-heading font-bold text-white uppercase tracking-wider mb-2">Popular Dishes</h2>
            <div className="h-[2px] w-16 bg-gold"></div>
          </div>
          <button className="border border-gray-text/50 text-gray-text hover:text-white hover:border-white px-4 py-1.5 rounded text-xs font-bold uppercase tracking-wider transition-colors">
            View All Menu
          </button>
        </div>

        {/* Dishes Grid/Slider */}
        <div className="flex overflow-x-auto pb-6 hide-scrollbar gap-6">
          {dishes.map((dish) => (
            <div key={dish.id} className="min-w-[260px] max-w-[260px] bg-cards rounded-xl overflow-hidden shadow-lg border border-gray-text/10 group">
              {/* Image Section */}
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={dish.image} 
                  alt={dish.name} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3 bg-veg/90 backdrop-blur-sm text-white text-[0.6rem] font-bold px-2 py-1 rounded flex items-center gap-1 uppercase tracking-wider">
                  <span className="w-2 h-2 rounded-full bg-white"></span>
                  Pure Veg
                </div>
                <button className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/50 backdrop-blur-sm text-white flex items-center justify-center hover:bg-primary transition-colors">
                  <FaRegHeart />
                </button>
              </div>

              {/* Content Section */}
              <div className="p-4">
                <h3 className="font-heading font-bold text-white text-lg mb-1 truncate">{dish.name}</h3>
                
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <FaStar key={i} className={`text-[0.6rem] ${i < dish.rating ? 'text-gold' : 'text-gray-600'}`} />
                  ))}
                  <span className="text-[0.6rem] text-gray-400 ml-1">({dish.reviews})</span>
                </div>

                <div className="flex justify-between items-center mt-auto">
                  <span className="text-gold font-bold text-xl">₹{dish.price}</span>
                  <button className="bg-primary hover:bg-primary-dark text-white px-3 py-1 rounded text-xs font-bold uppercase tracking-wider transition-colors">
                    Add +
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default PopularDishes;
