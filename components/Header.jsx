import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="navbar">
      <ul>
        <Link to="/dashboard">
          <li>Dashboard</li>
        </Link>
        <Link to="/about">
          <li>About</li>
        </Link>

        <Link to="/contact">
          <li>Contact</li>
        </Link>
      </ul>
      <img
        className="hamburger-menu"
        src="../public/icons/hamburger-menu.png"
      />
    </header>
  );
}
