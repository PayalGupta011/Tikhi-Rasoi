import { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem('tikhiRasoiUser');
    if (storedUser) {
      setIsLoggedIn(true);
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = (email) => {
    // Check if user exists in local storage first to keep their details
    const existingUser = JSON.parse(localStorage.getItem('tikhiRasoiUser'));
    
    const mockUser = existingUser?.email === email ? existingUser : { 
      email, 
      name: email.split('@')[0] || 'User',
      phone: '',
      address: '',
      profileImage: 'https://ui-avatars.com/api/?name=' + (email.split('@')[0] || 'User') + '&background=random&color=fff',
      orders: []
    };
    
    localStorage.setItem('tikhiRasoiUser', JSON.stringify(mockUser));
    setIsLoggedIn(true);
    setUser(mockUser);
    setIsLoginModalOpen(false);
  };

  const logout = () => {
    // We don't remove the user from local storage so we can keep their history, we just clear the session.
    // Actually for a real app we'd clear tokens. Let's just set isLoggedIn to false.
    setIsLoggedIn(false);
    setUser(null);
  };

  const updateProfile = (updatedDetails) => {
    setUser(prevUser => {
      if (!prevUser) return prevUser;
      const updatedUser = { ...prevUser, ...updatedDetails };
      localStorage.setItem('tikhiRasoiUser', JSON.stringify(updatedUser));
      return updatedUser;
    });
  };

  const addOrderToHistory = (orderData) => {
    const newOrder = {
      id: 'TR-' + Math.floor(100000 + Math.random() * 900000),
      date: new Date().toISOString(),
      ...orderData
    };
    
    setUser(prevUser => {
      if (!prevUser) return prevUser;
      const updatedUser = { 
        ...prevUser, 
        orders: [newOrder, ...(prevUser.orders || [])] 
      };
      localStorage.setItem('tikhiRasoiUser', JSON.stringify(updatedUser));
      return updatedUser;
    });
    
    return newOrder;
  };

  const openLoginModal = () => setIsLoginModalOpen(true);
  const closeLoginModal = () => setIsLoginModalOpen(false);

  return (
    <AuthContext.Provider value={{ 
      isLoggedIn, 
      user, 
      login, 
      logout, 
      isLoginModalOpen, 
      openLoginModal, 
      closeLoginModal,
      updateProfile,
      addOrderToHistory
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
