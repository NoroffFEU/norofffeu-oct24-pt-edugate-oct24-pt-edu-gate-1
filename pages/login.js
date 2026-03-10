import { login } from "../src/auth.js";

export default function Login() {
  setTimeout(() => {
    const button = document.querySelector("#login-btn");
    const closeBtn = document.querySelector(".close-error");

    button.addEventListener("click", function () {
      const emailInput = document.querySelector("#email");
      const passwordInput = document.querySelector("#password");

      if (
        emailInput.value === "teacher@edugate.com" &&
        passwordInput.value === "password1"
      ) {
        login({
        name: "Joe Bloggs",
        role: "teacher",
        email: "joeblog2020@edugate.no",
        birth: "01/01/2002",
        id: 1921840,
        gradYear: 2020,
        school: "The academy",
      });

      history.pushState(null, null, "/dashboard");
      window.dispatchEvent(new PopStateEvent("popstate"));
      } else {
        document.getElementById("login-error").classList.remove("hidden");
      }
    });

    closeBtn.addEventListener("click", () => {
      document.getElementById("login-error").classList.add("hidden");
    });
  }, 0);

  return /* HTML */ `
    <section class="login">
      <div id="login-error" class="login-error hidden">
        <div class="error-icon">
          <img src="public/icons/fail.png" />
        </div>

        <div>
          <p class="error-title">Failed Sign Up!</p>
          <p class="error-text">Wrong password or email address!</p>
        </div>

        <img src="public/icons/x-red.png" class="close-error" />
      </div>

      <div class="login-card">
        <h1>Log in</h1>

        <form id="login-form">
          <div class="form-field">
            <label for="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="example@mail.com"
              required
            />
          </div>
          <div class="form-field">
            <label for="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter password"
              required
            />
          </div>

          <p class="forgot-password">
            Forgot your password? Click <span>here</span>
          </p>

          <button id="login-btn" type="button">Submit</button>
        </form>
      </div>
    </section>
  `;
}


