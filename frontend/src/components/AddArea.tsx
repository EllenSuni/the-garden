import { useState } from "react";

import "./add-area.css";

import XIcon from "../assets/icons/x.svg";

interface PropsType {
  modal: (state: boolean) => void;
}

function AddArea({ modal }: PropsType) {
  const [newArea, setNewArea] = useState<string>(),
    [error, setError] = useState<string>();

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
            modal(false);
          } else {
            setError("Fyll i ett namn på området");
            console.log("error");
          }
        });
    } catch (error) {
      setError("Fyll i ett namn på området");
      console.log(error);
    }
  }

  return (
    <div className="overlay">
      <div className="content">
        <div className="area-flex">
          <h3>Lägg till område</h3>
          <img
            className="close-area"
            src={XIcon}
            alt="Stäng"
            onClick={() => modal(false)}
          />
        </div>
        <form onSubmit={addNewArea}>
          <div className="label-left wrapper">
            <label htmlFor="areaName">Namn</label>
            <input
              type="text"
              id="areaName"
              onChange={(e) => setNewArea(e.target.value)}
            />
          </div>
          {error && <p className="disclaimer">*{error}</p>}
          <input
            type="submit"
            value="Lägg till"
          />
        </form>
      </div>
    </div>
  );
}

export default AddArea;
