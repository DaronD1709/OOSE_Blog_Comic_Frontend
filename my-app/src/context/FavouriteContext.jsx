import { createContext, useState, useEffect, useContext } from 'react';

export const FavouriteContext = createContext();

export const FavouriteProvider = ({ children }) => {
  const [favourites, setFavourites] = useState([]);

  // Load favourites from localStorage when component mounts
  useEffect(() => {
    const storedFavourites = localStorage.getItem('favourites');
    if (storedFavourites) {
      setFavourites(JSON.parse(storedFavourites));
    }
  }, []);

  // Save favourites to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('favourites', JSON.stringify(favourites));
  }, [favourites]);

  const addFavourite = (blogId) => {
    if (!favourites.includes(blogId)) {
      setFavourites([...favourites, blogId]);
    }
  };

  const removeFavourite = (blogId) => {
    setFavourites(favourites.filter(id => id !== blogId));
  };

  const isFavourite = (blogId) => {
    return favourites.includes(blogId);
  };

  const getFavourites = () => {
    return favourites;
  };

  return (
    <FavouriteContext.Provider
      value={{
        favourites,
        addFavourite,
        removeFavourite,
        isFavourite,
        getFavourites,
      }}
    >
      {children}
    </FavouriteContext.Provider>
  );
};

export function useFavourite() {
  const context = useContext(FavouriteContext);
  if (!context) {
    throw new Error('useFavourite must be used within a FavouriteProvider');
  }
  return context;
}

export default FavouriteProvider; 