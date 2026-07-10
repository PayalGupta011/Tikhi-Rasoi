import { motion, AnimatePresence } from 'framer-motion';
import { FiX, FiShoppingBag, FiMinus, FiPlus, FiTrash2, FiArrowRight } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';

const CartDrawer = () => {
  const { isCartOpen, setIsCartOpen, cartItems, updateQuantity, removeFromCart, cartTotal } = useCart();

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsCartOpen(false)}
            className="fixed inset-0 bg-black/80 backdrop-blur-md z-[1001]"
          ></motion.div>
          
          <motion.div 
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-full sm:w-[450px] bg-[#0a0a0a] border-l border-white/5 z-[1002] flex flex-col shadow-2xl overflow-hidden"
          >
            {/* Ambient Background Glow */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 blur-[100px] rounded-full pointer-events-none"></div>

            {/* Header */}
            <div className="relative z-10 flex items-center justify-between p-6 border-b border-white/5 bg-[#0f0f0f]">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center border border-gold/20">
                  <FiShoppingBag className="text-gold text-xl" />
                </div>
                <div>
                  <h2 className="text-2xl font-heading font-black text-white uppercase tracking-widest">Your Order</h2>
                  <p className="text-xs text-gray-500 font-bold uppercase tracking-wider">{cartItems.length} Items Selected</p>
                </div>
              </div>
              <button 
                onClick={() => setIsCartOpen(false)}
                className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-gray-400 hover:text-white transition-all hover:rotate-90 border border-white/10"
              >
                <FiX className="text-xl" />
              </button>
            </div>

            {/* Cart Items */}
            <div className="relative z-10 flex-1 overflow-y-auto p-6 scrollbar-hide">
              {cartItems.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center gap-6">
                  <div className="w-32 h-32 rounded-full bg-white/5 flex items-center justify-center border border-white/10 mb-4">
                    <FiShoppingBag className="text-6xl text-gray-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-heading font-bold text-white mb-2">Your Cart is Empty</h3>
                    <p className="text-gray-400 text-sm">Looks like you haven't made your choice yet.</p>
                  </div>
                  <button 
                    onClick={() => setIsCartOpen(false)}
                    className="mt-4 text-black bg-gold hover:bg-yellow-500 px-8 py-3 rounded-full text-sm font-bold uppercase tracking-widest transition-all shadow-[0_0_20px_rgba(212,175,55,0.3)]"
                  >
                    Explore Menu
                  </button>
                </div>
              ) : (
                <div className="space-y-6">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex gap-4 group">
                      <div className="w-24 h-24 rounded-2xl overflow-hidden bg-[#1a1a1a] border border-white/10 flex-shrink-0 shadow-lg group-hover:border-gold/30 transition-colors">
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                      </div>
                      <div className="flex-1 flex flex-col justify-between py-1">
                        <div className="flex justify-between items-start">
                          <h4 className="text-white font-bold leading-tight line-clamp-2 max-w-[70%]">{item.name}</h4>
                          <button 
                            onClick={() => removeFromCart(item.id)}
                            className="text-gray-500 hover:text-primary transition-colors"
                          >
                            <FiTrash2 />
                          </button>
                        </div>
                        
                        <div className="flex items-end justify-between mt-2">
                          <div className="flex items-center gap-3 bg-[#111] border border-white/10 rounded-full px-3 py-1.5 shadow-inner">
                            <button 
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="w-6 h-6 rounded-full flex items-center justify-center text-gray-400 hover:bg-white/10 hover:text-white transition-colors"
                            >
                              <FiMinus className="text-xs" />
                            </button>
                            <span className="text-white font-bold text-sm w-4 text-center">{item.quantity}</span>
                            <button 
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="w-6 h-6 rounded-full flex items-center justify-center text-gray-400 hover:bg-white/10 hover:text-white transition-colors"
                            >
                              <FiPlus className="text-xs" />
                            </button>
                          </div>
                          <p className="text-gold font-black text-lg">₹{item.price * item.quantity}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            {cartItems.length > 0 && (
              <div className="relative z-10 p-6 bg-[#0f0f0f] border-t border-white/5">
                <div className="flex justify-between items-center mb-6">
                  <span className="text-gray-400 font-bold uppercase tracking-wider text-sm">Subtotal</span>
                  <span className="text-3xl font-black text-white">₹{cartTotal}</span>
                </div>
                <Link 
                  to="/checkout"
                  onClick={() => setIsCartOpen(false)}
                  className="w-full bg-primary hover:bg-primary-dark text-white py-4 rounded-xl font-bold uppercase tracking-widest flex justify-between items-center px-6 shadow-[0_10px_30px_rgba(181,31,31,0.4)] hover:-translate-y-1 transition-all"
                >
                  <span>Checkout</span>
                  <FiArrowRight className="text-xl" />
                </Link>
                <p className="text-center text-gray-500 text-[10px] uppercase tracking-widest mt-4 font-bold">Taxes calculated at checkout</p>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CartDrawer;
