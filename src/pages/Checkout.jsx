import { useState, useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { FiMapPin, FiPhone, FiCheckCircle, FiCreditCard, FiArrowRight } from 'react-icons/fi';
import { FaMotorcycle } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

const Checkout = () => {
  const { isLoggedIn, user, updateProfile, addOrderToHistory } = useAuth();
  const { cartItems, cartTotal, clearCart } = useCart();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    paymentMethod: 'cod' 
  });
  
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        phone: user.phone || '',
        address: user.address || '',
        paymentMethod: 'cod'
      });
    }
  }, [user]);

  if (!isLoggedIn) {
    return <Navigate to="/" />;
  }

  if (cartItems.length === 0 && !orderSuccess) {
    return <Navigate to="/menu" />;
  }

  const handlePlaceOrder = () => {
    if (!formData.name || !formData.phone || !formData.address) {
      alert("Please fill in all details for delivery!");
      return;
    }

    setIsPlacingOrder(true);
    
    setTimeout(() => {
      updateProfile({
        phone: formData.phone,
        address: formData.address
      });

      addOrderToHistory({
        items: cartItems,
        total: cartTotal,
        status: 'Processing',
        paymentMethod: formData.paymentMethod
      });

      clearCart();
      setIsPlacingOrder(false);
      setOrderSuccess(true);
      
    }, 1500);
  };

  if (orderSuccess) {
    return (
      <div className="min-h-[80vh] flex flex-col items-center justify-center bg-background py-20 px-4 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-green-500/20 blur-[100px] rounded-full pointer-events-none"></div>
        <motion.div 
          initial={{ scale: 0, rotate: -45 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", duration: 0.8 }}
          className="bg-green-500 text-white rounded-full p-6 mb-8 shadow-[0_0_50px_rgba(34,197,94,0.4)] relative z-10"
        >
          <FiCheckCircle className="text-6xl" />
        </motion.div>
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-5xl font-heading font-black text-white uppercase tracking-widest mb-4 text-center relative z-10"
        >
          Order Placed!
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-gray-400 text-center max-w-md mb-10 relative z-10 text-lg"
        >
          Your delicious food is being prepared. You can track this order in your Profile History.
        </motion.p>
        <motion.button 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          onClick={() => navigate('/profile')}
          className="bg-gold hover:bg-yellow-500 text-black px-10 py-4 rounded-full font-bold uppercase tracking-widest transition-all shadow-[0_0_30px_rgba(212,175,55,0.4)] hover:-translate-y-1 relative z-10"
        >
          View My Orders
        </motion.button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] py-20 pt-32 relative">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 blur-[120px] rounded-full pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-gold/5 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="mb-12 text-center md:text-left flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center border border-primary/20">
            <FaMotorcycle className="text-primary text-xl" />
          </div>
          <div>
            <h1 className="text-3xl md:text-4xl font-heading font-black text-white uppercase tracking-widest">Checkout</h1>
            <p className="text-gray-500 font-bold uppercase tracking-wider text-xs mt-1">Complete your order details</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left: Delivery Details */}
          <div className="lg:col-span-2 space-y-6">
            
            <div className="bg-[#111] p-6 md:p-8 rounded-3xl border border-white/5 shadow-2xl relative overflow-hidden group hover:border-gold/30 transition-colors">
              <h2 className="text-xl font-heading font-bold text-white mb-8 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-gold"></span> Delivery Information
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3">Full Name</label>
                  <input 
                    type="text" 
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full bg-black/50 border border-white/10 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-primary transition-colors text-sm"
                  />
                </div>
                
                <div>
                  <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3">Phone Number</label>
                  <div className="relative">
                    <FiPhone className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-500" />
                    <input 
                      type="tel" 
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      placeholder="e.g. 9876543210"
                      className="w-full bg-black/50 border border-white/10 rounded-xl pl-12 pr-5 py-4 text-white focus:outline-none focus:border-primary transition-colors text-sm"
                    />
                  </div>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3">Delivery Address</label>
                  <div className="relative">
                    <FiMapPin className="absolute left-5 top-5 text-gray-500" />
                    <textarea 
                      value={formData.address}
                      onChange={(e) => setFormData({...formData, address: e.target.value})}
                      placeholder="Enter your complete delivery address..."
                      rows="3"
                      className="w-full bg-black/50 border border-white/10 rounded-xl pl-12 pr-5 py-4 text-white focus:outline-none focus:border-primary transition-colors resize-none text-sm leading-relaxed"
                    ></textarea>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-[#111] p-6 md:p-8 rounded-3xl border border-white/5 shadow-2xl hover:border-gold/30 transition-colors">
              <h2 className="text-xl font-heading font-bold text-white mb-8 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-gold"></span> Payment Method
              </h2>
              
              <div className="space-y-4">
                <label className="flex items-center gap-5 p-5 border-2 border-gold/50 rounded-2xl bg-gold/5 cursor-pointer transition-colors relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-gold/10 blur-2xl rounded-full"></div>
                  <input 
                    type="radio" 
                    name="payment" 
                    value="cod" 
                    checked={formData.paymentMethod === 'cod'} 
                    onChange={(e) => setFormData({...formData, paymentMethod: e.target.value})}
                    className="w-5 h-5 text-gold focus:ring-gold accent-gold relative z-10"
                  />
                  <div className="relative z-10">
                    <span className="block text-white font-bold text-lg mb-1">Cash on Delivery</span>
                    <span className="text-gray-400 text-xs font-bold uppercase tracking-wider">Pay with cash when your food arrives</span>
                  </div>
                </label>
                
                <label className="flex items-center gap-5 p-5 border border-white/5 rounded-2xl opacity-40 cursor-not-allowed bg-black/50">
                  <input type="radio" name="payment" disabled className="w-5 h-5" />
                  <div>
                    <span className="block text-white font-bold text-lg mb-1 flex items-center gap-3"><FiCreditCard /> Pay Online <span className="bg-primary/20 text-primary text-[10px] px-2 py-0.5 rounded-full uppercase">Soon</span></span>
                    <span className="text-gray-400 text-xs font-bold uppercase tracking-wider">Credit card, UPI, Wallets</span>
                  </div>
                </label>
              </div>
            </div>
            
          </div>

          {/* Right: Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-[#111] p-8 rounded-3xl border border-white/10 shadow-2xl sticky top-28 overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-gold"></div>
              
              <h2 className="text-xl font-heading font-bold text-white mb-6">Order Summary</h2>
              
              <div className="space-y-4 mb-6 max-h-[300px] overflow-y-auto scrollbar-hide">
                {cartItems.map(item => (
                  <div key={item.id} className="flex justify-between items-start text-sm border-b border-white/5 pb-4">
                    <div className="flex-1 pr-4">
                      <span className="text-white font-bold block mb-1">{item.name}</span>
                      <span className="text-gray-500 text-xs font-bold uppercase tracking-wider">Qty: {item.quantity}</span>
                    </div>
                    <span className="text-gold font-bold">₹{item.price * item.quantity}</span>
                  </div>
                ))}
              </div>
              
              <div className="space-y-4 mb-8 border-b border-white/5 pb-8 text-sm font-bold uppercase tracking-wider">
                <div className="flex justify-between">
                  <span className="text-gray-500">Subtotal</span>
                  <span className="text-white">₹{cartTotal}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Delivery Fee</span>
                  <span className="text-green-500 bg-green-500/10 px-2 py-1 rounded-md">Free</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Taxes (5%)</span>
                  <span className="text-white">₹{Math.round(cartTotal * 0.05)}</span>
                </div>
              </div>
              
              <div className="flex justify-between items-center mb-10">
                <span className="text-xl font-black text-white uppercase tracking-widest">Total</span>
                <span className="text-3xl font-black text-gold drop-shadow-[0_0_15px_rgba(212,175,55,0.3)]">₹{cartTotal + Math.round(cartTotal * 0.05)}</span>
              </div>
              
              <button 
                onClick={handlePlaceOrder}
                disabled={isPlacingOrder}
                className="w-full bg-primary hover:bg-primary-dark text-white py-5 rounded-2xl font-black uppercase tracking-widest shadow-[0_10px_30px_rgba(181,31,31,0.4)] hover:-translate-y-1 transition-all flex justify-between items-center px-8"
              >
                <span>{isPlacingOrder ? 'Processing...' : 'Place Order'}</span>
                {!isPlacingOrder && <FiArrowRight className="text-xl" />}
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Checkout;
