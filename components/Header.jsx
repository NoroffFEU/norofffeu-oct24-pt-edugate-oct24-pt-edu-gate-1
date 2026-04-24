import { Link } from "react-router-dom";

export default function Header({ listOfLinks }) {
  return (
    <header className="navbar">
      <ul>
        {listOfLinks.map((link) => (
          <li key={link.path}>
            <Link to={link.path}>{link.name}</Link>
          </li>
        ))}
      </ul>
      <img
        className="hamburger-menu"
        src="/icons/hamburger-menu.png"
      />
    </header>
  );
}
