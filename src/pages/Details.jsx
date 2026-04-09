import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export const Details = () => {
  const { type, uid } = useParams();
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch(`https://www.swapi.tech/api/${type}/${uid}`)
      .then(res => res.json())
      .then(res => setData(res.result?.properties))
      .catch(() => setData(null));
  }, [type, uid]);

  if (!data) {
    return <p className="text-white">Loading...</p>;
  }

  const img = `https://picsum.photos/seed/${type}-${uid}/600/400`;
  const fallback = `https://picsum.photos/seed/fallback-${type}-${uid}/600/400`;

  return (
    <div className="container text-white">
      <h1 className="mb-3">{data.name}</h1>

      <div className="card p-3 bg-dark text-white">

        <img
          src={img}
          alt={data.name}
          className="img-fluid mb-3"
          style={{ width: "100%", maxHeight: "400px", objectFit: "cover" }}
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = fallback;
          }}
        />

        {Object.entries(data).map(([key, value]) => (
          <p key={key}>
            <strong>{key}:</strong> {value}
          </p>
        ))}

      </div>
    </div>
  );
};