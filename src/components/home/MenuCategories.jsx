import { useNavigate } from 'react-router-dom';

const categories = [
  { name: 'PIZZA', img: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=600&q=80', id: 'wood-fire-pizza' },
  { name: 'CHINESE', img: 'https://images.unsplash.com/photo-1585032226651-759b368d7246?auto=format&fit=crop&w=600&q=80', id: 'chinese' },
  { name: 'MAIN COURSE', img: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=600&q=80', id: 'veg-main-course' },
  { name: 'TANDOOR', img: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=600&q=80', id: 'tandoor-specials' },
  { name: 'SHAKES', img: '/shake.jpg', id: 'shakes' },
  { name: 'NOODLES', img: '/noodles.jpg', id: 'chinese' },
  { name: 'MAGGI', img: '/maggi.jpg', id: 'maggie' },
  { name: 'BEVERAGES', img: '/beverages.jpg', id: 'coffee' },
];

const MenuCategories = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-cream pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center mb-10">
          <div className="flex items-center justify-center gap-4 mb-2">
            <div className="h-[1px] w-12 bg-gold"></div>
            <h2 className="text-3xl font-heading font-bold text-black uppercase tracking-wider">Explore Our Menu</h2>
            <div className="h-[1px] w-12 bg-gold"></div>
          </div>
          <p className="text-primary text-sm font-bold tracking-widest uppercase">Select a Category</p>
        </div>

        {/* Categories Flex/Grid */}
        <div className="flex overflow-x-auto pb-4 hide-scrollbar justify-start md:justify-center gap-6 md:gap-10">
          {categories.map((cat, idx) => (
            <div 
              key={idx} 
              onClick={() => navigate(`/menu?category=${cat.id}`, { state: { category: cat.id } })}
              className="flex flex-col items-center gap-4 min-w-[100px] cursor-pointer group"
            >
              <div className="w-28 h-28 md:w-32 md:h-32 rounded-full bg-white border-2 border-gray-100 shadow-lg overflow-hidden flex items-center justify-center group-hover:border-primary group-hover:shadow-[0_0_20px_rgba(181,31,31,0.4)] transition-all duration-300 group-hover:-translate-y-2 relative">
                {cat.img ? (
                  <img src={cat.img} alt={cat.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                ) : (
                  <cat.icon className="text-4xl md:text-5xl text-primary group-hover:scale-110 transition-transform duration-300" />
                )}
              </div>
              <span className="text-xs md:text-sm font-bold text-black uppercase tracking-wider group-hover:text-primary transition-colors">{cat.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MenuCategories;
