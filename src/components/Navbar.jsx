import { useContext } from "react";
import { GlobalContext } from "../context/GlobalContext";
import { Link } from "react-router-dom";
import SearchBar from "./SearchBar";

export const Navbar = () => {
  const { store, actions } = useContext(GlobalContext);

  return (
    <nav className="navbar navbar-dark bg-dark px-4">

      <SearchBar />

      <Link to="/" className="navbar-brand text-white">
        Star Wars Databank
      </Link>

      <div className="dropdown">
        <button
          className="btn btn-warning dropdown-toggle"
          data-bs-toggle="dropdown"
        >
          Favoritos ({store.favorites?.length || 0})
        </button>

        <ul className="dropdown-menu dropdown-menu-end">

          {store.favorites?.length === 0 && (
            <li className="dropdown-item text-muted">
              No hay favoritos
            </li>
          )}

          {store.favorites?.map((fav) => (
            <li key={`${fav.uid}-${fav.type}`}>

              <div className="dropdown-item d-flex justify-content-between align-items-center">

                {/* 👉 link */}
                <Link
                  to={`/details/${fav.type}/${fav.uid}`}
                  className="text-decoration-none text-dark"
                >
                  {fav.name}
                </Link>

                {/* 👉 botón eliminar */}
                <button
                  className="btn btn-sm btn-danger ms-2"
                  onClick={(e) => {
                    e.preventDefault();      // 🔥 clave
                    e.stopPropagation();     // 🔥 clave
                    actions.removeFavorite(fav.uid, fav.type);
                  }}
                >
                  ❌
                </button>

              </div>

            </li>
          ))}

        </ul>
      </div>
    </nav>
  );
};