import { useState } from "react";
import { Link } from "react-router-dom";

import "./navigation.css";
import Bars from "../assets/icons/bars.svg";
import XIcon from "../assets/icons/x.svg";
import Calendar from "../assets/icons/calendar.svg";
import House from "../assets/icons/house.svg";
import Plant from "../assets/icons/plant.svg";
import Plus from "../assets/icons/plus.svg";

function Navigation() {
  const [openNavigation, setOpenNavigation] = useState(false);

  return (
    <div>
      {openNavigation && (
        <div
          className="navigation-overlay"
          onClick={() => setOpenNavigation(!openNavigation)}></div>
      )}
      <nav
        className={`navigation ${
          openNavigation ? "navigation-open" : "navigation-closed"
        }`}>
        {openNavigation && (
          <ul className="navigation-list">
            <li className="navigation-list-item">
              <Link
                to="/calendar"
                onClick={() => setOpenNavigation(!openNavigation)}>
                <img
                  className="icon"
                  src={Calendar}
                  alt="Kalender"
                />
                Min kalender
              </Link>
            </li>
            <li className="navigation-list-item">
              <Link
                to="/add-plant"
                onClick={() => setOpenNavigation(!openNavigation)}>
                <img
                  className="icon"
                  src={Plus}
                  alt="Lägg till växt"
                />
                Lägg till växt
              </Link>
            </li>
            <li className="navigation-list-item">
              <Link
                to="/my-plants"
                onClick={() => setOpenNavigation(!openNavigation)}>
                <img
                  className="icon"
                  src={Plant}
                  alt="Mina växter"
                />
                Mina växter
              </Link>
            </li>
            <li className="navigation-list-item">
              <Link
                to="/"
                onClick={() => setOpenNavigation(!openNavigation)}>
                <img
                  className="icon"
                  src={House}
                  alt="Hem "
                />
                Hem
              </Link>
            </li>
          </ul>
        )}
        <div
          className="bottom-icon-wrapper"
          onClick={() => setOpenNavigation(!openNavigation)}>
          <img
            className="icon"
            src={!openNavigation ? Bars : XIcon}
            alt="Meny"
          />
        </div>
      </nav>
    </div>
  );
}

export default Navigation;
