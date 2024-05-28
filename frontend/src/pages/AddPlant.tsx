//. lägg ihop saker och loopa (dry)
//. defaultValue on select - error
//. setNewPlant i en egen funktion (nope)
//. felmeddelanden
//. töm form vid submit
//. dela upp i tre "sidor"
//. månad till månad

//* kalender eller fritext?? går inte med båda
//* lägg till skötselråd eller visa alla?

import { useEffect, useState } from "react";
import MonthPicker from "../components/MonthPicker";
import "./add-plant.css";
import { INewPlant, IArea } from "../../../backend/interfaces";

function AddPlant() {
  const [newPlant, setNewPlant] = useState<INewPlant>(),
    [areas, setAreas] = useState<IArea[]>([]),
    [plantAreas, setPlantAreas] = useState<number[]>([]),
    [plantEvents, setPlantEvents] = useState<
      {
        month: number;
        type: string;
      }[]
    >([]);

  useEffect(() => {
    fetch("/api/area")
      .then((response) => response.json())
      .then((result) => {
        setAreas(result);
      });
  }, []);

  console.log(plantEvents);

  function setMonth(month: string, title: string) {
    const plantEvent = plantEvents.find((event) => event.type === title);
    if (plantEvent) {
      const updatedEvents = plantEvents.map((event) => {
        return event.type === plantEvent.type
          ? { type: event.type, month: Number(month) }
          : event;
      });
      setPlantEvents(updatedEvents);
    } else {
      setPlantEvents([...plantEvents, { type: title, month: Number(month) }]);
    }
    // if (title === "dressingMonth") {
    //   const plantEvent = plantEvents.find((event) => event.type === "Torv");
    //   if (plantEvent) {
    //     const updatedEvents = plantEvents.map((event) => {
    //       return event.type === plantEvent.type
    //         ? { type: event.type, month: Number(month) }
    //         : event;
    //     });
    //     setPlantEvents(updatedEvents);
    //   } else {
    //     setPlantEvents([
    //       ...plantEvents,
    //       { type: "Torv", month: Number(month) },
    //     ]);
    //   }
    // } else if (title === "fertilizerMonth") {
    //   const plantEvent = plantEvents.find((event) => event.type === "Gödsla");
    //   if (plantEvent) {
    //     setPlantEvents(
    //       plantEvents.map((event, index) => {
    //         console.log(event);
    //         return index === plantEvents.indexOf(event!)
    //           ? { ...plantEvent, month: Number(month) }
    //           : event;
    //       })
    //     );
    //     console.log(plantEvent);
    //   } else {
    //     setPlantEvents([
    //       ...plantEvents,
    //       { type: "Gödsla", month: Number(month) },
    //     ]);
    //   }
    // } else if (title === "pruningMonth") {
    //   setPlantEvents([
    //     ...plantEvents,
    //     { type: "Beskär", month: Number(month) },
    //   ]);
    // } else if (title === "bloomMonth") {
    //   setPlantEvents([
    //     ...plantEvents,
    //     { type: "Blommar", month: Number(month) },
    //   ]);
    // } else if (title === "harvestMonth") {
    //   setPlantEvents([
    //     ...plantEvents,
    //     { type: "Skördas", month: Number(month) },
    //   ]);
    // }
  }

  function setArea(id: string, isChecked: boolean) {
    id = id.replace("areaCheckbox", "");
    if (isChecked) {
      setPlantAreas([...plantAreas, Number(id)]);
    } else {
      setPlantAreas(plantAreas.filter((area) => area !== Number(id)));
    }
  }

  useEffect(() => {
    setNewPlant((n) => ({ ...n, area: plantAreas }));
    setNewPlant((n) => ({ ...n, event: plantEvents }));
  }, [plantAreas, plantEvents]);

  function handleSubmit() {
    try {
      fetch("/api/add-plant", {
        method: "POST",
        body: JSON.stringify(newPlant),
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
            <label htmlFor="name">Namn *</label>
            <input
              type="text"
              name="name"
              id="name"
              placeholder="Namn"
              onChange={(e) =>
                setNewPlant({ ...newPlant, [e.target.id]: e.target.value })
              }
            />
          </div>
          <div className="label-over wrapper">
            <label htmlFor="scientific_name">Vetenskapligt namn</label>
            <input
              type="text"
              name="scientific_name"
              id="scientific_name"
              placeholder="Vetenskapligt namn"
              onChange={(e) =>
                setNewPlant({ ...newPlant, [e.target.id]: e.target.value })
              }
            />
          </div>
          <div className="label-over wrapper">
            <h6 className="label">Område *</h6>
            <p className="disclaimer">Välj ett eller flera områden</p>

            {areas!.map((area) => (
              <div
                className="label-left wrapper"
                key={area.id}>
                <label htmlFor={`areaCheckbox${area.id}`}>{area.name}</label>
                <input
                  type="checkbox"
                  id={`areaCheckbox${area.id}`}
                  onChange={(e) => setArea(e.target.id, e.target.checked)}
                />
              </div>
            ))}
          </div>
        </div>
      </section>
      <section>
        <h4>Skötsel</h4>
        <div className="label-left wrapper">
          <label htmlFor="dressingCheckbox">Torv</label>
          {/* <input
            type="checkbox"
            id="dressingCheckbox"
          /> */}
          <MonthPicker
            setMonth={setMonth}
            setTitle="dressingMonth"
          />
        </div>
        <div className="label-left wrapper">
          <label htmlFor="fertilizerCheckbox">Gödsel</label>
          {/* <input
            type="checkbox"
            id="fertilizerCheckbox"
          /> */}

          <MonthPicker
            setMonth={setMonth}
            setTitle="fertilizerMonth"
          />
        </div>
        <div className="label-left wrapper">
          <label htmlFor="pruningCheckbox">Beskärning</label>
          {/* <input
            type="checkbox"
            id="pruningCheckbox"
          /> */}

          <MonthPicker
            setMonth={setMonth}
            setTitle="pruningMonth"
          />
        </div>
      </section>
      <section>
        <h4>Kuriosa</h4>

        <div className="label-over wrapper">
          <h6 className="label">Blommar</h6>
          <MonthPicker
            setMonth={setMonth}
            setTitle="bloomMonth"
          />
        </div>
        <div className="label-over wrapper">
          <h6 className="label">Skördas</h6>
          <MonthPicker
            setMonth={setMonth}
            setTitle="harvestMonth"
          />
        </div>
        <div className="label-over wrapper">
          <label htmlFor="text">Anteckning</label>
          <textarea
            name="text"
            id="text"
            placeholder="Skriv anteckning här..."
            onChange={(e) =>
              setNewPlant({ ...newPlant, [e.target.id]: e.target.value })
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
