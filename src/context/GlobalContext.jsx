import { createContext, useEffect, useState } from "react";

const BASE_URL = "https://www.swapi.tech/api";

export const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {

  const [store, setStore] = useState(() => {
  const favorites = JSON.parse(localStorage.getItem("favorites")) || [];

  return {
    people: [],
    planets: [],
    vehicles: [],
    favorites
  };
});

  const addFavorite = (item, type) => {
    setStore(prev => {
      const exists = prev.favorites.some(
        f => f.uid === item.uid && f.type === type
      );

      if (exists) return prev;

      return {
        ...prev,
        favorites: [
          ...prev.favorites,
          {
            uid: item.uid,
            name: item.name,
            type: type
          }
        ]
      };
    });
  };

  const removeFavorite = (uid, type) => {
    setStore(prev => ({
      ...prev,
      favorites: prev.favorites.filter(
        fav => !(fav.uid === uid && fav.type === type)
      )
    }));
  };

  const fetchData = async (endpoint, key) => {
    try {
      const res = await fetch(`${BASE_URL}/${endpoint}`);
      const data = await res.json();

      if (!Array.isArray(data.results)) return;

      setStore(prev => ({
        ...prev,
        [key]: data.results
      }));
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(store.favorites));
  }, [store.favorites]);

  return (
    <GlobalContext.Provider
      value={{
        store,
        actions: { fetchData, addFavorite, removeFavorite }
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};














