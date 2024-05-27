import { useEffect, useState } from "react";

import "./calendar.css";
import { IEvent } from "../../../backend/interfaces";

interface IEventPlantName extends IEvent {
  name: string;
}

function Calendar() {
  const [months] = useState([
      "Januari",
      "Februari",
      "Mars",
      "April",
      "Maj",
      "Juni",
      "Juli",
      "Augusti",
      "September",
      "Oktober",
      "November",
      "December",
    ]),
    [currentMonth, setCurrentMonth] = useState(new Date().getMonth() + 1),
    [events, setEvents] = useState<IEventPlantName[]>([]);

  useEffect(() => {
    fetch(`http://localhost:3000/event/?month=${currentMonth}`)
      .then((response) => response.json())
      .then((result: IEventPlantName[]) => {
        setEvents(result);
      });
  }, [currentMonth]);

  events.forEach((event) => {
    switch (event.type) {
      case "dressingMonth":
        event.type = "Torv";
        break;
      case "fertilizerMonth":
        event.type = "Gödsel";
        break;
      case "pruningMonth":
        event.type = "Beskär";
        break;
      case "bloomMonth":
        event.type = "Blommar";
        break;
      case "harvestMonth":
        event.type = "Skördas";
        break;
    }
  });

  return (
    <section className="calendar-page">
      <ul className="months-list">
        {months.map((month, index) => (
          <li
            key={index}
            className="months-list-item"
            onClick={() => setCurrentMonth(index + 1)}>
            {month}
          </li>
        ))}
      </ul>
      <div className="container">
        <h1 className="current-month">{months[currentMonth - 1]}</h1>
        <div className="events-container">
          <div className="event">
            <h3 className="event-heading">Månadens skötsel</h3>
            {events!.length > 0 ? (
              events?.map((event, index) => (
                <div
                  key={index}
                  className="event-type">
                  <h4 className="event-type-heading">{event.type}</h4>
                  <ul className="event-plant-list">
                    <li className="event-plant">{event.name}</li>
                  </ul>
                </div>
              ))
            ) : (
              <h4 className="event-type-heading">Inget att göra</h4>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Calendar;
