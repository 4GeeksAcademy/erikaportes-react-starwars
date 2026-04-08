import { useContext } from "react";
import { GlobalContext } from "../context/GlobalContext";
import { Link } from "react-router-dom";

export const Navbar = () => {
  const { store, actions } = useContext(GlobalContext);

  return (
    <nav className="navbar navbar-dark bg-dark px-4">
      
      <Link to="/" className="navbar-brand text-white">
        Star Wars Databank
      </Link>

      <div className="dropdown">
        <button
          className="btn btn-warning dropdown-toggle"
          data-bs-toggle="dropdown"
        >
          Favoritos ({store.favorites.length})
        </button>

        <ul className="dropdown-menu dropdown-menu-end">

          {store.favorites.length === 0 && (
            <li className="px-3 text-muted">No hay favoritos</li>
          )}

          {store.favorites.map((fav) => (
            <li
              key={fav.uid}
              className="d-flex justify-content-between align-items-center px-3"
            >
              <span>{fav.name}</span>

              <button
                className="btn btn-sm btn-danger"
                onClick={() => actions.removeFavorite(fav.uid)}
              >
                ❌
              </button>
            </li>
          ))}

        </ul>
      </div>
    </nav>
  );
};