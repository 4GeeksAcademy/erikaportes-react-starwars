import { useContext, useEffect } from "react";
import { GlobalContext } from "../context/GlobalContext";
import Card from "../components/Card";

export const Home = () => {
  const { store, actions } = useContext(GlobalContext);

  useEffect(() => {
  actions.fetchData("people", "people");
  actions.fetchData("planets", "planets");
  actions.fetchData("vehicles", "vehicles");
}, [actions]);

  return (
    <div className="container text-white">

      <h2>Personajes</h2>
      <div className="d-flex overflow-auto">
        {store.people.map(item => (
          <Card key={item.uid} item={item} type="people" />
        ))}
      </div>

      <h2>Planetas</h2>
      <div className="d-flex overflow-auto">
        {store.planets.map(item => (
          <Card key={item.uid} item={item} type="planets" />
        ))}
      </div>

      <h2>Vehículos</h2>
      <div className="d-flex overflow-auto">
        {store.vehicles.map(item => (
          <Card key={item.uid} item={item} type="vehicles" />
        ))}
      </div>

    </div>
  );
};