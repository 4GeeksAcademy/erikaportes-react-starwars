import { useContext } from "react";
import { Link } from "react-router-dom";
import { GlobalContext } from "../context/GlobalContext";

const Card = ({ item, type }) => {
    const { actions } = useContext(GlobalContext);

    // ✅ Imagen única por item (NO cambia al recargar)
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
                    className="btn btn-outline-warning btn-sm ms-2"
                    onClick={() => actions.addFavorite({ ...item, type })}
                >
                    ❤️
                </button>
            </div>
        </div>
    );
};

export default Card;