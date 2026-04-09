import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { GlobalContext } from "../context/GlobalContext";
import SearchBar from "./SearchBar";

export const Navbar = () => {
  const { store, actions } = useContext(GlobalContext);
  const [open, setOpen] = useState(false);

  const favorites = store?.favorites || [];

  return (
    <nav className="navbar navbar-dark bg-black px-4 py-2 border-bottom border-warning">

      <div className="d-flex align-items-center justify-content-between w-100">

        {/* LEFT */}
        <Link to="/" className="navbar-brand text-warning fw-bold fs-4 m-0">
          ⭐ Star Wars Databank
        </Link>

        {/* CENTER */}
        <div className="d-flex justify-content-center flex-grow-1">
          <div style={{ width: "350px" }}>
            <SearchBar />
          </div>
        </div>

        {/* RIGHT */}
        <div className="position-relative d-flex align-items-center">
          <button
            className="btn btn-outline-warning d-flex align-items-center gap-2"
            onClick={() => setOpen(!open)}
          >
            ⭐
            <span>Favoritos</span>
            <span className="badge bg-warning text-dark">
              {favorites.length}
            </span>
          </button>

          <div className={`dropdown-custom ${open ? "show" : ""}`}>
            {favorites.length === 0 ? (
              <div className="empty">No hay favoritos</div>
            ) : (
              favorites.map((fav) => (
                <div
                  key={`${fav.uid}-${fav.type}`}
                  className="d-flex justify-content-between align-items-center w-100 px-2 py-1"
                >
                  <Link
                    to={`/details/${fav.type}/${fav.uid}`}
                    className="fav-link"
                    onClick={() => setOpen(false)}
                  >
                    {fav.name}
                  </Link>

                  <button
                    className="btn bg-transparent border-0 p-0 ms-2"
                    onClick={() =>
                      actions.removeFavorite(fav.uid, fav.type)
                    }
                  >
                    🗑️
                  </button>
                </div>
              ))
            )}
          </div>
        </div>

      </div>
    </nav>
  );
};



