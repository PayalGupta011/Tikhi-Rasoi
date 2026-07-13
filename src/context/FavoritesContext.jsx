/* eslint-disable react-refresh/only-export-components */
import { createContext, useState, useContext, useEffect } from 'react';

const FavoritesContext = createContext();

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState(() => {
    const storedFavorites = localStorage.getItem('tikhiRasoiFavorites');
    if (storedFavorites) {
      try {
        return JSON.parse(storedFavorites);
      } catch (error) {
        console.error('Failed to parse favorites from localStorage', error);
      }
    }
    return [];
  });

  // Save favorites to localStorage when they change
  useEffect(() => {
    localStorage.setItem('tikhiRasoiFavorites', JSON.stringify(favorites));
  }, [favorites]);

  const addToFavorites = (item) => {
    const itemId = item.id || item.name.replace(/\s+/g, '-').toLowerCase();
    if (!favorites.some(fav => fav.id === itemId)) {
      const itemWithId = { ...item, id: itemId };
      setFavorites(prev => [...prev, itemWithId]);
    }
  };

  const removeFromFavorites = (itemId) => {
    const normalizedId = String(itemId);
    setFavorites(prev => prev.filter(fav => String(fav.id) !== normalizedId));
  };

  const isFavorite = (itemId) => {
    const normalizedId = String(itemId);
    return favorites.some(fav => String(fav.id) === normalizedId);
  };

  const toggleFavorite = (item) => {
    const itemId = item.id || item.name.replace(/\s+/g, '-').toLowerCase();
    if (isFavorite(itemId)) {
      removeFromFavorites(itemId);
    } else {
      addToFavorites(item);
    }
  };

  return (
    <FavoritesContext.Provider value={{
      favorites,
      addToFavorites,
      removeFromFavorites,
      isFavorite,
      toggleFavorite
    }}>
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => useContext(FavoritesContext);
