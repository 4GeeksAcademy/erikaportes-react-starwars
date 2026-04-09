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

  return (
    
    <div className="container text-white">
      <h1>{data.name}</h1>

      <div className="card p-3 bg-dark text-white">
        {Object.entries(data).map(([key, value]) => (
          <p key={key}>
            <strong>{key}:</strong> {value}
          </p>
        ))}
      </div>
    </div>
  );
};