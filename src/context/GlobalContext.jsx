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

    // ✅ Fetch optimizado (NO repite llamadas)
    const fetchData = async (endpoint, key) => {
        if (store[key].length > 0) return;

        try {
            const res = await fetch(`${BASE_URL}/${endpoint}`);
            const data = await res.json();

            if (!data.results) throw new Error("No results");

            setStore(prev => ({
                ...prev,
                [key]: data.results
            }));

        } catch (err) {
            console.error(`Error fetching ${endpoint}:`, err);
        }
    };

    // ✅ Favoritos sin duplicados
    const addFavorite = (item) => {
        setStore(prev => {
            if (prev.favorites.some(f => f.uid === item.uid)) return prev;

            return {
                ...prev,
                favorites: [...prev.favorites, item]
            };
        });
    };

    const removeFavorite = (uid) => {
        setStore(prev => ({
            ...prev,
            favorites: prev.favorites.filter(f => f.uid !== uid)
        }));
    };

    // ✅ Persistencia
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