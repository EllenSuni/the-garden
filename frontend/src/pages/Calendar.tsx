import { useState } from "react";

import "./calendar.css";

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
  ]);
  months.map((month) => console.log(typeof month));
  return (
    <section className="calendar-page">
      <ul className="months-list">
        {months.map((month) => (
          <li
            key={month}
            className="months-list-item">
            {month}
          </li>
        ))}
      </ul>
      <div className="container">
        <h1 className="current-month">Juli</h1>
        <div className="events-container">
          <div className="event">
            <h3 className="event-heading">Månadens skötsel</h3>
            <div className="event-type">
              <h4 className="event-type-heading">Beskär</h4>
              <ul className="event-plant-list">
                <li className="event-plant">Ros</li>
                <li className="event-plant">Tulpanträd</li>
              </ul>
            </div>
          </div>
          <div className="event">
            <h3 className="event-heading">Månadens njutning</h3>
            <div className="event-type">
              <h4 className="event-type-heading">Blommar</h4>
              <ul className="event-plant-list">
                <li className="event-plant">Ros</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Calendar;
