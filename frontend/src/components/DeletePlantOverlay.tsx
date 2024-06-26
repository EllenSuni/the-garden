import "./delete-plant-overlay.css";

interface PropsType {
  displayModal: () => void;
  id: number;
  setStatus: React.Dispatch<React.SetStateAction<number>>;
}

function DeletePlantOverlay({ displayModal, id, setStatus }: PropsType) {
  function handleDelete() {
    displayModal();
    setStatus(0);
    try {
      fetch("/api/delete-plant", {
        method: "DELETE",
        body: JSON.stringify({ id: id }),
        headers: { "Content-type": "application/json" },
      })
        .then((response) => response.status)
        .then((result) => {
          setStatus(result);
        });
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div className="overlay">
      <div className="content">
        <h3>Radera växt</h3>
        <div>
          <p>Är du säker på att du vill radera "växt"?</p>
          <p>Detta går inte att ångra</p>
        </div>
        <button
          className="delete-plant-btn"
          onClick={() => handleDelete()}>
          Radera
        </button>
        <button
          className="cancel-btn"
          onClick={displayModal}>
          Avbryt
        </button>
      </div>
    </div>
  );
}

export default DeletePlantOverlay;
