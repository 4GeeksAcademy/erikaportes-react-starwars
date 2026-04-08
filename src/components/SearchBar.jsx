import { useContext, useState } from "react";
import { GlobalContext } from "../context/GlobalContext";
import { useNavigate } from "react-router-dom";

const SearchBar = () => {
    const { store } = useContext(GlobalContext);
    const [query, setQuery] = useState("");
    const navigate = useNavigate();

    const allItems = [
        ...store.people.map(i => ({ ...i, type: "people" })),
        ...store.planets.map(i => ({ ...i, type: "planets" })),
        ...store.vehicles.map(i => ({ ...i, type: "vehicles" }))
    ];

    const filtered = allItems.filter(item =>
        item.name.toLowerCase().includes(query.toLowerCase())
    );

    return (
        <div className="position-relative">
            <input
                className="form-control"
                placeholder="Buscar..."
                onChange={(e) => setQuery(e.target.value)}
            />

            {query && (
                <ul className="list-group position-absolute w-100">
                    {filtered.slice(0, 5).map(item => (
                        <li
                            key={item.uid}
                            className="list-group-item"
                            onClick={() => {
                                navigate(`/details/${item.type}/${item.uid}`);
                                setQuery("");
                            }}
                            style={{ cursor: "pointer" }}
                        >
                            {item.name}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default SearchBar;

