import AuthButtons from "../components/authButtons.js";

export default function Home() {
  return /*HTML*/ `
    
        <h1>Home</h1>
        <nav>
            <a href="/login" data-link>Go to login</a>
            <a href="/test" data-link>Go to Test Page</a>
            <br>
           <a href="/dashboard" data-link>Go to dashboard</a>
            <br><br>
            <a href="/contact" data-link>Go to contact</a>
            <br>
            <a href="/landing" data-link>Go to landing</a>
            <br>
            <a href="/signup" data-link>Go to sign up</a>
            <br>
            <a href="/non-existent-page" data-link>Go to 404 Page</a>
        
        
            <div id="home-auth-buttons"></div>
        </nav>
    `;
}

export function initHome() {
  const root = document.getElementById("home-auth-buttons");
  root.appendChild(AuthButtons());
}
