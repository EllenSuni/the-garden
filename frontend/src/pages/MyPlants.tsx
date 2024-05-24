import PlantsRender from "../components/PlantsRender";
import DeletePlantOverlay from "../components/DeletePlantOverlay";
import { useState } from "react";

function MyPlants() {
  const [showModal, setShowModal] = useState(false),
    [id, setId] = useState<number>(),
    [status, setStatus] = useState(0);

  function displayModal(id?: number) {
    setShowModal(!showModal);
    setId(id);
  }

  return (
    <>
      <h1>Mina växter</h1>
      <PlantsRender
        displayModal={displayModal}
        status={status}
      />
      {showModal && (
        <DeletePlantOverlay
          displayModal={displayModal}
          id={id!}
          setStatus={setStatus}
        />
      )}
    </>
  );
}

export default MyPlants;
