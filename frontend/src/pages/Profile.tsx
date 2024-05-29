import { useState } from "react";
import AddArea from "../components/AddArea";

function Profile() {
  const [showAreaModal, setShowAreaModal] = useState(false);
  return (
    <>
      <h1>profile</h1>
      <button onClick={() => setShowAreaModal(true)}>Lägg till område</button>
      {showAreaModal && <AddArea />}
    </>
  );
}

export default Profile;
