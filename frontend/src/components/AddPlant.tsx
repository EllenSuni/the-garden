import MonthPicker from "./MonthPicker";
import "./add-plant.css";

function AddPlant() {
  return (
    <form>
      <h2>Lägg till växt</h2>
      <section>
        <h4>Information</h4>
        <p className="disclaimer">Fält markerade med * är obligatoriska</p>
        <div>
          <div className="label-over wrapper">
            <label htmlFor="plantName">Namn *</label>
            <input
              type="text"
              name="plantName"
              id="plantName"
              placeholder="Namn"
            />
          </div>
          <div className="label-over wrapper">
            <label htmlFor="sciName">Vetenskapligt namn</label>
            <input
              type="text"
              name="sciName"
              id="sciName"
              placeholder="Vetenskapligt namn"
            />
          </div>
          <div className="label-over wrapper">
            <label htmlFor="gardenArea">Område *</label>
            <select
              name="gardenArea"
              id="gardenArea">
              <option
                value=""
                disabled
                selected
                hidden>
                Välj ett område
              </option>
              <option value="">Skogsträdgården</option>
              <option value="">Dammen</option>
              <option value="">Blomsterhavet</option>
              <option value="">Berget</option>
              <option value="">Odlingen</option>
            </select>
          </div>
        </div>
      </section>
      <section>
        <h4>Skötsel</h4>
        <div className="label-left wrapper">
          <label htmlFor="dressingCheckbox">Torv</label>
          <input
            type="checkbox"
            id="dressingCheckbox"
          />
          <label htmlFor="dressingTime">När?</label>
          <MonthPicker />
        </div>
        <div className="label-left wrapper">
          <label htmlFor="fertilizerCheckbox">Gödsel</label>
          <input
            type="checkbox"
            id="fertilizerCheckbox"
          />
          <label htmlFor="fertilizerTime">När?</label>
          <MonthPicker />
        </div>
        <div className="label-left wrapper">
          <label htmlFor="trimmingCheckbox">Beskärning</label>
          <input
            type="checkbox"
            id="trimmingCheckbox"
          />
          <label htmlFor="trimmingTime">När?</label>
          <MonthPicker />
        </div>
      </section>
      <section>
        <h4>Kuriosa</h4>
        <div className="label-over wrapper">
          <label htmlFor="plantingTime">Planterades</label>
          <div>
            <MonthPicker />
            <input
              type="number"
              min="1901"
              max="2099"
              name="plantingTime"
              id="plantingTime"
              placeholder="År"
            />
          </div>
        </div>
        <div className="label-over wrapper">
          <label htmlFor="bloomTime">Blommar</label>
          <MonthPicker />
        </div>
        <div className="label-over wrapper">
          <label htmlFor="harvestTime">Skördas</label>
          <MonthPicker />
        </div>
        <div className="label-over wrapper">
          <label htmlFor="notes">Anteckning</label>
          <textarea
            name="notes"
            id="notes"
            placeholder="Skriv anteckning här..."
          />
        </div>
      </section>
      <input
        type="submit"
        value="Lägg till växt"
      />
    </form>
  );
}

export default AddPlant;
