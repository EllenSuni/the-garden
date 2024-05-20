import { useEffect, useState } from "react";

import PlantCard from "./PlantCard";

import { IFullPlant } from "../../../backend/interfaces";

function PlantsRender() {
  const [plants, setPlants] = useState<IFullPlant[]>([]);

  useEffect(() => {
    fetch("http://localhost:3000/get-plants")
      .then((response) => response.json())
      .then((result: IFullPlant[]) => {
        setPlants(result);
      });
  }, []);

  return (
    <>
      <h2>Växter</h2>
      {plants.map((plant) => (
        <PlantCard
          key={plant.id}
          plant={plant}
        />
      ))}
    </>
  );
}

export default PlantsRender;
