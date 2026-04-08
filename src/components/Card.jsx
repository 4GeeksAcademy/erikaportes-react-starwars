import { useContext } from "react";
import { Link } from "react-router-dom";
import { GlobalContext } from "../context/GlobalContext";

const Card = ({ item, type }) => {
    const { actions } = useContext(GlobalContext);

    const img = `https://starwars-visualguide.com/assets/img/${type}/${item.uid}.jpg`;

    return (
        <div className="card m-2" style={{ minWidth: "200px" }}>
            <img
                src={img}
                className="card-img-top"
                onError={(e) => e.target.src = "https://via.placeholder.com/200"}
            />

            <div className="card-body">
                <h5>{item.name}</h5>

                <Link to={`/details/${type}/${item.uid}`} className="btn btn-primary btn-sm">
                    Ver más
                </Link>

                <button
                    className="btn btn-outline-warning btn-sm ms-2"
                    onClick={() => actions.addFavorite(item)}
                >
                    ❤️
                </button>
            </div>
        </div>
    );
};

export default Card;