import { createContext, useEffect, useState } from "react";

const BASE_URL = "https://www.swapi.tech/api";

export const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {

  const [store, setStore] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("store")) || {
        people: [],
        planets: [],
        vehicles: [],
        favorites: []
      };
    } catch {
      return {
        people: [],
        planets: [],
        vehicles: [],
        favorites: []
      };
    }
  });

  const fetchData = async (endpoint, key) => {
    setStore(prev => {
      if (prev[key]?.length > 0) return prev;
      return prev;
    });

    try {
      const res = await fetch(`${BASE_URL}/${endpoint}`);
      const data = await res.json();

      if (!Array.isArray(data.results)) throw new Error("No results");

      setStore(prev => ({
        ...prev,
        [key]: data.results
      }));

    } catch (err) {
      console.error(`Error fetching ${endpoint}:`, err);
    }
  };

  const addFavorite = (item, type) => {
    setStore(prev => {
      if (prev.favorites.some(f => f.uid === item.uid)) return prev;

      return {
        ...prev,
        favorites: [...prev.favorites, { ...item, type }]
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

  useEffect(() => {
    localStorage.setItem("store", JSON.stringify(store));
  }, [store]);

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