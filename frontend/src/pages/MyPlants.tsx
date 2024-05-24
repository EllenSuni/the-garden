import PlantsRender from "../components/PlantsRender";
import DeletePlantOverlay from "../components/DeletePlantOverlay";
import { useState } from "react";

function MyPlants() {
  const [showModal, setShowModal] = useState(false),
    [id, setId] = useState<number>();

  function displayModal(id: number) {
    setShowModal(!showModal);
    setId(id);
    console.log(id);
  }

  function deletePlant() {
    console.log(id);
    try {
      fetch("http://localhost:3000/delete-plant", {
        method: "DELETE",
        body: JSON.stringify({ id: id }),
        headers: { "Content-type": "application/json" },
      })
        .then((response) => response.status)
        .then((result) => {
          // setStatus(result);
          console.log(result);
        });
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <h1>Mina växter</h1>
      <PlantsRender displayModal={displayModal} />
      {showModal && (
        <DeletePlantOverlay
          displayModal={displayModal}
          id={id!}
        />
      )}
    </>
  );
}

export default MyPlants;
