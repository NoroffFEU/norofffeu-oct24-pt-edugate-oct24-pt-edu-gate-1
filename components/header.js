export default function Header() {
  return /*HTML*/ `
  <div>
    <ul>
    <li class="active">Dashboard</li>
    <a href="/about" data-link><li >About</li></a>
   
    <li>Contact</li>
    </ul>
    <img class="hamburger-menu" src="../public/icons/hamburger-menu.png">
  </div>
  `;
}

