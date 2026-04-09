import { useContext } from "react";
import { Link } from "react-router-dom";
import { GlobalContext } from "../context/GlobalContext";

const Card = ({ item, type }) => {
    const { store, actions } = useContext(GlobalContext);
    const isFavorite = store.favorites.some(f => f.uid === item.uid && f.type === type);

    const img = `https://picsum.photos/seed/${type}-${item.uid}/300/200`;

    return (
        <div className="card m-2" style={{ minWidth: "200px" }}>
            <img
                src={img}
                className="card-img-top"
                alt={item.name}
                onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "https://picsum.photos/300/200";
                }}
            />

            <div className="card-body">
                <h5>{item.name}</h5>

                <Link
                    to={`/details/${type}/${item.uid}`}
                    className="btn btn-primary btn-sm"
                >
                    Ver más
                </Link>

                <button
                    className={`btn btn-sm ms-2 ${isFavorite ? "btn-danger" : "btn-outline-warning"
                        }`}
                    onClick={() =>
                        isFavorite
                            ? actions.removeFavorite(item.uid, type)
                            : actions.addFavorite(item, type)
                    }
                >
                    {isFavorite ? "💔" : "💛"}
                </button>

            </div>
        </div>
    );
};

export default Card;