import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export const Details = () => {
  const { type, uid } = useParams();
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch(`https://www.swapi.tech/api/${type}/${uid}`)
      .then(res => res.json())
      .then(res => setData(res.result.properties));
  }, [type, uid]);

  if (!data) return <p>Loading...</p>;

  return (
    <div className="container">
      <h1>{data.name}</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
};