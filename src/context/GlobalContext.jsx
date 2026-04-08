import { createContext, useEffect, useState } from "react";

const BASE_URL = "https://www.swapi.tech/api";

export const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {

  const [store, setStore] = useState(() => {
    try {
      return {
        people: [],
        planets: [],
        vehicles: [],
        favorites: JSON.parse(localStorage.getItem("favorites")) || []
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

  // ✅ Persistencia segura
  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(store.favorites));
  }, [store.favorites]);

  // ✅ Fetch reutilizable y seguro
  const fetchData = async (endpoint, key) => {
    try {
      const res = await fetch(`${BASE_URL}/${endpoint}`);
      const data = await res.json();

      setStore(prev => ({
        ...prev,
        [key]: data?.results || []
      }));

    } catch (err) {
      console.error("Error fetching:", err);
    }
  };

  // ✅ Agregar favorito (sin duplicados)
  const addFavorite = (item) => {
    setStore(prev => {
      const exists = prev.favorites.some(f => f.uid === item.uid);
      if (exists) return prev;

      return {
        ...prev,
        favorites: [...prev.favorites, item]
      };
    });
  };

  // ✅ Eliminar favorito
  const removeFavorite = (uid) => {
    setStore(prev => ({
      ...prev,
      favorites: prev.favorites.filter(f => f.uid !== uid)
    }));
  };

  return (
    <GlobalContext.Provider
      value={{
        store,
        actions: {
          fetchData,
          addFavorite,
          removeFavorite
        }
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};