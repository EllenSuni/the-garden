import { useEffect, useState } from "react";

import PlantCard from "./PlantCard";

import { IFullPlant } from "../../../backend/interfaces";

function PlantsRender() {
  const [plants, setPlants] = useState<IFullPlant[]>([]),
    [status, setStatus] = useState<number>(0);

  useEffect(() => {
    fetch("http://localhost:3000/get-plants")
      .then((response) => response.json())
      .then((result: IFullPlant[]) => {
        setPlants(result);
      });
  }, [status]);

  return (
    <>
      <h2>Växter</h2>
      {plants.map((plant) => (
        <PlantCard
          key={plant.id}
          plant={plant}
          setStatus={setStatus}
        />
      ))}
    </>
  );
}

export default PlantsRender;
