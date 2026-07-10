import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { FiUser, FiMapPin, FiPhone, FiPackage, FiEdit2, FiSave, FiLogOut } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';

const Profile = () => {
  const { isLoggedIn, user, updateProfile, logout } = useAuth();
  
  const [activeTab, setActiveTab] = useState('details');
  const [isEditing, setIsEditing] = useState(false);
  
  const [formData, setFormData] = useState({
    name: user?.name || '',
    phone: user?.phone || '',
    address: user?.address || '',
    profileImage: user?.profileImage || ''
  });

  if (!isLoggedIn) {
    return <Navigate to="/" />;
  }

  const handleSave = () => {
    updateProfile(formData);
    setIsEditing(false);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement('canvas');
          const MAX_WIDTH = 300;
          const MAX_HEIGHT = 300;
          let width = img.width;
          let height = img.height;
          
          if (width > height) {
            if (width > MAX_WIDTH) {
              height *= MAX_WIDTH / width;
              width = MAX_WIDTH;
            }
          } else {
            if (height > MAX_HEIGHT) {
              width *= MAX_HEIGHT / height;
              height = MAX_HEIGHT;
            }
          }
          
          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0, width, height);
          
          // Compress image to ensure it fits comfortably in localStorage
          const compressedDataUrl = canvas.toDataURL('image/jpeg', 0.7);
          setFormData({ ...formData, profileImage: compressedDataUrl });
        };
        img.src = event.target.result;
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] py-20 pt-32 relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/5 blur-[150px] rounded-full pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-gold/5 blur-[150px] rounded-full pointer-events-none"></div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Profile Header */}
        <div className="bg-[#111] rounded-[2.5rem] p-8 md:p-12 mb-10 shadow-2xl flex flex-col md:flex-row items-center gap-10 border border-white/5 relative overflow-hidden group hover:border-gold/20 transition-colors">
          <div className="absolute top-0 left-0 w-full h-40 bg-gradient-to-r from-primary/10 via-background to-gold/10"></div>
          
          <div className="relative z-10 flex flex-col items-center">
            <div className="relative w-40 h-40 rounded-full border-[6px] border-[#0a0a0a] overflow-hidden shadow-[0_0_40px_rgba(212,175,55,0.2)] bg-black flex-shrink-0 group-hover:scale-105 transition-transform duration-500">
              <img src={isEditing ? formData.profileImage : user?.profileImage} alt="Profile" className="w-full h-full object-cover" />
              
              {isEditing && (
                <label className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center cursor-pointer opacity-100 transition-opacity backdrop-blur-sm">
                  <FiEdit2 className="text-white text-3xl mb-1" />
                  <span className="text-white text-[10px] font-bold uppercase tracking-wider">Change Photo</span>
                  <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
                </label>
              )}
            </div>
          </div>
          
          <div className="relative z-10 text-center md:text-left flex-1">
            <h1 className="text-4xl md:text-5xl font-heading font-black text-white mb-3 uppercase tracking-widest">{user?.name}</h1>
            <p className="text-gray-400 font-mono text-lg">{user?.email}</p>
          </div>
          
          <button 
            onClick={logout}
            className="relative z-10 flex items-center gap-3 px-8 py-4 bg-red-500/10 hover:bg-red-500 hover:text-white text-red-500 border border-red-500/20 rounded-full transition-all font-bold tracking-widest uppercase text-sm shadow-lg"
          >
            <FiLogOut className="text-xl" /> Logout
          </button>
        </div>

        {/* Tabs */}
        <div className="flex gap-4 mb-10 overflow-x-auto pb-4 scrollbar-hide">
          <button 
            onClick={() => setActiveTab('details')}
            className={`flex items-center gap-3 px-8 py-4 rounded-full font-black uppercase tracking-widest text-sm transition-all whitespace-nowrap shadow-lg ${
              activeTab === 'details' 
                ? 'bg-primary border-transparent text-white shadow-[0_10px_20px_rgba(181,31,31,0.4)]' 
                : 'bg-[#111] border border-white/5 text-gray-400 hover:text-white hover:border-white/20'
            }`}
          >
            <FiUser className="text-xl" /> My Details
          </button>
          <button 
            onClick={() => setActiveTab('orders')}
            className={`flex items-center gap-3 px-8 py-4 rounded-full font-black uppercase tracking-widest text-sm transition-all whitespace-nowrap shadow-lg ${
              activeTab === 'orders' 
                ? 'bg-gold border-transparent text-black shadow-[0_10px_20px_rgba(212,175,55,0.4)]' 
                : 'bg-[#111] border border-white/5 text-gray-400 hover:text-white hover:border-white/20'
            }`}
          >
            <FiPackage className="text-xl" /> Order History
          </button>
        </div>

        {/* Tab Content */}
        <div className="bg-[#111] rounded-[2.5rem] p-8 md:p-12 shadow-2xl border border-white/5 relative overflow-hidden">
          
          <AnimatePresence mode="wait">
            {activeTab === 'details' && (
              <motion.div 
                key="details"
                initial={{ opacity: 0, x: -20 }} 
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex justify-between items-center mb-10 border-b border-white/10 pb-6">
                  <h2 className="text-2xl md:text-3xl font-heading font-bold text-white flex items-center gap-3">
                    <span className="w-3 h-3 rounded-full bg-primary"></span> Personal Information
                  </h2>
                  {!isEditing ? (
                    <button 
                      onClick={() => setIsEditing(true)}
                      className="flex items-center gap-2 text-gold hover:text-yellow-400 transition-colors text-sm uppercase tracking-widest font-bold bg-gold/10 px-5 py-2.5 rounded-full border border-gold/20"
                    >
                      <FiEdit2 /> Edit Info
                    </button>
                  ) : (
                    <button 
                      onClick={handleSave}
                      className="flex items-center gap-2 text-white transition-colors text-sm uppercase tracking-widest font-bold bg-green-500 hover:bg-green-600 px-6 py-2.5 rounded-full shadow-[0_0_15px_rgba(34,197,94,0.4)]"
                    >
                      <FiSave /> Save Changes
                    </button>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  <div className="group">
                    <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-3">Full Name</label>
                    {isEditing ? (
                      <input 
                        type="text" 
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        className="w-full bg-black/50 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-primary transition-colors text-lg"
                      />
                    ) : (
                      <div className="text-xl text-white font-medium flex items-center gap-4 bg-black/20 p-5 rounded-2xl border border-white/5 group-hover:border-white/10 transition-colors">
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary"><FiUser /></div> 
                        {user?.name}
                      </div>
                    )}
                  </div>

                  <div className="group">
                    <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-3">Phone Number</label>
                    {isEditing ? (
                      <input 
                        type="tel" 
                        value={formData.phone}
                        onChange={(e) => setFormData({...formData, phone: e.target.value})}
                        placeholder="Enter phone number"
                        className="w-full bg-black/50 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-primary transition-colors text-lg"
                      />
                    ) : (
                      <div className="text-xl text-white font-medium flex items-center gap-4 bg-black/20 p-5 rounded-2xl border border-white/5 group-hover:border-white/10 transition-colors">
                        <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center text-gold"><FiPhone /></div> 
                        {user?.phone || <span className="text-gray-600 italic text-sm">Not provided</span>}
                      </div>
                    )}
                  </div>

                  <div className="md:col-span-2 group">
                    <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-3">Delivery Address</label>
                    {isEditing ? (
                      <textarea 
                        value={formData.address}
                        onChange={(e) => setFormData({...formData, address: e.target.value})}
                        placeholder="Enter your full delivery address"
                        rows="3"
                        className="w-full bg-black/50 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-primary transition-colors resize-none text-lg leading-relaxed"
                      ></textarea>
                    ) : (
                      <div className="text-lg text-white font-medium flex items-start gap-4 bg-black/20 p-6 rounded-2xl border border-white/5 group-hover:border-white/10 transition-colors">
                        <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-500 flex-shrink-0"><FiMapPin /></div> 
                        <span className="leading-relaxed mt-1.5">{user?.address || <span className="text-gray-600 italic text-sm">No address saved yet. Edit profile to add.</span>}</span>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'orders' && (
              <motion.div 
                key="orders"
                initial={{ opacity: 0, x: -20 }} 
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex justify-between items-center mb-10 border-b border-white/10 pb-6">
                  <h2 className="text-2xl md:text-3xl font-heading font-bold text-white flex items-center gap-3">
                    <span className="w-3 h-3 rounded-full bg-gold"></span> Past Orders
                  </h2>
                </div>
                
                {!user?.orders || user.orders.length === 0 ? (
                  <div className="text-center py-20 bg-black/20 rounded-3xl border border-white/5">
                    <div className="w-24 h-24 rounded-full bg-white/5 flex items-center justify-center mx-auto mb-6">
                      <FiPackage className="text-4xl text-gray-600" />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-2">No Orders Yet</h3>
                    <p className="text-gray-500">Looks like you haven't tasted our delicious food recently.</p>
                  </div>
                ) : (
                  <div className="space-y-8">
                    {user.orders.map((order, idx) => (
                      <div key={idx} className="bg-black/30 rounded-3xl p-6 md:p-8 border border-white/5 hover:border-gold/20 transition-colors group relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-gold/5 blur-3xl rounded-full group-hover:bg-gold/10 transition-colors pointer-events-none"></div>
                        
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6 border-b border-white/5 pb-6">
                          <div>
                            <div className="flex items-center gap-3 mb-2">
                              <p className="text-gold font-black tracking-widest text-lg">#{order.id}</p>
                              <span className="px-3 py-1 bg-green-500/20 text-green-400 text-[10px] font-bold uppercase tracking-wider rounded-full border border-green-500/20">Completed</span>
                            </div>
                            <p className="text-gray-500 text-sm font-bold uppercase tracking-widest">
                              {new Date(order.date).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })} • {new Date(order.date).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
                            </p>
                          </div>
                          <div className="text-left md:text-right">
                            <p className="text-gray-500 text-xs font-bold uppercase tracking-widest mb-1">Total Amount</p>
                            <p className="text-white font-black text-3xl">₹{order.total}</p>
                          </div>
                        </div>
                        
                        <div className="space-y-3">
                          {order.items.map((item, i) => (
                            <div key={i} className="flex justify-between items-center text-sm p-3 rounded-xl bg-white/5">
                              <span className="text-gray-300 font-medium flex items-center gap-3">
                                <span className="bg-black/50 text-gray-400 px-2 py-1 rounded-md text-xs font-bold">{item.quantity}x</span> 
                                {item.name}
                              </span>
                              <span className="text-gold font-bold">₹{item.price * item.quantity}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default Profile;
