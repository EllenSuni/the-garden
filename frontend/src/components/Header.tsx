import { Link } from "react-router-dom";
import "./header.css";

function Header() {
  return (
    <header>
      <nav>
        <ul>
          <li>
            <Link to="/">Hem</Link>
          </li>
          <li>
            <Link to="/my-plants">Mina växter</Link>
          </li>
          <li>
            <Link to="/add-plant">Lägg till växt</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
