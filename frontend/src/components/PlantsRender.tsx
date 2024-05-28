import { useEffect, useState } from "react";

import PlantCard from "./PlantCard";

import { IFullPlant } from "../../../backend/interfaces";

interface PropsType {
  displayModal: (id: number) => void;
  status: number;
}

function PlantsRender({ displayModal, status }: PropsType) {
  const [plants, setPlants] = useState<IFullPlant[]>([]);

  useEffect(() => {
    fetch("/get-plants")
      .then((response) => response.json())
      .then((result: IFullPlant[]) => {
        setPlants(result);
      });
  }, [status]);

  return (
    <>
      <h1 className="my-plants-heading">Växter</h1>
      {plants.map((plant) => (
        <PlantCard
          key={plant.id}
          plant={plant}
          displayModal={displayModal}
        />
      ))}
    </>
  );
}

export default PlantsRender;
