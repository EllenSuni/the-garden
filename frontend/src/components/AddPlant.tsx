//. lägg ihop saker och loopa (dry)
//. defaultValue on select - error
//. setNewPlant i en egen funktion (nope)
//. felmeddelanden
//. töm form vid submit
//. dela upp i tre "sidor"
//. månad till månad

//* kalender eller fritext?? går inte med båda
//* lägg till skötselråd eller visa alla?

import { useState } from "react";
import MonthPicker from "./MonthPicker";
import "./add-plant.css";
import { IPlant } from "../../../backend/interfaces";

function AddPlant() {
  const [newPlant, setNewPlant] = useState<IPlant>();

  function setMonth(month: string, title: string) {
    // console.log(title, month);
    if (title === "plantingTime") {
      console.log(month);
    }
    if (title === "bloomTime") {
      console.log(month);
    }
    if (title === "harvestTime") {
      console.log(month);
    }
  }

  function handleSubmit() {
    console.log(newPlant);
    // try {
    //   fetch("http://localhost:3000/add-plant", {
    //     method: "POST",
    //     body: JSON.stringify(newPlant),
    //     headers: { "Content-type": "application/json" },
    //   });
    // } catch (error) {
    //   console.log(error);
    // }
  }

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        handleSubmit();
      }}>
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
              <option value="area1">Skogsträdgården</option>
              <option value="area2">Dammen</option>
              <option value="area3">Blomsterhavet</option>
              <option value="area4">Berget</option>
              <option value="area5">Odlingen</option>
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

          <input
            type="text"
            name="dressing"
            id="dressing"
            placeholder="När"
          />
        </div>
        <div className="label-left wrapper">
          <label htmlFor="fertilizerCheckbox">Gödsel</label>
          <input
            type="checkbox"
            id="fertilizerCheckbox"
          />

          <input
            type="text"
            name="fertilizer"
            id="fertilizer"
            placeholder="När"
          />
        </div>
        <div className="label-left wrapper">
          <label htmlFor="trimmingCheckbox">Beskärning</label>
          <input
            type="checkbox"
            id="trimmingCheckbox"
          />

          <input
            type="text"
            name="trimming"
            id="trimming"
            placeholder="När"
          />
        </div>
      </section>
      <section>
        <h4>Kuriosa</h4>
        <div className="label-over wrapper">
          <label htmlFor="plantingTime">Planterades</label>
          <div>
            <MonthPicker
              setMonth={setMonth}
              setTitle="plantingTime"
            />
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
          <MonthPicker
            setMonth={setMonth}
            setTitle="bloomTime"
          />
        </div>
        <div className="label-over wrapper">
          <label htmlFor="harvestTime">Skördas</label>
          <MonthPicker
            setMonth={setMonth}
            setTitle="harvestTime"
          />
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
