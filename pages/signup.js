export default function SignUp() {
  setTimeout(() => {
    const button = document.querySelector("#signup-btn");
    const closeBtn = document.querySelector(".close-error");

    button.addEventListener("click", function () {
      const passwordInput = document.querySelector("#password");
      const confirmPasswordInput = document.querySelector("#confirm-password");

      if (passwordInput.value !== confirmPasswordInput.value) {
        document.getElementById("signup-error").classList.remove("hidden");
        return;
      }

      history.pushState(null, null, "/login");
      window.dispatchEvent(new PopStateEvent("popstate"));
    });

    if (closeBtn) {
      closeBtn.addEventListener("click", () => {
        document.getElementById("signup-error").classList.add("hidden");
      });
    }
  }, 0);

  return /* HTML */ `
    <section class="signup">
      <div id="signup-error" class="login-error hidden">
        <div class="error-icon">
          <img src="public/icons/fail.png" />
        </div>

        <div>
          <p class="error-title">Failed Sign Up!</p>
          <p class="error-text">Passwords do not match!</p>
        </div>

        <img src="public/icons/x-red.png" class="close-error" />
      </div>

      <div class="signup-card">
        <h1>Sign up</h1>

        <form id="signup-form">
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

          <div class="form-container">
            <div class="form-field">
              <label for="firstname">Firstname</label>
              <input
                type="text"
                id="firstname"
                name="firstname"
                placeholder="Ola"
                required
              />
            </div>

            <div class="form-field">
              <label for="surname">Surname</label>
              <input
                type="text"
                id="surname"
                name="surname"
                placeholder="Nordmann"
                required
              />
            </div>
          </div>

          <div class="form-field">
            <label for="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Choose password"
              required
            />
          </div>

          <div class="form-field">
            <label for="confirm-password">Confirm password</label>
            <input
              type="password"
              id="confirm-password"
              name="confirm-password"
              placeholder="Repeat password"
              required
            />
          </div>

          <button id="signup-btn" type="button">Submit</button>
        </form>
      </div>
    </section>
  `;
}
