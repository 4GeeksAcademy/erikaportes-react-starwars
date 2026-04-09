import { useContext, useEffect } from "react";
import { GlobalContext } from "../context/GlobalContext";
import Card from "../components/Card";

export const Home = () => {
  const { store, actions } = useContext(GlobalContext);

  useEffect(() => {
    actions.fetchData("people", "people");
    actions.fetchData("planets", "planets");
    actions.fetchData("vehicles", "vehicles");
  }, []);

  const renderList = (list, type) => {
    if (!Array.isArray(list) || list.length === 0) {
      return <p className="text-white">Loading...</p>;
    }

    return list.map(item => (
      <Card key={item.uid} item={item} type={type} />
    ));
  };

  return (
    <div className="container text-white">

      <h2>Personajes</h2>
      <div className="d-flex overflow-auto">
        {renderList(store.people, "people")}
      </div>

      <h2>Planetas</h2>
      <div className="d-flex overflow-auto">
        {renderList(store.planets, "planets")}
      </div>

      <h2>Vehículos</h2>
      <div className="d-flex overflow-auto">
        {renderList(store.vehicles, "vehicles")}
      </div>

    </div>
  );
};