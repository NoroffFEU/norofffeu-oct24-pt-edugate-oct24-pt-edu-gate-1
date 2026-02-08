import AuthButtons from "../components/authButtons.js";

export default function Home() {
    
    return /*HTML*/`
    <div>
       
        <nav>
            <a href="/test" data-link>Go to Test Page</a>
            <br>
           <a href="/dashboard" data-link>Go to dashboard</a>
            <br><br>
            <a href="/non-existent-page" data-link>Go to 404 Page</a>
        </nav>
        <div class="landing-page">
            <h1>Edugate</h1>
            <p>Welcome to Edugate, the platform that lets you access your exam results online.</p>
            <div id="home-auth-buttons"></div>
        </div>
    </div>  
    `;
}

export function initHome(){
    const root = document.getElementById("home-auth-buttons");
    root.appendChild(AuthButtons());
}