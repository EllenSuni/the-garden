import { useState } from "react";

function AddArea() {
  const [newArea, setNewArea] = useState<string>();

  function addNewArea() {
    try {
      fetch("/api/area", {
        method: "POST",
        body: JSON.stringify({ name: newArea }),
        headers: { "Content-type": "application/json" },
      })
        .then((response) => response.status)
        .then((result) => {
          if (result === 201) {
            window.location.reload();
          } else {
            console.log("error");
          }
        });
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <h3>Lägg till område</h3>
      <form onSubmit={addNewArea}>
        <div className="label-left wrapper">
          <label htmlFor="areaName">Namn</label>
          <input
            type="text"
            id="areaName"
            onChange={(e) => setNewArea(e.target.value)}
          />
        </div>
        <input
          type="submit"
          value="Lägg till"
        />
      </form>
    </>
  );
}

export default AddArea;
