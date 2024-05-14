//. områden -> databasen; hämta och lägg i context
//. lägg ihop saker och loopa (dry)
//. setNewPlant i en egen funktion
//. felmeddelanden

import { useState } from "react";
import MonthPicker from "./MonthPicker";
import "./add-plant.css";

function AddPlant() {
  const [newPlant, setNewPlant] = useState<{
    plantName: string;
    sciName?: string;
    gardenArea: string;
    needsDressing: boolean;
    dressingTime?: string;
    needsFertilizer: boolean;
    fertilizerTime?: string;
    needsTrimming: boolean;
    trimmingTime?: string;
    plantingMonth?: string;
    plantingYear?: number;
    bloomTime?: string;
    harvestTime?: string;
    notes?: string;
  }>({
    plantName: "",
    gardenArea: "",
    needsDressing: false,
    needsFertilizer: false,
    needsTrimming: false,
  });

  function setMonth(month: string, title: string) {
    // console.log(title, month);
    if (title === "plantingTime") {
      setNewPlant({
        ...newPlant,
        plantingMonth: month,
      });
    }
    if (title === "bloomTime") {
      setNewPlant({
        ...newPlant,
        bloomTime: month,
      });
    }
    if (title === "harvestTime") {
      setNewPlant({
        ...newPlant,
        harvestTime: month,
      });
    }
  }

  function handleSubmit() {
    console.log(newPlant);
    try {
      fetch("http://localhost:3000/add-plant", {
        method: "POST",
        body: JSON.stringify(newPlant),
        headers: { "Content-type": "application/json" },
      });
    } catch (error) {
      console.log(error);
    }
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
              onChange={(e) =>
                setNewPlant({ ...newPlant, plantName: e.target.value })
              }
            />
          </div>
          <div className="label-over wrapper">
            <label htmlFor="sciName">Vetenskapligt namn</label>
            <input
              type="text"
              name="sciName"
              id="sciName"
              placeholder="Vetenskapligt namn"
              onChange={(e) =>
                setNewPlant({ ...newPlant, sciName: e.target.value })
              }
            />
          </div>
          <div className="label-over wrapper">
            <label htmlFor="gardenArea">Område *</label>
            <select
              name="gardenArea"
              id="gardenArea"
              onChange={(e) =>
                setNewPlant({ ...newPlant, gardenArea: e.target.value })
              }>
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
            onChange={() =>
              setNewPlant({
                ...newPlant,
                needsDressing: !newPlant.needsDressing,
              })
            }
          />
          {newPlant.needsDressing && (
            <input
              type="text"
              name="dressing"
              id="dressing"
              placeholder="När"
              onChange={(e) =>
                setNewPlant({ ...newPlant, dressingTime: e.target.value })
              }
            />
          )}
        </div>
        <div className="label-left wrapper">
          <label htmlFor="fertilizerCheckbox">Gödsel</label>
          <input
            type="checkbox"
            id="fertilizerCheckbox"
            onChange={() =>
              setNewPlant({
                ...newPlant,
                needsFertilizer: !newPlant.needsFertilizer,
              })
            }
          />
          {newPlant.needsFertilizer && (
            <input
              type="text"
              name="fertilizer"
              id="fertilizer"
              placeholder="När"
              onChange={(e) =>
                setNewPlant({ ...newPlant, fertilizerTime: e.target.value })
              }
            />
          )}
        </div>
        <div className="label-left wrapper">
          <label htmlFor="trimmingCheckbox">Beskärning</label>
          <input
            type="checkbox"
            id="trimmingCheckbox"
            onChange={() =>
              setNewPlant({
                ...newPlant,
                needsTrimming: !newPlant.needsTrimming,
              })
            }
          />
          {newPlant.needsTrimming && (
            <input
              type="text"
              name="trimming"
              id="trimming"
              placeholder="När"
              onChange={(e) =>
                setNewPlant({ ...newPlant, trimmingTime: e.target.value })
              }
            />
          )}
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
              onChange={(e) => {
                setNewPlant({
                  ...newPlant,
                  plantingYear: Number(e.target.value),
                });
              }}
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
            onChange={(e) =>
              setNewPlant({
                ...newPlant,
                notes: e.target.value,
              })
            }
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
