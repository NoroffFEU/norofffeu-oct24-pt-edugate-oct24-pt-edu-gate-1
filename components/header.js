export default function Header() {
  return /*HTML*/ `
  <div class="navbar">
    <ul>
      <li><a href="/dashboard" data-link>Dashboard</a></li>
      <li><a href="/about" data-link>About</a></li>
      <li><a href="/contact" data-link>Contact</a></li>
    </ul>
    <img class="hamburger-menu" src="../public/icons/hamburger-menu.png">
  </div>
  `;
}