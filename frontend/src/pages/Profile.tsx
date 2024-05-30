import { useState } from "react";
import AddArea from "../components/AddArea";

function Profile() {
  const [showAreaModal, setShowAreaModal] = useState(false);

  return (
    <>
      <h1>Profil</h1>
      <button onClick={() => setShowAreaModal(true)}>Lägg till område</button>
      {showAreaModal && <AddArea modal={setShowAreaModal} />}
    </>
  );
}

export default Profile;
