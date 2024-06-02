import { useEffect, useState } from "react";
import MonthPicker from "../components/MonthPicker";
import "./add-plant.css";
import { INewPlant, IArea } from "../../../backend/interfaces";
import { useNavigate } from "react-router-dom";

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
        console.log(result);
      });
  }, []);

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

  const navigate = useNavigate();
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
            alert("Växt tillagd");
            navigate("/my-plants");
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
