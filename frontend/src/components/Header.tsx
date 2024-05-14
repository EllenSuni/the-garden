import { Link } from "react-router-dom";

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
        </ul>
      </nav>
    </header>
  );
}

export default Header;
