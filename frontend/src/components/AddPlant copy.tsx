import InputField from "./InputField";

function AddPlant() {
  return (
    <>
      <h2>Lägg till växt</h2>
      <h4>Information</h4>
      <p>Fält markerade med * är obligatoriska</p>
      <form>
        <InputField
          labelFor="plantName"
          label="Namn"
          type="text"
          name="plantName"
          id="plantName"
        />
        <InputField
          labelFor="sciName"
          label="Vetenskapligt namn"
          type="text"
          name="sciName"
          id="sciName"
        />
      </form>
    </>
  );
}

export default AddPlant;
