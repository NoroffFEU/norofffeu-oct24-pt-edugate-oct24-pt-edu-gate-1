import AuthButtons from "../components/authButtons.js";

export default function Home() {
  return /*HTML*/ `
        <nav>
            <a href="/login" data-link>Go to login</a>
            <a href="/test" data-link>Go to Test Page</a>
            <br>
           <a href="/dashboard" data-link>Go to dashboard</a>
            <br><br>
            <a href="/non-existent-page" data-link>Go to 404 Page</a>
        
        
            <div id="home-auth-buttons"></div>
        </nav>
    `;
}

export function initHome(){
    const root = document.getElementById("home-auth-buttons");
    root.appendChild(AuthButtons());
}
