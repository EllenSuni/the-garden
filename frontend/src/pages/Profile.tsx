import { useState, useEffect } from "react";

import "./profile.css";

import AddArea from "../components/AddArea";
import { IArea } from "backend/interfaces";
import TrashCan from "../assets/icons/trash-can.svg";

function Profile() {
  const [showAreaModal, setShowAreaModal] = useState(false),
    [areas, setAreas] = useState<IArea[]>([]),
    [status, setStatus] = useState(0);

  function deleteArea(area: IArea) {
    setStatus(0);
    try {
      fetch("/api/area", {
        method: "DELETE",
        body: JSON.stringify({ id: area.id }),
        headers: { "Content-type": "application/json" },
      }).then((result) => {
        if (result.status === 201) {
          setStatus(result.status);
          alert("Område borttaget");
        } else if (result.status === 400) {
          alert("Ta bort växter ur området innan du raderar det");
        }
      });
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetch("/api/area")
      .then((response) => response.json())
      .then((result) => {
        setAreas(result);
      });
  }, [status]);

  return (
    <section className="profile-page">
      <h1>Profil</h1>
      <div className="my-areas">
        <h3>Mina områden</h3>
        <button onClick={() => setShowAreaModal(true)}>Lägg till</button>
        {showAreaModal && <AddArea modal={setShowAreaModal} />}
        <div>
          <ul>
            {areas.map((area) => (
              <div
                className="my-areas-list-row"
                key={area.id}>
                <li className="my-areas-list-row-item">{area.name}</li>
                <img
                  className="my-areas-trash-can"
                  src={TrashCan}
                  alt="Ta bort"
                  onClick={() => deleteArea(area)}
                />
              </div>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

export default Profile;
