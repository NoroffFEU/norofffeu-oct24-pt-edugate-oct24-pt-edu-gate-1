export default function Header() {
  return /*HTML*/ `
  <div class="navbar">
    <ul>
      <li><a href="/dashboard" data-link>Dashboard</a></li>
      <li><a href="/about" data-link>About</a></li>
      <li><a href="/contact" data-link>Contact</a></li>
    <a href="/dashboard" data-link ><li >Dashboard</li></a>
    <a href="/about" data-link><li >About</li></a>
   
    <a href="/contact" data-link ><li>Contact</li></a>
    </ul>
    <img class="hamburger-menu" src="../public/icons/hamburger-menu.png">
  </div>
  `;
}