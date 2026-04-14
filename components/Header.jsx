import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="navbar">
      <ul>
        <Link to="/dashboard" data-link>
          <li>Dashboard</li>
        </Link>
        <Link to="/about" data-link>
          <li>About</li>
        </Link>
        <Link to="/contact" data-link>
          <li>Contact</li>
        </Link>
      </ul>
      <img className="hamburger-menu" src="/img/hamburger-menu.png" />
    </header>
  );
}
