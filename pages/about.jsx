import AuthButtons from "../components/authButtons.js";
export default function About(){
    return (
    <div className="about-page-wrapper">
        <h1>About</h1>
        <div className="about-content">
            <p>
                Edugate was built to provide students with an easier way to 
                access their exam results.
            </p>
            <p>
                Schools can sign up, quickly register their students & create private 
                accounts for them to access their results.
            </p>
        </div>
        <div id="about-auth-buttons">
          
        </div>
    </div>
    )

    
}

// export function initAbout(){
//     const root = document.getElementById("about-auth-buttons");
//     root.appendChild(AuthButtons());
// }