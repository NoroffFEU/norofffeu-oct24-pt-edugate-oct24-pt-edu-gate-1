export default function Header() {
  return /*HTML*/ `
  <div class="navbar">
    <ul>
     
    <a href="/dashboard" data-link ><li >Dashboard</li></a>
    <a href="/about" data-link><li >About</li></a>
   
    <a href="/contact" data-link ><li>Contact</li></a>
    </ul>
    <img class="hamburger-menu" src="../public/icons/hamburger-menu.png">
  </div>
  `;
}