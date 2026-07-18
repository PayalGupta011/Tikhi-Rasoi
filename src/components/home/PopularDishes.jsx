import { FaStar, FaRegHeart, FaHeart } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useFavorites } from '../../context/FavoritesContext';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';

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
  const navigate = useNavigate();
  const { toggleFavorite, isFavorite } = useFavorites();
  const { cartItems, addToCart, updateQuantity } = useCart();
  const { isLoggedIn, openLoginModal } = useAuth();

  return (
    <div className="bg-secondary py-16 border-t border-cards">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex justify-between items-end mb-10">
          <div>
            <h2 className="text-3xl font-heading font-bold text-white uppercase tracking-wider mb-2">Popular Dishes</h2>
            <div className="h-[2px] w-16 bg-gold"></div>
          </div>
          <button 
            onClick={() => navigate('/menu?filter=Most Popular')}
            className="border border-gray-text/50 text-gray-text hover:text-white hover:border-white px-4 py-1.5 rounded text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
          >
            View All Menu
          </button>
        </div>

        {/* Dishes Grid/Slider */}
        <div className="flex overflow-x-auto pb-6 hide-scrollbar gap-6">
          {dishes.map((dish) => {
            const productId = dish.name.replace(/\s+/g, '-').toLowerCase();
            const isFav = isFavorite(productId);
            const cartItem = cartItems.find(item => item.id === productId);
            const quantity = cartItem ? cartItem.quantity : 0;

            const handleToggleFav = () => {
              toggleFavorite({
                id: productId,
                name: dish.name,
                price: dish.price,
                image: dish.image,
                rating: String(dish.rating),
                reviews: `(${dish.reviews})`,
                spice: 'Medium'
              });
            };

            const handleAddToCart = () => {
              if (!isLoggedIn) {
                openLoginModal();
                return;
              }
              addToCart({
                id: productId,
                name: dish.name,
                price: parseInt(dish.price),
                image: dish.image
              });
            };

            return (
              <div key={dish.id} className="min-w-[260px] max-w-[260px] bg-cards rounded-xl overflow-hidden shadow-lg border border-gray-text/10 group flex flex-col justify-between">
                {/* Image Section */}
                <div className="relative h-48 overflow-hidden bg-[#2a2a2a] flex-shrink-0">
                  <img 
                    src={dish.image} 
                    alt={dish.name} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 bg-veg/90 backdrop-blur-sm text-white text-[0.6rem] font-bold px-2 py-1 rounded flex items-center gap-1 uppercase tracking-wider">
                    <span className="w-2 h-2 rounded-full bg-white"></span>
                    Pure Veg
                  </div>
                  <button 
                    onClick={handleToggleFav}
                    className={`absolute top-3 right-3 w-8 h-8 rounded-full backdrop-blur-sm flex items-center justify-center transition-all cursor-pointer ${
                      isFav 
                        ? 'bg-red-600/20 border border-red-500 text-red-500 shadow-[0_0_10px_rgba(239,68,68,0.4)] hover:bg-red-600 hover:text-white' 
                        : 'bg-black/50 border border-white/20 text-white hover:bg-primary hover:border-primary'
                    }`}
                  >
                    {isFav ? <FaHeart /> : <FaRegHeart />}
                  </button>
                </div>

                {/* Content Section */}
                <div className="p-4 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-heading font-bold text-white text-lg mb-1 truncate group-hover:text-gold transition-colors">{dish.name}</h3>
                    
                    <div className="flex items-center gap-1 mb-4">
                      {[...Array(5)].map((_, i) => (
                        <FaStar key={i} className={`text-[0.6rem] ${i < dish.rating ? 'text-gold' : 'text-gray-600'}`} />
                      ))}
                      <span className="text-[0.6rem] text-gray-400 ml-1">({dish.reviews})</span>
                    </div>
                  </div>

                  <div className="flex justify-between items-center mt-auto">
                    <span className="text-gold font-bold text-xl">₹{dish.price}</span>
                    
                    {quantity === 0 ? (
                      <button 
                        onClick={handleAddToCart}
                        className="bg-primary hover:bg-primary-dark text-white px-4 py-1.5 rounded text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
                      >
                        Add +
                      </button>
                    ) : (
                      <div className="flex items-center gap-2 bg-primary text-white px-2 py-1 rounded text-xs font-bold shadow-lg shadow-primary/20">
                        <button onClick={() => updateQuantity(productId, quantity - 1)} className="w-5 h-5 flex items-center justify-center hover:bg-black/20 rounded-full transition-colors cursor-pointer">-</button>
                        <span className="w-3 text-center">{quantity}</span>
                        <button onClick={() => updateQuantity(productId, quantity + 1)} className="w-5 h-5 flex items-center justify-center hover:bg-black/20 rounded-full transition-colors cursor-pointer">+</button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
};

export default PopularDishes;
