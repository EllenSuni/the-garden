import { useEffect, useState } from "react";

import PlantCard from "./PlantCard";

import { PlantType } from "../interfaces";

function PlantsRender() {
  const [plants, setPlants] = useState<PlantType[]>([]);
  useEffect(() => {
    fetch("http://localhost:3000/get-plants")
      .then((response) => response.json())
      .then((result: PlantType[]) => {
        setPlants(result);
      });
  }, []);

  console.log(plants);

  return (
    <>
      <h2>Växter</h2>
      {plants.map((plant) => (
        <PlantCard
          key={plant.plantid}
          plant={plant}
        />
      ))}
    </>
  );
}

export default PlantsRender;
