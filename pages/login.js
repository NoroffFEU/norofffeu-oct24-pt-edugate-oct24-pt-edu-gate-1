import { login } from "../src/auth.js";
export default function Login() {
  return `
    <div class="login">
      <h1>Login</h1>
      <button id="login-teacher">Login as teacher</button>
    </div>
  `;
}

export function initLogin() {
  document
    .getElementById("login-teacher")
    .addEventListener("click", () => {

      login({
        name: "Joe Bloggs",
        role: "teacher"
      });

      history.pushState(null, null, "/dashboard");
      window.dispatchEvent(new PopStateEvent("popstate"));
    });
}