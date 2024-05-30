import { useState, useEffect } from "react";

import "./profile.css";

import AddArea from "../components/AddArea";
import { IArea } from "backend/interfaces";
import TrashCan from "../assets/icons/trash-can.svg";

function Profile() {
  const [showAreaModal, setShowAreaModal] = useState(false),
    [areas, setAreas] = useState<IArea[]>([]);

  function deleteArea(area: IArea) {
    console.log("delete", area);
  }

  useEffect(() => {
    fetch("/api/area")
      .then((response) => response.json())
      .then((result) => {
        setAreas(result);
        console.log(result);
      });
  }, []);

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
              <div className="my-areas-list-row">
                <li
                  className="my-areas-list-row-item"
                  key={area.id}>
                  {area.name}
                </li>
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
