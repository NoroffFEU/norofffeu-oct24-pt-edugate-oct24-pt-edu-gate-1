export default function AuthButtons(){
    const wrapper = document.createElement("div");
    wrapper.className = "auth-buttons";

    const signUpBtn = document.createElement("a");
    signUpBtn.className = "signup-btn";
    signUpBtn.href = "/sigup";
    signUpBtn.dataset.link = "";
    signUpBtn.textContent = "Sign up";
    
    const loginBtn = document.createElement("a");
    loginBtn.className = "login-btn";
    loginBtn.href = "/login";
    loginBtn.dataset.link = "";
    loginBtn.textContent = "Log in";


    wrapper.append(signUpBtn, loginBtn);
    return wrapper;
}